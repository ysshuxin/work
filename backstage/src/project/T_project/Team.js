import React, { Component } from "react";
import {
  Tabs,
  Button,
  Modal,
  Select,
  DatePicker,
  message,
  Upload,
  Input,
  Radio,
  Icon,
  Checkbox
} from "antd";
import axios from "../../api/api";
import qs from "qs";
import p1 from '../../img/team/teamicon1.png'
import p2 from '../../img/team/teamicon2.png'
import p3 from '../../img/team/teamicon3.png'
import p4 from '../../img/team/teamicon4.png'
import p5 from '../../img/team/teamicon5.png'
import p6 from '../../img/team/teamicon6.png'
import p7 from '../../img/team/teamicon7.png'
import p8 from '../../img/team/teamicon8.png'
import p9 from '../../img/team/teamicon8.png'
import p10 from '../../img/team/teamicon10.png'





const TextArea = Input.TextArea
export default class Team extends Component {
  state = {
   edit:false,
   data:this.props.data
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.upfileloading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
   const data=this.state.data.introduce
   console.log(data);
      return(
           <div style={{marginTop:20}}>
           <div style={{ marginLeft: 0 }}>
           <div
            style={{
              display: "inline-block",
              width: 70,
              height: 70,
              verticalAlign: "top",
              marginRight: 15,
              float: "left"
            }}
          >
            {this.state.edit ? (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader yss_projectinf_uploading"
                showUploadList={false}
                customRequest={this.uploadimg}
                beforeUpload={this.props.beforeUpload}
              >
                {data.pic ? (
                  <img style={{ width: "100%" }} src={data.pic} alt="avatar" />
                ) : (
                  uploadButton
                )}
              </Upload>
            ) : (
              <img style={{ width: "100%", height: "100%" }} src={data.pic} />
            )}
          </div>
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
           <div>
           <div
               style={{ float: "left", width: 45, color: "rgba(0 0 0 0.45)" }}
             >
             社交平台：
             </div>
            <span></span>
           </div>
          

         </div>
           </div>
      )
  }
}

