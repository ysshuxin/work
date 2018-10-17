import React, { Component } from "react";
import { Tabs, Input, Icon,message ,Modal} from "antd";
import Inputs from "./inputs";
import Textarea from "./textarea";

import axios from "axios";
import "./contacts.css";
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;


const text = [
  "项目简介",
  "要解决的问题/痛点",
  "技术架构/逻辑",
  "项目优势",
  "通证模型设计",
  "生态建设情况描述",
  "社区建设"
];
const needid = [
  "need_investplan",
  "need_investprogress",
  "need_project_otherinfo"
];
const projectid = [
  "project_project_introduce",
  "project_problem",
  "project_framework",
  "project_strength",
  "project_tokenmodel",
  "project_project_strategy",
  "project_project_community"
];

const financingtext = ["融资计划", "目前融资进度", "备注"];
const projectdata = {
  project_introduce: "",
  problem: "",
  framework: "",
  strength: "",
  tokenmodel: "",
  project_strategy: "",
  project_community: ""
};
const teamdata = [];

const needdata = {
  investplan: "",
  investprogress: "",
  project_otherinfo: ""
};

export default class Inf extends Component {
  state = {
    projectdisabled: true,
    teamdisabled: true,
    needdisabled: true,
    file: ["wqqwqw.jpg", "fdgfbf.pdf", "etrghth.jpg", "54545.png"],
    num: this.props.projectinf.project_detail.member.length,
    projectinf: this.props.projectinf,
    modevisible:false,
    index:0
  };
  handleOk = e => {
    let file = this.state.file;
    let index = this.state.index
    file.splice(index, 1);
    this.setState({
      file: file
    });
    this.setState({
      modevisible: false
    });
  };
  handleCancel = e => {
    this.setState({
      modevisible: false
    });
  };
  inf = [
    this.state.projectinf.project_detail.project_introduce,
    this.state.projectinf.project_detail.problem,
    this.state.projectinf.project_detail.framework,
    this.state.projectinf.project_detail.strength,
    this.state.projectinf.project_detail.tokenmodel,
    this.state.projectinf.project_detail.project_strategy,
    this.state.projectinf.project_detail.project_community
  ];
  financinginf = [
    this.state.projectinf.project_detail.investplan,
    this.state.projectinf.project_detail.investprogress,
    this.state.projectinf.project_detail.project_otherinfo
  ];
  element = [];
  financing = [];
  fileelement = [];
  numlist = [];
  projectchangedisabled = e => {
    this.setState({
      projectdisabled: !this.state.projectdisabled
    });

    if (!this.state.projectdisabled) {
      projectdata.project_introduce = document.getElementById(
        "project_project_introduce"
      ).value;
      projectdata.problem = document.getElementById("project_problem").value;
      projectdata.framework = document.getElementById(
        "project_framework"
      ).value;
      projectdata.strength = document.getElementById("project_strength").value;
      projectdata.tokenmodel = document.getElementById(
        "project_tokenmodel"
      ).value;
      projectdata.project_strategy = document.getElementById(
        "project_project_strategy"
      ).value;
      projectdata.project_community = document.getElementById(
        "project_project_community"
      ).value;
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject/?start=4",
          {
            project_id: localStorage.projectidnow,
            token: localStorage.backtoken,
            project_introduce: projectdata.project_introduce,
            problem: projectdata.problem,
            framework: projectdata.framework,
            strength: projectdata.strength,
            tokenmodel: projectdata.tokenmodel,
            project_strategy: projectdata.project_strategy,
            project_community: projectdata.project_community
          }
        )
        .then(json => {
          console.log(json);
          if (json.data.code === 1001) {
            message.success("保存成功",[1]);
          } else {
            message.error("保存失败",[1]);
          }
        })
        .catch(err => {
          console.log(err);
          message.error("保存失败",[1]);
        });
    }
  };
  teamchangedisabled = e => {
    this.setState({
      teamdisabled: !this.state.teamdisabled
    });
    if (!this.state.teamdisabled) {
      let timemembers = document.getElementsByClassName("timemembers");

      for (let index = 0; index < timemembers.length; index++) {
        teamdata.push({
          member_name: timemembers[index].getElementsByTagName("Input")[0]
            .value,
          member_position: timemembers[index].getElementsByTagName("Input")[1]
            .value,
          member_introduce: timemembers[index].getElementsByTagName(
            "textarea"
          )[0].value
        });
      }

      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=5",
          {
            project_id: localStorage.projectidnow,
            token: localStorage.backtoken,
            member: teamdata
          }
        )
        .then(json => {
          console.log(json);
          if (json.data.code === 1001) {
            message.success("保存成功",[1]);
          } else {
            message.error("保存失败",[1]);
          }
        })
        .catch(err => {
          console.log(err);
          message.error("保存失败",[1]);
        });
    }
  };
  needchangedisabled = e => {
    this.setState({
      needdisabled: !this.state.needdisabled
    });

    if (!this.state.needdisabled) {
      needdata.investplan = document.getElementById("need_investplan").value;
      needdata.investprogress = document.getElementById(
        "need_investprogress"
      ).value;
      needdata.project_otherinfo = document.getElementById(
        "need_project_otherinfo"
      ).value;
      console.log(needdata);
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=6",
          {
            project_id: localStorage.projectidnow,
            token: localStorage.backtoken,
            investplan: needdata.investplan,
            investprogress: needdata.investprogress,
            project_otherinfo: needdata.project_otherinfo
          }
        )
        .then(json => {
          console.log(json);
          if (json.data.code === 1001) {
            message.success("保存成功",[1]);
          } else {
            message.error("保存失败",[1]);
          }
        })
        .catch(err => {
          message.error("保存失败",[1]);
        });
    }
  };
  remove = (index, e) => {
    console.log(index);
    this.setState({
      modevisible:true,
      index:index
    })
  
  };
  del = (index, e) => {
    let num = this.state.num;
    num--;
    this.setState({
      num: num
    });
  };
  add = () => {
    let num = this.state.num;
    num++;
    if (num > 5) {
      alert("最多添加5位成员");
      return;
    }
    this.setState({
      num: num
    });
  };


  render() {
    
    this.element = [];
    for (let index = 0; index < text.length; index++) {
      this.element.push(
        <Textarea
          id={projectid[index]}
          key={index}
          disabled={this.state.projectdisabled}
          inf={this.inf[index]===""?"暂无":this.inf[index]}
          text={text[index]}
          padding={true}
          autosize={true}
          resize={this.state.projectdisabled?"none":""}
        />
      );
    }
    this.financing = [];
    for (let index = 0; index < financingtext.length; index++) {
      this.financing.push(
        <Textarea
          id={needid[index]}
          key={index}
          disabled={this.state.needdisabled}
          inf={this.financinginf[index]===""?"暂无":this.financinginf[index]}
          text={financingtext[index]}
          padding={true}
          resize={this.state.needdisabled?"none":""}
          
        />
      );
    }
    this.fileelement = [];
    for (let index = 0; index < this.state.file.length; index++) {
      this.fileelement.push(
        <p key={index} style={{ position: "relative" }}>
          <span>{this.state.file[index]}</span>
          <span style={{ position: "absolute", right: "120px" }}>
            <span
              onClick={this.remove.bind(this, index)}
              style={{
                color: "#1890FF",
                fontSize: "14px",
                marginRight: "30px"
              }}
            >
              删除
            </span>
            <span style={{ color: "#1890FF", fontSize: "14px" }}>下载</span>
          </span>
        </p>
      );
    }
    this.numlist = [];
    for (let index = 0; index < this.state.num; index++) {
      this.numlist.push(
        <div
          key={index}
          id={"member" + index}
          className="timemembers"
          style={{ position: "relative" }}
        >
          {index > 0 ? (
            <Icon
              onClick={this.del.bind(this, index)}
              style={
                this.state.teamdisabled?
                {
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  display:"none",
                  fontSize: "24px"
                }:
                {
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "24px"
              }}
              type="close-circle-o"
            />
          ) : (
            <div />
          )}
          <Inputs
            value={
              this.state.projectinf.project_detail.member.length > index
                ? this.state.projectinf.project_detail.member[index].member_name
                : ""
            }
            dis={this.state.teamdisabled}
            titlewidth="36px"
            id="ceoname"
            text="姓名"
            width="160px"
            right="38px"
            red="true"
          />
          <Inputs
            value={
              this.state.projectinf.project_detail.member.length > index
                ? this.state.projectinf.project_detail.member[index]
                    .member_position
                : ""
            }
            dis={this.state.teamdisabled}
            titlewidth="36px"
            id="ceojob"
            text="职位"
            width="160px"
            right="38px"
            red="true"
          />
          <div style={{ marginTop: "10px", marginBottom: "16px" }}>
            <TextArea
           
              defaultValue={
                this.state.projectinf.project_detail.member.length > index
                  ? this.state.projectinf.project_detail.member[index]
                      .member_introduce
                  : ""
              }
              disabled={this.state.teamdisabled}
              className="ceoinf"
              style={
                this.state.teamdisabled?
                {
                width: "100%",
                verticalAlign: "top",
                height: "120px",
                display: "inline-block",
                background: "#fff",
                padding:"0",
                border:"none",
                resize:"none"
              }:
             { width: "100%",
             verticalAlign: "top",
             height: "120px",
             display: "inline-block",
             background: "#fff",
             padding:"0"}
           }

            />
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          border: "20px solid  #F0F2F5",
          borderTop: "0"
        }}
      >
      <Modal
      title=""
      visible={this.state.modevisible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
      closable={false}
      width="430px"
    >
      <p style={{ fontSize: "16px", fontWeight: "600" }}>
        <Icon style={{ color: "#52C41A" }} type="question-circle" />{" "}
        确认要删除吗？
      </p>
    </Modal>
        <Tabs style={{ padding: "0 46px" }} defaultActiveKey="1">
          <TabPane tab="项目管理" key="1">
            <div
              id="edit"
              onClick={this.projectchangedisabled}
              style={{
                position: "absolute",
                right: "24px",
                top: "18px",
                fontSize: "14px",
                color: "#1890FF",
                zIndex: "100"
              }}
            >
              [{this.state.projectdisabled ? "编辑" : "保存"}]
            </div>
            {this.element}
          </TabPane>
          <TabPane tab="团队介绍" key="2">
            <div
              id="edit"
              onClick={this.teamchangedisabled}
              style={{
                position: "absolute",
                right: "24px",
                top: "18px",
                fontSize: "14px",
                color: "#1890FF",
                zIndex: "100"
              }}
            >
              [{this.state.teamdisabled ? "编辑" : "保存"}]
            </div>
            {this.numlist}
            <Icon
              onClick={this.add}
              style={
                this.state.teamdisabled?{
                  display:"none",
                margin: "40px auto",
                fontSize: "30px",
              }:{
                fontSize: "30px",
                display: "block",
                margin: "40px auto"
              }}
              type="plus-circle"
              theme="outlined"
            />
          </TabPane>

          <TabPane tab="融资需求" key="3">
            <div
              id="edit"
              onClick={this.needchangedisabled}
              style={{
                position: "absolute",
                right: "24px",
                top: "18px",
                fontSize: "14px",
                color: "#1890FF",
                zIndex: "100"
              }}
            >
              [{this.state.needdisabled ? "编辑" : "保存"}]
            </div>
            {this.financing}
          </TabPane>
          <TabPane tab="下载" key="4">
            {this.fileelement}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
