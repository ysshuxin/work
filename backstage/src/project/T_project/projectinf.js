import React, { Component } from "react";

import {
  Input,
  message,
  Breadcrumb,
  Icon,
  Popover,
  Select,
  Checkbox,
  Button,
  Upload,
  Spin,
  Modal,
  Tabs
} from "antd";

import axios from "../../api/api";
import qs from "qs";
import "./projectinf.css";
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
// 模块所需数据

const grade = ["A+", "A", "A-", "B+", "B", "B-", "C"];
const opinion = ["持续观察", "投资孵化", "投资+孵化", "投资", "拒绝"];
const requirements = ["投行服务", "Token融资", "股权融资"];
const TabPane = Tabs.TabPane;



let red= parseInt(Math.random()*255 )
let yellow= parseInt(Math.random()*255 )
let blue= parseInt(Math.random()*255 )

let cred=255-red
let cyellow=255-yellow
let cblue=255-blue
 let bgColor=`rgb(${red} ${yellow} ${blue})`
 let color=`rgb(${cred} ${cyellow} ${cblue})`


export default class Progectinf extends Component {
  state = {
    project_id: "",
    loading: true,
    upfileloading: false,
    industryData: [],
    infData: {},
    gradeData: {},
    contactsData: {},
    referData: {},
    projectIntroduceData: {},
    teamIntroduceData: {},
    investData: {},
    whitebookData: [],
    edit1: true,
    edit2: false,
    edit3_1: false,
    edit3_2: false,
    edit4_1: false,
    edit4_2: false,
    edit4_3: false
  };
  componentWillMount() {
    let id = parseInt(this.props.match.params.id);
    this.getData(id);
    // 分类数据

    axios
      .get("/api/industry/get")
      .then(json => {
        console.log(json.data.data);

        if (json.data.code === 0) {
          this.setState({
            industryData: json.data.data
          });
        }
      })
      .catch(err => {});
  }
  // 查询数据

  getData = id => {
    axios
      .get("/api/project_detail/get", { params: { project_id: id } })
      .then(json => {
        console.log(json.data.data);
        if (json.data.code === 0) {
          let data = json.data.data;
          // 第1部分数据
          this.setState({
            project_id: data.project_id
          });
          let infData = {
            project_id: data.project_id,
            logo: data.logo,
            company_name: data.company_name,
            industry_id: data.industry_id,
            name: data.name,
            token_symbol: data.token_symbol,
            country: data.country,
            requirements: data.requirements,
            website: data.website,
            industry_id_text: data.industry_id_text,
            domain_from: data.domain_from
          };
          this.setState({
            infData: infData
          });
          // 第2部分数据
          let gradeData = {
            project_id: data.project_id,
            grade: data.grade,
            opinion: data.opinion,
            analysis: data.analysis,
            industry_id: data.industry_id,
            name: data.name,
            token_symbol: data.token_symbol
          };
          this.setState({
            gradeData: gradeData
          });
          // 第3部分数据
          let contactsData = {};
          if (!data.project_contacts) {
            contactsData.email = "";
            contactsData.name = "";
            contactsData.phone = "";
            contactsData.title = "";
            contactsData.wechat = "";
          } else {
            contactsData = data.project_contacts;
          }

          let referData = {
            project_id: data.project_id,
            industry_id: data.industry_id,
            name: data.name,
            token_symbol: data.token_symbol,
            refer_name: data.refer_name,
            refer_introduce: data.refer_introduce
          };

          this.setState({
            contactsData: contactsData,
            referData: referData
          });
          // 第4部分数据
          // 4_1
          let projectIntroduceData = {
            project_id: data.project_id,
            project_introduce: data.project_introduce,
            problem: data.problem,
            framework: data.framework,
            strength: data.strength,
            tokenmodel: data.tokenmodel,
            project_strategy: data.project_strategy,
            project_community: data.project_community
          };
          this.setState({
            projectIntroduceData: projectIntroduceData
          });
          // 4_2
          let teamIntroduceData = {
            team_introduce: data.team_introduce
          };
          this.setState({
            teamIntroduceData: teamIntroduceData
          });
          // 4_3

          let investData = {
            project_id:data.project_id,
            investplan: data.investplan,
            investprogress: data.investprogress,
            project_otherinfo: data.project_otherinfo
          };
          this.setState({
            investData: investData
          });
          // 4_4
          let whitebookData = data.white_book;
          this.setState({
            whitebookData: whitebookData
          });
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        message.error("网络错误", [1]);
        this.setState({
          loading: false
        });
      });
  };
  // 更改数据

  edit1StateSave = () => {
    this.setState({
      loading: false,
      edit1: true
    });
  };

  edit2StateSave = () => {
    this.setState({
      loading: false,
      edit2: false
    });
  };

  edit3_1StateSave = () => {
    this.setState({
      loading: false,
      edit3_1: false
    });
  };

  edit3_2StateSave = () => {
    this.setState({
      loading: false,
      edit3_2: false
    });
  };
  edit4_1StateSave = () => {
    this.setState({
      loading: false,
      edit4_1: false
    });
  };
  edit4_2StateSave = () => {
    this.setState({
      loading: false,
      edit4_2: false
    });
  };
  edit4_3StateSave = () => {
    this.setState({
      loading: false,
      edit4_3: false
    });
  };
  save = (url, fig) => {
    let data = {};
    let foo = null;
    switch (fig) {
      case 1:
        data = this.state.infData;
        if(!data.domain_from){
          delete data.domain_from
        }
        foo = this.edit1StateSave;
        break;
      case 2:
        data = this.state.gradeData;
        foo = this.edit2StateSave;

        break;
      case "3_1":
        data = this.state.contactsData;
        foo = this.edit3_1StateSave;
        break;
      case "3_2":
        data = this.state.referData;
        foo = this.edit3_2StateSave;

        break;
      case "4_1":
        data = this.state.projectIntroduceData;
        foo = this.edit4_1StateSave;

        break;
      case "4_2":
        data = this.state.teamIntroduceData;
        foo = this.edit4_2StateSave;

        break;
      case "4_3":
        data = this.state.investData
        foo = this.edit4_3StateSave;

        break;
      default:
        return;
        break;
    }
    console.log(data);
    let formdata = {};
    if (fig == "3_1") {
      let data3_1 = {
        project_contacts: JSON.stringify(data),
        project_id: this.state.project_id
      };

      formdata = qs.stringify(data3_1);
    } else if (fig == "4_2") {
      let data4_2 = {
        team_introduce: JSON.stringify(data),
        project_id: this.state.project_id
      };

      formdata = qs.stringify(data4_2);
    } else {
      formdata = qs.stringify(data);
    }

    this.setState({
      loading: true
    });
    axios
      .post(url, formdata)
      .then(json => {
        if (json.data.code === 0) {
          message.success("修改成功", [1]);
          foo();
        } else {
          message.success(json.data.msg, [1]);
          this.getData(this.props.match.params.id);
          foo();
        }
      })
      .catch(err => {
        this.getData(this.props.match.params.id);
        foo();
      });
  };

  // 图片上传

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
    if (!isJPG) {
      message.error("图片格式错误", [1]);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片最大为2M");
    }
    return isJPG && isLt2M;
  };
  uploadimg = info => {
    this.setState({
      loading: true
    });
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        let data = this.state.infData;
        data.logo = json.data.data.file_url;
        this.setState({
          infData: data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };

  // 详情第一部分
  changeEdit1 = () => {
    this.setState({
      edit1: false
    });
  };

  infDataChange = (key, e) => {
    let data = this.state.infData;
    let data2 = this.state.gradeData;
    data[key] = e.target.value;
    console.log(data2);
    
    if (key === "name") {
      data2[key] = e.target.value;
    }
    if (key === "token_symbol") {
      data2[key] = e.target.value;
    }
    this.setState({
      infData: data,
      gradeData: data2
    });
  };
  industryDataChange = value => {
    let data = this.state.infData;
    let data2 = this.state.gradeData;
    data.industry_id = value.key;
    data2.industry_id = value.key;
    data.industry_id_text = value.label;
    this.setState({
      infData: data,
      gradeData: data2
    });
  };

  requirementsDatachange = value => {
    console.log(value.join(","));
    let data = this.state.infData;
    data.requirements = value.join(",");
    console.log(data.requirements.split(","));

    this.setState({
      infData: data
    });
  };
  // 详情第二部分

  changeEdit2 = () => {
    this.setState({
      edit2: true
    });
  };

  gradeChange = (key, value) => {
    let gradeData = this.state.gradeData;
    gradeData[key] = value;
    this.setState({
      gradeData: gradeData
    });
  };
  gradeInfChange = e => {
    let gradeData = this.state.gradeData;
    gradeData.analysis = e.target.value;
    this.setState({
      gradeData: gradeData
    });
  };

  // 详情第三部分

  changeEdit3_1 = () => {
    this.setState({
      edit3_1: true
    });
  };

  changeEdit3_2 = () => {
    this.setState({
      edit3_2: true
    });
  };

  contactsDataChange = (key, e) => {
    let data = this.state.contactsData;
    data[key] = e.target.value;
    this.setState({
      contactsData: data
    });
  };

  referDataChange = (key, e) => {
    let data = this.state.referData;
    data[key] = e.target.value;
    this.setState({
      referData: data
    });
  };
  // 详情第四部分
  // 4_1
  changeEdit4_1 = () => {
    this.setState({
      edit4_1: true
    });
  };
  projectIntroduceDataChange = (key, e) => {
    let data = this.state.projectIntroduceData;
    data[key] = e.target.value;
    this.setState({
      projectIntroduceData: data
    });
  };
  // 4_3
  changeEdit4_3 = () => {
    this.setState({
      edit4_3: true
    });
  };
  investDataChange = (key, e) => {
    let data = this.state.investData;
    data[key] = e.target.value;
    this.setState({
      investData: data
    });
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.upfileloading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const infData = this.state.infData;
    const gradeData = this.state.gradeData;
    const contactsData = this.state.contactsData;
    const referData = this.state.referData;
    const projectIntroduceData = this.state.projectIntroduceData;
    const teamIntroduceData = this.state.teamIntroduceData;
    const investData = this.state.investData;
    const whitebookData = this.state.whitebookData;


 

    return (
      <Spin spinning={this.state.loading}>
        <div>
          <div
            style={{
              position: "relative",
              borderBottom: "1px solid rgba(0,0,0,0.10)",
              padding: "24px 48px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "24px",
                top: "24px",
                fontSize: "14px",
                color: "#1890FF"
              }}
            >
              [
              {this.state.edit1 ? (
                <span onClick={this.changeEdit1}>编辑</span>
              ) : (
                <span onClick={this.save.bind(this, "/api/project/update", 1)}>
                  保存
                </span>
              )}
              ]
            </div>

            <Breadcrumb>
              <Breadcrumb.Item href="#/site/project/projects">
                <span>项目库</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>项目详情</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: 20, position: "relative" }}>
              <div style={{ position: "absolute", right: 0, top: 15 }}>
                <span>代币符号： </span>
                {this.state.edit1 ? (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 36,
                      fontWeight: "600"
                    }}
                  >
                    {infData.token_symbol}
                  </span>
                ) : (
                  <Input
                    defaultValue={infData.token_symbol}
                    onChange={this.infDataChange.bind(this, "token_symbol")}
                    style={{ width: 160, marginRight: 25 }}
                  />
                )}
              </div>

              <div
                style={{
                  display: "inline-block",
                  width: 60,
                  height: 60,
                  overflow: "hidden",
                  verticalAlign: "top",
                  marginRight: 25,
                  marginTop: 10
                }}
              >
                {
                  
                  
                  this.state.edit1 ? (
                  infData.logo?<img src={infData.logo} style={{ width: "100%", height: "100%" }}/>: 
                  
                  infData.name? <div style={{width: 60,height: 60,display:"inline-block",textAlign:"center",lineHeight:"60px",fontSize:"35px",background:bgColor,color:color}}>{infData.name.substring(0,1)}</div>:""
          
                ) : (
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader yss_projectinf_uploading"
                    showUploadList={false}
                    customRequest={this.uploadimg}
                    beforeUpload={this.beforeUpload}
                  >
                    {infData.logo ? (
                      <img
                        style={{ width: "100%" }}
                        src={infData.logo}
                        alt="avatar"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                )}
              </div>
              <div style={{ display: "inline-block" }}>
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px",
                      fontSize: 22,
                      fontWeight: "600"
                    }}
                  >
                    <span style={{ display: "inline-block", width: 110 }}>
                      项目名称：
                    </span>
                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",

                          marginRight: 25
                        }}
                      >
                        {infData.name}
                      </span>
                    ) : (
                      <Input
                        defaultValue={infData.name}
                        onChange={this.infDataChange.bind(this, "name")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    )}
                  </div>
                </div>

                <div style={{ margin: "6px 0", overflow: "hidden" }}>
                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span style={{ display: "inline-block", width: 70 }}>
                      公司名称：
                    </span>
                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {infData.company_name}
                      </span>
                    ) : (
                      <Input
                        defaultValue={infData.company_name}
                        onChange={this.infDataChange.bind(this, "company_name")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      height: 32,
                      lineHeight: "32px"
                    }}
                  >
                    <span style={{ display: "inline-block", width: 70 }}>
                      公司网址：
                    </span>
                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom",
                          marginRight: 25
                        }}
                      >
                        <a target="_blank" href={infData.website}>
                          {infData.website}
                        </a>
                      </span>
                    ) : (
                      <Input
                        defaultValue={infData.website}
                        onChange={this.infDataChange.bind(this, "website")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span style={{ display: "inline-block", width: 70 }}>
                      国家：
                    </span>
                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {" "}
                        {infData.country}
                      </span>
                    ) : (
                      <Input
                        defaultValue={infData.country}
                        onChange={this.infDataChange.bind(this, "country")}
                        style={{ width: 160 }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 32,
                      lineHeight: "32px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      来源域名：
                    </span>
                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        <a target="_blank" href={infData.domain_from}>
                          {" "}
                          {infData.domain_from}
                        </a>
                      </span>
                    ) : (
                      <Input
                        defaultValue={infData.domain_from}
                        onChange={this.infDataChange.bind(this, "domain_from")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span style={{ display: "inline-block", width: 70 }}>
                      所属分类：
                    </span>
                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25
                        }}
                      >
                        {infData.industry_id_text}
                      </span>
                    ) : (
                      <Select
                        onChange={this.industryDataChange}
                        labelInValue={true}
                        defaultValue={{
                          key: infData.industry_id,
                          label: infData.industry_id_text
                        }}
                        style={{ width: 160, marginRight: 25 }}
                      >
                        {this.state.industryData.map((item, index) => {
                          return (
                            <Option key={index} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span style={{ display: "inline-block", width: 70 }}>
                      需求：
                    </span>
                    {this.state.edit1 ? (
                      <span style={{ display: "inline-block" }}>
                        {infData.requirements}
                      </span>
                    ) : (
                      <CheckboxGroup
                        options={requirements.map((item, index) => {
                          return { label: item, value: item };
                        })}
                        defaultValue={
                          infData.requirements
                            ? infData.requirements.split(",")
                            : []
                        }
                        onChange={this.requirementsDatachange}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/**  详情页第二部分 */}
          <div
            style={{
              position: "relative",
              minHeight: "200px",
              padding: "24px"
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "24px",
                top: "18px",
                fontSize: "14px",
                color: "#1890FF"
              }}
            >
              [
              {this.state.edit2 ? (
                <span onClick={this.save.bind(this, "/api/project/update", 2)}>
                  保存
                </span>
              ) : (
                <span onClick={this.changeEdit2}>编辑</span>
              )}
              ]
            </div>
            <h3
              style={{
                fontSize: "22px",
                margin: "20px",
                marginBottom: "0",
                marginTop: "0"
              }}
            >
              评级分析
            </h3>
            <div>
              <div style={{ padding: "15px 20px" }}>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: "16px",
                    lineHeight: "32px",
                    marginRight: 20
                  }}
                >
                  <span style={{ color: "#FF1000" }}>评级：</span>

                  {this.state.edit2 ? (
                    <Select
                      defaultValue={gradeData.grade}
                      style={{ width: 120 }}
                      onChange={this.gradeChange.bind(this, "grade")}
                    >
                      {grade.map(item => {
                        return <Option value={item}>{item}</Option>;
                      })}
                    </Select>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        width: 120,
                        color: "#FF1000"
                      }}
                    >
                      {gradeData.grade}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "inline-block",
                    fontSize: "16px",
                    lineHeight: "32px"
                  }}
                >
                  <span style={{ color: "#FF1000" }}>综合意见：</span>

                  {this.state.edit2 ? (
                    <Select
                      defaultValue={gradeData.opinion}
                      style={{ width: 120 }}
                      onChange={this.gradeChange.bind(this, "opinion")}
                    >
                      {opinion.map(item => {
                        return <Option value={item}>{item}</Option>;
                      })}
                    </Select>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        width: 120,
                        color: "#FF1000"
                      }}
                    >
                      {gradeData.opinion}
                    </span>
                  )}
                </div>
                <div style={{ marginTop: 20 }}>
                  {this.state.edit2 ? (
                    <TextArea
                      onChange={this.gradeInfChange}
                      defaultValue={gradeData.analysis}
                      autosize={true}
                    />
                  ) : (
                    <div>{gradeData.analysis}</div>
                  )}
                </div>
              </div>
            </div>

            <p style={{ position: "relative" }}>
              <span
                style={{
                  color: "#1890FF",
                  position: "absolute",
                  right: "80px",
                  fontSize: "16px"
                }}
              >
                生成报告
              </span>
            </p>
          </div>

          {/**详情页第三部分 */}

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
                  style={{
                    position: "absolute",
                    right: "24px",
                    top: "18px",
                    fontSize: "14px",
                    color: "#1890FF",
                    zIndex: "100"
                  }}
                >
                  [
                  {this.state.edit3_1 ? (
                    <span
                      onClick={this.save.bind(
                        this,
                        "/api/project_detail/update",
                        "3_1"
                      )}
                    >
                      保存
                    </span>
                  ) : (
                    <span onClick={this.changeEdit3_1}>编辑</span>
                  )}
                  ]
                </div>
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      姓 名：
                    </span>
                    {this.state.edit3_1 ? (
                      <Input
                        defaultValue={contactsData.name}
                        onChange={this.contactsDataChange.bind(this, "name")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {contactsData.name}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 32,
                      lineHeight: "32px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      邮 箱：
                    </span>
                    {this.state.edit3_1 ? (
                      <Input
                        defaultValue={contactsData.email}
                        onChange={this.contactsDataChange.bind(this, "email")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {contactsData.email}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 32,
                      lineHeight: "32px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      微 信：
                    </span>
                    {this.state.edit3_1 ? (
                      <Input
                        defaultValue={contactsData.wechat}
                        onChange={this.contactsDataChange.bind(this, "wechat")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {contactsData.wechat}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      职 位：
                    </span>
                    {this.state.edit3_1 ? (
                      <Input
                        defaultValue={contactsData.title}
                        onChange={this.contactsDataChange.bind(this, "title")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {contactsData.title}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 32,
                      lineHeight: "32px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      手 机：
                    </span>
                    {this.state.edit3_1 ? (
                      <Input
                        defaultValue={contactsData.phone}
                        onChange={this.contactsDataChange.bind(this, "phone")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {contactsData.phone}
                      </span>
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="推荐人介绍" key="2">
                <div
                  style={{
                    position: "absolute",
                    right: "24px",
                    top: "18px",
                    fontSize: "14px",
                    color: "#1890FF",
                    zIndex: "100"
                  }}
                >
                  [
                  {this.state.edit3_2 ? (
                    <span
                      onClick={this.save.bind(
                        this,
                        "/api/project/update",
                        "3_2"
                      )}
                    >
                      保存
                    </span>
                  ) : (
                    <span onClick={this.changeEdit3_2}>编辑</span>
                  )}
                  ]
                </div>

                <div>
                  <div
                    style={{
                      display: "inline-block",
                      height: 34,
                      lineHeight: "34px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom"
                      }}
                    >
                      姓 名：
                    </span>
                    {this.state.edit3_2 ? (
                      <Input
                        defaultValue={referData.refer_name}
                        onChange={this.referDataChange.bind(this, "refer_name")}
                        style={{ width: 160, marginRight: 25 }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 160,
                          marginRight: 25,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "bottom"
                        }}
                      >
                        {referData.refer_name}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      marginTop: 10,
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: 70,

                        float: "left"
                      }}
                    >
                      简 介：
                    </div>
                    {this.state.edit3_2 ? (
                      <div style={{ marginLeft: "70px" }}>
                        <TextArea
                          onChange={this.referDataChange.bind(
                            this,
                            "refer_introduce"
                          )}
                          defaultValue={referData.refer_introduce}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          marginLeft: 70
                        }}
                      >
                        {referData.refer_introduce}
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>

          {/**详情页第四部分 */}
          <div
            style={{
              position: "relative",
              minHeight: "200px",
              border: "20px solid  #F0F2F5",
              borderTop: "0"
            }}
          >
            <Tabs style={{ padding: "0 46px" }} defaultActiveKey="1">
              <TabPane tab="项目管理" key="1">
                <div
                  style={{
                    position: "absolute",
                    right: "24px",
                    top: "18px",
                    fontSize: "14px",
                    color: "#1890FF",
                    zIndex: "100"
                  }}
                >
                  [
                  {this.state.edit4_1 ? (
                    <span
                      onClick={this.save.bind(
                        this,
                        "/api/project_detail/update",
                        "4_1"
                      )}
                    >
                      保存
                    </span>
                  ) : (
                    <span onClick={this.changeEdit4_1}>编辑</span>
                  )}
                  ]
                </div>

                <div style={{ paddingBottom: 40 }}>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      项目简介
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.project_introduce}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "project_introduce"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.project_introduce}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      要解决的问题
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.problem}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "problem"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.problem}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      技术架构/实现逻辑
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.framework}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "framework"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.framework}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      项目优势
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.strength}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "strength"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.strength}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      通证模型设计
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.tokenmodel}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "tokenmodel"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.tokenmodel}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      生态建设情况描述
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.project_strategy}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "project_strategy"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.project_strategy}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                      社区建设
                    </h3>
                    {this.state.edit4_1 ? (
                      <TextArea
                        defaultValue={projectIntroduceData.project_community}
                        onChange={this.projectIntroduceDataChange.bind(
                          this,
                          "project_community"
                        )}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {projectIntroduceData.project_community}
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="团队介绍" key="2">
                <div
                  style={{
                    position: "absolute",
                    right: "24px",
                    top: "18px",
                    fontSize: "14px",
                    color: "#1890FF",
                    zIndex: "100"
                  }}
                >
                  [
                  {this.state.edit4_2 ? (
                    <span
                      onClick={this.save.bind(
                        this,
                        "/api/project_detail/update",
                        "4_2"
                      )}
                    >
                      保存
                    </span>
                  ) : (
                    <span onClick={this.changeEdit4_2}>编辑</span>
                  )}
                  ]
                </div>

                <Icon
                  style={
                    this.state.teamdisabled
                      ? {
                          display: "none",
                          margin: "40px auto",
                          fontSize: "30px"
                        }
                      : {
                          fontSize: "30px",
                          display: "block",
                          margin: "40px auto"
                        }
                  }
                  type="plus-circle"
                  theme="outlined"
                />
              </TabPane>

              <TabPane tab="融资需求" key="3">
                <div
                  style={{
                    position: "absolute",
                    right: "24px",
                    top: "18px",
                    fontSize: "14px",
                    color: "#1890FF",
                    zIndex: "100"
                  }}
                >
                  [
                  {this.state.edit4_3 ? (
                    <span
                      onClick={this.save.bind(
                        this,
                        "api/project_detail/update",
                        "4_3"
                      )}
                    >
                      保存
                    </span>
                  ) : (
                    <span onClick={this.changeEdit4_3}>编辑</span>
                  )}
                  ]
                </div>
                <div style={{ paddingBottom: 40 }}>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                    融资计划
                    </h3>
                    {this.state.edit4_3 ? (
                      <TextArea
                        defaultValue={investData.investplan}
                        onChange={this.investDataChange.bind(
                          this,
                          "investplan"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px",
                          overflow:"hidden"
                        }}
                      >
                      <p>{investData.investplan}</p>
                        
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                    目前融资进度
                    </h3>
                    {this.state.edit4_3 ? (
                      <TextArea
                        defaultValue={investData.investprogress}
                        onChange={this.investDataChange.bind(
                          this,
                          "investprogress"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {investData.investprogress}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>
                    备注
                    </h3>
                    {this.state.edit4_3 ? (
                      <TextArea
                        defaultValue={investData.project_otherinfo}
                        onChange={this.investDataChange.bind(
                          this,
                          "project_otherinfo"
                        )}
                        autosize={true}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid #fff",
                          padding: "4px 11px"
                        }}
                      >
                        {investData.project_otherinfo}
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="下载" key="4">
                <div style={{ paddingBottom: 40 }}>
                  {whitebookData.map((item, index) => {
                    return (
                      <p key={index} style={{ overflow: "hidden" }}>
                        {" "}
                        <span style={{ float: "left" }}>
                          {item.show_name}
                        </span>{" "}
                        <span style={{ float: "right" }}>
                          <a
                            style={{ textDecoration: "none" }}
                            target="_blank"
                            download={item.show_name}
                            href={ item.download_url}
                          >
                            {"预览"}
                          </a>{" "}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Spin>
    );
  }
}
