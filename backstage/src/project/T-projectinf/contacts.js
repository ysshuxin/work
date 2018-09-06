import React, { Component } from "react";
import { Tabs} from "antd";
import Inputs from './inputs'
import './contacts.css'
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
  }
  const data={
    name:"",
    email:"",
    position:"",
    phone:"",
    wechat:""
  }
export default class Contacts extends Component {
  state = {
    disabled: true,
    style: true,
  }
  changedisabled = e => {
      
    this.setState({
      disabled: !this.state.disabled,
      style: !this.state.disabled
    });


    if(!this.state.disabled){
      data.name=document.getElementById("name").value
      data.email=document.getElementById("email").value
      data.position=document.getElementById("position").value
      data.phone=document.getElementById("phone").value
      data.wechat=document.getElementById("wechat").value
      console.log(data)
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
        <div
        id="edit"
        onClick={this.changedisabled}
        style={{
          position: "absolute",
          right: "24px",
          top: "18px",
          fontSize: "16px",
          color: "#1890FF",
          zIndex:"100"
        }}
      >
        [{this.state.disabled ? "编辑" : "保存"}]
      </div>
        <Tabs  style={{padding:"0 46px 10px"}} defaultActiveKey="1">
        <TabPane  tab="项目联系人" key="1" >
          <Inputs id="name" value="李狗蛋" dis={this.state.disabled} right="200px" width="160px" text="姓名:"></Inputs>
          <Inputs id="email" value="李狗蛋" dis={this.state.disabled} right="200px" width="160px" text="邮箱:"></Inputs>
          <Inputs id="wechat" value="李狗蛋" dis={this.state.disabled} right="" width="160px" text="微信:"></Inputs>
          <br></br>
          <Inputs id="position" value="李狗蛋" dis={this.state.disabled} right="200px" width="160px" text="职位:"></Inputs>
          <Inputs id="phone" value="李狗蛋" dis={this.state.disabled} right="200px" width="160px" text="手机:"></Inputs>
        </TabPane>
        <TabPane tab="推荐人介绍" key="2" >
        <Inputs id="name" value="李狗蛋" dis={this.state.disabled} right="200px" width="160px" text="姓名:"></Inputs>
        <br></br>
          <Inputs id="name" value="李狗蛋" dis={this.state.disabled} right="200px" width="160px" text="简介:"></Inputs>
        </TabPane>
      </Tabs>



      
  
      </div>
    );
  }
}

