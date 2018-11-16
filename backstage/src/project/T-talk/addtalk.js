import React, { Component } from "react";
import { Breadcrumb, message, Upload, Icon, Spin, Input,Popconfirm,Button  } from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";
import qs from "qs";
const TextArea=Input.TextArea
export default class AddTalk extends Component {
  state = {
    titlenum: 0,
    loading: false,
    upfileloading:false,
    imgList:[],
    upData:{}
  };
  componentDidMount() {}

 
// 图片上传
beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
    if (!isJPG) {
      message.error("图片格式错误", [1]);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片最大为2M");
    }
    return isJPG && isLt2M;
  };
uploadimg = info => {
    this.setState({
      loading: true
    });
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        let data = this.state.imgList.concat([json.data.data.file_url])
        this.setState({
          imgList: data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };
// 删除图片
delImg=(index)=>{
    console.log(index);
    let imgList=this.state.imgList.concat([])
    imgList.splice(index,1)
    this.setState({
        imgList:imgList,
        
    })
    
}
// 获取输入数据

onChange=(key,e)=>{
    let data=this.state.upData
    data[key]=e.target.value
    this.setState({
      upData:data ,
      titlenum: e.target.value.length
    })
}

// 提交
save=()=>{
    let data=this.state.upData
    data.pics=this.state.imgList.join(",")
    if(!data.title){
        message.error("请输入标题",[1])
        return
    }
    if(data.title.length>65){
        message.error("标题过长",[1])
        return
    }
    if(!data.content){
        message.error("请输入内容",[1])
        return
    }
    if(!data.pics){
        message.error("请插入图片",[1])
        return
    }
    console.log(data);
    let FormData=qs.stringify(data)
    this.setState({
        loading:true
    })
    axios.post("/api/discussion/add",FormData).then((json)=>{
        if(json.data.code===0){
            message.success("提交成功",[1],()=>{
                this.setState({
                    loading:false
                })
                this.props.history.push('/site/talk');
            })
        }else{
            message.success(json.data.msg,[1])
            this.setState({
                loading:false
            })
        }
    }).catch((err)=>{
        this.setState({
            loading:false
        })
    }) 
}
  render() {
    const uploadButton = (
        <div>
          <Icon type={this.state.upfileloading ? "loading" : "plus"} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    return (
      <div style={{ background: "#F0F2F5" }}>
        <div
          style={{
            padding: "16px 48px 0",
            position: "relative",
            overflow: "hidden",
            background: "#fff"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/site/talk">讨论中心</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布讨论</Breadcrumb.Item>
          </Breadcrumb>

          <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
            创建新的讨论
          </h3>
        </div>

        <Spin spinning={this.state.loading}>
          <div style={{ padding: 20, background: "#F0F2F5" }}>
            <div style={{ background: "#fff", padding: "20px 32px" }}>
              <span style={{ fontWeight: "600" }}> 标题： </span>
              <Input
                onChange={this.onChange.bind(this,"title")}
                suffix={
                  <span
                    style={this.state.titlenum > 65 ? { color: "red" } : {}}
                  >
                    {this.state.titlenum}
                    /65
                  </span>
                }
                style={{ width: "60%" }}
              />
              <div style={{margin:"20px 0"}}>
                <p><span  style={{ fontWeight: "600" }}>图片：</span> <span style={{color:"rgba(0,0,0,0.45)"}} >最多上传6张图片,可点击图片删除</span> </p>
                <div style={{paddingLeft:42}}>
                    {this.state.imgList.map((item,index)=>{
                        return(
                            <Popconfirm placement="top" title={"确认删除此图片？"} onConfirm={this.delImg.bind(this,index)} okText="确认" cancelText="取消">
                               <img  src={item} key={index} style={{width: 90,height: 90,margin:"0 8px",verticalAlign:"top"}}></img>
                          </Popconfirm>
                         
                        )
                    })}
                    <div style={{display:"inline-block",width: 90,height: 90,}}>
                     {
                        this.state.imgList.length>=6?"":  <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader yss_projectinf_uploading"
                        showUploadList={false}
                        customRequest={this.uploadimg}
                        beforeUpload={this.beforeUpload}
                      >
                        
                        {  uploadButton}
                     
                      </Upload>
                    }
                    </div>
                   
                </div>
                <div>
                <div  style={{ fontWeight: "600",marginTop:10,marginBottom:10}}>讨论内容：</div>
                <TextArea onChange={this.onChange.bind(this,"content")} style={{height: 200,}}> </TextArea>
                                       
                </div>
                <div style={{margin:"30px 0",textAlign:"center"}}>
                
                <Button onClick={this.save} type="primary" style={{width: 80,height: 32,borderRadius:100}}>提 交</Button>
                
                </div>
            </div>
            </div>
            
          </div>
        </Spin>
      </div>
    );
  }
}
