import React, { Component } from "react";
import Head from './Head'
import {Redirect} from 'react-router-dom'
import Teammembers from './Teammembers'
import Textarea from './Textarea'
import Out from "../style";
import { Button,Icon,Modal } from 'antd';
import Nav from "../Nav";
import Foot from "../Foot";
import {Link} from 'react-router-dom'
import store from '../../redux/redux'
import axios from 'axios'
const headtext =
  "表单填写大约需要10~15分钟";
const text=["项目简介","要解决的问题/痛点","技术架构/逻辑","项目优势","通证模型设计","生态建设情况描述","社区建设"]
const textid=["project_introduce","problem","framework","strength","tokenmodel","project_strategy","project_community"]
const inf=["用较为简洁的话介绍您的项目，可以是一句slogan",
"可按1、2、3、4的形式有条理的列举项目要解决的问题以及对应的解决方案",
"可对具体的技术解决方案做简要描述",
"可从多方面列举项目目前的优势，比如团队、目前运营数据、生态合作伙伴、其他背书等",
"描述Token在业务中扮演的角色",
"是否有生态发展规划，如有，可描述目前的合作伙伴或计划",
"可描述目前的社群成员数、社群粘性评估，或者过去的社群运营活动的介绍可附社群管理员微信、社交媒体ID、Telegram链接"
]
const data={
  
  project_introduce:"",
  problem:"",
  framework:"",
  strength:"",
  tokenmodel:"",
  project_strategy:"",
  project_community:""
}
let   member=[]
class S1index extends Component {
  state = {
    current: "01",
    num:store.getState(),
    key:1,
    visible: false
  };
  add=()=>{

    if(document.getElementsByClassName("timemembers").length>4){
      alert("最多添加5位成员")
      return
    }
    store.dispatch({type:"ADD"})
    console.log(store.getState())
    this.setState({
      num:store.getState()
    })
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    window.location.hash='#/step1'
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  error(title) {
    const modal = Modal.error({
      title: title,
      okText:"关闭"
    });
    // setTimeout(() => modal.destroy(), 1000);
  }
next=()=>{
  member=[]
let ifnull=()=>{
  let ceo=document.getElementsByClassName("timemembers")
  for (let index = 0; index < ceo.length; index++) {
    let ceoname=ceo[index].querySelector("#ceoname").value
    let ceojob=ceo[index].querySelector("#ceojob").value
    let ceoinf=ceo[index].querySelector(".ceoinf").value
    if((ceoname==""||undefined)||(ceoinf==""||undefined)||(ceojob==""||undefined)){
      this.error("必填项不能为空")
      return true
    }else{
      member.push({
        member_name:ceoname,
        member_position:ceojob,
        member_introduce:ceoinf
      })
    }
  }

console.log(member)
  for (const key in data) {
  if (data.hasOwnProperty(key)) {
    if(document.getElementById(key).value==""||undefined||null){
      this.error("必填项不能为空")
        return true
    }else{
      data[key]=document.getElementById(key).value
    }
  }
}
}

if(ifnull()==true){
  return false
}

axios.post("http://www.sosoapi.com/pass/mock/12182/index/Project/AddUpdateProject/start=4",{
  project_id:"1",
  token:localStorage.token,
  project_introduce:  data.project_introduce,
  problem:  data.problem,
  framework:  data.framework,
  strength:  data.strength,
  tokenmodel:  data.tokenmodel,
  project_strategy:  data.project_strategy,
  project_community:  data.project_community
})
.then(function(json){
  json.status=="200"?window.location.hash='#/step3':"";
})
.catch(function(err){
  console.log(err)

})




}














  render() {
    console.log(this.state)
    let element=[]
    let elementadd=[]
for (let index = 0; index < text.length; index++) {
  element.push(<Textarea id={textid[index]} red="true" inf={inf[index]} text={text[index]} key={index}></Textarea>)
}
for(let i=0; i<this.state.num;i++){
  if(i===0){
    elementadd.push(<Teammembers  key={i} text="团队成员介绍"  ifdel={false} id={"id"+(i+1)}></Teammembers>)
  } 
    else{
    elementadd.push(<Teammembers  key={i} ifdel={true} id={"id"+(i+1)}></Teammembers>)

    }
        }
    return (
      <div>
      <Nav></Nav>
      <div style={{width:"100%",position:"absolute",top:"65px",bottom:"65px",overflow:"auto",minWidth:"1200px"}}>
       <div style={{width:"50%",minWidth:"1200px",margin:"0 auto"}}>
        <Head step={1} text={headtext}></Head>
        {elementadd}
        <Icon onClick={this.add}  style={{display:"block",width:"24px", margin:"20px auto 0",fontSize:"24px"}} type="plus-circle-o" />
        <div style={Out}>
        <h3 style={{fontWeight:"600",fontSize:"24px",marginTop:"15px"}}>项目详细信息</h3>
         {element}
         
        </div>
        </div>
        <p style={{textAlign:"center"}}>
         <Button  onClick={this.showModal} style={{ margin: "30px 43px 0 0",fontSize:"16px",height:"40px",width:"100px",background:"#fff",color:"#000",border:"none"}} type="primary">上一步</Button>
         
         <Button onClick={this.next} style={{ margin: "30px 0",fontSize:"16px",height:"40px",width:"100px"}} type="primary">下一步</Button>
         
         </p>
      </div>
       
<Foot></Foot>
<div>
      <Modal
        title=""
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        closable={false}
        width="430px"
      >
        <p style={{fontSize:"16px",fontWeight:"600"}}><Icon type="question-circle" /> 确认要返回上一步吗?</p>
        <p style={{color:"#000",opacity:"0.65"}}>返回上一步，当前页面信息不会被保存。</p>
      </Modal>
    </div>
      </div>
    );
  }
}
export default S1index;
