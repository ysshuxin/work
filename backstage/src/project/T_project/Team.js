import React, { Component } from "react";
import {
  Tabs,
  Button,
  Modal,
  Select,
  DatePicker,
  message,
  Input,
  Radio,
  Checkbox
} from "antd";
import axios from "../../api/api";
import qs from "qs";
const TextArea = Input.TextArea
export default class Team extends Component {
  state = {
   edit:false,
   data:this.props.data
  }
  render() {
   const data=this.state.data.introduce
   console.log(data);
      return(
           <div style={{marginTop:20}}>
           <div style={{ marginLeft: 85 }}>
           <div
             style={{ position: "relative", height: 34, lineHeight: "34px" }}
           >
             <span style={{ color: "rgba(0 0 0 0.45)" }}>姓名：</span>
             {this.state.edit ? (
               <Input
                 defaultValue={data.name}
                 style={{ width: 160, marginRight: 30 }}
               />
             ) : (
               <span
                 style={{
                   display: "inline-block",
                   marginRight: 30,
                   width: 160
                 }}
               >
                 {data.name}
               </span>
             )}
             <span style={{ color: "rgba(0 0 0 0.45)" }}>职位：</span>
             {this.state.edit ? (
               <Input defaultValue={data.title} style={{ width: 160 }} />
             ) : (
               <span style={{ display: "inline-block" }}>{data.title}</span>
             )}

             <div style={{ position: "absolute", right: 0, top: 0 }}>
               <span
                 onClick={this.props.del}
                 style={{ color: "#F5222D", marginRight: 15 }}
               >
                 [删除]
               </span>
               {this.state.edit ? (
                 <span onClick={this.save} style={{ color: "#004FFF" }}>
                   [保存]
                 </span>
               ) : (
                 <span onClick={this.changeEdit} style={{ color: "#004FFF" }}>
                   [编辑]
                 </span>
               )}
             </div>
           </div>
           <div style={{ marginTop: 10 }}>
             <div
               style={{ float: "left", width: 45, color: "rgba(0 0 0 0.45)" }}
             >
               简介：
             </div>
             {this.state.edit ? (
               <div style={{ marginLeft: 45 }}>
                 {" "}
                 <TextArea defaultValue={data.inf} />{" "}
               </div>
             ) : (
               <div
                 style={{
                   marginLeft: 45,
                   width: "100%",
                   display: "inline-block"
                 }}
               >
                 {data.inf}
               </div>
             )}
           </div>
         </div>
           </div>
      )
  }
}

