import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon, message, Checkbox, Upload ,Breadcrumb} from "antd";
import Inputs from "./inputs";
import "./uploading.css";
import axios from "axios";
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
  { label: "投行服务", value: "投行服务" },
  { label: "Token融资", value: "Token融资" },
  { label: "股权融资", value: "股权融资" }
];
// 上传数据
let data = {
  token: localStorage.backtoken,
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
    data.requirement = checkedValues.join(",");
    console.log(data);
  };
  handleMenuClick = e => {
    this.setState({
      industrydef: e.item.props.children
    });
    data.industry = e.item.props.children;
  };
  //   图片上传
  logohandleChange = file => {};
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
  filechange =info=>{ 
        if (info.fileList.length > 5) {
          message.error("最多上传5个文件");
          info.fileList.splice(5, 1);
          return false;
        }

        const isfile =
          info.file.type === "image/jpeg" ||
          info.file.type === "image/jpg" ||
          info.file.type === "image/png";

        if (!isfile) {
          info.fileList.splice(info.fileList.length - 1, 1);
          console.log(info);
          message.error("仅支持上传.jpg/.jpeg/.png/.pdf文件");
        }
        data.book_file= info.fileList;
        console.log(data)
  }
  //   上传
  uploading = () => {
    data.project_name = document.getElementById("project_name").value;
    data.project_company = document.getElementById("project_company").value;
    data.industry = document.getElementById("industry").value;
    data.refer_name = document.getElementById("refer_name").value;
    data.official_website = document.getElementById("official_website").value;
    data.refer_introduce = document.getElementById("refer_introduce").value;
    console.log(data);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key == "refer_name" || key == "refer_introduce") {
          continue;
        } else {
          if (
            data[key] == "" ||
            data[key] == undefined ||
            data[key] == "undefined" ||
            data[key] == null ||
            data[key] == "null"
          ) {
            message.error("必填项不能为空", [1]);
            break;
          }
        }
      }
    }
  };
  render = () => {
    const props = {
      name: "file",
      multiple: true,
      action: "",
      beforeUpload: info => {
        return false;
      },
    };
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
        <Breadcrumb>
          <Breadcrumb.Item href="#/site/project/projects">
            <Icon type="folder-open" />
            <span>项目库</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="file-text" />
            上传项目
          </Breadcrumb.Item>
        </Breadcrumb>
          <h3 style={{ fontSize: "22px", marginBottom: "20px" ,marginTop:"20px"}}>项目信息</h3>
          <div style={{ float: "left", width: "380px", marginRight: "30%" }}>
            <Inputs
              id="project_name"
              show={true}
              name="项目名称:"
              placeholder=""
            />
            <Inputs id="objectname" show={true} name="创始人:" placeholder="" />
            <Inputs
              id="official_website"
              show={true}
              name="官网："
              placeholder=""
            />
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
                <Dragger onChange={this.filechange} style={{ width: "100%", height: "100%" }} {...props}>
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
            <Inputs
              id="refer_name"
              show={false}
              name="推荐人:"
              placeholder=""
            />
          </div>

          <div style={{ float: "left", width: "386px" }}>
            <Inputs
              id="project_company"
              show={true}
              name="公司名称:"
              placeholder=""
            />
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
                      style={{ width: "104px", height: "104px" }}
                      src={this.state.imageUrl}
                      alt="avatar"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
            <Inputs
              id="refer_introduce"
              top="68px"
              show={false}
              name="推荐人介绍:"
              placeholder=""
            />
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
