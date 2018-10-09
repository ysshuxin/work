import React, { Component } from "react";
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  message,

  Upload,
  Breadcrumb,
  Input
} from "antd";

import axios from "axios";

import Inputs from "./inputs";
const { TextArea } = Input;
let data={
  name:"暂无",
  phone:"暂无",
  mail:"暂无",
  wechat:"暂无",
  company:"暂无",
  job:"1",
  industry:"1",
  joblevel:"1",
  mark:"暂无"
}
const job = [
  "金融",
  "物联网",
  "能源",
  "公共事业",
  "人工智能",
  "物流",
  "医疗健康",
  "汽车交通",
  "企业服务",
  "社交",
  "文娱传媒",
  "硬件",
  "旅游",
  "电商",
  "房产家居",
  "消费生活",
  "教育",
  "农业",
  "VR",
  "工具",
  "无人机",
  "其他"
];

export default class Contactsinf extends Component {
  state = {
    industrydef: "金融",
    loading: false,
    imageUrl: false,
    ifedit:true
  };
 // 行业数据
 arr = [];
 // 初始化数据
 componentWillMount = () => {
   this.arr = job.map((currentValue, index) => {
     return <Menu.Item key={index}>{currentValue}</Menu.Item>;
   });
 };
  logobeforeUpload = file => {
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJPG) {
      message.error("仅支持上传.jpg/.jpeg/.png文件");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传文件最大不超过2M");
    }
    return isJPG && isLt2M;
  };
  handleMenuClick = e => {
    this.setState({
      industrydef: e.item.props.children
    });
    data.industry = e.item.props.children;
  };
  changecontact=()=>{

    let ifedit=!this.state.ifedit
      this.setState({
        ifedit:ifedit
      })   

  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );

    return (
      <div>
        <div style={{ padding: "16px 32px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/source">人脉资源</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>查看人脉</Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{ fontSize: "20px", marginTop: "16px", fontWeight: "600" }}
          >
            查看人脉
          </h3>
        </div>

        <div style={{ background: "#F0F2F5", padding: "20px" }}>
          <div style={{ background: "#fff", overflow: "hidden" }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "1px solid #E9E9E9",
                padding: "20px 32px 10px"
              }}
            >
              个人信息
            </h4>

            <div style={{ padding: "15px 32px", background: "#fff" }}>
              <div style={{ float: "left", width: "650px" }}>
                <div >
                  <Inputs defaultValue={data.name} disabled={this.state.ifedit} show={true} right="160px" name="姓名:" />
                  <Inputs defaultValue={data.phone} disabled={this.state.ifedit} show={true} name="手机:" />
                </div>
                <div >
                  <Inputs defaultValue={data.mail} disabled={this.state.ifedit}  show={true} right="160px" name="邮箱:" />
                  <Inputs defaultValue={data.wechat} disabled={this.state.ifedit} show={false} name="微信:" />
                </div>
              </div>

              <div
                style={{
                  float: "right",
                  width: "104px",
                  height: "104px",
                  marginBottom: "44px"
                }}
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.logobeforeUpload}
                  onChange={this.logohandleChange}
                  customRequest={info => {
                    this.setState({
                      imageUrl: false,
                      loading: true
                    });
                    this.setState({ loading: true });
                    let formdata = new FormData();
                    formdata.append("file", info.file);
                    axios
                      .post(
                        "http://cm.hrjykj.com:8090/index/Project/uploadProjectImage",
                        formdata
                      )
                      .then(json => {
                        this.setState({
                          imageUrl:
                            "http://cm.hrjykj.com:8090" + json.data.image_name,
                          loading: false
                        });
                        data.logo = json.data.image_name;
                        console.log(data);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}
                >
                  {this.state.imageUrl ? (
                    <img
                      style={{ width: "100%" }}
                      src={this.state.imageUrl}
                      alt="avatar"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                <p>只支持.jpg格式</p>
              </div>
            </div>
          </div>
        </div>



        <div style={{ background: "#F0F2F5", padding: "20px",paddingTop:"0"}}>
        <div style={{ background: "#fff", overflow: "hidden" }}>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              borderBottom: "1px solid #E9E9E9",
              padding: "20px 32px 10px"
            }}
          >
            工作信息
          </h4>

          <div style={{ padding: "15px 32px", background: "#fff" }}>
         
              <div>
                <Inputs  defaultValue={data.company} show={true} disabled={this.state.ifedit} right="160px" name="所在公司:" />
                <div
                id="job"
                style={{ marginTop: "10px", marginBottom: "10px" ,display:"inline-block"}}
              >
                <span style={{ color: "red" }}>*</span>
                <span
                  style={{
                   
                    fontSize: "14px",
                    display: "inline-block",
                    width: "68px"
                  }}
                >

                  岗位:
                </span>
                <Dropdown
                disabled={this.state.ifedit}
                  trigger={["click"]}
                  overlay={
                    <Menu
                      style={{
                        height: "200px",
                        background: "#fff",
                        overflowY: "scroll"
                        
                      }}
                      onClick={this.handleMenuClick}
                    >
                      {this.arr}
                    </Menu>
                  }
                >
                  <Button
                    style={this.state.ifedit?{ width: "160px", height: "30px", textAlign: "left" ,background:"#fff",border:"none"}:{ width: "160px", height: "30px", textAlign: "left" ,background:"#fff"}}
                  >
                    {this.state.industrydef}
                    <Icon
                    hidden={this.state.ifedit}
                      style={{ position: "absolute", right: "8px", top: "10px" }}
                      type="down"
                    />
                  </Button>
                </Dropdown>
              </div>
              </div>
              <div>
              <div
              id="industry"
              style={{ marginTop: "10px", marginBottom: "10px" ,display:"inline-block",marginRight:"160px"}}
            >
              <span style={{ color: "red" }}>*</span>
              <span
                style={{
                
                  fontSize: "14px",
                  display: "inline-block",
                  width: "68px"
                }}
              >
                所属行业:
              </span>
              <Dropdown
              disabled={this.state.ifedit}
                trigger={["click"]}
                overlay={
                  <Menu
                    style={{
                      height: "200px",
                      background: "#fff",
                      overflowY: "scroll"
                    }}
                    onClick={this.handleMenuClick}
                  >
                    {this.arr}
                  </Menu>
                }
              >
                <Button
                style={this.state.ifedit?{ width: "160px", height: "30px", textAlign: "left" ,background:"#fff",border:"none"}:{ width: "160px", height: "30px", textAlign: "left" ,background:"#fff"}}
                >
                  {this.state.industrydef}
                  <Icon
                  hidden={this.state.ifedit}
                    style={{ position: "absolute", right: "8px", top: "10px" }}
                    type="down"
                  />
                </Button>
              </Dropdown>
            </div>
            <div
            id="joblevel"
            style={{ marginTop: "10px", marginBottom: "10px",display:"inline-block" }}
          >
            <span style={{ color: "red" }}>*</span>
            <span
              style={{
               
                fontSize: "14px",
                display: "inline-block",
                width: "68px"
              }}
            >
              职级:
            </span>
            <Dropdown
            disabled={this.state.ifedit}
              trigger={["click"]}
              overlay={
                <Menu
                  style={{
                    height: "200px",
                    background: "#fff",
                    overflowY: "scroll"
                  }}
                  onClick={this.handleMenuClick}
                >
                  {this.arr}
                </Menu>
              }
            >
              <Button
              style={this.state.ifedit?{ width: "160px", height: "30px", textAlign: "left" ,background:"#fff",border:"none"}:{ width: "160px", height: "30px", textAlign: "left" ,background:"#fff"}}
              >
                {this.state.industrydef}
                <Icon
                hidden={this.state.ifedit}
                  style={{ position: "absolute", right: "8px", top: "10px" }}
                  type="down"
                />
              </Button>
            </Dropdown>
          </div>
              </div>
              <div
              id="joblevel"
              style={{ marginTop: "10px", marginBottom: "10px",display:"inline-block" }}
            >
              <span style={{ color: "red",verticalAlign:"top" }}>*</span>
              <span
                style={{
                 verticalAlign:"top",
                  fontSize: "14px",
                  display: "inline-block",
                  width: "62px"
                }}
              >
             备注:
              </span>
              <TextArea disabled={this.state.ifedit} defaultValue={data.mark} style={this.state.ifedit?{width:"787px",height:"130px",background:"#fff",border:"none",resize:"none"}:{width:"787px",height:"130px",background:"#fff",resize:"none"}}></TextArea>
            </div>
            <Button
            onClick={this.changecontact}
            style={{
              width: "110px",
              height: "35px",
              lineHeight: "35px",
              display:"block",
              margin:"30px auto",
              background: "#004FFF",
              color: "#fff",
              borderRadius: "100px",
              border: "none"
            }}
            type="primary"
          >
           {this.state.ifedit?'修改信息':"保存修改"} 
          </Button>
          </div>
        </div>
      </div>

      </div>
    );
  }
}
