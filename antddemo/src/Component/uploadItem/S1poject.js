import React, { Component } from "react";
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader ,Checkbox, Icon, Upload, message } from 'antd';
import Inputs from "./Inputs";
import Redicon from './Redicon'
const Dragger = Upload.Dragger;
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
const Option = Select.Option;

const plainOptions = ["项目孵化", "Token融资", "股权融资"];
const job=[
  '金融','物联网','能源','公共事业','人工智能','物流','医疗健康','汽车交通','企业服务','社交','文娱传媒','硬件','旅游','电商','房产家居','消费生活','教育','农业','VR',
  '工具','无人机','其他'
]
let joblist=[]
for(let i=0;i<job.length;i++){
  joblist.push(<Option key={i} style={{height:"40px"}} value={job[i]}>{job[i]}</Option>)
}

const props = {
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  beforeUpload: function() {
    return false;
  }
};

const props2 = {  
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  beforeUpload: function() {
    return false;
  }
  
};


class S1poject extends Component {
  onChangefile=(info)=>{
    if (info.fileList.length > 5) {
      alert("最多上传5个文件");
      info.fileList.splice(5, 1);
      return false;
    }
    let name = info.file.name.substring(info.file.name.length - 4);
    let re = new RegExp(name, "i");
    if (!re.test(".pdf.jpg.jpeg.png")) {
      alert("只能上传pdf,jpg,jpeg,png文件");
      info.fileList.splice(info.fileList.length - 1, 1);
    }
     this.props.file(info.fileList)

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
    }


    this.props.logo(info.fileList)
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

  onChange=(checkedValues)=>{
    this.props.change(checkedValues)
  }
  jobchange=(value)=>{
    this.props.jobchange(value)
  }
  render() {
    return (
      <div>
        <h3 style={{ fontWeight: "600", fontSize: "20px" }}>项目简要信息</h3>
        <Inputs
          titlewidth="80px"
          id="objectname"
          text="项目名称"
          width="160px"
          right="240px"
          red={true} 
        />
        <Inputs
          titlewidth="80px"
          id="companyname"
          text="公司名称"
          width="240px"
          right=""
          red={true} 
        />
        <Inputs
          titlewidth="80px"
          id="originator"
          text="创始人"
          width="160px"
          right="240px"
          red={true} 
        />
        <div style={{display:'inline-block'}}>
          <span style={{display:'inline-block',marginRight: '10px',
          width:'80px',
          fontSize:'16px'}}><Redicon>*</Redicon>所属行业</span> 
          <InputGroup  style={{display:'inline-block',width:"160px",height:"40px"}} size="large ">
          <Select onChange={this.jobchange} id="industry" style={{width:"160px",height:"40px",padding:"4px 0"}} size="large" defaultValue="金融">
          {joblist}
          </Select>
        </InputGroup>
        </div>
       
       <div>
       <Inputs
          titlewidth="80px"
          id="officialwebsite"
          text="官网"
          width="240px"
          right="240px"
          red={true} 
        />
        <Inputs
          titlewidth="80px"
          id="token"
          text="代币符号"
          width="160px"
          right="240px"
          red={false} 
        />
       </div>
        
        <div style={{ display: "inline-block" ,marginTop:"10px",marginBottom:"10px"}}>
          <span style={{ marginRight: "20px", fontSize: "16px" }}>
            <Redicon></Redicon> 您的需求
          </span>
          <CheckboxGroup
            id="need"
            options={plainOptions}
            defaultValue={[]}
            onChange={this.onChange}
          />
        </div>
        <div style={{marginBottom:"20px",marginTop:"10px"}}>
          <div style={{ display: "inline-block"}}>
            <div
              style={{
               
                display: "inline-block",
                verticalAlign: "top"
               
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginRight: "20px",
                  marginBottom: "20px",
                  fontSize:"16px"
                }}
              >
                <Redicon></Redicon> 白皮书/商业计划书
              </span>
              <div style={{ marginLeft:"96px", width: "306px",  
              height:""}}>  <Dragger onChange={this.onChangefile}  {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖动文件</p>
                <p className="ant-upload-hint">只能上传pdf,jpg,jpeg,png文件</p>
                <p className="ant-upload-hint">最多上传5份文件</p>
              </Dragger>
              </div>
            
            </div>
          </div>

          <div style={{ display: "inline-block",marginLeft:"100px"}}>
            <div
              style={{
               
                display: "inline-block",
                verticalAlign: "top"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginRight: "20px",
                  marginBottom: "20px",
                  fontSize:"16px"
                }}
              >
              <Redicon></Redicon>Logo
              </span>
              <div style={{ width: "100px",
              height: "100px",marginLeft:"50px"}} ><Dragger onChange={this.logo} {...props2}>
                <p
                  style={{ marginBottom: "6px" }}
                  className="ant-upload-drag-icon"
                >
                  <Icon type="plus" />
                </p>
                <p className="ant-upload-text">上传照片</p>
                <p className="ant-upload-hint" />
              </Dragger></div>
              
            </div>
          </div>
          </div>
    
          <Inputs
            titlewidth="80px"
            id="referrer"
            text="推荐人"
            width="160px"
            right="240px"
          />
          <Inputs
            titlewidth="80px"
            id="suggestjob"
            text="推荐人简介"
            width="200px"
          />
        </div>
 
    );
  }
}
export default S1poject;