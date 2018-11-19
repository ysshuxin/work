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
const regmail = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;



class Login extends Component {
  state = {
    passwordType: "password",
    repasswordType: "password",
    loginData: {},
    loginError: "",
    registerData: {},
    getPhonecode: false,
    phoneNumber: "",
    imgCode: "",
    phoneCode: "",
    registerPassword: "",
    getPhonefig: false,
    getPhonetxt:"获取验证码"
  };

  componentDidMount = () => {
    // 注册时获取图形验证码
    this.getImgcode();
    // 倒计时
    if(localStorage.Countdown){
      this.setState({
        getPhonefig:true
      })
      let num=localStorage.Countdown
      let time= setInterval(()=>{
      num--
      this.setState({
           getPhonetxt:num
         })
         localStorage.Countdown=num
         if(num<=0){
           window.clearInterval(time)
           localStorage.removeItem('Countdown');
           this.setState({
             getPhonetxt:"获取验证码",
             getPhonefig:false
           })
         }
    },1000)
    }
    
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
            registerData: json.data.data
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
  onChangePhoneNumber = e => {

    this.setState({ phoneNumber: e.target.value });
  };
  onChangeimgCode = e => {
    this.setState({ imgCode: e.target.value });
  };
  onChangerePassword = e => {
    let loginData = this.state.loginData;
    loginData.password = e.target.value;
    this.setState({ loginData: loginData });
  };
  onChangeRegisterPassword=(e)=>{
    this.setState({ registerPassword: e.target.value });
  }
 
  onChangePhoneCode=(e)=>{
    this.setState({ phoneCode: e.target.value });
  }

  // 获取手机验证码

  getPhoneCode = () => {
    let fig = regphone.test(this.state.phoneNumber);

    if (!fig) {
      message.error("请输入正确手机号", [1]);
      return;
    }

    if (!this.state.imgCode) {
      message.error("请输入正确验证码", [1]);
      return;
    }
    let data = {
      capt: this.state.imgCode,
      capt_token: this.state.registerData.capt_token
    };
    axios
      .post("/api/capt/validate", qs.stringify(data))
      .then(json => {
        console.log(json);
        if (json.data.code === 0) {
          this.setState({
            sms_token: json.data.data.sms_token,
            getPhonefig:true
          });
          let num=null
          if(localStorage.Countdown){
          num=localStorage.Countdown
          }else{
                num=61
          }
       let time= setInterval(()=>{
         num--
         this.setState({
              getPhonetxt:num
            })
            localStorage.Countdown=num
            if(num<=0){
              window.clearInterval(time)
              localStorage.removeItem('Countdown');
              this.setState({
                getPhonetxt:"获取验证码",
                getPhonefig:false
              })
            }
       },1000)
            let phonCodeData=qs.stringify({sms_token:json.data.data.sms_token,phone:this.state.phoneNumber}) 

          axios.post("/api/send_sms",phonCodeData).then((json)=>{
            console.log(json);
            
            if(json.data.code===0){
              message.success("验证码已发送",[1])
            }else{
              message.error(json.data.msg,[1])

            }
            
          }).catch((err)=>{
            message.error("网络错误，请稍后重试",[1])
            
          })
        } else {
          message.error("验证码错误", [1]);
        }
      })
      .catch(err => {
        message.error("网络错误", [1]);
      });
  };
  register=()=>{
    if(!regphone.test(this.state.phoneNumber)){
      message.error("请输入正确手机号",[1])
      return
    }
    if(!this.state.phoneCode){
      message.error("请输入手机验证码",[1])
      return
    }
    if(!this.state.registerPassword||this.state.registerPassword.length>=16||this.state.registerPassword.length<=6){
      message.error("密码不符合要求",[1])
      return
    }
    let phonCodeData=qs.stringify({phone:this.state.phoneNumber,code:this.state.phoneCode,password:this.state.registerPassword}) 
    axios.post("/api/admin/register",phonCodeData).then((json)=>{
      console.log(json);
      
      if(json.data.code===0){
        localStorage.backtoken=json.data.data.token
       localStorage.userid=json.data.data.user_id
       localStorage.removeItem("img")
        message.success("注册成功",[1],()=>{
          window.location.reload()
        })
       
      }else{
        message.error(json.data.msg,[1])

      }
      
    }).catch((err)=>{
      message.error("网络错误，请稍后重试",[1])
      
    })

  }
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
              
                <Input
                  onChange={this.onChangePhoneNumber}
                  style={{ width: "100%" }}
                  placeholder="请输入手机号"
                />
            
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                <Input
                  onChange={this.onChangeimgCode}
                  style={{ width: 163 }}
                  placeholder="图形验证码"
                />
                <img
                  style={{
                    width: 122,
                    height: 32,
                    border: "none",
                    verticalAlign: "top",
                    marginLeft: 15
                  }}
                  onClick={this.getImgcode}
                  src={this.state.registerData.img_base64}
                />
              </div>
              <div>
                <Input
                onChange={this.onChangePhoneCode}
                  prefix={
                    <Icon style={{ color: "rgba(0,0,0,0.25)" }} type="mail" />
                  }
                  style={{ width: 163 }}
                  placeholder="手机验证码"
                />
                <Button
                  disabled={this.state.getPhonefig}
                  onClick={this.getPhoneCode}
                  style={{ width: 122, marginLeft: 15 }}
                >
                  {this.state.getPhonetxt}
                </Button>
              </div>
              <Input
                type={this.state.repasswordType}
                onChange={this.onChangeRegisterPassword}
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
