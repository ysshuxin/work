import React, { Component } from "react";
import { Button, Modal, Icon, message } from "antd";
import Head from "./Head";
import { Redirect } from "react-router-dom";
import axios from "axios";
import S3inf from "./S3inf";
import Out from "../style";
import Nav from "../Nav";
import Foot from "../Foot";
import { Link } from "react-router-dom";
const headtext = "表单填写大约需要10~15分钟";

let data = {
  investplan: "",
  investprogress: "",
  project_otherinfo: ""
};
class S1index extends Component {
  state = { visible: false, up: true };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    window.location.hash = "#/project/step2";
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  next = () => {
    let textarea = document
      .getElementById("step3inf")
      .getElementsByTagName("textarea");
    let index = 0;
    let ifnull = () => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (textarea[index].value == "" || undefined || null) {
            message.error("必填项不能为空",[1],()=>{});
            return true;
          } else {
            data[key] = textarea[index].value;
          }
        }
        index++;
      }
    };
    if (ifnull() == true) {
      return;
    } else {
      axios
        .post(
          "http://cm.hrjykj.com:8090/index/Project/HomeAddProjectFinancing",
          {
            project_id: parseInt(localStorage.project_id),
            token: localStorage.token,
            investplan: data.investplan,
            investprogress: data.investprogress,
            project_otherinfo: data.project_otherinfo
          }
        )
        .then(function(json) {
          console.log(json);
          json.data.code == "1001"
            ? message.success("上传成功", [1], () => {
                window.location.hash = "#/project/step4";
                localStorage.step3=JSON.stringify(data)
              })
            : message.error("上传失败", [1], () => {
               
              });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    console.log(data);
  };
  error(title) {
    const modal = Modal.error({
      title: title,
      okText: "关闭"
    });
  }
  render() {
    if(localStorage.step3=="undefined"||localStorage.step3==undefined){
      this.defaultvalue=data
    }
    else{
      this.defaultvalue=JSON.parse(localStorage.step3) 
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
          <div style={{ width: "50%", minWidth: "1200px", margin: "0 auto" }}>
            <div id="S3index">
              <Head step={2} text={headtext} />
              <div style={Out}>
                <h3
                  style={{
                    fontWeight: "600",
                    fontSize: "24px",
                    marginTop: "15px"
                  }}
                >
                  投资相关
                </h3>
                <S3inf value={this.defaultvalue} />
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center" }}>
            <Button
              onClick={this.showModal}
              style={{
                margin: "30px 43px 0 0",
                fontSize: "16px",
                height: "40px",
                width: "100px",
                background: "#fff",
                color: "#000",
                border: "none"
              }}
              type="primary"
            >
              上一步
            </Button>

            <Button
              onClick={this.next}
              style={{
                margin: "30px 0",
                fontSize: "16px",
                height: "40px",
                width: "100px"
              }}
              type="primary"
            >
              提交
            </Button>
          </p>
        </div>
        <Foot />
        <div>
          <Modal
            title=""
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            closable={false}
            width="430px"
          >
            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              <Icon style={{ color: "#52C41A" }} type="question-circle" />{" "}
              确认要返回上一步吗?
            </p>
            <p style={{ color: "#000", opacity: "0.65" }}>
              返回上一步，当前页面信息不会被保存。
            </p>
          </Modal>
        </div>
      </div>
    );
  }
}
export default S1index;
