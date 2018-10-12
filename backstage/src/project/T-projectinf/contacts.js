import React, { Component } from "react";
import { Tabs, message } from "antd";
import Inputs from "./inputs";
import "./contacts.css";
import axios from "axios";
const TabPane = Tabs.TabPane;

const data1 = {
  project_id: localStorage.projectidnow,
  token: localStorage.backtoken,
  name: "",
  email: "",
  position: "",
  phone: "",
  wechat: ""
};
const data2 = {
  project_id: localStorage.projectidnow,
  token: localStorage.backtoken,
  refer_name: "",
  refer_introduce: ""
};
export default class Contacts extends Component {
  state = {
    disabled1: true,
    disabled2: true,
    projectinf: this.props.projectinf
  };

  changedisabled1 = e => {
    this.setState({
      disabled1: !this.state.disabled1
    });
    if (!this.state.disabled1) {
      data1.name = document.getElementById("name").value;
      data1.email = document.getElementById("email").value;
      data1.position = document.getElementById("position").value;
      data1.phone = document.getElementById("phone").value;
      data1.wechat = document.getElementById("wechat").value;
      console.log(data1);
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=3",
          data1
        )
        .then(json => {
          console.log(json);
          if (json.data.code === 1001) {
            message.success("保存成功", [1]);
          } else {
            message.error("保存失败", [1]);
          }
        })
        .catch(err => {
          console.log(err);
          message.error("保存失败", [1]);
        });
    }
  };
  changedisabled2 = e => {
    this.setState({
      disabled2: !this.state.disabled2
    });
    if (!this.state.disabled2) {
      data2.refer_name = document.getElementById("refer_name").value;
      data2.refer_introduce = document.getElementById("refer_introduce").value;
      console.log(data2);
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=8",
          data2
        )
        .then(json => {
          console.log(json);
          if (json.data.code === 1001) {
            message.success("保存成功", [1]);
          } else {
            message.error("保存失败", [1]);
          }
        })
        .catch(err => {
          console.log(err);
          message.error("保存失败", [1]);
        });
    }
  };
  render() {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          border: "20px solid  #F0F2F5"
        }}
      >
        <Tabs style={{ padding: "0 46px 10px" }} defaultActiveKey="1">
          <TabPane tab="项目联系人" key="1">
            <div
              id="edit"
              onClick={this.changedisabled1}
              style={{
                position: "absolute",
                right: "24px",
                top: "18px",
                fontSize: "14px",
                color: "#1890FF",
                zIndex: "100"
              }}
            >
              [{this.state.disabled1 ? "编辑" : "保存"}]
            </div>
            <Inputs
              value={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts.name
                  : ""
              }
              placeholder={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts
                      .name === ""
                    ? "待录入"
                    : ""
                  : "待录入"
              }
              id="name"
              dis={this.state.disabled1}
              right="200px"
              width="160px"
              text="姓名:"
            />
            <Inputs
              value={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts.email
                  : ""
              }
              placeholder={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts
                      .email === ""
                    ? "待录入"
                    : ""
                  : "待录入"
              }
              id="email"
              dis={this.state.disabled1}
              right="200px"
              width="160px"
              text="邮箱:"
            />
            <Inputs
              value={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts.wechat
                  : ""
              }
              placeholder={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts
                      .wechat === ""
                    ? "待录入"
                    : ""
                  : "待录入"
              }
              id="wechat"
              dis={this.state.disabled1}
              right=""
              width="160px"
              text="微信:"
            />
            <br />
            <Inputs
              value={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts
                      .position
                  : ""
              }
              placeholder={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts
                      .position === ""
                    ? "待录入"
                    : ""
                  : "待录入"
              }
              id="position"
              dis={this.state.disabled1}
              right="200px"
              width="160px"
              text="职位:"
            />
            <Inputs
              value={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts.phone
                  : ""
              }
              placeholder={
                this.state.projectinf.project_detail.project_contacts
                  ? this.state.projectinf.project_detail.project_contacts
                      .phone === ""
                    ? "待录入"
                    : ""
                  : "待录入"
              }
              id="phone"
              dis={this.state.disabled1}
              right="200px"
              width="160px"
              text="手机:"
            />
          </TabPane>
          <TabPane tab="推荐人介绍" key="2">
            <div
              id="edit"
              onClick={this.changedisabled2}
              style={{
                position: "absolute",
                right: "24px",
                top: "18px",
                fontSize: "14px",
                color: "#1890FF",
                zIndex: "100"
              }}
            >
              [{this.state.disabled2 ? "编辑" : "保存"}]
            </div>
            <Inputs
              id="refer_name"
              value={this.state.projectinf.refer_name}
              placeholder={
                this.state.projectinf.refer_name === "" ? "待录入" : ""
              }
              dis={this.state.disabled2}
              right="200px"
              width="160px"
              text="姓名:"
            />
            <br />
            <Inputs
              id="refer_introduce"
              value={this.state.projectinf.refer_introduce}
              placeholder={
                this.state.projectinf.refer_introduce === "" ? "待录入" : ""
              }
              dis={this.state.disabled2}
              right="200px"
              width="160px"
              text="简介:"
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
