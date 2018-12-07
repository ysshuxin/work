import React, { Component } from "react";
import {
  Menu,
  Spin,
  Select,
  Button,
  Icon,
  message,
  Checkbox,
  Upload,
  Breadcrumb
} from "antd";
import Inputs from "./inputs";
import "./uploading.css";
import axios from "axios";
import qs from 'qs'
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
const Option = Select.Option;
// 行业数据

// 需求数据
const need = [
  { label: "投行服务", value: "投行服务" },
  { label: "Token融资", value: "Token融资" },
  { label: "股权融资", value: "股权融资" }
];
// 上传数据
let updata = {
  name: "",
  project_company: "",
  company_name: "",
  foundle: "",
  industry_id:24,
  website: "",
  requirements: "",
  token_symbol: "",
  logo: "",
  white_book: [],
  refer_name:"",
  refer_introduce:""
};

let book_file_list=[]
export default class Uploadingproject extends Component {
  state = {
    industrydef: "金融",
    loading: false,
    imageUrl: false,
    industryData: [{}],
    defaultIndustryData:{},
  globleloading:false
  };

  componentDidMount = () => {
    axios
    .get("/api/industry/get")
    .then(json => {
      if (json.data.code === 0) {
        console.log(json.data.data[0])
        this.setState({
          industryData: json.data.data,
          defaultIndustryData:json.data.data[0]
        });
      }
    })
    .catch(err => {});
  };
  // 需求改变
  needonChange = checkedValues => {
    updata.requirements = checkedValues.join(",");
  };
  industryDataChange = value => {
    updata.industry_id = value.key
    console.log(updata)
  };
 
  //   图片上传
 
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


  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
    if (!isJPG) {
      message.error("图片格式错误", [1]);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片最大为2M");
    }
    return isJPG && isLt2M;
  };
  uploadimg = info => {
    this.setState({
      loading: true
    });
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        updata.logo = json.data.data.file_url;
        this.setState({
          imageUrl:  json.data.data.file_url,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };



  filechange = info => {
    if (info.fileList.length > 5) {
      message.error("最多上传5个文件");
      info.fileList.splice(5, 1);
      return false;
    }
    const isfile =
      info.file.type === "image/jpeg" ||
      info.file.type === "image/jpg" ||
      info.file.type === "application/pdf"||
      info.file.type === "image/png";

    if (!isfile) {
      info.fileList.splice(info.fileList.length - 1, 1);
      console.log(info);
      message.error("仅支持上传.jpg/.jpeg/.png/.pdf文件");
      return false;
    }
   console.log(info);
   book_file_list = info.fileList
  };

  //   上传
  uploading = () => {
    updata.white_book = [];
    updata.name = document.getElementById("project_name").value;
    updata.company_name = document.getElementById("project_company").value;
    updata.foundle = document.getElementById("foundle").value;
    updata.refer_name = document.getElementById("refer_name").value;
    updata.token_symbol = document.getElementById("token_symbol").value;
    updata.website = document.getElementById("official_website").value;
    updata.refer_introduce = document.getElementById("refer_introduce").value;
    let test = () => {
      for (const key in updata) {
        if (updata.hasOwnProperty(key)) {
          if (
            key === "project_name" ||
            key === "industry" ||
            key === "token_symbol"
          ) {
            if (
              updata[key] === "" ||
              updata[key] === undefined ||
              updata[key] === "undefined" ||
              updata[key] === null ||
              updata[key] === "null"
            ) {
              message.error("必填项不能为空", [1]);
              return true;
            }
          } else {
             continue;
          }
        }
      }
    };
    if (test() === true) {
      return;
    }
this.setState({
  globleloading:true
})
  const hide= message.loading("正在上传", 0);
  let upFile=(book_file_list,index)=>{
  console.log(book_file_list)
  if(book_file_list.length!==0){
  const element = book_file_list[index].originFileObj;
  let formdata = new FormData();
  formdata.append("file", element);
  axios
  .post(
    "/api/upload",
    formdata,
  )
  .then((json)=>{
      index++
      console.log(json);
      
    updata.white_book.push(json.data.data.file_url); 
    if(index>=book_file_list.length){
      updata.white_book=updata.white_book.join(",")
      let data=qs.stringify(updata)
        axios
          .post("/api/project/add", data)
          .then((json)=>{
            console.log(json);
            if (json.data.code === 0) {
              hide()

              message.success("上传成功", [1], () => {
                this.props.history.push('/site/project/projects');
              });
            } else {
              hide()
              message.error("上传失败", [1], () => {});
              this.setState({
                globleloading:false
              })
            }
          })
          .catch((error)=>{
            hide()
            this.setState({
              globleloading:false
            })
            console.log("error" + error);
          });
      return
    }
  
    upFile(book_file_list,index)
  })
  .catch((err)=>{
    hide()
    this.setState({
      globleloading:false
    })
  });
  }else{
    let data=qs.stringify(updata)
    axios
      .post("/api/project/add", data)
      .then((json)=>{
        console.log(json);
        if (json.data.code === 0) {
          hide()
          message.success("上传成功", [1], () => {
            this.props.history.push('/site/project/projects');
          });
        } else {
          hide()
          message.error("上传失败", [1], () => {});
        }
      })
      .catch((error)=>{
        hide()
        console.log("error" + error);
      });
    return 
  }
}

    upFile(book_file_list,0)
  };
  render = () => {
    const props = {
      name: "file",
      multiple: true,
      action: "",
      beforeUpload: info => {
        return false;
      },
      customRequest:this.uploadingFile
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
    return (
      <Spin spinning={this.state.globleloading}>
      <div style={{ background: "#F0F2F5", padding: "20px" }}>
        <div
          style={{
            background: "#fff",
            overflow: "hidden",
            padding: "25px 46px",
          
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
          <h3
            style={{
              fontSize: "22px",
              marginBottom: "20px",
              marginTop: "20px"
            }}
          >
            项目信息
          </h3>
          <div style={{ float: "left", width: "380px", marginRight: "30%" }}>
            <Inputs
              id="project_name"
              show={true}
              name="项目名称:"
              placeholder=""
            />
            <Inputs id="foundle" show={false} name="创始人:" placeholder="" />
            <Inputs
              id="official_website"
              show={false}
              name="官网："
              placeholder=""
            />
            <Inputs
              id="token_symbol"
              show={true}
              name="代币符号:"
              placeholder=""
            />

            <div
              id="book"
              style={{
                display: "inline-block",
                marginRight: "32.8%",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <span style={{ color: "red" ,visibility:"hidden"}}>*</span>
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
                  onChange={this.filechange}
                  style={{ width: "100%", height: "100%" }}
                  {...props}
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
              show={false}
              name="公司名称:"
              placeholder=""
            />
            <div
              id="industry"
              style={{ marginTop: "10px", marginBottom: "10px" }}
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
              <Select
              onChange={this.industryDataChange}
              labelInValue={true}
              defaultValue={{
                key: 24,
                label:"游戏"
              }}
              
              style={{ width: 160, marginRight: 25 }}
            >
              {this.state.industryData.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
            </div>
            <div
              id="need"
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                height: "35px",
                lineHeight: "35px"
              }}
            >
              <span style={{ color: "red" ,visibility:"hidden"}}>*</span>
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
              <span style={{ color: "red" ,visibility:"hidden"}}>*</span>
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
              name="avatar"
              listType="picture-card"
              className="avatar-uploader yss_projectinf_uploading"
              showUploadList={false}
              customRequest={this.uploadimg}
              beforeUpload={this.beforeUpload}
            >
              {updata.logo ? (
                <img
                  style={{ width: "100%" }}
                  src={updata.logo}
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
      </Spin>
    );
  };
}
