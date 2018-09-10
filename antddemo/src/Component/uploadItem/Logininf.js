import React, { Component } from "react";
import { Button,Modal,Input } from "antd";
import axios from 'axios';
import $ from 'jquery'

const regphone =/^1[345789]\d{9}$/;
const regpassword =/^\d{4}$/;


class Logininf extends Component {
  data={
    phone:""
  }
  state={
    text:"获取验证码",
    clickif:true
  }
  login = () => {
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    if(!regphone.test(phone)){
     this.error()
     return
    }else{
      if(!regpassword.test(password)){
        this.code()
        return 
      }else{
          $.ajax(
            {
                type:"get",
                url:'http://cm.hrjykj.com:8090/index.php/index/index/getcodeandlogin?phone='+phone+'&number='+password,
                async:true,
                xhrFields:{
                  withCredentials:true
                },
                dataType:'json',
                success:function(data){
                  if (data.code=="1001") {
                    console.log(data)
                    localStorage.token=data.token
                    window.location.hash='#/project/step1'
                  }else{
                  console.log(data)
                  }
                },
                error:function(err){
                  console.log(err)
                }
            }
          )
      }
    }
  };
 
  error() {
  const modal = Modal.error({
    title: '请输入正确手机号',
    okText:"关闭"
  });
}

componentWillMount (){

}

code=()=>{
  const modal = Modal.error({
    title: '请输入正确验证码',
    okText:"关闭"
  });
}
changetext=()=>{
    this.setState({
      text:"30s后重新获取",
      clickif:false
  })
  let time=setInterval(()=>{
    let num=parseInt(this.state.text)
    num--
    this.setState({
      text:num+"s后重新获取"
  })

  if(num<=0){
    console.log(this)
    clearInterval(time)
    this.setState({
      text:"获取验证码",
      clickif:true  
    })
  }
  },1000)
}
productcode=()=>{
  let phone = document.getElementById("phone").value;
  if(!regphone.test(phone)){
    this.error()
    return
   }else{
     this.changetext()
      this.data.phone=document.getElementById("phone").value;
  let phone = document.getElementById("phone").value;
  if(!regphone.test(phone)){
    this.error()
    return
   }else{
     axios.get('http://cm.hrjykj.com:8090/index.php/index/index/sendphone?phone='+phone)
     .then(function(data){
       if(data.code=="1001"){
        console.log(data)
       }
     })
     .catch(function(err){
        console.log(err)
     })
   }
     }

  
  

}
  render() {
    return (
      <div style={{ margin: "160px auto 0", width: "340px", fontSize: "16px" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: "600", textAlign: "center" }}
        >
          登&nbsp;&nbsp;&nbsp;&nbsp;录
        </h2>
        <div style={{marginTop:"28px"}}><span style={{width:"70px",marginRight:"10px"}}>手机号:</span> <Input  id="phone" style={{width:"250px"}}  type="phone"></Input> </div>
        
        <div style={{marginTop:"20px"}}><span style={{width:"70px",marginRight:"10px"}}>验证码:</span> <Input  id="password" style={{width:"250px"}}
         addonAfter={<span   onClick={this.productcode}>{this.state.text}</span>}  type="phone"></Input> </div>
      
          <Button
            onClick={this.login}
            style={{
              width: "125px",
              height: "40px",
              display:"block",
              lineHeight: "40px",
              fontSize: "16px",
              margin:"46px auto 0"
            }}
            type="primary"
          >
            立即登录
          </Button>
        
      </div>
    );
  }
}
export default Logininf;
