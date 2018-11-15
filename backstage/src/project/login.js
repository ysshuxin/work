import React, { Component } from "react";
import { Tabs, Icon, Input, Button, Form, Select, message } from "antd";
import axios from "../api/api";
import logo from "../img/logo.png";
import qs from "qs";
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
// 正则
const regphone = /^1[345789]\d{9}$/;
const regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

class Login extends Component {
  state = {
    passwordType: "password",
    repasswordType: "password",
    loginData: {},
    loginError: "",
    registerData: {}
  };

  componentDidMount = () => {
    // 注册时获取图形验证码
    this.getImgcode();
  };

  // 登录

  showPassword = () => {
    let passwordType = this.state.passwordType;
    if (passwordType === "password") {
      passwordType = "";
    } else {
      passwordType = "password";
    }
    this.setState({
      passwordType: passwordType
    });
  };

  onChangeUserName = e => {
    let loginData = this.state.loginData;
    loginData.user = e.target.value;
    this.setState({ loginData: loginData });
  };
  onChangePassword = e => {
    let loginData = this.state.loginData;
    loginData.password = e.target.value;
    this.setState({ loginData: loginData });
  };
  login = () => {
    let loginData = this.state.loginData;
    console.log(loginData);
    if (loginData.user && loginData.password) {
      let fig = regphone.test(loginData.user) || regmail.test(loginData.user);
      console.log(fig);
      if (fig) {
        this.setState({
          loginError: ""
        });
        let formdata = qs.stringify(loginData);
        console.log(formdata);
        axios
          .post("/api/admin/login", formdata)
          .then(json => {
            if (json.data.code === 0) {
              console.log(json);
              localStorage.backtoken = json.data.data.token;
              localStorage.userid = json.data.data.user_id;
              localStorage.permission = json.data.data.permission;
              localStorage.username = json.data.data.name;
              localStorage.img = json.data.data.avatar_url;
              window.location.reload();
            } else {
              message.error("账号或密码错误", [1]);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.setState({
          loginError: "请输入正确账号"
        });
      }
    }
  };
  // 注册
  // 获取图形验证码

  getImgcode = () => {
    axios
      .get("/api/capt/get")
      .then(json => {
        console.log(json);
        if (json.data.code === 0) {
          this.setState({
            registerImgcodeData: json.data.data
          });
        }
      })
      .catch(err => {});
  };
  // 显示密码
  showrePassword = () => {
    let passwordType = this.state.repasswordType;
    if (passwordType === "password") {
      passwordType = "";
    } else {
      passwordType = "password";
    }
    this.setState({
      repasswordType: passwordType
    });
  };
// 获取输入数据
onChangePhone = e => {
  let loginData = this.state.loginData;
  loginData.user = e.target.value;
  this.setState({ loginData: loginData });
};
onChangerePassword = e => {
  let loginData = this.state.loginData;
  loginData.password = e.target.value;
  this.setState({ loginData: loginData });
};

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            background: "rgba(0,0,0,0.95)",
            padding: "15px 36px",
            position: "relative",
            lineHeight: "36px"
          }}
        >
          <img style={{ width: "100px", height: "36px" }} src={logo} />
          <span
            style={{
              position: "absolute",
              fontSize: "14px",
              right: "36px",
              color: "#A9A8A7"
            }}
          >
            投研管理系统 v1.0
          </span>
        </div>

        <div style={{ width: "300px", margin: "140px auto" }}>
          <Tabs
            tabBarStyle={{
              textAlign: "center",
              border: "none",
              fontSize: "16px"
            }}
            tabBarGutter={0}
            defaultActiveKey="1"
          >
            <TabPane tab="登录" key="1">
              <Input
                placeholder="手机号或邮箱"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={this.onChangeUserName}
                style={{ marginTop: "10px" }}
              />
              <Input
                type={this.state.passwordType}
                placeholder="手机号或邮箱"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                suffix={
                  <Icon
                    onClick={this.showPassword}
                    type="eye"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                onChange={this.onChangePassword}
                style={{ marginTop: "15px" }}
              />
              <p style={{ marginTop: "10px" }}>
                <span style={{ fontSize: "12px", color: "#F5222D" }}>
                  {this.state.loginError}
                </span>
              </p>
              <Button
                type="primary"
                style={{
                  display: "block",
                  width: 182,
                  height: 36,
                  borderRadius: "100px",
                  margin: "52px auto 0"
                }}
                onClick={this.login}
                disabled={
                  !(this.state.loginData.user && this.state.loginData.password)
                }
              >
                登录
              </Button>
            </TabPane>
            {/*   注册  */}

            <TabPane tab="注册" key="2">
              <InputGroup compact>
                <Select defaultValue="+86">
                  <Option value="+86">+86</Option>
                  <Option value="+01">+01</Option>
                </Select>
                <Input style={{ width: "77%" }} placeholder="请输入手机号" />
              </InputGroup>
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                <Input style={{ width: 163 }} placeholder="图形验证码" />
                <img
                  style={{
                    width: 122,
                    height: 32,
                    border: "none",
                    verticalAlign: "top",
                    marginLeft: 15
                  }}
                  src={this.state.registerData.img_base64}
                />
              </div>
              <div>
                <Input
                  prefix={
                    <Icon style={{ color: "rgba(0,0,0,0.25)" }} type="mail" />
                  }
                  style={{ width: 163 }}
                  placeholder="手机验证码"
                />
                <Button style={{ width: 122, marginLeft: 15 }}>
                  获取验证码
                </Button>
              </div>
              <Input
                type={this.state.repasswordType}
                suffix={
                  <Icon
                    onClick={this.showrePassword}
                    type="eye"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="6-16位密码，区分大小写"
                style={{ marginTop: 15 }}
                prefix={
                  <Icon style={{ color: "rgba(0,0,0,0.25)" }} type="lock" />
                }
              />
              <Button
              type="primary"
              style={{
                display: "block",
                width: 182,
                height: 36,
                borderRadius: "100px",
                margin: "52px auto 0"
              }}
              onClick={this.register}
              disabled={
              ""
              }
            >
              注册
            </Button>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Login;
