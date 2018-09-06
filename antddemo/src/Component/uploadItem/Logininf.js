import React, { Component } from "react";
import { Button,Modal } from "antd";

import axios from 'axios';
import $ from 'jquery'

const regphone =/^1[345789]\d{9}$/;
const regpassword =/^\d{4}$/;


class Logininf extends Component {
  data={
    phone:""
  }
  login = e => {
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    var instance = axios.create({
      baseURL: 'http://cm.hrjykj.com:8090/index.php/index/index/getcodeandlogin?phone='+phone+'&number='+password,
      withCredentials: true,
    });
    if(!regphone.test(phone)){
     this.error()
     return
    }else{
      if(!regpassword.test(password)){
        this.code()
        return 
      }else{
          // axios.get('http://cm.hrjykj.com:8090/index.php/index/index/getcodeandlogin?phone='+phone+"&number="+password)
          // .then(function(data){
          //   localStorage.token=data.data.data.token
          //    console.log(data)
          // })
          // .catch(function(err){
          //    console.log(err)
          // })

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
                    localStorage.token=data.data.token
                    window.location.hash='#/step1'
                  }else{
                    this.code()
                  }
                },
                error:function(err){
                  console.log(err)
                }
            }
          )
          // instance.get()
          // .then(function(data){
          //   console.log(data)
          // })
          // .catch(function(err){
          //   console.log(err)

          // })
          // window.location.hash='#/step1'
      }
    }
  };
  error() {
  const modal = Modal.error({
    title: '请输入正确手机号',
    okText:"关闭"
  });
  // setTimeout(() => modal.destroy(), 1000);
}

componentWillMount (){
  console.log(localStorage.token.data)
}

codetext="获取验证码"

code() {
  const modal = Modal.error({
    title: '请输入正确验证码',
    okText:"关闭"
  });
}
productcode=()=>{
  this.data.phone=document.getElementById("phone").value;
  let phone = document.getElementById("phone").value;
  if(!regphone.test(phone)){
    this.error()
    return
   }else{
     axios.get('http://cm.hrjykj.com:8090/index.php/index/index/sendphone?phone='+phone)
     .then(function(data){
       localStorage.token=data.data.data.token
        console.log(data)
     })
     .catch(function(err){
        console.log(err)
     })
   }
  // this.success()
}
  render() {
    return (
      <div style={{ margin: "160px auto 0", width: "340px", fontSize: "16px" }}>
        <h2
          style={{ fontSize: "28px", fontWeight: "600", textAlign: "center" }}
        >
          登录
        </h2>
        <input
          id="phone"
          style={{
            border: "none",
            outline: "none",
            borderBottom: "2px solid #979797",
            width: "100%",
            padding: "8px"
          }}
          type="tel"
          placeholder="输入手机号"
        />
        <div style={{ position: "relative" }}>
          <input
            id="password"
            style={{
              border: "none",
              outline: "none",
              borderBottom: "2px solid #979797",
              width: "100%",
              padding: "8px",
              marginTop: "32px"
            }}
            type="password"
            placeholder="输入验证码"
          />
         
          <span
            style={{
              fontWeight: "600",
              position: "absolute",
              right: "0",
              bottom: "10px"
            }}
            onClick={this.productcode}
          >
            {this.codetext}
          </span>
        </div>
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          <Button
            onClick={this.login}
            style={{
              width: "125px",
              height: "40px",
              lineHeight: "40px",
              fontSize: "16px"
            }}
            type="primary"
          >
            立即登录
          </Button>
        </p>
      </div>
    );
  }
}
export default Logininf;
