import React, { Component } from "react";
import { Breadcrumb, Input, Button, DatePicker } from "antd";
import Edit from 'wangeditor'
const TextArea=Input.TextArea
export default class Contentmanagement extends Component {
  state={
    html:"测试",
    titlenum:0,
    textareanum:0
  }
  globle={
    editor:null
  }
  componentDidMount=()=>{
   this.globle.editor = new Edit('#editor')
   this.globle.editor.customConfig.uploadImgShowBase64 = true
   this.globle.editor.customConfig.zIndex = 1
   this.globle.editor.create()
  }
  titlechange=(e)=>{
    this.setState({
      titlenum:e.target.value.length
    })
  }
  textareaChange=(e)=>{
    this.setState({
      textareanum:e.target.value.length
    })
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  author=(e)=>{
    console.log(e.target.value);
  }
  save=()=>{
    console.log( this.globle.editor.txt.html())
  }
  render = () => {
    return (
      <div>
        <div
          style={{
            padding: "16px 32px"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/web/contentlist"> 内容管理 </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item> 资讯详情 </Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{
              fontSize: "20px",
              marginTop: "16px",
              fontWeight: "600"
            }}
          >
            编辑资讯
          </h3>
        </div>
        <div
          style={{
            background: "#F0F2F5",
            padding: "20px"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px 30px"
            }}
          >
            <div style={{ position: "relative" }}>
              <span style={{ fontWeight: "600" }}> 标题： </span>
              <Input onChange={this.titlechange} suffix={<span  style={this.state.titlenum>30?{color:"red"}:{}}>{this.state.titlenum}/30</span>} style={{ width: "50%"}} />
              <div
                style={{
                  display: "inline-block",
                  position: "absolute",
                  right: "0"
                }}
              >
                <Button
                  style={{
                    width: "80px",
                    height: "32px",
                    color: "#F5222D",
                    border: "1px solid #F5222D",
                    borderRadius: "100px",
                    marginRight: "25px"
                  }}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  onClick={this.save}
                  style={{
                    width: "80px",
                    height: "32px",
                    borderRadius: "100px",
                    color: "#fff"
                  }}
                >
                  保存
                </Button>
              </div>
            </div>

            <div style={{ marginTop: "15px" }}>
              <span style={{ fontWeight: "600" }}> 时间： </span>
              <DatePicker onChange={this.onChange} />
              <span style={{ fontWeight: "600", marginLeft: "60px" }}>
               
                作者：
              </span>
              <Input onChange={this.author} style={{ width: "160px" }} />
            </div>
                <div style={{marginTop:"20px",width:"100%",overflow:"hidden"}}>
                  <span style={{float:"left",width:"46px",fontWeight:"600"}}>摘要：</span>
                  <div style={{marginLeft:"46px"}}>
                    <TextArea onChange={this.textareaChange}></TextArea>
                  </div>   
                </div>
                <p style={this.state.textareanum>80?{color:"red",textAlign:"right"}:{textAlign:"right"}}>{this.state.textareanum}/80</p>
            <div id="editor" style={{marginTop:"15px",display:""}}>

               


            </div>
          </div>
        </div>
      </div>
    );
  };
}
