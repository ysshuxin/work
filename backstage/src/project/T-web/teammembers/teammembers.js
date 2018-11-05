import React, { Component } from "react";
import { Breadcrumb, Button, Spin, Modal, Input,Icon,Upload ,message} from "antd";
import axios from "../../../api/api";
import qs from 'qs'
const confirm = Modal.confirm;
const { TextArea } = Input;
export default class Item extends Component {
  state = {
    data: [],
    loading: false,
    modaloading:false,
    editmodaloading:false,
    upfileloading:false,
    visible: false,
    imageUrl:false,
    updata:{},
    editdata:{}
  };

  componentDidMount() {
    this.request();
  }

  
  modalshow = () => {
    this.setState({
      visible: true,
      updata:{},
      imageUrl:""
    });
  };
  
  modalclose=()=>{
    this.setState({
      visible: false,
      editvisible: false,
      modaloading:false,
      editmodaloading:false,
      updata:{}
    });
  }
  beforeUpload=(file)=>{
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  uploadimg=(info)=>{
    
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        console.log(json)
        let updata = this.state.updata;
        updata.avatar_url = json.data.data.file_url;
        this.setState({
          imageUrl: json.data.data.file_url,
          updata:updata
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  nameChange=(e)=>{
    let updata=this.state.updata
    updata.member_name=e.target.value
    console.log(updata)

    this.setState({
      updata:updata
    })
  }
  jobChange=(e)=>{
    let updata=this.state.updata
    updata.member_position=e.target.value
    console.log(updata)
    this.setState({
      updata:updata
    })
  }
  infChange=(e)=>{
    let updata=this.state.updata
    updata.member_introduce=e.target.value
    console.log(updata)

    this.setState({
      updata:updata
    })
  }

  request = () => {
    this.setState({
      loading: true
    });
    axios
      .get("/api/member/get")
      .then(data => {
        console.log(data);
        this.setState({
          data: data.data.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };


  del = (e) => {
    let id=e.target.getAttribute("itemid")
    confirm({
      title: "确认要删除此成员吗？",
      content: "删除后将不可恢复。",
      onOk: () => {
        axios.get("/api/member/delete", { params: { id: id } }).then((json)=>{
          console.log(json)
          if(json.data.code===0){
            message.success("删除成功",[1],()=>{
              this.request()
            })

          }
        }).catch((err)=>{

        })
      },
      onCancel: () => {},
      okText: "确 定",
      cancelText: "取 消"
    });
  };
  
edit=(e)=>{
 this.setState({
  updata:{}
 })
  let  id=e.target.getAttribute("itemid")
  let data= JSON.parse(JSON.stringify(this.state.data.filter((item)=>{
    return item.id==id
  })[0]) )

this.setState({
      editvisible: true,
      updata:data,
      imageUrl:data.avatar_url
    });
  
    


}


  change = (e) => {
    
  };
  add = (url="/api/member/add",txt="添加成功") => {
    let updata=this.state.updata
   
   if (!updata.member_name) {
     message.error("请填写姓名",[1])
     return
   }
   if (!updata.member_position) {
    message.error("请填写职位",[1])
    return
  }
  if (!updata.avatar_url) {
    message.error("请上传头像",[1])
    return
  }
  
 

  delete this.state.updata["order"]
    let formdata = qs.stringify(updata);
    this.setState({
      modaloading:true
    })
    console.log(url)
    axios
      .post(url, formdata, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(json => {
        console.log(json);
        if(json.data.code===0){
          message.success(txt,[1],()=>{
              this.request()
          })
          this.modalclose()
        
        }
        
      })
      .catch(err => {
        console.log(err);
      });

  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.upfileloading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>

      
      <div style={{width:480}}>
      <Spin spinning={this.state.modaloading} >
      <Modal
          title="添加成员"
          visible={this.state.visible}
          onOk={this.add.bind(this,"/api/member/add","添加成功")}
          onCancel={this.modalclose}
          cancelText="取消"
          okText="确认"
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
          maskClosable={false}
          destroyOnClose={true}
          width="480px"
          bodyStyle={{
           padding:"32px"
          }}
          style={{
            width: 480,
          }}
        >
        <div style={{position:"absolute",width: "90px",height:"90px",right:"35px"}}>
              <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={this.uploadimg}
              beforeUpload={this.beforeUpload}
            >
              {imageUrl ? <img style={{width: "100%",}} src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        </div>
        <div>
        <span>姓名：</span>
          <Input onChange={this.nameChange} style={{width:"230px" ,}}/>
        </div>
        <div style={{margin:"30px 0"}}>
        <span>职位：</span>
          <Input onChange={this.jobChange}  style={{width:"230px" ,}}/>
        </div>
        <div>
        <span style={{verticalAlign:"top"}}>简介：</span>
        <div style={{width:'370px',display:"inline-block"}}>
        <TextArea onChange={this.infChange} ></TextArea>
        </div>
        </div>
        </Modal>
        </Spin>
      </div>
        
      <div style={{width:480}}>
      <Spin spinning={this.state.editmodaloading} >
      <Modal
          title="编辑成员"
          visible={this.state.editvisible}
          onOk={this.add.bind(this,"/api/member/update","修改成功")}
          onCancel={this.modalclose}
          cancelText="取消"
          okText="确认"
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
          maskClosable={false}
          destroyOnClose={true}
          width="480px"
          bodyStyle={{
           padding:"32px"
          }}
          style={{
            width: 480,
          }}
        >
        <div style={{position:"absolute",width: "90px",height:"90px",right:"35px"}}>
              <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={this.uploadimg}
              beforeUpload={this.beforeUpload}
            >
              {imageUrl ? <img style={{width: "100%",}} src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        </div>
        <div>
        <span>姓名：</span>
          <Input defaultValue={this.state.updata.member_name} onChange={this.nameChange} style={{width:"230px" ,}}/>
        </div>
        <div style={{margin:"30px 0"}}>
        <span>职位：</span>
          <Input defaultValue={this.state.updata.member_position}  onChange={this.jobChange}  style={{width:"230px" ,}}/>
        </div>
        <div>
        <span style={{verticalAlign:"top"}}>简介：</span>
        <div style={{width:'370px',display:"inline-block"}}>
        <TextArea defaultValue={this.state.updata.member_introduce}  onChange={this.infChange} ></TextArea>
        </div>
        </div>
        </Modal>
        </Spin>
      </div>


        <div
          style={{
            padding: "16px 32px",
            overflow: "hidden",
            position: "relative",
            overflow:"hidden"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>成员管理</Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{
              fontSize: "20px",
              marginTop: "16px",
              fontWeight: "600",
              marginBottom: "0"
            }}
          >
            成员信息
          </h3>
          <Button
            onClick={this.modalshow}
            style={{
              width: "110px",
              height: "32px",
              lineHeight: "32px",
              position: "absolute",
              right: "60px",
              bottom: "20px",
              background: "#004FFF",
              color: "#fff",
              borderRadius: "100px",
              border: "none"
            }}
            type="primary"
          >
            + 添加成员
          </Button>
        </div>

        <Spin spinning={this.state.loading} >
        <div style={{ textAlign: "center", background: "#f0f2f5" }}>
          {this.state.data.map(item => {
        
            let img = item.avatar_url;
            let member_name = item.member_name;
            let member_position = item.member_position;
            let id = item.id;
            return (
              <div
                style={{
                  width: 214,
                  display: "inline-block",
                  textAlign: "left",
                  background: "#fff",
                  margin: "10px",
                  borderRadius: "4px",
                  boxShadow: " 0 0  4px 4px #eee"
                }}
              >
                <img style={{ width: "100%", height: 231 }} src={img} />
                <div style={{ padding: "6px 15px",overflow:"hidden" }}>
                  <h3
                    style={{
                      marginBottom: "0",
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    {member_name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(0 0 0 0.45)" ,overflow:"hidden"}}>
                    {member_position}
                  </p>
                  <div style={{ textAlign: "right", fontSize: "12px" }}>
                    {" "}
                    <span itemid={id} onClick={this.del} style={{ color: "#F5222D" }}>
                      [删除]
                    </span>{" "}
                    <span itemid={id} onClick={this.edit} style={{ color: "#004FFF" }}>
                      [编辑]
                    </span>{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </Spin>
      </div>
    );
  }
}
