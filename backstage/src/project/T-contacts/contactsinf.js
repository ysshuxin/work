import React, { Component } from "react";
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  message,
  Upload,
  Breadcrumb,
  Input,
  Modal
} from "antd";
import qs from "qs";
import axios from "../../api/api";
import Inputs from "./inputs";

const { TextArea } = Input;


let data = {
  name: "",
  id: "",
  phone: "",
  email: "",
  company: "",
  position: "",
  title: "",
  industry_id: "",
  category_id: "",
  wechat: "",
  avatar_url: "",
  note: ""
};
const regphone = /^1[345789]\d{9}$/;
const regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export default class Contactsinf extends Component {
  state = {
    industry_id_text: "",
    joblevel: "",
    job: "",
    industryarr: [],
    joblevelarr: [],
    jobarr: [],
    loading: false,
    imageUrl: false,
    ifedit: true,
    defaultData: {},
    note:""
  };

  componentDidMount() {
    let id = parseInt(this.props.match.params.id);
    data.id = id;
    axios
      .get("/api/relationship/detail", { params: { id: id } })
      .then(json => {
        if (json.status === 200) {
          console.log(json.data.data[0]);
          this.setState({
            defaultData: json.data.data[0],
            industry_id_text: json.data.data[0].industry_id_text,
            category_id_text:json.data.data[0].category_id_text,
            joblevel: json.data.data[0].title,
            job: json.data.data[0].position,
            imageUrl: json.data.data[0].avatar_url,
            note:json.data.data[0].note
          });
          data.title = json.data.data[0].title;
          data.position = json.data.data[0].position;
          data.industry_id = json.data.data[0].industry_id;
          data.avatar_url = json.data.data[0].avatar_url;
          
        }
      })
      .catch(err => {});

    axios
      .get("/api/job_title/get")
      .then(json => {
        if (json.status === 200) {
          console.log(json.data.data);
          let joblevelarr = json.data.data.map((currentValue, index) => {
            return <Menu.Item key={index}>{currentValue.name}</Menu.Item>;
          });
          this.setState({
            joblevelarr: joblevelarr
          });
        }
      })
      .catch(err => {});

    axios
      .get("/api/job_position/get")
      .then(json => {
        if (json.status === 200) {
          console.log(json.data.data);
          let jobarr = json.data.data.map((currentValue, index) => {
            return <Menu.Item key={index}>{currentValue.name}</Menu.Item>;
          });
          this.setState({
            jobarr: jobarr
          });
        }
      })
      .catch(err => {});
    axios
      .get("/api/industry/get")
      .then(json => {
        if (json.status === 200) {
          console.log(json.data.data);
          let industryarr = json.data.data.map((currentValue, index) => {
            return (
              <Menu.Item value={currentValue.id} key={index}>
                {currentValue.name}
              </Menu.Item>
            );
          });
          this.setState({
            industryarr: industryarr
          });
        }
      })
      .catch(err => {});

    axios
      .get("/api/category/get")
      .then(json => {
        if (json.status === 200) {
          console.log(json.data.data);
          let categoryarr = json.data.data.map((currentValue, index) => {
            return (
              <Menu.Item value={currentValue.id} key={index}>
                {currentValue.name}
              </Menu.Item>
            );
          });
          this.setState({
            categoryarr: categoryarr,
            category: json.data.data[0].name
          });
          data.category_id = json.data.data[0].id;
        }
      })
      .catch(err => {});
  }
  jobchange = e => {
    this.setState({
      job: e.item.props.children
    });
    data.position = e.item.props.children;
  };
  industrychange = e => {
    console.log(e.item.props.value);
    this.setState({
      industry_id_text: e.item.props.children
    });
    data.industry_id = e.item.props.value;
  };
  joblevelchange = e => {
    console.log(e);
    this.setState({
      joblevel: e.item.props.children
    });
    data.title = e.item.props.children;
  };
  categorychange = e => {
    console.log(e.item.props.value);
    
    this.setState({
      category_id_text: e.item.props.children,
     
    });
    data.category_id = e.item.props.value;
  };
  logobeforeUpload = file => {
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJPG) {
      message.error("仅支持上传.jpg/.jpeg/.png文件");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传文件最大不超过2M");
    }
    return isJPG && isLt2M;
  };
  handleMenuClick = e => {
    this.setState({
      industrydef: e.item.props.children
    });
    data.industry = e.item.props.children;
  };
  changeText = (e) => {
    console.log(e.target.value);
    let data=this.state.defaultData
    data.note=e.target.value
    this.setState({
      defaultData:data
    })

  };
  uploading = () => {
    let ifedit = !this.state.ifedit;
    if (!ifedit) {
      this.setState({
        ifedit: ifedit
      });
      return;
    }
    data.name = document.getElementById("name").value;
    data.phone = document.getElementById("phone").value;
    data.email = document.getElementById("mail").value;
    data.company = document.getElementById("company").value;
    data.wechat = document.getElementById("wechat").value;
    data.note = document.getElementById("mark").value;
    data.linkman = document.getElementById("linkman").value;
    data.link_phone = document.getElementById("linkphone").value;
    data.link_wechat = document.getElementById("linkwechat").value;
    console.log(data);

    let test = () => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === "wechat" || key === "note" || key === "avatar_url"|| key === "phone"|| key === "email"|| key === "linkman"|| key === "link_phone"|| key === "link_wechat") {
            if (
              data[key] === "" ||
              data[key] === undefined ||
              data[key] === "undefined" ||
              data[key] === null ||
              data[key] === "null"
            ){
              delete data[key]
            }
          } else {
            if (
              data[key] === "" ||
              data[key] === undefined ||
              data[key] === "undefined" ||
              data[key] === null ||
              data[key] === "null"
            ) {
              message.error("必填项不能为空", [1]);
              return true;
            }
          }
        }
      }
    };
    if (test() === true) {
      return;
    }
    if (data.phone&&!regphone.test(data.phone)) {
      message.error("请输入正确手机号", [1]);
      return;
    }
    if (data.link_phone&&!regphone.test(data.link_phone)) {
      message.error("请输入正确手机号", [1]);
      return;
    }
    if (data.email&&!regmail.test(data.email)) {
      message.error("请输入正确邮箱", [1]);
      return;
    }
    let formdata = qs.stringify(data);
    axios
      .post("api/relationship/update", formdata, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(json => {
        console.log(json);

        if (json.status === 200) {
          let ifedit = !this.state.ifedit;
          this.setState({
            ifedit: ifedit
          });
          message.success("修改成功", [1],()=>{
            this.props.history.push('/site/source');
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );

    return (
      <div>
        <div style={{ padding: "16px 32px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/source">人脉资源</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>查看人脉</Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{ fontSize: "20px", marginTop: "16px", fontWeight: "600" }}
          >
            查看人脉
          </h3>
        </div>

        <div style={{ background: "#F0F2F5", padding: "20px" }}>
          <div style={{ background: "#fff", overflow: "hidden" }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "1px solid #E9E9E9",
                padding: "20px 32px 10px"
              }}
            >
              个人信息
            </h4>

            <div style={{ padding: "15px 32px", background: "#fff" }}>
              <div style={{ float: "left", width: "650px" }}>
                <div>
                  <Inputs
                    id="name"
                    defaultValue={this.state.defaultData.name}
                    disabled={this.state.ifedit}
                    show={true}
                    right="160px"
                    name="姓名:"
                  />
                  <Inputs
                    id="phone"
                    defaultValue={this.state.defaultData.phone}
                    disabled={this.state.ifedit}
                    show={false}
                    name="手机:"
                  />
                </div>
                <div>
                  <Inputs
                    id="mail"
                    defaultValue={this.state.defaultData.email}
                    disabled={this.state.ifedit}
                    show={false}
                    right="160px"
                    name="邮箱:"
                  />
                  <Inputs
                    id="wechat"
                    defaultValue={this.state.defaultData.wechat}
                    disabled={this.state.ifedit}
                    show={false}
                    name="微信:"
                  />
                </div>
              </div>

              <div
                style={{
                  float: "right",
                  width: "104px",
                  height: "104px",
                  marginBottom: "44px"
                }}
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.logobeforeUpload}
               
                  customRequest={info => {
                    this.setState({
                      imageUrl: false,
                      loading: true
                    });
                    this.setState({ loading: true });
                    let formdata = new FormData();
                    formdata.append("file", info.file);
                    axios
                      .post("/api/upload", formdata)
                      .then(json => {
                        console.log(json);

                        this.setState({
                          imageUrl: json.data.data.file_url,
                          loading: false
                        });
                        data.avatar_url = json.data.data.file_url;
                        console.log(data);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}
                >
                  {this.state.imageUrl ? (
                    <img
                      style={{ width: "100%" }}
                      src={this.state.imageUrl}
                      alt="avatar"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                <p style={{ width: "150%", marginLeft: "-20px" }}>
                  支持.jpg .png .jpeg格式
                </p>
              </div>
            </div>
          </div>
        </div>



        <div style={{ background: "#F0F2F5", padding: "20px" ,paddingTop:'0'}}>
        <div style={{ background: "#fff", overflow: "hidden" }}>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              borderBottom: "1px solid #E9E9E9",
              padding: "20px 32px 10px"
            }}
          >
          对接人信息
          </h4>

          <div style={{ padding: "15px 32px", background: "#fff" }}>
            <div style={{ float: "left", width: "650px" }}>
              
              <div>
                <Inputs id="linkman" defaultValue={this.state.defaultData.linkman}
                disabled={this.state.ifedit} show={false} right="160px" name="姓名:" />
                <Inputs id="linkphone" defaultValue={this.state.defaultData.link_phone}
                disabled={this.state.ifedit} show={false} name="手机:" />
              </div>
              <div>
                <Inputs id="linkwechat" defaultValue={this.state.defaultData.link_wechat}
                disabled={this.state.ifedit} show={false} right="160px" name="微信:" />
               
              </div>
            </div>

            
          </div>
        </div>
      </div>


        <div
          style={{ background: "#F0F2F5", padding: "20px", paddingTop: "0" }}
        >
          <div style={{ background: "#fff", overflow: "hidden" }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "1px solid #E9E9E9",
                padding: "20px 32px 10px"
              }}
            >
              工作信息
            </h4>

            <div style={{ padding: "15px 32px", background: "#fff" }}>
              <div>
                <Inputs
                  id="company"
                  defaultValue={this.state.defaultData.company}
                  show={true}
                  disabled={this.state.ifedit}
                  right="160px"
                  name="所在公司:"
                />
                <div
                  id="job"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    display: "inline-block"
                  }}
                >
                  <span style={{ color: "red" }}>*</span>
                  <span
                    style={{
                      fontSize: "14px",
                      display: "inline-block",
                      width: "68px"
                    }}
                  >
                    岗位:
                  </span>
                  <Dropdown
                    disabled={this.state.ifedit}
                    trigger={["click"]}
                    overlay={
                      <Menu
                        style={{
                          height: "200px",
                          background: "#fff",
                          overflowY: "scroll"
                        }}
                        onClick={this.jobchange}
                      >
                        {this.state.jobarr}
                      </Menu>
                    }
                  >
                    <Button
                      style={
                        this.state.ifedit
                          ? {
                              width: "160px",
                              height: "30px",
                              textAlign: "left",
                              background: "#fff",
                              border: "none"
                            }
                          : {
                              width: "160px",
                              height: "30px",
                              textAlign: "left",
                              background: "#fff"
                            }
                      }
                    >
                      {this.state.job}
                      <Icon
                        hidden={this.state.ifedit}
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "10px"
                        }}
                        type="down"
                      />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div
                  id="industry"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    display: "inline-block",
                    marginRight: "160px"
                  }}
                >
                  <span style={{ color: "red" }}>*</span>
                  <span
                    style={{
                      fontSize: "14px",
                      display: "inline-block",
                      width: "68px"
                    }}
                  >
                    所属行业:
                  </span>
                  <Dropdown
                    disabled={this.state.ifedit}
                    trigger={["click"]}
                    overlay={
                      <Menu
                        style={{
                          height: "200px",
                          background: "#fff",
                          overflowY: "scroll"
                        }}
                        onClick={this.industrychange}
                      >
                        {this.state.industryarr}
                      </Menu>
                    }
                  >
                    <Button
                      style={
                        this.state.ifedit
                          ? {
                              width: "160px",
                              height: "30px",
                              textAlign: "left",
                              background: "#fff",
                              border: "none"
                            }
                          : {
                              width: "160px",
                              height: "30px",
                              textAlign: "left",
                              background: "#fff"
                            }
                      }
                    >
                      {this.state.industry_id_text}
                      <Icon
                        hidden={this.state.ifedit}
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "10px"
                        }}
                        type="down"
                      />
                    </Button>
                  </Dropdown>
                </div>
                <div
                  id="joblevel"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    display: "inline-block"
                  }}
                >
                  <span style={{ color: "red" }}>*</span>
                  <span
                    style={{
                      fontSize: "14px",
                      display: "inline-block",
                      width: "68px"
                    }}
                  >
                    职级:
                  </span>
                  <Dropdown
                    disabled={this.state.ifedit}
                    trigger={["click"]}
                    overlay={
                      <Menu
                        style={{
                          height: "200px",
                          background: "#fff",
                          overflowY: "scroll"
                        }}
                        onClick={this.joblevelchange}
                      >
                        {this.state.joblevelarr}
                      </Menu>
                    }
                  >
                    <Button
                      style={
                        this.state.ifedit
                          ? {
                              width: "160px",
                              height: "30px",
                              textAlign: "left",
                              background: "#fff",
                              border: "none"
                            }
                          : {
                              width: "160px",
                              height: "30px",
                              textAlign: "left",
                              background: "#fff"
                            }
                      }
                    >
                      {this.state.joblevel}
                      <Icon
                        hidden={this.state.ifedit}
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "10px"
                        }}
                        type="down"
                      />
                    </Button>
                  </Dropdown>
                </div>
              </div>


              <div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "inline-block",
                  marginRight: "160px"
                }}
              >
                <span style={{ color: "red" }}>*</span>
                <span
                  style={{
                    fontSize: "14px",
                    display: "inline-block",
                    width: "68px"
                  }}
                >
                  所属类目:
                </span>
                <Dropdown
                disabled={this.state.ifedit}
                  trigger={["click"]}
                  overlay={
                    <Menu
                      style={{
                        height: "200px",
                        background: "#fff",
                        overflowY: "scroll"
                      }}
                      onClick={this.categorychange}
                    >
                      {this.state.categoryarr}
                    </Menu>
                  }
                >
                  <Button
                  style={
                    this.state.ifedit
                      ? {
                          width: "160px",
                          height: "30px",
                          textAlign: "left",
                          background: "#fff",
                          border: "none"
                        }
                      : {
                          width: "160px",
                          height: "30px",
                          textAlign: "left",
                          background: "#fff"
                        }
                  }
                  >
                    {this.state.category_id_text}
                    <Icon
                    hidden={this.state.ifedit}
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "10px"
                      }}
                      type="down"
                    />
                  </Button>
                </Dropdown>
              </div>
            </div>



              <div
                id=""
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "inline-block",
                  width:"100%"
                }}
              >
              <div style={{float:"left",width:"73px"}}>

                <span
                  style={{
                    color: "red",
                    verticalAlign: "top",
                    visibility: "hidden"
                  }}
                >
                  *
                </span>
                <span
                  style={{
                    verticalAlign: "top",
                    fontSize: "14px",
                    display: "inline-block",
                    width: "62px"
                  }}
                >
                  备注:
                </span>
              </div>
                
               <div style={{marginLeft:"73px"}}>
               <TextArea
                value={this.state.defaultData.note}
                  id="mark"
                  onChange={this.changeText}
                  disabled={ this.state.ifedit}
                  style={
                    this.state.ifedit
                      ? {
                          height: "130px",
                          background: "#fff",
                          border: "none",
                          resize: "none",
                          padding: "0"
                        }
                      : {
                      
                      
                          height: "130px",
                          background: "#fff",
                          resize: "none",
                          padding: "0"
                        }
                  }
                ></TextArea>
               </div>
                
              </div>
              <Button
                onClick={this.uploading}
                style={{
                  width: "110px",
                  height: "35px",
                  lineHeight: "35px",
                  display: "block",
                  margin: "30px auto",
                  background: "#004FFF",
                  color: "#fff",
                  borderRadius: "100px",
                  border: "none"
                }}
                type="primary"
              >
                {this.state.ifedit ? "修改" : "保存"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
