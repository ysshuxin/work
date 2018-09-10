import React, { Component } from "react";
import {Icon} from 'antd'

class Success extends Component {
 
  render() {
    return (
      <div style={{lineHeight:"10px",textAlign:"center",marginTop:"140px"}}>
        <Icon style={{fontSize:"80px",color:"#52C41A"}} type="check-circle" />
        <p style={{marginTop:"60px",fontSize:"24px"}}>表单提交成功</p><br/>
        <p style={{fontSize:"16px",color:"#28282a"}}>可通过邮箱  info@collinstar.com.cn  与我们取得联系</p>
      </div>
    );
  }
}
export default Success;
