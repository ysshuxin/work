import React, { Component } from "react";
import { Tabs, message, Input, Button } from "antd";
import axios from "../../api/api";
import qs from "qs";

// 正则
const regphone = /^1[345789]\d{9}$/;
const regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export default class Changepassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    affirmPassword: "",
   
  };

  affirmPassword = e => {
    let data = e.target.value;
    let oldPassword=this.state.oldPassword
    this.setState({
      affirmPassword: data
    });
    let newPassword = this.state.newPassword;
    if (newPassword !== data) {
      this.setState({
        affirmError: "两次输入密码不同"
      });
    }else{
      this.setState({
        affirmError: ""
      });
     
    }
  };
  oldPassword = e => {
    let data = e.target.value;
    this.setState({
      oldPassword: data
    });
  };
  newPassword = e => {
    let data = e.target.value;
    this.setState({
      newPassword: data
    });
  };
  change = () => {
    let data={}
    data.old_password=this.state.oldPassword
    data.password=this.state.newPassword
    data.old_password=this.state.oldPassword
    data.password_confirmation=this.state.affirmPassword
    if(!data.old_password){
      message.error("旧密码不能为空",[1])
      return
    }
    if( data.password!== data.password_confirmation){
      message.error("两次输入密码不同",[1])
      return
    }
    let formdata = qs.stringify(data);
   
    
    axios
      .post("/api/user_center/update_password", formdata)
      .then(json => {
        console.log(json);
        if(json.data.code===0){
          message.success("修改成功",[1])
        }else if(json.data.code=="-1"){
          message.success("旧密码错误",[1])
        }else{
          message.success("网络错误",[1])
        }
        
      })
      .catch(err => {
        message.success("网络错误",[1])
        this.getData()
      });
  };
  render() {
    return (
      <div>
        <div
          style={{
            padding: "20px 32px",
            position: "relative",
            borderBottom: "1px solid #E9E9E9"
          }}
        >
          <span
            style={{
              fontsize: "16px",
              color: "rgba(0,0,0,0.85)",
              fontWeight: "600"
            }}
          >
            修改密码
          </span>
        </div>

        <div style={{ padding: "33px 48px" }}>
          <div>
            <span>旧密码：</span>
            <Input
              type="password"
              style={{ width: 160, marginLeft: "14px" }}
              onChange={this.oldPassword}
            />{" "}
            <span style={{ color: "#F5222D", fontsize: "12px" }} />{" "}
          </div>
          <div style={{ marginTop: "15px" }}>
            <span>新密码：</span>
            <Input
              type="password"
              placeholder={"6-16位，区分大小写"}
              style={{ width: 160, marginLeft: "14px" }}
              onChange={this.newPassword}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <span>再次输入：</span>
            <Input
              type="password"
              style={{ width: 160, marginLeft: "0px" }}
              onChange={this.affirmPassword}
            />{" "}
            <span style={{ color: "#F5222D", fontsize: "12px" }} >{this.state.affirmError}</span>
          </div>
          <Button
          disabled={!this.state.oldPassword||!this.state.newPassword||(this.state.newPassword!==this.state.affirmPassword)}
            onClick={this.change}
            type="primary"
            style={{
              width: 70,
              height: 32,
              lineHeight: "32px",
              borderRadius: "100px",
              marginTop: "41px",
              marginLeft: "80px"
            }}
          >
            修改
          </Button>
        </div>
      </div>
    );
  }
}
