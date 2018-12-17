import React, { Component } from "react";
import {
  Tabs,
  Button,
  Modal,
  Select,
  DatePicker,
  message,
  Upload,
  Input,
  Radio,
  Icon,
  Checkbox
} from "antd";
import axios from "../../api/api";
import qs from "qs";
import p1 from "../../img/team/teamicon1.png";
import p2 from "../../img/team/teamicon2.png";
import p3 from "../../img/team/teamicon3.png";
import p4 from "../../img/team/teamicon4.png";
import p5 from "../../img/team/teamicon5.png";
import p6 from "../../img/team/teamicon6.png";
import p7 from "../../img/team/teamicon7.png";
import p8 from "../../img/team/teamicon8.png";
import p9 from "../../img/team/teamicon8.png";
import p10 from "../../img/team/teamicon10.png";

const TextArea = Input.TextArea;
const confirm= Modal.confirm
export default class Team extends Component {
  state = {
    edit: false,
    data: this.props.data
  };

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

  inputChange=(key,e)=>{
    let data=this.state.data
    console.log(data);
    
    data.introduce[key]=e.target.value
    this.setState({
      data:data
    })
  }


  uploadimg = info => {
    this.setState({
      loading: true
    });
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        console.log(json);
        
        let data=this.state.data
    console.log(data);
    
    data.introduce.pic=json.data.data.file_url
    this.setState({
      data:data,
      loading:false
    })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };

  editChange = () => {
    this.setState({
      edit: true
    });
  };

  del=()=>{
    confirm({
      title: `确认要删除此条目？`,
      okText: "确定",
      cancelText: "取消",
      onOk:()=>{
        let data={
          team_id:this.state.data.team_id
        }
        console.log(data);
        
        let FromData=qs.stringify(data)
        axios.post("/api/project_team/delete",FromData).then((json)=>{
          if(json.data.code===0){ 
            console.log(json);
            message.success("删除成功",[1])
            this.props.getData(this.props.id)
          }else{
            message.error("删除失败，请重试",[1])
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      onCancel:()=>{
  
      }
    });
    
  }
  save=()=>{
    let data=this.state.data
    console.log(data);
    console.log(this.props.id);
   
    if(data.team_id){ 
      data.introduce =JSON.stringify(data.introduce)
    let FromData=qs.stringify(data)
      axios.post("/api/project_team/update",FromData).then((json)=>{
        if(json.data.code===0){ 
          console.log(json);
          message.success("修改成功",[1])
          this.props.getData(this.props.id)
        }else{
          message.error("修改失败，请重试",[1])
        }
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      data.project_id=this.props.id
      data.introduce =JSON.stringify(data.introduce)
      let FromData=qs.stringify(data)
      axios.post("/api/project_team/add",FromData).then((json)=>{
        if(json.data.code===0){
          console.log(json);
          message.success("添加成功",[1])
          this.props.getData(this.props.id)
        }else{
          message.error("添加失败，请重试",[1])
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  render() {
    const edit = this.state.edit;
    const data = this.state.data;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div
      style={{
        borderBottom: "1px solid #E9E9E9",
        padding: "20px 0",
        width: "100%"
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: 70,
          height: 70,
          verticalAlign: "top",
          marginRight: 15,
          float: "left"
        }}
      >
        {edit ? (
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader yss_projectinf_uploading"
            showUploadList={false}
            customRequest={this.uploadimg}
            beforeUpload={this.beforeUpload}
          >
            {data.introduce.pic ? (
              <img style={{ width: "100%" }} src={data.introduce.pic} alt="avatar" />
            ) : (
              uploadButton
            )}
          </Upload>
        ) : (
          <img style={{ width: "100%", height: "100%" }} src={data.introduce.pic} />
        )}
      </div>
      <div style={{ marginLeft: 85 }}>
        <div
          style={{ position: "relative", height: 34, lineHeight: "34px" }}
        >
          <span style={{ color: "rgba(0 0 0 0.45)" }}>姓名：</span>
          {edit ? (
            <Input
            onChange={this.inputChange.bind(this,"name")}
              defaultValue={data.introduce.name}
              style={{ width: 160, marginRight: 30 }}
            />
          ) : (
            <span
              style={{
                display: "inline-block",
                marginRight: 30,
                width: 160
              }}
            >
              {data.introduce.name}
            </span>
          )}
          <span style={{ color: "rgba(0 0 0 0.45)" }}>职位：</span>
          {edit ? (
            <Input onChange={this.inputChange.bind(this,"title")} defaultValue={data.introduce.title} style={{ width: 160 }} />
          ) : (
            <span style={{ display: "inline-block" }}>{data.introduce.title}</span>
          )}

          <div style={{ position: "absolute", right: 0, top: 0 }}>
          {
            data.team_id?<span
            onClick={this.del}
              style={{ color: "#F5222D", marginRight: 15 }}
            >
              [删除]
            </span>:""
          }
            
            {edit ? (
              <span onClick={this.save} style={{ color: "#004FFF" }}>
                [保存]
              </span>
            ) : (
              <span onClick={this.editChange} style={{ color: "#004FFF" }}>
                [编辑]
              </span>
            )}
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <div
            style={{ float: "left", width: 45, color: "rgba(0 0 0 0.45)" }}
          >
            简介：
          </div>
          {edit ? (
            <div style={{ marginLeft: 45 }}>
            
              <TextArea defaultValue={data.introduce.inf} />{" "}
            </div>
          ) : (
            <div
              style={{
                marginLeft: 45,
                width: "100%",
                display: "inline-block"
              }}
            >
              {data.introduce.inf}
            </div>
          )}
        </div>

      
      </div>
    </div>
    );
  }
}
