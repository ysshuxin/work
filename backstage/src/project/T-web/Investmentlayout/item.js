import {
  Button,
  Dropdown,
  Icon,
  Input,
  Menu,
  message,
  Upload,
  Spin,
  Modal
} from "antd";
import axios from "axios";
import React, { Component } from "react";
import qs from "qs";
const confirm = Modal.confirm;
const TextArea = Input.TextArea;

export default class Item extends Component {
  state = {
    edit: this.props.edit,
    defaultValue: JSON.parse(JSON.stringify(this.props.defaultValue)),
    changeValue: JSON.parse(JSON.stringify(this.props.defaultValue)),
    bgColor: "#fff",
    imageUrl:this.props.defaultValue.img,
    industryarr: this.props.industry,
    loading:false,
    defaultcategory:this.props.defaultValue.category_id_text
  };
  globleData = {
    industryarr: []
  };
  componentWillReceiveProps (nextProps) {
    
    this.setState({
        defaultValue:JSON.parse(JSON.stringify(nextProps.defaultValue)),
        changeValue:JSON.parse(JSON.stringify(nextProps.defaultValue)),
        imageUrl:nextProps.defaultValue.img,
        edit: nextProps.edit,
        defaultcategory:this.props.defaultValue.category_id_text
    },() => {
     
  })
}


  componentWillMount = () => {
   console.log(this.props)
    this.globleData.industryarr = this.props.industry.map(
      (currentValue, index) => {
        return (
          <Menu.Item itemID={currentValue.id} key={index}>
            {currentValue.name}
          </Menu.Item>
        );
      }
    );
  };
  logobeforeUpload = file => {
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJPG) {
      message.error("仅支持上传.jpg/.jpeg/.png文件");
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error("上传文件最大不超过2M");
    }
    return isJPG && isLt2M;
  };
  edit = () => {
    let edit = !this.state.edit;
    if (edit) {
      this.setState({
        edit: edit
      });
    }
  };
  nameChange = e => {
    let data = this.state.changeValue;
    data.title = e.target.value;
    this.setState({
      changeValue: data,
    });
  };
  classifyChange = e => {
    console.log(e);
    let data = this.state.changeValue;
    data.category_id = e.key;
    data.category_id_text = e.item.props.children;
    this.setState({
      changeValue: data,
     defaultcategory:e.item.props.children
    });
  };
  web_urlChange = e => {
    console.log(e.target.value);
    let data = this.state.changeValue;
    data.link = e.target.value;
    this.setState({
      changeValue: data,
    });
  };
  infOnchange = e => {
    let data = this.state.changeValue;
    data.summary = e.target.value;
    this.setState({
      changeValue: data,
     
    });
  };
  tokenChange=(e)=>{
    let data = this.state.changeValue;
    data.token_symbol = e.target.value;
    this.setState({
      changeValue: data,
    });
  }
  mouseDown = () => {
    this.setState({
      bgColor: "#F0FAFF"
    });
  };
  mouseLeave = () => {
    this.setState({
      bgColor: "#fff"
    });
  };
  upData = () => {
    let  updata= JSON.parse(JSON.stringify(this.state.changeValue));
    let data = this.state.changeValue;
    let edit = !this.state.edit;
    delete data.category_id_text
    delete data.is_delete
    delete data.user_id
    delete data.add_time
    
    console.log(data)
    if(data.title===""){
  message.error("请填写名称",[1])
  return
}
if(data.token_symbol===""){
  message.error("请填写代币符号",[1])
  return
}
if(data.link===""){
  message.error("请填写网址",[1])
  return
}
if(data.img===""){
  message.error("请上传图片",[1])
  return
}
if(data.summary===""){
  message.error("请填写简介",[1])
  return
}
if(data.summary.length>500){
  message.error("简介过长",[1])
  return
}

    this.setState({
      loading:true
    })
    if(data.id){
      let formdata = qs.stringify(data);
      axios
      .post("/api/investment_layout/update", formdata)
      .then(json => {
        if (json.status===200&&json.data.code === 0) {
          console.log(json)
          message.success("修改成功", [1]);
          this.setState({
            defaultValue: updata,
            edit: edit,
            defaultcategory:this.state.defaultcategory,
            loading:false
          });
          this.props.changedata(true)

        } else {
          message.error(json.data.msg, [1]);
          this.setState({
            edit: edit,
            loading:false
          });
        }
      })
      .catch(e => {
        message.error("网络错误", [1]);
          this.setState({
            edit: edit,
            loading:false
          });
      });
    }else{
     delete data.id
     let formdata = qs.stringify(data);
     axios
      .post("/api/investment_layout/add", formdata)
      .then(json => {
        if (json.status===200&&json.data.code === 0) {
          console.log(json)
          message.success("添加成功", [1],()=>{
           
          });
          this.props.afteradd(true)
          this.props.changedata(true)
          this.setState({
            defaultValue: updata,
            edit: edit,
            defaultcategory:this.state.defaultcategory,
            loading:false
          });
         
        } else {
          message.error(json.data.msg, [1]);
          this.setState({
            edit: edit,
            loading:false
          });
          
        }
      })
      .catch(e => {
        message.error("网络错误", [1]);
          this.setState({
            edit: edit,
            loading:false
          });
      });
    }
    
  };
  cancel = () => {
    let edit = !this.state.edit;
    this.setState({
      edit: edit
    });
  };
  del=(e)=>{
    var that = this;
    let id=this.props.defaultValue.id
   
    
    if(id){
      confirm({
      title: "确认删除此篇文章？",
      onOk() {
        that.setState({
          loading:true
        })
        axios
          .get("/api/investment_layout/delete", { params: { id: id } })
          .then(json => {
            if (json.status === 200&&json.data.code===0) {
              message.success("删除成功", [0.5]);
              that.setState({
                loading:false
              })
              that.props.del(id)
            } else {
              message.error("网络错误，请刷新重试", [1]);
              that.setState({
                loading:false
              })
            }
          })
          .catch(err => {
            console.log(err);
            message.error("网络错误，请刷新重试", [1]);
            that.setState({
              loading:false
            })
          });
      },
      okText: "确认",
      cancelText: "取消",
      onCancel() {}
    });
    }else{
      this.props.del(false)
    }
    
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
     
      </div>
    );
    return (
     <Spin spinning={this.state.loading}>
      <div
        onMouseOver={this.mouseDown}
        onMouseLeave={this.mouseLeave}
        style={{
          padding: "25px 15px",
          borderBottom: "1px solid #F0FAFF",
          background: this.state.bgColor,
          position: "relative"
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "4px",
            position: "absolute",
            top: "40px"
          }}
        >
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={this.logobeforeUpload}
            onChange={this.logohandleChange}
            customRequest={info => {
              this.setState({
                imageUrl: false,
                loading: true
              });
              this.setState({ loading: true });
              let formdata = new FormData();
              formdata.append("file", info.file);
              axios
                .post("/api/upload", formdata)
                .then(json => {
                 console.log(json)
                 if(json.status===200&&json.data.code===0){
                  let data = this.state.changeValue;
                data.img=json.data.data.file_url
                  this.setState({
                    imageUrl: json.data.data.file_url,
                    loading: false,
                    changeValue:data
                  });
                 }else{
                   message.error("网络错误",[1])
                 }
                })
                .catch(err => {
                  console.log(err);
                });
            }}
          >
            {this.state.imageUrl ? (
              <img
                style={{ width: "100%" }}
                src={this.state.imageUrl}
                alt="avatar"
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div style={{ marginLeft: "75px", overflow: "hidden" }}>
          <div
            style={{ position: "relative", height: "44px", lineHeight: "44px" }}
          >
            <div style={{ display: "inline-block" }}>
              <span>名称：</span>
              {this.state.edit ? (
                <Input
                  defaultValue={this.state.defaultValue.title}
                  onChange={this.nameChange}
                  style={{ width: "160px" }}
                />
              ) : (
                <span style={{ display: "inline-block", width: "160px" }}>
                  {this.state.defaultValue.title}
                </span>
              )}
            </div>
            <div style={{ display: "inline-block", marginLeft: "18px" }}>
              <span>代币符号：</span>
              {this.state.edit ? (
                <Input
                  defaultValue={this.state.defaultValue.token_symbol}
                  onChange={this.tokenChange}
                  style={{ width: "160px" }}
                />
              ) : (
                <span>{this.state.defaultValue.token_symbol}</span>
              )}
            </div>

            <div style={{ position: "absolute", right: "0", bottom: "0" }}>
              <span onClick={this.edit} style={{ color: "#004FFF" }}>
                {this.state.edit ? (
               
                  
                    <span onClick={this.upData}>保存</span>
                    
                  
                ) : (
                  "编辑"
                )}
              </span>
              <span style={{ margin: "0 8px" }}>|</span>
              <span onClick={this.del} style={{ color: "#F5222D" }}>删除</span>
            </div>
          </div>
          <div style={{ height: "44px", lineHeight: "44px" }}>
            <div style={{ display: "inline-block" }}>
              <span style={{ display: "inline-block" }}>网址： </span>
              {this.state.edit ? (
                <Input
                  defaultValue={this.state.defaultValue.link}
                  onChange={this.web_urlChange}
                  style={{ width: "160px" }}
                />
              ) : (
                <span style={{ display: "inline-block", width: "160px" }}>
                  {" "}
                  {this.state.defaultValue.link}
                </span>
              )}
            </div>
            <div style={{ display: "inline-block", marginLeft: "46px" }}>
              <span style={{ display: "inline-block" }}>分类： </span>
              {this.state.edit ? (
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu
                      style={{
                        height: "200px",
                        background: "#fff",
                        overflowY: "scroll"
                      }}
                      onClick={this.classifyChange}
                    >
                      {this.state.industryarr.map(item => {
                        return (
                          <Menu.Item itemID={item.id} key={item.id}>
                            {item.name}
                          </Menu.Item>
                        );
                      })}
                    </Menu>
                  }
                >
                  <Button
                    style={{
                      width: "160px",
                      height: "32px",
                      textAlign: "left",
                      verticalAlign: "middle",
                      marginBottom: "4px"
                    }}
                  >
                    {this.state.defaultcategory}
                    <Icon
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "10px"
                      }}
                      type="down"
                    />
                  </Button>
                </Dropdown>
              ) : (
                <span style={{ display: "inline-block", width: "160px" }}>
                  {this.state.defaultcategory}
                </span>
              )}
            </div>
          </div>
          <div style={{ position: "relative", marginTop: "6px" }}>
            <span style={{ position: "absolute" }}> 简介：</span>

            {this.state.edit ? (
              <div style={{ marginLeft: "42px" }}>
                {" "}
                <TextArea
                  autosize={true}
                  onChange={this.infOnchange}
                  defaultValue={this.state.defaultValue.summary}
                  style={{ padding: "0px" }}
                />
                <p style={{textAlign:"right",color:this.state.changeValue.summary.length>500?"red":""}}>{this.state.changeValue.summary.length}/500</p>
              </div>
            ) : (
              <div style={{ marginLeft: "42px", padding: "1px " }}>
                {this.state.defaultValue.summary}
              </div>
            )}
          </div>
        </div>
      </div>
      </Spin>
    );
  }
}
