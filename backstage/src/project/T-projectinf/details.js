import React, { Component } from "react";
import {
  Tabs,
  Input,
  message,
  Breadcrumb,
  Icon,
  Select,
  Checkbox,
  Upload,
  Modal,
} from "antd";
import axios from "axios";
import link from 'react-router-dom'
import "./datails.css";
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Dragger = Upload.Dragger;
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
const Option = Select.Option;
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
let joblist = [];
for (let i = 0; i < job.length; i++) {
  joblist.push(
    <Option key={i} style={{ height: "32px" }} value={i}>
      {job[i]}
    </Option>
  );
}
function beforeUpload(file) {
  const isJPG =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJPG) {
    message.error("仅支持上传jpg,jpeg,png文件");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("文件最大为2M");
  }
  return isJPG && isLt2M;
}
let imgpast = "";


const plainOptions = [
  { label: "项目孵化", value: "项目孵化" + " " },
  { label: "Token融资", value: "Token融资" + " " },
  { label: "股权融资", value: "股权融资" + " " }
];

const data = {
  project_name: "",
  project_company: "",
  foundle: "",
  industry: "",
  official_website: "",
  requirement: "",
  logo: "",
  logofile: ""
};
export default class Datails extends Component {
  state = {
    disabled: true,
    style: true,
    requirement: this.props.projectinf.requirement?this.props.projectinf.requirement:"暂无",
    projectinf: this.props.projectinf,
    loading:false,
    imageUrl:"",
    imgpath:""
  };
  onChangeneed = checkedValues => {
    
    let value=checkedValues.join(",")
    this.setState({
      requirement: value
    });

    console.log(checkedValues)
  };

  obj = e => {
    data.industry = e+1;
  };
  success() {
    const modal = Modal.success({
      title: "保存成功",
      okText: "关闭"
    });
  }
  error() {
    const modal = Modal.error({
      title: "保存失败",
      okText: "关闭"
    });
  }
  
  logo = info => {
    if (info.fileList.length > 1) {
      alert("最多上传1个文件");
      info.fileList.splice(1, 1);
      return false;
    }
    let name = info.file.name.substring(info.file.name.length - 4);
    let re = new RegExp(name, "i");
    if (!re.test(".jpg.jpeg.png")) {
      alert("只能上传jpg,jpeg,png文件");
      info.fileList.splice(info.fileList.length - 1, 1);
      return;
    }
    data.logofile = info.file;
  };
  changedisabled = e => {
    this.setState({
      disabled: !this.state.disabled,
      style: !this.state.disabled
    });

    if (!this.state.disabled) {
      data.project_name = document.getElementById("project_name").value;
      data.project_company = document.getElementById("project_company").value;
      data.foundle = document.getElementById("foundle").value;
      data.requirement = this.state.requirement;
      data.official_website = document.getElementById("official_website").value;
      let formdata = new FormData();
      formdata.append("file", data.logofile);
      var success = function() {
        const modal = Modal.success({
          title: "保存成功",
          okText: "关闭"
        });
      };
      var error = function() {
        const modal = Modal.error({
          title: "保存失败",
          okText: "关闭"
        });
};
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=1",
          {
            project_id: localStorage.projectidnow,
            token: localStorage.backtoken,
            // istart:1,
            project_name: data.project_name,
            project_company: data.project_company,
            // token_symbol:"",
            // book_file:"",
            // start:1,
            foundle: data.foundle,
            industry: data.industry,
            official_website: data.official_website,
            requirement: data.requirement,
            // refer_name:"",
            // refer_introduce:"",
            logo: this.state.imgpath
          }
        )
        .then(json => {
          console.log(json);
          if ((json.data.code = "1001")) {
            if(json.data.msg = "参数错误")
            message.error("参数错误",[1]);
            else{
              message.success("保存成功",[1]);
            }
          } else {
            error();
          }
        })
        .catch(err => {
          console.log(err);
          message.error("保存失败",[1]);
        });
    }
  };
  render() {
    const uploadButton = (
      <div>
        <Icon style={!this.state.loading ? {fontSize:"30px"} : {fontSize:"30px"}} type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    );
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          borderBottom: "1px solid rgba(0,0,0,0.10)",
          padding: "24px 48px",
          overflow: "hidden"
        }}
      >
        <div
          id="edit"
          onClick={this.changedisabled}
          style={{
            position: "absolute",
            right: "24px",
            top: "24px",
            fontSize: "14px",
            color: "#1890FF"
          }}
        >
          [{this.state.disabled ? "编辑" : "保存"}]
        </div>

        <Breadcrumb>
          <Breadcrumb.Item href="#/site/project/projects">
        
            <Icon type="folder-open" />
            <span>项目库</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="file-text" />
            项目详情
          </Breadcrumb.Item>
        </Breadcrumb>

        <div>
          <div
            style={{
              float: "left",
              width: "60px",
              height: "60px",
              marginTop: "26px",
              overflow:"hidden"
            }}
          >
            {this.state.disabled ? (
              <img
                src={"http://cm.hrjykj.com:8090" + this.state.projectinf.logo}
                style={{ width: "100%" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
              <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={(info)=>{
                this.setState({
                  imageUrl:false,
                  loading: true,
                })
                this.setState({ loading: true });
                let formdata=new FormData()
                formdata.append("file",info.file)
                axios.post("http://cm.hrjykj.com:8090/index/Project/uploadProjectImage",formdata)  
                .then((json)=>{
                  this.setState({
                    imageUrl:"http://cm.hrjykj.com:8090"+json.data.image_name,
                    loading: false,
                    imgpath:json.data.image_name
                  })
                  this.props.logo(json.data.image_name)
                  })
                  .catch((err)=>{
                    console.log(err)
                  })
              }}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {this.state.imageUrl ? <img style={{width:"30px",height:"30px"}} src={this.state.imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
              </div>
            )}
          </div>
          <div style={{ float: "left", marginTop: "16px", marginLeft: "34px" }}>
            <div style={{ overflow: "hidden" }}>
            <span style={this.state.disabled?{display:"none"}:{display:"inline-block",float:"left",marginTop:"6px",marginLeft:"11px"}}>项目名称：</span>
              <Input
                id="project_name"
                className={
                  this.state.style
                    ? "input fontsize22"
                    : "input fontsize22 inputshow"
                }
                defaultValue={this.state.projectinf.project_name}
                disabled={this.state.disabled}
              />
              
              <InputGroup  className={this.state.disabled?"input show":"input"} disabled={this.state.disabled}>
                <Select
                  onChange={this.obj}
                  disabled={this.state.disabled}
                  style={{ width: "160px", height: "32px", padding: "4px 0" }}
                  defaultValue={job[this.state.projectinf.industry-1]}
                >
                  {joblist}
                </Select>
              </InputGroup>
            </div>
            <div style={{ marginTop: "10px", overflow: "hidden" }}>
            <div style={{display:"inline-block"}}>
            <span style={this.state.disabled?{display:"none"}:{display:"inline-block",float:"left",marginTop:"6px",marginLeft:"11px"}}>公司名称：</span>
              <Input
                id="project_company"
                className={this.state.style ? "input" : "input  inputshow"}
                defaultValue={this.state.projectinf.project_company}
                disabled={this.state.disabled}
                style={{display:"inner-block"}}
              />
              </div>
              <div style={{display:"inline-block"}}>
              <span style={this.state.disabled?{display:"none"}:{display:"inline-block",float:"left",marginTop:"6px"}}>创始人：</span>
             <Input
                id="foundle"
                className={this.state.style ? "input" : "input  inputshow"}
                defaultValue={this.state.projectinf.foundle}
                disabled={this.state.disabled}
              />
              </div>
              <div style={{display:"inline-block",verticalAlign: "top",
              marginTop: "6px"}}>
              <span style={this.state.disabled?{display:"none"}:{display:"inline-block",float:"left",marginTop:"6px"}}>公司网址：</span>
              {!this.state.disabled? <Input
                id="official_website"
                className={this.state.style ? "input" : "input   inputshow"}
                defaultValue={this.state.projectinf.official_website}
                disabled={this.state.disabled}
              />:
            <a style={{color:"rgb(24, 144, 255)"}} target="_back"  href={"http://"+this.state.projectinf.official_website}>{this.state.projectinf.official_website}</a>}
              
              </div>
            </div>
            <div style={{ marginTop: "10px", overflow: "hidden" }}>
              <span
                style={{
                  marginRight: "20px",
                  fontSize: "14px",
                  marginLeft: "11px",
                  color:"#000"
                }}
              >
                项目需求
              </span>
              <CheckboxGroup
                className={this.state.disabled ? "hidden" : ""}
                id="need"
                options={plainOptions}
                onChange={this.onChangeneed}
                style={{ fontSize: "14px" }}
              />
              <span style={{color:"#000"}} className={this.state.disabled ? "" : "hidden"}>
                {this.state.requirement}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
