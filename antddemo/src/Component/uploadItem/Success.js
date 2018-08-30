import React, { Component } from "react";
import {Icon} from 'antd'

class Success extends Component {
 
  render() {
    return (
      <div style={{lineHeight:"10px",textAlign:"center",marginTop:"160px"}}>
        <Icon style={{fontSize:"154px"}} type="check-circle" />
        <p style={{marginTop:"60px",fontSize:"30px"}}>表单提交成功</p><br/>
        <p style={{fontSize:"24px"}}>我们会认真评估并可能与您取得联系</p>
        <p style={{fontSize:"24px"}}>有任何疑问可发送邮件至：</p>
        <p style={{fontSize:"24px"}}>progect@collinstar.com.cn</p>
      </div>
    );
  }
}
export default Success;
