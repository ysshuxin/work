import React, { Component } from "react";
import { Button,Modal } from "antd";
const regphone =/^1[345789]\d{9}$/;
const regpassword =/^\d{6}$/;
let codenum="";
class Logininf extends Component {

  login = e => {
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
          if(password!=codenum){
          this.code()
          return
        }else{
          window.location.hash='#/step1'
        }
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
success() {
  const modal = Modal.success({
    title: '验证码为'+codenum,
    okText:"关闭"
  });
  // setTimeout(() => modal.destroy(), 1000);
}
code() {
  const modal = Modal.error({
    title: '请输入正确验证码',
    okText:"关闭"
  });
  // setTimeout(() => modal.destroy(), 1000);
}
productcode=()=>{
  codenum=""
  for(let i=0;i<6;i++){
    codenum+=parseInt(Math.random()*10)
  }
  codenum=Number(codenum)
  this.success()
}
  render() {
    return (
      <div style={{ margin: "250px auto 0", width: "360px", fontSize: "16px" }}>
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
            获取验证码
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
