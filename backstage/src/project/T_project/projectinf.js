import React, { Component } from "react";

import {
  Input,
  message,
  Breadcrumb,
  Icon,
  Radio,
  Select,
  Checkbox,
  Button,
  Upload,
  Spin,
  Modal,
  Tabs,
  DatePicker,
  TimePicker
} from "antd";
import moment from "moment";
import axios from "../../api/api";
import qs from "qs";
import "./projectinf.css";
import RadioGroup from "antd/lib/radio/group";
import Deal from "./deal";

const requireContext = require.context(
  "../../img/team",
  false,
  /^\.\/.*\.png$/
);

const images = requireContext.keys().map(requireContext);

const teamLinkDataTxt = [
  "脉脉",
  ~"知乎",
  "Telegram",
  "Facebook",
  "Github",
  "link_in",
  "Medium",
  "Reddit",
  "微博",
  "Twiter"
];

const teamLinkData = images.map((item, index) => {
  return {
    icon: item,
    txt: teamLinkDataTxt[index]
  };
});

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
// 模块所需数据

const grade = ["A+", "A", "A-", "B+", "B", "B-", "C"];
const opinion = ["持续观察", "投资孵化", "投资+孵化", "投资", "拒绝"];
const requirements = ["投行服务", "Token融资", "股权融资"];
const TabPane = Tabs.TabPane;

let red = parseInt(Math.random() * 255);
let yellow = parseInt(Math.random() * 255);
let blue = parseInt(Math.random() * 255);

let cred = 255 - red;
let cyellow = 255 - yellow;
let cblue = 255 - blue;
let bgColor = `rgb(${red} ${yellow} ${blue})`;
let color = `rgb(${cred} ${cyellow} ${cblue})`;

class Team extends Component {
  state = {
    edit: this.props.edit,
    data: this.props.data.introduce,
    idnum: this.props.idnum,
    loading: false,
    upfileloading: false
  };
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }
  componentDidMount() {}
  uploadimg = info => {
    this.setState({
      loading: true
    });
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        let data = this.state.data;
        data.pic = json.data.data.file_url;
        this.setState({
          data: data,
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
  changeEdit = () => {
    this.setState({
      edit: true
    });
  };
  delLink = key => {
    let data = { ...this.state.data };
    delete data.social[key];

    this.setState({
      data: data
    });
  };
  addLink = () => {
    let data = { ...this.state.data };
    let newteamLinkDataTxt = [...teamLinkDataTxt];
    for (const key in data.social) {
      if (data.social.hasOwnProperty(key)) {
        newteamLinkDataTxt.splice(newteamLinkDataTxt.indexOf(key), 1);
      }
    }
    data.social = { ...data.social };

    if (newteamLinkDataTxt[0]) {
      data.social[newteamLinkDataTxt[0]] = "";
      this.setState({
        data: data
      });
    }
  };
  linkChange = value => {};
  save = () => {};

  TeamLink = () => {};
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.upfileloading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const data = this.state.data;

    if (!data && data) {
      data.social = {
        脉脉: ""
      };
    }
    return (
      <Spin spinning={this.state.loading}>
        <div
          style={{
            borderBottom: "1px solid #E9E9E9",
            padding: "20px 0",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: 70,
              height: 70,
              verticalAlign: "top",
              marginRight: 15,
              float: "left"
            }}
          >
            {this.state.edit ? (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader yss_projectinf_uploading"
                showUploadList={false}
                customRequest={this.uploadimg}
                beforeUpload={this.props.beforeUpload}
              >
                {data.pic ? (
                  <img style={{ width: "100%" }} src={data.pic} alt="avatar" />
                ) : (
                  uploadButton
                )}
              </Upload>
            ) : (
              <img style={{ width: "100%", height: "100%" }} src={data.pic} />
            )}
          </div>
          <div style={{ marginLeft: 85 }}>
            <div
              style={{ position: "relative", height: 34, lineHeight: "34px" }}
            >
              <span style={{ color: "rgba(0 0 0 0.45)" }}>姓名：</span>
              {this.state.edit ? (
                <Input
                  defaultValue={data.name}
                  style={{ width: 160, marginRight: 30 }}
                />
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    marginRight: 30,
                    width: 160
                  }}
                >
                  {data.name}
                </span>
              )}
              <span style={{ color: "rgba(0 0 0 0.45)" }}>职位：</span>
              {this.state.edit ? (
                <Input defaultValue={data.title} style={{ width: 160 }} />
              ) : (
                <span style={{ display: "inline-block" }}>{data.title}</span>
              )}

              <div style={{ position: "absolute", right: 0, top: 0 }}>
                <span
                  onClick={this.props.del.bind(
                    this,
                    this.state.idnum,
                    this.props.data.team_id
                  )}
                  style={{ color: "#F5222D", marginRight: 15 }}
                >
                  [删除]
                </span>
                {this.state.edit ? (
                  <span onClick={this.save} style={{ color: "#004FFF" }}>
                    [保存]
                  </span>
                ) : (
                  <span onClick={this.changeEdit} style={{ color: "#004FFF" }}>
                    [编辑]
                  </span>
                )}
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div
                style={{ float: "left", width: 45, color: "rgba(0 0 0 0.45)" }}
              >
                简介：
              </div>
              {this.state.edit ? (
                <div style={{ marginLeft: 45 }}>
                  {" "}
                  <TextArea defaultValue={data.inf} />{" "}
                </div>
              ) : (
                <div
                  style={{
                    marginLeft: 45,
                    width: "100%",
                    display: "inline-block"
                  }}
                >
                  {data.inf}11{" "}
                </div>
              )}
            </div>

            <div style={{ marginTop: 10 }}>
              <span
                style={{
                  color: "rgba(0 0 0 0.45)",
                  display: "inline-block",
                  verticalAlign: "top"
                }}
              >
                社交平台：
              </span>
              <div style={{ display: "inline-block" }}>
                {this.state.edit ? (
                  Object.keys(data.social).map((link, index) => {
                    let key = link;
                    return (
                      <div key={link} style={{ margin: "5px 0" }}>
                        <Select
                          defaultValue={link}
                          style={{ width: 130, marginRight: 30 }}
                          onChange={this.linkChange}
                        >
                          {teamLinkData.map(item => {
                            // return ( <Option value={item}>  <img style={{width:20 ,height: 20,}} src={"../../img/team"+item.replace(".","")}></img></Option>)
                            return (
                              <Option value={item.txt}>
                                <img
                                  style={{
                                    width: 20,
                                    height: 20,
                                    verticalAlign: "text-bottom"
                                  }}
                                  src={item.icon}
                                />
                                <span>{item.txt}</span>
                              </Option>
                            );
                          })}
                        </Select>
                        <span>链接：</span>
                        <Input
                          defaultValue={data.social[link]}
                          style={{ width: 300 }}
                        />
                        {index === 0 && Object.keys(data.social).length == 1 ? (
                          <div
                            onClick={this.addLink}
                            style={{
                              display: "inline-block",
                              width: 20,
                              height: 20,
                              border: "1px dashed #ddd",
                              textAlign: "center",
                              lineHeight: "20px",
                              fontWeight: "600",
                              color: "#004FFF",
                              margin: "0 5px"
                            }}
                          >
                            +
                          </div>
                        ) : Object.keys(data.social).length != index + 1 ? (
                          <div
                            onClick={this.delLink.bind(this, key)}
                            style={{
                              display: "inline-block",
                              width: 20,
                              height: 20,
                              border: "1px dashed #ddd",
                              textAlign: "center",
                              lineHeight: "20px",
                              fontWeight: "600",
                              color: "#F5222D",
                              margin: "0 5px"
                            }}
                          />
                        ) : (
                          <div style={{ display: "inline-block" }}>
                            <div
                              onClick={this.delLink.bind(this, key)}
                              style={{
                                display: "inline-block",
                                width: 20,
                                height: 20,
                                border: "1px dashed #ddd",
                                textAlign: "center",
                                lineHeight: "20px",
                                fontWeight: "600",
                                color: "#F5222D",
                                margin: "0 5px"
                              }}
                            >
                              -
                            </div>
                            <div
                              onClick={this.addLink}
                              style={{
                                display: "inline-block",
                                width: 20,
                                height: 20,
                                border: "1px dashed #ddd",
                                textAlign: "center",
                                lineHeight: "20px",
                                fontWeight: "600",
                                color: "#004FFF",
                                margin: "0 5px"
                              }}
                            >
                              +
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <span style={{ display: "inline-block" }}>
                    {" "}
                    {data.social
                      ? Object.keys(data.social).map(item => {
                          let logo = teamLinkData.filter(item2 => {
                            if (item2.txt == item) {
                              return item2.icon;
                            }
                          });
                          if (data.social[item]) {
                            return (
                              <a target={"_blank"} href={data.social[item]}>
                                {" "}
                                <img
                                  style={{
                                    width: 20,
                                    height: 20,
                                    margin: "0 5px"
                                  }}
                                  src={logo[0].icon}
                                />{" "}
                              </a>
                            );
                          }
                        })
                      : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default class Progectinf extends Component {
  state = {
    project_id: "",
    loading: true,
    upfileloading: false,
    industryData: [],
    priceData: "",
    infData: {},
    gradeData: {},
    contactsData: {},
    referData: {},
    projectIntroduceData: {},
    teamIntroduceData: [],
    investData: {},
    whitebookData: [],
    scoreData: {},
    ICOData: {},
    dealData: {},
    circulateData: "暂无",
    scoreDataVisible: false,

    edit1: true,
    edit2: false,
    edit3_1: false,
    edit3_2: false,
    edit4_1: false,
    edit4_2: false,
    edit4_3: false,
    editICO: false
  };
  componentDidMount() {
    let id = parseInt(this.props.match.params.id);
    this.getData(id);
    // 分类数据
    this.getFundData(id);
    axios
      .get("/api/industry/get")
      .then(json => {
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
            domain_from: data.domain_from,
            is_market: data.is_market
          };
          this.setState({
            infData: infData
          });
          if (data.is_market === 1) {
            this.setState({
              priceData: "点击获取"
            });
          }

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
          axios
            .get("/api/project_team/get?project_id=" + data.project_id)
            .then(json => {
              if (json.data.code === 0) {
                let teamIntroduceData = [];
                if (json.data.data.length != 0) {
                  teamIntroduceData = json.data.data;
                } else {
                  teamIntroduceData = [{ introduce: {} }];
                }
                this.setState({
                  teamIntroduceData: teamIntroduceData
                });
              }
            });

          // 4_3

          let investData = {
            project_id: data.project_id,
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

          // 评分数据
          let scoreData = data.score;
          if (scoreData) {
            this.setState({
              scoreData: scoreData
            });
          } else {
            let scoreData = {
              team: 0,
              market: 0,
              technology: 0,
              social: 0,
              tokenmodel: 0,
              progress: 0,
              financing: 0,
              team: 0,
              team: 0
            };

            this.setState({
              scoreData: scoreData
            });
          }

          // ICO数据
          let ICOData = {
            project_id: data.project_id,
            start_time: data.start_time,
            end_time: data.end_time,
            coin_total: data.coin_total,
            circulate_num: data.circulate_num,
            sorf_cap: data.sorf_cap,
            hard_cap: data.hard_cap,
            ratio: data.ratio,
            platform: data.platform,
            accept_coin: data.accept_coin,
            limit_zone: data.limit_zone,
            is_kyc: data.is_kyc,
            is_aml: data.is_aml,
            is_ing: data.is_ing
          };

          let tokenNum = data.coin_total.match(/\d/g);
          let circulateNum = data.circulate_num.match(/\d/g);

          if (Array.isArray(tokenNum) && Array.isArray(circulateNum)) {
            let num =
              (circulateNum.join("") / tokenNum.join("")).toFixed(4) * 100 +
              "%";
            this.setState({
              circulateData: num
            });
          } else {
            this.setState({
              circulateData: "暂无"
            });
          }

          this.setState({
            ICOData: ICOData
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

  // 交易信息
  getFundData = id => {
    axios.get("/api/found_project/get?project_id=" + id).then(json => {
      console.log(json);
      if (json.data.code === 0) {
        this.setState({
          dealData: {}
        });
        setTimeout(() => {
          if (json.data.data.back) {
            this.setState({
              dealData: json.data.data
            });
          } else {
          }
        }, 200);
      }
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

  scoreStateSave = () => {
    this.setState({
      loading: false,
      scoreDataVisible: false
    });
  };
  ICOStateSave = () => {
    this.setState({
      loading: false,
      editICO: false
    });
  };
  save = (url, fig) => {
    let data = {};
    let foo = null;
    switch (fig) {
      case 1:
        data = this.state.infData;
        if (!data.domain_from) {
          delete data.domain_from;
        }
        foo = this.edit1StateSave;
        break;
      case 2:
        data = this.state.gradeData;
        foo = this.edit2StateSave;
        // 综合意见 隐藏
        delete data.opinion
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
        data = this.state.investData;
        foo = this.edit4_3StateSave;
      case "score":
        data = this.state.scoreData;
        foo = this.scoreStateSave;
        break;
      case "ICO":
        data = this.state.ICOData;
        foo = this.ICOStateSave;
        break;
      default:
        return;
        break;
    }
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
    } else if (fig == "score") {
      let datascore = {
        score: JSON.stringify(data),
        project_id: this.state.project_id
      };
      formdata = qs.stringify(datascore);
    } else if (fig == "ICO") {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (!data[key]) {
            delete data[key];
          }
        }
      }
      formdata = qs.stringify(data);
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
    let data = this.state.infData;
    data.requirements = value.join(",");

    this.setState({
      infData: data
    });
  };
  // 查询实时价格
  reloadPrice = (token_symbol, is_market) => {
    if (is_market === 1) {
      this.setState({
        priceloading: true
      });
      axios
        .get("/api/project_detail/get_price?symbol=" + token_symbol)
        .then(json => {
          if (json.data.code === 0) {
            message.success("实时价格更新成功", [1]);

            this.setState({
              priceData: json.data.data,
              priceloading: false
            });
          } else {
            this.setState({
              priceloading: false,
              priceData: "暂无"
            });
          }
        })
        .catch(err => {
          this.setState({
            priceloading: false
          });
        });
    }
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
  // 4_2
  changeEdit4_2 = () => {
    this.setState({
      edit4_2: true
    });
  };
  addTeam = () => {
    let data = this.state.teamIntroduceData;
    let newData = {};
    this.setState({
      teamIntroduceData: [newData, ...data]
    });
  };
  delTeam = (id, itemid) => {
    let data = this.state.teamIntroduceData.filter((item, index) => {
      if (index != id) {
        return item;
      } else {
        return "";
      }
    });
    this.setState({
      teamIntroduceData: data
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
  // 评分项目
  scoreDataChange = (key, e) => {
    let data = this.state.scoreData;
    data[key] = e.target.value;
    data["total"] = (
      data.team * 0.2 +
      data.market * 0.2 +
      data.technology * 0.2 +
      data.social * 0.1 +
      data.tokenmodel * 0.1 +
      data.progress * 0.1 +
      data.financing * 0.1
    ).toFixed(1);
    this.setState({
      scoreData: data
    });
  };
  addScore = () => {
    this.setState({
      scoreDataVisible: true
    });
  };
  cancelScoreData = () => {
    let id = parseInt(this.props.match.params.id);
    this.getData(id);
    this.setState({
      scoreDataVisible: false
    });
  };

  // ICO项目

  changeEditICO = () => {
    this.setState({
      editICO: true
    });
  };
  changeICOTime = (key, value, dateString) => {
    let data = this.state.ICOData;
    data[key] = dateString;
    this.setState({
      ICOData: data
    });
  };
  ICOChange = (key, e) => {
    let data = this.state.ICOData;
    data[key] = e.target.value;
    this.setState({
      ICOData: data
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
    const scoreData = this.state.scoreData;
    const ICOData = this.state.ICOData;
    const dealData = this.state.dealData;

    const ScoreRadioGroup = props => {
      return (
        <div>
          <Radio.Group
            onChange={this.scoreDataChange.bind(this, props.dataKey)}
            defaultValue={props.defaultValue}
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button style={{ margin: 4 }} value="1">
              1
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="2">
              2
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="3">
              3
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="4">
              4
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="5">
              5
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="6">
              6
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="7">
              7
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="8">
              8
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="9">
              9
            </Radio.Button>
            <Radio.Button style={{ margin: 4 }} value="10">
              10
            </Radio.Button>
          </Radio.Group>
        </div>
      );
    };

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
                <br />
                <span style={{ verticalAlign: "top", display: "inline-block" }}>
                  实时价格：
                  <br />{" "}
                  <Icon
                    onClick={this.reloadPrice.bind(
                      this,
                      infData.token_symbol,
                      infData.is_market
                    )}
                    style={{
                      marginLeft: 25,
                      color: "rgb(24, 144, 255)",
                      cursor: "pointer"
                    }}
                    type={this.state.priceloading ? "loading" : "reload"}
                  />
                </span>
                <span
                  style={{
                    display: "inline-block"
                  }}
                >
                  {this.state.priceData ? (
                    <span>≈ ¥ {this.state.priceData} </span>
                  ) : (
                    <span>暂无</span>
                  )}

                  <br />
                </span>
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
                {this.state.edit1 ? (
                  infData.logo ? (
                    <img
                      src={infData.logo}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : infData.name ? (
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        display: "inline-block",
                        textAlign: "center",
                        lineHeight: "60px",
                        fontSize: "35px",
                        background: bgColor,
                        color: color
                      }}
                    >
                      {infData.name.substring(0, 1)}
                    </div>
                  ) : (
                    ""
                  )
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
                      lineHeight: "34px"
                    }}
                  >
                    {this.state.edit1 ? (
                      <span />
                    ) : (
                      <span style={{ display: "inline-block", width: 70 }}>
                        项目名称：
                      </span>
                    )}

                    {this.state.edit1 ? (
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: 36,
                          fontWeight: "600"
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
{/* 综合意见修改 隐藏 */}
                <div
                  style={{
                    /*display: "inline-block",*/
                    fontSize: "16px",
                    lineHeight: "32px",
                    display:"none"
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

          {/**  详情页评分部分 */}

          <div
            style={{
              position: "relative",
              border: "20px solid  #F0F2F5"
            }}
          >
            <Tabs
              tabBarStyle={{ color: "red", fontWeight: "700" }}
              style={{ padding: "0 46px 10px" }}
              defaultActiveKey="1"
            >
              <TabPane tab="项目评分" key="1">
                {scoreData.team ? (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: 0 }}>
                      <span style={{ color: "rgba(0 0 0 0.45)" }}>
                        综合分数：
                      </span>{" "}
                      <span style={{ fontSize: 40, color: "#004FFF " }}>
                        {scoreData.total}
                      </span>{" "}
                    </div>
                    <Button
                      onClick={this.addScore}
                      type="primary"
                      style={{
                        width: 90,
                        borderRadius: "100px",
                        float: "right",
                        position: "absolute",
                        bottom: 0,
                        right: 0
                      }}
                    >
                      修改评分
                    </Button>{" "}
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        团 队：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.team * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.team}
                      </span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        市 场：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.market * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.market}
                      </span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        技 术：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.technology * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.technology}
                      </span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        社 区：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.social * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.social}
                      </span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        通证设计：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.tokenmodel * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.tokenmodel}
                      </span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        项目进度：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.progress * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.progress}
                      </span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                      <span style={{ display: "inline-block", width: 70 }}>
                        融资能力：
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 300,
                          height: 10,
                          background: "#F0F2F5",
                          position: "relative",
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            width: scoreData.financing * 30,
                            background: "#004FFF",
                            height: 10
                          }}
                        />
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 12,
                          fontSize: 16,
                          color: "#004FFF"
                        }}
                      >
                        {scoreData.financing}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: " rgba(0,0,0,0.45)" }}>
                      <span style={{ verticalAlign: "sub" }}>暂无评分</span>{" "}
                      <Button
                        onClick={this.addScore}
                        type="primary"
                        style={{
                          width: 90,
                          borderRadius: "100px",
                          float: "right"
                        }}
                      >
                        添加评分
                      </Button>
                    </p>
                  </div>
                )}

                <Modal
                  title="评分分析"
                  visible={this.state.scoreDataVisible}
                  onOk={this.save.bind(
                    this,
                    "/api/project_detail/update",
                    "score"
                  )}
                  onCancel={this.cancelScoreData}
                  okText="确认"
                  cancelText="取消"
                >
                  <div>
                    <h4>团队（20%）</h4>
                    <ScoreRadioGroup
                      dataKey="team"
                      defaultValue={scoreData.team ? scoreData.team : ""}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4>市场（20%）</h4>
                    <ScoreRadioGroup
                      dataKey="market"
                      defaultValue={scoreData.market ? scoreData.market : ""}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4>技术（20%）</h4>
                    <ScoreRadioGroup
                      dataKey="technology"
                      defaultValue={
                        scoreData.technology ? scoreData.technology : ""
                      }
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4>社区（10%）</h4>
                    <ScoreRadioGroup
                      dataKey="social"
                      defaultValue={scoreData.social ? scoreData.social : ""}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4>通证设计（10%）</h4>
                    <ScoreRadioGroup
                      dataKey="tokenmodel"
                      defaultValue={
                        scoreData.tokenmodel ? scoreData.tokenmodel : ""
                      }
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4>项目进度（10%）</h4>
                    <ScoreRadioGroup
                      dataKey="progress"
                      defaultValue={
                        scoreData.progress ? scoreData.progress : ""
                      }
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4>融资能力（10%）</h4>
                    <ScoreRadioGroup
                      dataKey="financing"
                      defaultValue={
                        scoreData.financing ? scoreData.financing : ""
                      }
                    />
                  </div>

                  <div style={{ position: "absolute", right: 15, top: 50 }}>
                    <span style={{ color: " rgba(0,0,0,0.45);" }}>
                      综合分数：
                    </span>{" "}
                    <span style={{ fontSize: 40, color: "#004FFF " }}>
                      {scoreData.total}
                    </span>{" "}
                  </div>
                </Modal>
              </TabPane>
            </Tabs>
          </div>
          {/**详情页ICO部分 */}

          <div
            style={{
              position: "relative",
              minHeight: "200px",
              border: "20px solid  #F0F2F5"
            }}
          >
            <Tabs style={{ padding: "0 46px 10px" }} defaultActiveKey="1">
              <TabPane tab="ICO信息" key="1">
               
              </TabPane>
            </Tabs>
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
              
              </TabPane>
              <TabPane tab="推荐人介绍" key="2">
            
              </TabPane>
            </Tabs>
          </div>

          {/**详情页交易记录部分 */}

          <Deal
            getFundData={this.getFundData}
            project_id={infData.project_id}
            token_symbol={infData.token_symbol}
            data={dealData}
          />
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
            <TabPane tab="ICO信息" key="0">
            
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
            {this.state.editICO ? (
              <span
                onClick={this.save.bind(
                  this,
                  "/api/project_detail/update",
                  "ICO"
                )}
              >
                保存
              </span>
            ) : (
              <span onClick={this.changeEditICO}>编辑</span>
            )}
            ]
          </div>
          <div>
            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                开始时间：
              </span>
              {this.state.editICO ? (
                <div style={{ display: "inline-block" }}>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="开始时间"
                    defaultValue={
                      ICOData.start_time
                        ? moment(ICOData.start_time, "YYYY-MM-DD h:mm")
                        : ""
                    }
                    onChange={this.changeICOTime.bind(this, "start_time")}
                  />
                </div>
              ) : (
                <span>{ICOData.start_time}</span>
              )}
            </div>
            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                结束时间：
              </span>

              {this.state.editICO ? (
                <div style={{ display: "inline-block" }}>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="结束时间"
                    defaultValue={
                      ICOData.start_time
                        ? moment(ICOData.end_time, "YYYY-MM-DD h:mm")
                        : ""
                    }
                    onChange={this.changeICOTime.bind(this, "end_time")}
                  />
                </div>
              ) : (
                <span>{ICOData.end_time}</span>
              )}
            </div>
            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                代币总量：
              </span>
              {this.state.editICO ? (
                <Input
                  style={{ width: 160, marginRight: 340 }}
                  onChange={this.ICOChange.bind(this, "coin_total")}
                  defaultValue={ICOData.coin_total}
                />
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    width: 160,
                    marginRight: 340
                  }}
                >
                  {ICOData.coin_total}
                </span>
              )}

              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                平 台：
              </span>
              {this.state.editICO ? (
                <Input
                  style={{ width: 160 }}
                  onChange={this.ICOChange.bind(this, "platform")}
                  defaultValue={ICOData.platform}
                />
              ) : (
                <span style={{ display: "inline-block", width: 160 }}>
                  {ICOData.platform}
                </span>
              )}
            </div>
            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                流通量：
              </span>
              {this.state.editICO ? (
                <Input
                  style={{ width: 160, marginRight: 340 }}
                  onChange={this.ICOChange.bind(this, "circulate_num")}
                  defaultValue={ICOData.circulate_num}
                />
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    width: 160,
                    marginRight: 340
                  }}
                >
                  {ICOData.circulate_num}
                </span>
              )}

              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                接受代币：
              </span>
              {this.state.editICO ? (
                <Input
                  style={{ width: 160 }}
                  onChange={this.ICOChange.bind(this, "accept_coin")}
                  defaultValue={ICOData.accept_coin}
                />
              ) : (
                <span style={{ display: "inline-block", width: 160 }}>
                  {ICOData.accept_coin}
                </span>
              )}
            </div>

            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                流通比例：
              </span>

              <span
                style={{
                  display: "inline-block",
                  width: 160,
                  marginRight: 340
                }}
              >
                {this.state.circulateData}
              </span>

              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                限制地区：
              </span>
              {this.state.editICO ? (
                <Input
                  style={{ width: 160 }}
                  onChange={this.ICOChange.bind(this, "limit_zone")}
                  defaultValue={ICOData.limit_zone}
                />
              ) : (
                <span style={{ display: "inline-block", width: 160 }}>
                  {ICOData.limit_zone}
                </span>
              )}
            </div>

            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                软 顶：
              </span>

              {this.state.editICO ? (
                <Input
                  style={{ width: 160, marginRight: 340 }}
                  onChange={this.ICOChange.bind(this, "sorf_cap")}
                  defaultValue={ICOData.sorf_cap}
                />
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    width: 160,
                    marginRight: 340
                  }}
                >
                  {ICOData.sorf_cap}
                </span>
              )}

              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                是否KYC：
              </span>
              {this.state.editICO ? (
                <RadioGroup
                  onChange={this.ICOChange.bind(this, "is_kyc")}
                  defaultValue={ICOData.is_kyc}
                >
                  <Radio value={"YES"}>YES</Radio>
                  <Radio value={"NO"}>NO</Radio>
                </RadioGroup>
              ) : (
                <span style={{ display: "inline-block", width: 160 }}>
                  {ICOData.is_kyc}
                </span>
              )}
            </div>
            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                硬 顶：
              </span>

              {this.state.editICO ? (
                <Input
                  style={{ width: 160, marginRight: 340 }}
                  onChange={this.ICOChange.bind(this, "hard_cap")}
                  defaultValue={ICOData.hard_cap}
                />
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    width: 160,
                    marginRight: 340
                  }}
                >
                  {ICOData.hard_cap}
                </span>
              )}

              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                是否AML:
              </span>
              {this.state.editICO ? (
                <RadioGroup
                  onChange={this.ICOChange.bind(this, "is_aml")}
                  defaultValue={ICOData.is_aml}
                >
                  <Radio value={"YES"}>YES</Radio>
                  <Radio value={"NO"}>NO</Radio>
                </RadioGroup>
              ) : (
                <span style={{ display: "inline-block", width: 160 }}>
                  {ICOData.is_aml}
                </span>
              )}
            </div>

            <div
              style={{ margin: "5px 0", height: 34, lineHeight: "34px" }}
            >
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                兑换比例：
              </span>

              {this.state.editICO ? (
                <Input
                  style={{ width: 160, marginRight: 340 }}
                  onChange={this.ICOChange.bind(this, "ratio")}
                  defaultValue={ICOData.ratio}
                />
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    width: 160,
                    marginRight: 340
                  }}
                >
                  {ICOData.ratio}
                </span>
              )}
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  display: "inline-block",
                  width: 70
                }}
              >
                ICO状态：
              </span>
              <span
                style={{
                  display: "inline-block"
                }}
              >
                {ICOData.is_ing}
              </span>
            </div>
          </div>
            </TabPane>


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
                {/*  <div
                  onClick={this.addTeam}
                  style={{
                    width: "100%",
                    height: 32,
                    lineHeight: "32px",
                    textAlign: "center",
                    color: "#004FFF",
                    border: "1px dashed #D9D9D9",
                    cursor: "pointer"
                  }}
                >
                  + 添加
                </div>*/}
                {/* {teamIntroduceData.length!=0
                  ? teamIntroduceData.map((item, index) => {
                      return (
                        <Team
                          data={item}
                          idnum={index}
                          del={this.delTeam}
                          beforeUpload={this.beforeUpload}
                        />
                      );
                    })
                  : ""}*/}
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
                          overflow: "hidden"
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
                    <h3 style={{ fontSize: 16, fontWeight: "600" }}>备注</h3>
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
                            href={item.download_url}
                          >
                            {"预览"}
                          </a>{" "}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </TabPane>
              <TabPane tab="相关联系人" key="5">
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
<TabPane  tab="推荐人介绍" key="6">

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
        </div>
      </Spin>
    );
  }
}
