import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon, message, Checkbox, Upload } from "antd";
import Inputs from "./inputs";
import "./uploading.css";
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
// 行业数据
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
// 需求数据
const need = [
  { label: "投行服务", value: "1" },
  { label: "Token融资", value: "2" },
  { label: "股权融资", value: "3" }
];
// 上传数据
let data = {
  token: "",
  project_name: "",
  project_company: "",
  industry: "金融",
  book_file: [],
  logo: "",
  requirement: "",
  official_website: "",
  refer_name: "",
  refer_introduce: ""
};
export default class Uploadingproject extends Component {
  state = {
    industrydef: "金融",
    loading: false,
    imageUrl: false
  };

  props = {
    name: "file",
    multiple: true,
    action: "//jsonplaceholder.typicode.com/posts/",
    onChange: info => {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  // 行业数据
  arr = [];
  // 初始化数据
  componentWillMount = () => {
    this.arr = job.map((currentValue, index) => {
      return <Menu.Item key={index}>{currentValue}</Menu.Item>;
    });
  };
  // 需求改变
  needonChange = checkedValues => {
    console.log("checked = ", checkedValues);
  };
  handleMenuClick = e => {
    this.setState({
      industrydef: e.item.props.children
    });
  };
  //   图片上传
  logohandleChange = info => {
   
  };
  logobeforeUpload = file => {
    const isJPG = (file.type === "image/jpeg"||file.type === "image/jpg"||file.type === "image/png");
    if (!isJPG) {
      message.error("仅支持上传.jpg/.jpeg/.png文件");
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传文件最大不超过2M");
      return
    }
 
  };
//   上传
uploading=()=>{
    data.project_name = document.getElementById("project_name").value;
    data.project_company = document.getElementById("project_company").value;
    data.industry = document.getElementById("industry").value;
    data.refer_name = document.getElementById("refer_name").value;
    data.official_website = document.getElementById("official_website").value;
    data.refer_introduce = document.getElementById("refer_introduce").value;
}
  render = () => {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div style={{ background: "#F0F2F5", padding: "20px" }}>
        <div
          style={{
            background: "#fff",
            overflow: "hidden",
            padding: "25px 46px",
            overflow: "hidden"
          }}
        >
          <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
            项目信息
          </h3>
          <div style={{ float: "left", width: "380px", marginRight: "30%" }}>
            <Inputs id="project_name" show={true} name="项目名称:" placeholder="" />
            <Inputs id="objectname" show={true} name="创始人:" placeholder="" />
            <Inputs id="official_website" show={true} name="官网：" placeholder="" />
            <div
              id="book"
              style={{
                display: "inline-block",
                marginRight: "32.8%",
                marginTop: "4px",
                marginBottom: "4px"
              }}
            >
              <span style={{ color: "red" }}>*</span>
              <span
                style={{
                  marginRight: "8px",
                  fontSize: "14px",
                  display: "inline-block",
                  width: "150px"
                }}
              >
                白皮书/商业计划书：
              </span>
              <div
                style={{
                  width: "293px",
                  height: "160px",
                  marginLeft: "95px",
                  marginTop: "8px"
                }}
              >
                <Dragger
                  style={{ width: "100%", height: "100%" }}
                  {...this.props}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                  <p className="ant-upload-hint">
                    支持扩展名：.jpeg .png .pdf .jpg
                  </p>
                </Dragger>
              </div>
            </div>
            <Inputs id="refer_name" show={false} name="推荐人:" placeholder="" />
          </div>

          <div style={{ float: "left", width: "386px" }}>
            <Inputs id="project_company" show={true} name="公司名称:" placeholder="" />
            <div
              id="industry"
              style={{ marginTop: "4px", marginBottom: "4px" }}
            >
              <span style={{ color: "red" }}>*</span>
              <span
                style={{
                  marginRight: "8px",
                  fontSize: "14px",
                  display: "inline-block",
                  width: "80px"
                }}
              >
                所属行业
              </span>
              <Dropdown
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
                  style={{ width: "160px", height: "30px", textAlign: "left" }}
                >
                  {this.state.industrydef}
                  <Icon
                    style={{ position: "absolute", right: "8px", top: "10px" }}
                    type="down"
                  />
                </Button>
              </Dropdown>
            </div>
            <div
              id="need"
              style={{
                marginTop: "4px",
                marginBottom: "4px",
                height: "35px",
                lineHeight: "35px"
              }}
            >
              <span style={{ color: "red" }}>*</span>
              <span
                style={{
                  marginRight: "8px",
                  fontSize: "14px",
                  display: "inline-block",
                  width: "80px"
                }}
              >
                项目需求
                
              </span>
              <CheckboxGroup options={need} onChange={this.needonChange} />
            </div>
            <div id="logo" style={{ marginTop: "4px" }}>
              <span style={{ color: "red" }}>*</span>
              <span
                style={{
                  marginRight: "8px",
                  fontSize: "14px",
                  display: "inline-block",
                  width: "150px"
                }}
              >
                logo：
              </span>
              <div
                style={{
                  marginTop: "8px",
                  marginLeft: "94px",
                  width: "104px",
                  height: "104px"
                }}
              >
                <Upload
                  style={{ width: "100%", height: "100%" }}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={this.logobeforeUpload}
                  onChange={this.logohandleChange}
                >
                  {this.state.imageUrl ? (
                    <img src={this.state.imageUrl} alt="avatar" />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
            <Inputs id="refer_introduce" top="68px" show={false} name="推荐人介绍:" placeholder="" />
          </div>

          <div
            style={{
              width: "100%",
              overflow: "hidden",
              textAlign: "center",
              marginTop: "22px"
            }}
          >
            <Button
              type="primary"
              style={{ width: "115px", height: "40px", marginTop: "22px" }}
              onClick={this.uploading}
            >
              上传项目
            </Button>
          </div>
        </div>
      </div>
    );
  };
}
