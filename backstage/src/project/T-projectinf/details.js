import React, { Component } from "react";
import { Tabs, Input, Button, Breadcrumb, Icon, Select, Checkbox,Upload } from "antd";
import axios from 'axios'
import logo from "./logo.png";
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
    <Option key={i} style={{ height: "32px" }} value={job[i]}>
      {job[i]}
    </Option>
  );
}

const props2 = {  
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  beforeUpload: function() {
    return false;
  }
};

const plainOptions = [
  { label: "项目孵化", value: "项目孵化" + " " },
  { label: "Token融资", value: "Token融资" + " " },
  { label: "股权融资", value: "股权融资" + " " }
];

const data={
  project_name:"",
  project_company:"",
  foundle:"",
  industry:"",
  official_website:"",
  requirement:"",
  logo:""
}
export default class Datails extends Component {
  state = {
    disabled: true,
    style: true,
    need: "融资"
  };
  onChange = checkedValues => {
    this.setState({
      need: checkedValues
    });
  };

  obj=(e)=>{
    data.industry=e
  }

  logo=(info)=>{
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
      return
    }
    data.logo=info.file.name

    // const status = info.file.status;
    // if (status !== "uploading") {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  }
  changedisabled = e => {
    this.setState({
      disabled: !this.state.disabled,
      style: !this.state.disabled
    });

    if(!this.state.disabled){
      data.project_name=document.getElementById("project_name").value
      data.project_company=document.getElementById("project_company").value
      data.foundle=document.getElementById("foundle").value
      data.requirement=this.state.need
      data.official_website=document.getElementById("official_website").value
      console.log(data)


      axios.post("http://www.sosoapi.com/pass/mock/12182/index/Project/AddUpdateProject/start=4",{
        project_id:"1",
        token:localStorage.token,
        project_name:  data.project_name,
        project_company:  data.project_company,
        foundle:  data.foundle,
        official_website:  data.official_website,
        logo:  data.logo
      })
      .then(function(json){
        console.log(json)
        json.status=="200"?window.location.hash='#/step3':"";
      })
      .catch(function(err){
        console.log(err)
      })
      // http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=1
    }



  };
  render() {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          borderBottom: "1px solid rgba(0,0,0,0.10)",
          padding: "24px 48px"
        }}
      >
        <div
          id="edit"
          onClick={this.changedisabled}
          style={{
            position: "absolute",
            right: "24px",
            top: "24px",
            fontSize: "16px",
            color: "#1890FF"
          }}
        >
          [{this.state.disabled ? "编辑" : "保存"}]
        </div>

        <Breadcrumb>
          <Breadcrumb.Item href="">
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
              marginTop: "26px"
            }}
          >

          {this.state.disabled?<img src={logo} style={{ width: "100%" }} />: <div style={{ width: "100%",height:"100%"}} ><Dragger onChange={this.logo} {...props2}>
              <p
                style={{ marginBottom: "6px" }}
                className="ant-upload-drag-icon"
              >
                <Icon type="plus" style={{fontSize:"30px"}}/>
              </p>
            </Dragger></div>}
          </div>
          <div style={{ float: "left", marginTop: "16px", marginLeft: "34px" }}>
            <div style={{ overflow: "hidden" }}>
              <Input
              id="project_name"
                className={
                  this.state.style
                    ? "input fontsize22"
                    : "input fontsize22 inputshow"
                }
                defaultValue="以太坊"
                disabled={this.state.disabled}
              />
              <InputGroup  className="input" disabled={this.state.disabled}>
                <Select
                onChange={this.obj}
                  disabled={this.state.disabled}
                  style={{ width: "160px", height: "32px", padding: "4px 0" }}
                  defaultValue="金融"
                >
                  {joblist}
                </Select>
              </InputGroup>
            </div>
            <div style={{ marginTop: "10px", overflow: "hidden" }}>
              <Input
              id="project_company"
                className={this.state.style ? "input" : "input  inputshow"}
                defaultValue="以太坊"
                disabled={this.state.disabled}
              />
              <Input
              id="foundle"
                className={this.state.style ? "input" : "input  inputshow"}
                defaultValue="创始人xxxx"
                disabled={this.state.disabled}
              />
              <Input
              id="official_website"
                className={this.state.style ? "input" : "input   inputshow"}
                defaultValue="www.yitaifang.com"
                disabled={this.state.disabled}
              />
            </div>
            <div style={{ marginTop: "10px", overflow: "hidden" }}>
              <span
                style={{
                  marginRight: "20px",
                  fontSize: "14px",
                  marginLeft: "11px"
                }}
              >
                您的需求
              </span>
              <CheckboxGroup
                className={this.state.disabled ? "hidden" : ""}
                id="need"
                options={plainOptions}
                defaultValue={[]}
                onChange={this.onChange}
                style={{ fontSize: "14px" }}
              />
              <span
                defaultValue="融资"
                className={this.state.disabled ? "" : "hidden"}
              >
                {this.state.need}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
