import React, { Component } from "react";
import Head from "./Head";
import S1inf from "./S1inf";
import S1poject from "./S1poject";
import Out from "../style";
import { Button, Modal, message } from "antd";
import Nav from "../Nav";
import Foot from "../Foot";
import axios from "axios";

const text = "表单填写大约需要10~15分钟";

let data = {
  name: "",
  job: "",
  mail: "",
  phone: "",
  wchat: "",
  project_name: "",
  token: "",
  companyname: "",
  industry: "金融",
  file: [],
  originator: "",
  logo: "",
  need: "",
  officialwebsite: "",
  referrer: "",
  suggestjob: "",
  filedata: []
};

const job=[
  '金融','物联网','能源','公共事业','人工智能','物流','医疗健康','汽车交通','企业服务','社交','文娱传媒','硬件','旅游','电商','房产家居','消费生活','教育','农业','VR',
   '工具','无人机','其他'
 ]

class S1index extends Component {
  state = {
    naxe: false
  };

  defaultvalue=localStorage.step1
  
  next = e => {
    data.file=[]
    const regphone =/^1[345789]\d{9}$/;
    const regmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    data.name = document.getElementById("name").value;
    data.job = document.getElementById("job").value;
    data.mail = document.getElementById("mail").value;
    data.phone = document.getElementById("phone").value;
    data.wchat = document.getElementById("wchat").value;
    data.project_name = document.getElementById("objectname").value;
    data.companyname = document.getElementById("companyname").value;
    data.token = document.getElementById("token").value;
    data.originator = document.getElementById("originator").value;
    data.officialwebsite = document.getElementById("officialwebsite").value;
    data.referrer = document.getElementById("referrer").value;
    data.suggestjob = document.getElementById("suggestjob").value;
    
    let test = () => {
      for (let x in data) {
        if (data[x] == undefined || data[x] == "undefined" || data[x] == "") {
          if (
            x == "wchat" ||
            x == "referrer" ||
            x == "suggestjob" ||
            x == "token" ||
            x == "file" ||
            x == "industry"
          ) {
            continue;
          }
          message.error("必填项不能为空");
          return true;
        }
      }
    };
    if (test() == true) {
      return;
    }
    if(!regphone.test(data.phone)){
      message.error("请输入正确手机号",[1]);
     return
    }
    if(!regmail.test(data.mail)){
      message.error("请输入正确邮箱",[1]);
     return
    }
    message.loading("正在上传", [3], () => {});
    for (let index = 0; index < data.filedata.length; index++) {
      const element = data.filedata[index];
      let formdata = new FormData();
      formdata.append("file", data.filedata[index]);
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/uploadProjectImage",
          formdata
        )
        .then(function(json) {
         
          data.file.push(json.data.image_name);
         
        })
        .catch(function(err) {
         
        });
    }

    setTimeout(() => {
     let index=job.indexOf(data.industry)
      axios
        .post("http://cm.hrjykj.com:8090/index/Project/AddProject", {
          token: localStorage.token,
          project_name: data.project_name,
          project_company: data.companyname,
          token_symbol: data.token,
          foundle: data.jbo,
          industry: data.industry,
          official_website: data.officialwebsite,
          requirement: data.need,
          book_file: data.file,
          logo: data.logo,
          refer_name: data.referrer,
          refer_introduce: data.suggestjob
        })
        .then(function(json) {
          console.log(json);
          if (json.data.code == "1001") {
            localStorage.project_id = json.data.data;
            localStorage.step1 = JSON.stringify(data);
            message.success("上传成功", [1], () => {
              window.location.hash = "#/project/step2";
            });
          } else {
            message.error("上传失败", [1], () => {});
          }
        })
        .catch(function(error) {
          console.log("error" + error);
        });
    }, 3000);
  };
  error(title) {
    const modal = Modal.error({
      title: title,
      okText: "关闭"
    });
  }
  change = need => {
    console.log(need)
    for (let index = 0; index < need.length; index++) {
      data.need += need[index];
    }
  };
  jobchange = value => {
    data.industry = value;
  };
  file = value => {
    data.filedata = [];
    for (let index = 0; index < value.length; index++) {
      data.filedata.push(value[index].originFileObj);
    }
    console.log(data.file);
  };
  logo = value => {
    data.logo = value;
  };
  render() {
    if(localStorage.step1=="undefined"||localStorage.step1==undefined||localStorage.step1==""){
      this.defaultvalue=data
    }
    else{
      this.defaultvalue=JSON.parse(localStorage.step1) 
    }
    return (
      <div>
        <Nav />
        <div
          style={{
            width: "100%",
            marginTop: "65px",
            overflow: "auto",
            minWidth: "1200px"
          }}
        >
          <div
            style={{ width: "50%", minWidth: "1200px", margin: "0 auto" }}
            id="S1index"
          >
            <Head show={true} step={0} />
            <div style={Out}>
              <S1inf value={this.defaultvalue} />
            </div>
            <div style={Out}>
              <S1poject
                logo={this.logo}
                jobchange={this.jobchange}
                file={this.file}
                change={this.change}
                value={this.defaultvalue}
              />
            </div>
            <p style={{ textAlign: "center" }}>
              <Button
                style={{
                  margin: "30px 0",
                  fontSize: "16px",
                  height: "40px",
                  width: "100px"
                }}
                onClick={this.next}
                type="primary"
              >
                下一步
              </Button>
            </p>
          </div>
        </div>

        <Foot />
      </div>
    );
  }
}
export default S1index;
