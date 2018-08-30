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
        <p style={{textAlign:"center"}}>{this.props.text}</p>
        <Steps style={{margin:"10px 0 40px 0"}} current={this.props.step} >
          <Step title="基本信息"  />
          <Step title="项目信息"  />
          <Step title="融资情况"  />
          <Step title="完成"  />
        </Steps>
      </div>
    );
  }
}
export default Head;
