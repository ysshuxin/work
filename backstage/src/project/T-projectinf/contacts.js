import React, { Component } from "react";
import { Tabs,Modal} from "antd";
import Inputs from './inputs'
import './contacts.css'
import axios from "axios"
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
  }
  const data1={
    project_id: localStorage.projectidnow,
    token:localStorage.backtoken,
    name:"",
    email:"",
    position:"",
    phone:"",
    wechat:""
  }
  const data2={
    project_id:"",
    email:"",
    position:"",
    phone:"",
    wechat:""
  }
export default class Contacts extends Component {
  state = {
    disabled1: true,
    disabled2: true
  }

  success() {
    const modal = Modal.success({
      title: '保存成功',
      okText:"关闭"
    });
  }
  error() {
    const modal = Modal.error({
      title: '保存失败',
      okText:"关闭"
    });
  }
  changedisabled1 = e => {
    this.setState({
      disabled1: !this.state.disabled1
    });
    if(!this.state.disabled1){
      data1.name=document.getElementById("name").value
      data1.email=document.getElementById("email").value
      data1.position=document.getElementById("position").value
      data1.phone=document.getElementById("phone").value
      data1.wechat=document.getElementById("wechat").value
      console.log(data1)
      axios.post("http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=3",data1)
      .then(json=>{
        console.log(json)
        if(json.data.code=="1001"){
          this.success()
        }else{
          this.error()
        }
      })
      .catch((err)=>{
        console.log(err)
        this.error()
      })
    }
  }
  changedisabled2 = e => {
    this.setState({
      disabled2: !this.state.disabled2
    });
    if(!this.state.disabled2){
      data2.name=document.getElementById("name").value
      data2.email=document.getElementById("email").value
    
      console.log(data2)
      // axios.post("http://www.sosoapi.com/pass/mock/12182/index/Project/AddUpdateProject/start=4",{
      //   project_id:"1",
      //   token:localStorage.token,
      //   project_name:  data.project_name,
      //   project_company:  data.project_company,
      //   foundle:  data.foundle,
      //   official_website:  data.official_website,
      //   logo:  data.logo
      // })
      // .then(function(json){
      //   console.log(json)
      //   json.status=="200"?window.location.hash='#/step3':"";
      // })
      // .catch(function(err){
      //   console.log(err)
      // })
    }




  }
  render() {
    return (
        <div
          style={{
            position: "relative",
            minHeight: "200px",
            border: "20px solid  #F0F2F5"
          }}
        >
        
        <Tabs  style={{padding:"0 46px 10px"}} defaultActiveKey="1">
        <TabPane  tab="项目联系人" key="1" >
        <div
        id="edit"
        onClick={this.changedisabled1}
        style={{
          position: "absolute",
          right: "24px",
          top: "18px",
          fontSize: "16px",
          color: "#1890FF",
          zIndex:"100"
        }}
      >
        [{this.state.disabled1 ? "编辑" : "保存"}]
      </div>
          <Inputs id="name" value="李狗蛋" dis={this.state.disabled1} right="200px" width="160px" text="姓名:"></Inputs>
          <Inputs id="email" value="李狗蛋" dis={this.state.disabled1} right="200px" width="160px" text="邮箱:"></Inputs>
          <Inputs id="wechat" value="李狗蛋" dis={this.state.disabled1} right="" width="160px" text="微信:"></Inputs>
          <br></br>
          <Inputs id="position" value="李狗蛋" dis={this.state.disabled1} right="200px" width="160px" text="职位:"></Inputs>
          <Inputs id="phone" value="李狗蛋" dis={this.state.disabled1} right="200px" width="160px" text="手机:"></Inputs>
        </TabPane>
        <TabPane tab="推荐人介绍" key="2" >
        <div
        id="edit"
        onClick={this.changedisabled2}
        style={{
          position: "absolute",
          right: "24px",
          top: "18px",
          fontSize: "16px",
          color: "#1890FF",
          zIndex:"100"
        }}
      >
        [{this.state.disabled2 ? "编辑" : "保存"}]
      </div>
        <Inputs id="name" value="李狗蛋" dis={this.state.disabled2} right="200px" width="160px" text="姓名:"></Inputs>
        <br></br>
          <Inputs id="name" value="李狗蛋" dis={this.state.disabled2} right="200px" width="160px" text="简介:"></Inputs>
        </TabPane>
      </Tabs>



      
  
      </div>
    );
  }
}

