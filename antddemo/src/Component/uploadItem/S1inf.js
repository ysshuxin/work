import React, { Component } from "react";

import Inputs from './Inputs'


class S1inf extends Component {
  render() {
    return (
      <div style={{overflow:"hidden"}}>
        <h3 style={{fontWeight:"600",fontSize:"20px"}}>项目联系人信息</h3>
        <div><Inputs red={true} titlewidth="80px" id="name" text="您的姓名" width="160px" right="114px"></Inputs>
        <Inputs red={true}  titlewidth="80px" id="job" text="职位" width="240px"></Inputs></div>
        <div> <Inputs red={true}  titlewidth="80px" id="mail" text="邮箱" width="240px" right="34px"></Inputs>
        <Inputs red={true}  titlewidth="80px" id="phone" text="手机号" width="240px" right="0"></Inputs></div>
        <Inputs red={false}  titlewidth="80px" id="wchat" text="微信号" width="160px"></Inputs>
      </div>
    );
  }
}
export default S1inf;
