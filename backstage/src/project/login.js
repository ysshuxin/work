import React, { Component } from "react";
import { Tabs, Icon, Input, Button, Form, Select,message } from "antd";
import axios from "../api/api";
import logo from "../img/logo.png";
import qs from 'qs'
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
// 正则
const regphone = /^1[345789]\d{9}$/;
const regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;


// <TabPane tab="注册" key="2">
//               <InputGroup compact>
//                 <Select defaultValue="+86">
//                   <Option value="+86">+86</Option>
//                   <Option value="+01">01</Option>
//                 </Select>
//                 <Input
//                   style={{ width: "77%" }}
//                   defaultValue="Xihu District, Hangzhou"
//                 />
//               </InputGroup>
//             </TabPane>


class Login extends Component {
  state = {
    passwordType: "password",
    loginData:{},
    loginError:""
  };

  componentDidMount = () => {};

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
    let loginData=this.state.loginData
    loginData.user=e.target.value
    this.setState({ loginData: loginData });
  };
  onChangePassword=(e)=>{
    let loginData=this.state.loginData
    loginData.password=e.target.value
    this.setState({ loginData: loginData });
  }
  login=()=>{
    let loginData=this.state.loginData
    console.log(loginData)
    if((loginData.user&&loginData.password)){
       let fig=regphone.test(loginData.user)||regmail.test(loginData.user)
       console.log(fig)
       if(fig){
        this.setState({
          loginError:""
        })
        let formdata = qs.stringify(loginData);
        console.log(formdata)
        axios
          .post("/api/admin/login", formdata)
          .then(json => {
            if(json.data.code===0){
              console.log(json)
              localStorage.backtoken=json.data.data.token
              localStorage.userid=json.data.data.user_id
              localStorage.permission=json.data.data.permission
              localStorage.username=json.data.data.name
              localStorage.img=json.data.data.avatar_url
              window.location.reload()
            }
            else{
              message.error('账号或密码错误',[1])
            }
          })
          .catch(err => {
            console.log(err);
          });


       }else{
         this.setState({
           loginError:"请输入正确账号"
         })
       }
    }
  }
  // 注册

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
                <p style={{marginTop:"10px"}}><span style={{fontSize:'12px',color:"#F5222D"}}>{this.state.loginError}</span></p>
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
                disabled={!(this.state.loginData.user&&this.state.loginData.password)}
              >
                登录
              </Button>
            </TabPane>
            
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Login;
