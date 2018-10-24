import React, { Component } from "react";
import {
  Input,
  message,
  Breadcrumb,
  Icon,
  Popover,
  Select,
  Checkbox,
  Button,
  Upload
} from "antd";
import axios from "axios";
import "./datails.css";
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

const plainOptions = [
  { label: "项目孵化", value: "项目孵化" },
  { label: "Token融资", value: "Token融资" },
  { label: "股权融资", value: "股权融资" }
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

class MyTag extends Component {
  state = { checked: true };

  handleChange = () => {
    let fig = this.state.checked; 
    this.props.callBack(fig)
    console.log(this.props.num)
    if(this.props.num>=4){
      
      alert("最多选择5个")
      return
    } 
    
    this.setState({ checked: !fig });
  };
  render() {
    return (
      <span
        onClick={this.props.noChecked ? "" : this.handleChange}
        style={{
          display: "inline-block",
          background: "#F5F5F5",
          border: this.state.checked
            ? "1px solid #D9D9D9"
            : "1px solid #1890FF",
          color: "rgba(0,0,0,0.65)",
          fontSize: "12px",
          padding: "1px 8px",
          borderRadius: "4px",
          margin: "4px 7px"
        }}
      >
        {this.props.name}
      </span>
    );
  }
}

export default class Datails extends Component {
  state = {
    disabled: true,
    style: true,
    requirement: this.props.projectinf.requirement
      ? this.props.projectinf.requirement
      : "暂无",
    projectinf: this.props.projectinf,
    loading: false,
    imageUrl: "",
    imgpath: "",
    tagvisible:false,
    tagArr:[],
    num:0
  };
  onChangeneed = checkedValues => {
    let value = checkedValues.join(",");
    this.setState({
      requirement: value
    });
  };

  obj = e => {
    data.industry = e + 1;
  };

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

      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=1",
          {
            project_id: localStorage.projectidnow,
            token: localStorage.backtoken,
            project_name: data.project_name,
            project_company: data.project_company,
            foundle: data.foundle,
            industry: data.industry,
            official_website: data.official_website,
            requirement: data.requirement,
            logo: this.state.imgpath
              ? this.state.imgpath
              : this.state.projectinf.logo
          }
        )
        .then(json => {
          if (json.data.code === 1001) {
            message.success("修改成功", [1]);
          } else {
            message.error("修改失败", [1]);
          }
        })
        .catch(err => {
          message.error("修改失败", [1]);
        });
    }
  };
   
  showTag = () => {
    let fig = this.state.tagvisible
    let tagArr=[]
    if(fig===false){
      for (let index = 0; index <15; index++) {
        tagArr.push(<MyTag num={this.num} key={index} callBack={this.tagNum} name="标签22" />)
      }
    }
    this.setState({
      tagvisible:!fig,
      tagArr:tagArr
    })
  };
  addTag=()=>{
    let fig = this.state.tagvisible
    let tagArr=[]
    if(fig===false){
      for (let index = 0; index <15; index++) {
        tagArr.push(<MyTag num={this.num} key={index} callBack={this.tagNum} name="标签22" />)
      }
    }
    this.setState({
      tagvisible:!fig,
      tagArr:tagArr
    })
  }
 num=0
  tagNum=(fig)=>{
    if(fig===true){
    this.num++
    }else{
     this.num--
    }
   this.setState({
     num:this.num
   })
  }
  render() {
    const uploadButton = (
      <div>
        <Icon
          style={
            !this.state.loading ? { fontSize: "30px" } : { fontSize: "30px" }
          }
          type={this.state.loading ? "loading" : "plus"}
        />
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
              overflow: "hidden"
            }}
          >
            {this.state.disabled ? (
              <img
                src={"http://cm.hrjykj.com:8090" + this.state.projectinf.logo}
                alt=""
                style={{ width: "100%" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
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
                          loading: false,
                          imgpath: json.data.image_name
                        });
                        this.props.logo(json.data.image_name);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {this.state.imageUrl ? (
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src={this.state.imageUrl}
                      alt="avatar"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            )}
          </div>
          <div style={{ float: "left", marginTop: "16px", marginLeft: "34px" }}>
            <div style={{ overflow: "hidden" }}>
              <span
                style={
                  this.state.disabled
                    ? { display: "none" }
                    : {
                        display: "inline-block",
                        float: "left",
                        marginTop: "6px",
                        marginLeft: "11px"
                      }
                }
              >
                项目名称：
              </span>
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
              <InputGroup
                className={this.state.disabled ? "input show" : "input"}
                disabled={this.state.disabled}
              >
                <Select
                  onChange={this.obj}
                  disabled={this.state.disabled}
                  style={{ width: "160px", height: "32px", padding: "4px 0" }}
                  defaultValue={job[this.state.projectinf.industry - 1]}
                >
                  {joblist}
                </Select>
              </InputGroup>
            </div>
            <div style={{ marginTop: "10px", overflow: "hidden" }}>
              <div style={{ display: "inline-block" }}>
                <span
                  style={
                    this.state.disabled
                      ? { display: "none" }
                      : {
                          display: "inline-block",
                          float: "left",
                          marginTop: "6px",
                          marginLeft: "11px"
                        }
                  }
                >
                  公司名称：
                </span>
                <Input
                  id="project_company"
                  className={this.state.style ? "input" : "input  inputshow"}
                  defaultValue={this.state.projectinf.project_company}
                  disabled={this.state.disabled}
                  style={{ display: "inner-block" }}
                />
              </div>
              <div style={{ display: "inline-block" }}>
                <span
                  style={
                    this.state.disabled
                      ? { display: "none" }
                      : {
                          display: "inline-block",
                          float: "left",
                          marginTop: "6px"
                        }
                  }
                >
                  创始人：
                </span>
                <Input
                  id="foundle"
                  className={this.state.style ? "input" : "input  inputshow"}
                  defaultValue={this.state.projectinf.foundle}
                  disabled={this.state.disabled}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  marginTop: "6px"
                }}
              >
                <span
                  style={
                    this.state.disabled
                      ? { display: "none" }
                      : {
                          display: "inline-block",
                          float: "left",
                          marginTop: "6px"
                        }
                  }
                >
                  公司网址：
                </span>
                {!this.state.disabled ? (
                  <Input
                    id="official_website"
                    className={this.state.style ? "input" : "input   inputshow"}
                    defaultValue={this.state.projectinf.official_website}
                    disabled={this.state.disabled}
                  />
                ) : (
                  <a
                    style={{ color: "rgb(24, 144, 255)" }}
                    target="_back"
                    href={"http://" + this.state.projectinf.official_website}
                  >
                    {this.state.projectinf.official_website}
                  </a>
                )}
              </div>
            </div>
            <div style={{ marginTop: "10px", overflow: "hidden" }}>
              <span
                style={{
                  marginRight: "20px",
                  fontSize: "14px",
                  marginLeft: "11px",
                  color: "#000"
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
              <span
                style={{ color: "#000" }}
                className={this.state.disabled ? "" : "hidden"}
              >
                {this.state.requirement}
              </span>
            </div>

            <div style={{ paddingLeft: "11px", marginTop: "15px" }}>
              <span
                style={{
                  background: "#F5F5F5",
                  border: "1px solid #D9D9D9",
                  color: "rgba(0,0,0,0.65)",
                  fontSize: "12px",
                  padding: "1px 8px",
                  borderRadius: "4px",
                  margin: "0 7px"
                }}
              >
                标签
                {this.state.disabled ? "" : " ×"}{" "}
              </span>
                <Popover
                  style={{ width: "295px", height: "218px",padding:"0"}}
                  placement="bottomLeft"
                  visible={this.state.tagvisible}
                  content={
                    <div
                      style={{
                        width: "480px",
                        boxShadow: "#ddd 0px 0px 20px 0px"
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(0,0,0,0.1)",
                          padding: "15px 24px"
                        }}
                      >
                        添加标签
                      </h3>
                      <div style={{ padding: "15px 24px" }}>
                        <div
                          style={{
                            paddingBottom: "11px",
                            borderBottom: "1px dashed rgba(0,0,0,0.15)",
                            fontsize: "14px"
                          }}
                        >
                          当前标签:
                          <MyTag noChecked={true} name="标签1" />
                        </div>
                        <div style={{ paddingTop: "12px" }}>
                          <h4 style={{ fontsize: "14px" }}>一级标签</h4>
                          {this.state.tagArr}
                        </div>
                        <div style={{ paddingTop: "12px" }}>
                          <h4 style={{ fontsize: "14px" }}>一级标签</h4>
                          {this.state.tagArr}
                        </div>{" "}
                        <div style={{ paddingTop: "12px" }}>
                          <h4 style={{ fontsize: "14px" }}>一级标签</h4>
                          {this.state.tagArr}
                        </div>
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                          borderTop: "1px solid rgba(0,0,0,0.09)",
                          paddingBottom: "10px"
                        }}
                      >
                        <Button
                          onClick={this.showTag}
                          style={{
                            width: "65px",
                            height: "32px",
                            textAlign: "center",
                            fontSize: "14px",
                            background: "#fff",
                            color: "#000",
                            padding: "0",
                            marginRight: "24px",
                            marginTop: "8px",
                            lineHeight: "32px"
                          }}
                          type="primary"
                        >
                          取消
                        </Button>
                        <Button
                          onClick={this.addTag}
                          style={{
                            width: "64px",
                            height: "32px",
                            textAlign: "center",
                            fontSize: "14px",
                            padding: "0",
                            marginTop: "8px",
                            lineHeight: "32px",
                            marginRight: "16px"
                          }}
                          type="primary"
                        >
                          确认
                        </Button>
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <span
                  onClick={this.showTag}
                    style={{
                      background: "#fff",
                      border: "1px dashed #D9D9D9",
                      color: "rgba(0,0,0,0.65)",
                      fontSize: "12px",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      margin: "0 7px"
                    }}
                  >
                    + 标签
                  </span>
                </Popover>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
