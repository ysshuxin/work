import React, { Component } from "react";
import { Steps } from "antd";

const Step = Steps.Step;

class Head extends Component {
  state = {
    current: "01"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div style={{padding:"0 10%"}} className="head">
        <h1 style={{ textAlign: "center",margin:"40px 0 10px 0",fontWeight:"600"}}>项目提交</h1>
        <Steps style={{margin:"10px 0 40px 0"}} current={this.props.step} >
          <Step title="基本信息"  />
          <Step title="项目信息"  />
          <Step title="融资情况"  />
          <Step title="完成"  />
        </Steps>
        {this.props.show? <div style={{padding:"0 44px"}} >
          <h3 style={{fontSize:"14px",fontWeight:"500",marginBottom:"20px"}}>在填写前，你可以先阅读以下文字：</h3>
          <p style={{lineHeight:"18px"}}>1、在表单填写过程中，如果你需要返回上一步，浏览器会保存你上一步填写的信息；</p>
          <p style={{lineHeight:"18px"}}>2、一个账号可以上传多个项目，已提交项目不支持修改；</p>
          <p style={{lineHeight:"18px"}}>3、表单填写大约需要10~15分钟；</p>
          <p style={{lineHeight:"18px",marginBottom:"44px"}}>4、我们会按需调整表单信息并优化使用体验，有疑问或补充信息你也可以发邮件到info@collinstar.com.cn 与我们取得联</p>
        </div>:""}
       
      </div>
    );
  }
}
export default Head;
