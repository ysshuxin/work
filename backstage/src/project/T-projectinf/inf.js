import React, { Component } from "react";
import { Tabs, Input,Icon } from "antd";
import Inputs from "./inputs";
import Textarea from "./textarea";
import Teammembers from "./Teammembers";
import Ceo from "./ceo";
import "./contacts.css";
const TextArea =Input.TextArea
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}

const text = [
  "项目简介",
  "要解决的问题/痛点",
  "技术架构/逻辑",
  "项目优势",
  "通证模型设计",
  "生态建设情况描述",
  "社区建设"
];
const needid=[
  "need_investplan",
  "need_investprogress",
  "need_project_otherinfo"
]
const projectid=[
  "project_project_introduce",
  "project_problem",
  "project_framework",
  "project_strength",
  "project_tokenmodel",
  "project_project_strategy",
  "project_project_community",
]
const inf = [
  "用较为简洁的话介绍您的项目，可以是一句slogan",
  "可按1、2、3、4的形式有条理的列举项目要解决的问题以及对应的解决方案",
  "可对具体的技术解决方案做简要描述",
  "可从多方面列举项目目前的优势，比如团队、目前运营数据、生态合作伙伴、其他背书等",
  "描述Token在业务中扮演的角色",
  "是否有生态发展规划，如有，可描述目前的合作伙伴或计划",
  "可描述目前的社群成员数、社群粘性评估，或者过去的社群运营活动的介绍可附社群管理员微信、社交媒体ID、Telegram链接"
];
const financingtext = ["融资计划", "目前融资进度", "备注"];
const projectdata={
  project_introduce:"",
  problem:"",
  framework:"",
  strength:"",
  tokenmodel:"",
  project_strategy:"",
  project_community:""
}
const teamdata={
  name:"",
  email:"",
  position:"",
  phone:"",
  wechat:""
}

const needdata={
  investplan:"",
  investprogress:"",
  project_otherinfo:""
}
export default class Inf extends Component {
  state = {
    projectdisabled: true,
    teamdisabled: true,
    needdisabled: true,
    file: ["wqqwqw.jpg", "fdgfbf.pdf", "etrghth.jpg", "54545.png"],
    num:1
  };
  element = [];
  financing = [];
  fileelement = [];
  numlist=[]
  projectchangedisabled = e => {
    this.setState({
      projectdisabled: !this.state.projectdisabled
    });

    if(!this.state.projectdisabled){
      projectdata.project_introduce=document.getElementById("project_project_introduce").value
      projectdata.problem=document.getElementById("project_problem").value
      projectdata.framework=document.getElementById("project_framework").value
      projectdata.strength=document.getElementById("project_strength").value
      projectdata.tokenmodel=document.getElementById("project_tokenmodel").value
      projectdata.project_strategy=document.getElementById("project_project_strategy").value
      projectdata.project_community=document.getElementById("project_project_community").value
      console.log(projectdata)
      
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
  };
  teamchangedisabled = e => {
    this.setState({
      teamdisabled: !this.state.teamdisabled
    });

    
    if(!this.state.teamdisabled){
      // teamdata.name=document.getElementById("name").value
      // teamdata.email=document.getElementById("email").value
      // teamdata.position=document.getElementById("position").value
      
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
  };
  needchangedisabled = e => {
    this.setState({
      needdisabled: !this.state.needdisabled
    });

    
    if(!this.state.needdisabled){
      needdata.investplan=document.getElementById("need_investplan").value
      needdata.investprogress=document.getElementById("need_investprogress").value
      needdata.project_otherinfo=document.getElementById("need_project_otherinfo").value
      console.log(needdata)
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
  };
  remove=(index,e)=>{
    console.log(index)
    let file=this.state.file
    file.splice(index,1)
      this.setState({
        file:file
      })
  };
  del=(index,e)=>{

    let num=this.state.num
    num--
    this.setState({
      num:num
    })
      
  };
  add=()=>{
  let  num=this.state.num
   num++
   if(num>5){
     alert("最多添加5位成员")
     return
   }
   this.setState({
     num:num
   })
  };
  render() {
    this.element = [];
    for (let index = 0; index < text.length; index++) {
      this.element.push(
        <Textarea
          id={projectid[index]}
          key={index}
          disabled={this.state.projectdisabled}
          inf={inf[index]}
          text={text[index]}
          key={index}
        />
      );
    }
    this.financing = [];
    for (let index = 0; index < financingtext.length; index++) {
      this.financing.push(
        <Textarea
        id={needid[index]}
          key={index}
          disabled={this.state.needdisabled}
          inf=""
          text={financingtext[index]}
          key={index}
        />
      );
    }





    this.fileelement = [];
    for (let index = 0; index < this.state.file.length; index++) {
      this.fileelement.push(
        <p key={index} style={{ position: "relative" }}>
          <span>{this.state.file[index]}</span>
          <span style={{ position: "absolute", right: "120px" }}>
            <span
            onClick={this.remove.bind(this, index)}
              style={{
                color: "#1890FF",
                fontSize: "14px",
                marginRight: "30px"
              }}
            >
              删除
            </span>
            <span style={{ color: "#1890FF", fontSize: "14px" }}>下载</span>
          </span>
        </p>
      );
    }
  
    this.numlist = [];
    for (let index = 0; index < this.state.num; index++) {
      this.numlist.push(
        <div key={this.props.index} id={"member"+index} className="timemembers" style={{position:"relative"}}>
          {index>0? < Icon  onClick={this.del.bind( this,index)} style={{position:"absolute",right:"10px",top:"10px",fontSize:"24px"}} type="close-circle-o" />:<div></div>}
          <Inputs dis={this.state.teamdisabled} titlewidth="36px" id="ceoname" text="姓名" width="160px" right="38px" red="true"></Inputs>
          <Inputs dis={this.state.teamdisabled} titlewidth="36px" id="ceojob" text="职位" width="160px" right="38px" red="true"></Inputs>
          <div style={{marginTop:"10px",marginBottom:"16px"}}>
           <TextArea disabled={this.state.teamdisabled} className="ceoinf"  style={{width:"100%",verticalAlign:"top",height:"120px",display:"inline-block",background:"#fff"}}   defaultValue="" />
        </div>
      </div>
      )
    }``
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          border: "20px solid  #F0F2F5",
          borderTop: "0"
        }}
      >
        

        <Tabs style={{ padding: "0 46px" }} defaultActiveKey="1">
          <TabPane tab="项目管理" key="1">
          <div
          id="edit"
          onClick={this.projectchangedisabled}
          style={{
            position: "absolute",
            right: "24px",
            top: "18px",
            fontSize: "16px",
            color: "#1890FF",
            zIndex: "100"
          }}
        >
          [{this.state.projectdisabled ? "编辑" : "保存"}]
        </div>
            {this.element}
          </TabPane>
          <TabPane tab="团队介绍" key="2">
          <div
          id="edit"
          onClick={this.teamchangedisabled}
          style={{
            position: "absolute",
            right: "24px",
            top: "18px",
            fontSize: "16px",
            color: "#1890FF",
            zIndex: "100"
          }}
        >
          [{this.state.teamdisabled ? "编辑" : "保存"}]
        </div>
            {this.numlist}
            <Icon  onClick={this.add} style={{fontSize:"30px",display:"block",margin:"40px auto"}} type="plus-circle" theme="outlined" />
          </TabPane>

          <TabPane tab="融资需求" key="3">
          <div
          id="edit"
          onClick={this.needchangedisabled}
          style={{
            position: "absolute",
            right: "24px",
            top: "18px",
            fontSize: "16px",
            color: "#1890FF",
            zIndex: "100"
          }}
        >
          [{this.state.needdisabled ? "编辑" : "保存"}]
        </div>
            {this.financing}
          </TabPane>
          <TabPane tab="下载" key="4">
            {this.fileelement}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
