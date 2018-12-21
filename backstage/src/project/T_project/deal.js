import React, { Component } from "react";
import {
  Tabs,
  Button,
  Modal,
  Select,
  DatePicker,
  Input,
  message,
  Radio,
  Checkbox
} from "antd";
import "./deal.css";
import axios from "../../api/api";
import qs from "qs";
import moment from "moment";

import Investmenticon from "../../img/project/Investmenticon.png";
import Backicon from "../../img/project/Backicon.png";
import sellicon from "../../img/project/sellicon.png";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class Record extends Component {
  state = {
    edit: false,
    show: false,
    showTxt: "展开",
    ifClick: true,
    showClassname: "",
    showDomClassname: "",
    data: this.props.data
  };

  componentWillReceiveProps = props => {
    if (this.props != props) {
      this.setState({
        data: props.data
      });
      this.props = props;
    }
  };
  animateDown = () => {
    this.setState({
      ifClick: false
    });
    let show = this.state.show;
    if (show) {
      this.setState({
        show: false,
        showTxt: "展开",
        ifClick: true,
        showClassname: "yss_up",
        showDomClassname: "yss_downDom"
      });
    } else {
      this.setState({
        show: true,
        showTxt: "收起",
        ifClick: true,
        showClassname: "yss_down"
      });
    }
  };

  investDel = id => {
    confirm({
      title: "确认删除此条记录？",
      content: "",
      onOk: () => {
        axios
          .get("/api/found_project/delete?id=" + id)
          .then(json => {
            if (json.data.code === 0) {
              message.success("删除成功");
              this.props.getFundData(this.props.project_id);
            } else {
              message.success("删除失败");
              this.props.getFundData(this.props.project_id);
            }
          })
          .catch(err => {
            console.log(err);
            this.props.getFundData(this.props.project_id);
          });
      },
      onCancel: () => {}
    });
  };
  render() {
    const data = this.state.data;
    return (
      <div
        style={{
          marginLeft: 28,
          padding: "10px 18px",
          background: "rgba(0,79,255,0.05)",
          marginTop: 10,
          position: "relative"
        }}
      >
        <div>
          <span>投资阶段：{data.invest_stage}</span>
          <div style={{ float: "right" }}>
            <span
              onClick={this.investDel.bind(this, data.id)}
              style={{ color: "#F5222D", marginRight: 10 }}
            >
              [ 删除 ]
            </span>
            {
              <span
                onClick={
                  this.props.showModal
                    ? this.props.showModal.bind(this, "investVisible", data)
                    : ""
                }
                style={{ color: "#004FFF" }}
              >
                [ 编辑 ]
              </span>
            }
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>投资主体：</span>
            <span style={{ color: "#004FFF" }}>{data.name}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span>打币时间：</span>
            <span>{data.pay_coin_time} </span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>投资数额：</span>
            <span style={{ color: "#004FFF" }}>
              {data.total_price + data.unit}
            </span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span>兑换比例：</span>
            <span>
              1 {data.unit} = {data.num / data.total_price}
              {this.props.token_symbol}{" "}
            </span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>应回币数量：</span>
            <span style={{ color: "#004FFF" }}>
              {data.num + this.props.token_symbol}
            </span>
          </div>
        </div>
        <div
          className={this.state.showDomClassname}
          style={
            this.state.show
              ? { display: "block" }
              : { display: "none", maxHeight: 0 }
          }
        >
          <div>
            <div style={{ width: 300, display: "inline-block" }}>
              <span>打币人： </span>
              <span>{data.pay_coin_name}</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <span>打币地址：</span>
              <span>{data.pay_coin_address}</span>
            </div>
          </div>

          <div>
            <div style={{ width: 300, display: "inline-block" }}>
              <span>打币TX: </span>
              <span>{data.pay_coin_tx}</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <span>打币TX: </span>
              <span>{data.pay_coin_tx}</span>
            </div>
          </div>

          <div>
            <div style={{ width: 300, display: "inline-block" }}>
              <span>折扣/奖金备注：</span>
              <span>{data.pay_coin_tx}</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <span>锁仓机制备注：</span>
              <span>{data.lock_note}</span>
            </div>
          </div>
        </div>
        <div
          onClick={this.state.ifClick ? this.animateDown : ""}
          style={{
            position: "absolute",
            right: 24,
            bottom: 10,
            color: "rgba(0,0,0,0.65)"
          }}
        >
          {this.state.showTxt}
          <span
            className={this.state.showClassname}
            style={{
              fontSize: 12,
              display: "inline-block",
              verticalAlign: "bottom"
            }}
          >
            ▼
          </span>
        </div>
      </div>
    );
  }
}

// 回币记录

class Back extends Component {
  state = {
    edit: false,
    show: false,
    data: this.props.data
  };

  componentWillReceiveProps = props => {
    if (this.props != props) {
      this.setState({
        data: props.data
      });
      this.props = props;
    }
  };
  investDel = id => {
    confirm({
      title: "确认删除此条记录？",
      content: "",
      onOk: () => {
        axios
          .get("/api/found_project/delete?id=" + id)
          .then(json => {
            if (json.data.code === 0) {
              message.success("删除成功");
              this.props.getFundData(this.props.project_id);
            } else {
              message.success("删除失败");
              this.props.getFundData(this.props.project_id);
            }
          })
          .catch(err => {
            console.log(err);
            this.props.getFundData(this.props.project_id);
          });
      },
      onCancel: () => {}
    });
  };
  render() {
    const data = this.state.data;
    return (
      <div
        style={{
          marginLeft: 28,
          padding: "10px 18px",
          background: "rgba(250,140,22,0.05)",
          marginTop: 10,
          position: "relative"
        }}
      >
        <div>
          <span>回币时间：{data.pay_coin_time}</span>
          <div style={{ float: "right" }}>
            <span
              onClick={this.investDel.bind(this, data.id)}
              style={{ color: "#F5222D", marginRight: 10 }}
            >
              [ 删除 ]
            </span>
            {
              <span
                onClick={
                  this.props.showModal
                    ? this.props.showModal.bind(this, "backtokenVisible", data)
                    : ""
                }
                style={{ color: "#004FFF" }}
              >
                [ 编辑 ]
              </span>
            }
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>回币数量： </span>
            <span style={{ color: "#004FFF" }}>
              {data.num}
              {this.props.token_symbol}
            </span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>回币地址：</span>
            <span style={{ color: "#004FFF" }}>{data.pay_coin_address}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span> 确认人：</span>
            {data.confirm_name}
          </div>
        </div>
      </div>
    );
  }
}

class Sell extends Component {
  state = {
    edit: false,
    show: false,
    data: this.props.data
  };

  componentWillReceiveProps = props => {
    if (this.props != props) {
      this.setState({
        data: props.data
      });
      this.props = props;
    }
  };
  investDel = id => {
    confirm({
      title: "确认删除此条记录？",
      content: "",
      onOk: () => {
        axios
          .get("/api/found_project/delete?id=" + id)
          .then(json => {
            if (json.data.code === 0) {
              message.success("删除成功");
              this.props.getFundData(this.props.project_id);
            } else {
              message.success("删除失败");
              this.props.getFundData(this.props.project_id);
            }
          })
          .catch(err => {
            console.log(err);
            this.props.getFundData(this.props.project_id);
          });
      },
      onCancel: () => {}
    });
  };
  render() {
    const data = this.state.data;
    return (
      <div
        style={{
          marginLeft: 28,
          padding: "10px 18px",
          background: "rgba(250,140,22,0.05)",
          marginTop: 10,
          position: "relative"
        }}
      >
        <div>
          <span>卖出时间：{data.pay_coin_time}</span>
          <div style={{ float: "right" }}>
            <span
              onClick={this.investDel.bind(this, data.id)}
              style={{ color: "#F5222D", marginRight: 10 }}
            >
              [ 删除 ]
            </span>
            {
              <span
                onClick={
                  this.props.showModal
                    ? this.props.showModal.bind(this, "sellVisible", data)
                    : ""
                }
                style={{ color: "#004FFF" }}
              >
                [ 编辑 ]
              </span>
            }
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>卖出数量： </span>
            <span style={{ color: "#004FFF" }}>{data.num}</span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>获得代币：</span>
            <span style={{ color: "#004FFF" }}>{data.total_price}</span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>回归主体：</span>
            <span style={{ color: "#004FFF" }}>{data.name}</span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>获币地址： </span>
            <span style={{ color: "#004FFF" }}>{data.pay_coin_address}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default class Deal extends Component {
  state = {
    upDataId: "",
    investVisible: false,
    backtokenVisible: false,
    sellVisible: false,
    investData: {
      buy: [],
      back: [],
      rate: "",
      sell: []
    },
    modData: [],
    backmodData: [],
    sellmodData: [],
    investuplodaData: {
      invest_stage: "基石",
      found_id: 1
    },
    backtokenuplodaData: {},
    selluplodaData: {}
  };

  componentDidMount = () => {
    this.setState({
      investData: this.props.data
    });
  };
  componentWillReceiveProps = props => {
    console.log(this.props);
    if (this.props !== props) {
      if (props.data.buy) {
        this.setState({
          investData: props.data
        });
      }
      this.props = props;
    }
  };

  showModal = (key, data = {}) => {
    console.log(data);

    if (data.id) {
      this.setState({
        upDataId: data.id,
        nowNum: data.num,
        nowtotal_price: data.total_price
      });
    } else {
      this.setState({
        upDataId: ""
      });
    }

    switch (key) {
      case "investVisible":
        axios
          .get("/api/found_project/buy_info")
          .then(json => {
            if (json.data.code === 0) {
              this.setState({
                modData: json.data.data,
                investVisible: true,
                investuplodaData: data
              });
            }
          })
          .catch(() => {});

        break;
      case "backtokenVisible":
        axios
          .get(
            "/api/found_project/back_info?project_id=" + this.props.project_id
          )
          .then(json => {
            if (json.data.code === 0) {
              this.setState({
                backmodData: json.data.data,
                backtokenVisible: true,
                backtokenuplodaData: data
              });
            }
          })
          .catch(() => {});

        break;
      case "sellVisible":
        axios
          .get(
            "/api/found_project/sell_info?project_id=" + this.props.project_id
          )
          .then(json => {
            if (json.data.code === 0) {
              this.setState({
                sellmodData: json.data,
                sellVisible: true,
                selluplodaData: data
              });
            }
          })
          .catch(() => {});

        break;
      default:
        break;
    }
  };

  inputChange = (key, e) => {
    let data = this.state.investuplodaData;
    data[key] = e.target.value;
    this.setState({
      investuplodaData: data
    });
  };
  backtokenuplodaDataChange = (key, e) => {
    let data = this.state.backtokenuplodaData;
    data[key] = e.target.value;
    this.setState({
      backtokenuplodaData: data
    });
  };

  modeOk = key => {
    console.log(this.state.upDataId);
    if (this.state.upDataId) {
      let uplodaData = {};
      let FromData = {};
      switch (key) {
        case "investVisible":
          uplodaData = this.state.investuplodaData;

          const tokenCurrency = this.state.modData.filter(item => {
            if (item.id == uplodaData.found_id) {
              return item;
            }
          });

          if (!uplodaData.pay_coin_time) {
            message.error("请填写打币时间");
            return;
          }
          if (!uplodaData.total_price) {
            message.error("请填写投资数额");
            return;
          }

          if (
            tokenCurrency[0].rest_num + parseInt(this.state.nowtotal_price) <
            uplodaData.total_price
          ) {
            message.error("投资超额");
            return;
          }
          if (!uplodaData.num) {
            message.error("请填写应回币数量");
            return;
          }
          FromData = qs.stringify(uplodaData);
          axios
            .post("/api/found_project/update_buy", FromData)
            .then(json => {
              if (json.data.code === 0) {
                message.success("更新成功", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  investVisible: false
                });
              } else {
                message.error("更新失败", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  investVisible: false
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                investVisible: false
              });
              this.props.getFundData(this.props.project_id);
            });
          break;
        case "backtokenVisible":
          uplodaData = this.state.backtokenuplodaData;
          const backmodData = this.state.backmodData;
          uplodaData.project_id = this.props.project_id;

          if (!uplodaData.pay_coin_time) {
            message.error("请填写回币时间");
            return;
          }
          if (!uplodaData.num) {
            message.error("请填写回币数量");
            return;
          }
          if (backmodData.rest + parseInt(this.state.nowNum) < uplodaData.num) {
            message.error("回币超额");
            return;
          }

          FromData = qs.stringify(uplodaData);
          axios
            .post("/api/found_project/update_back", FromData)
            .then(json => {
              if (json.data.code === 0) {
                message.success("更新成功", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              } else {
                message.error("更新失败", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                backtokenVisible: false
              });
              this.props.getFundData(this.props.project_id);
            });

          break;
        case "sellVisible":
          uplodaData = this.state.selluplodaData;

          const sellmodData = this.state.sellmodData;

          var backNum = 0;
          if (uplodaData.info && uplodaData.info.length > 0) {
            for (let index = 0; index < uplodaData.info.length; index++) {
              backNum += parseInt(uplodaData.info[index].num);
            }
          }
          uplodaData.project_id = this.props.project_id;
          if (!uplodaData.pay_coin_time) {
            message.error("请填写卖出时间");
            return;
          }
          if (!uplodaData.num) {
            message.error("请填写卖出数量");
            return;
          }
          if (sellmodData.num_info.rest_num < uplodaData.num) {
            message.error("卖出超额");
            return;
          }
          if (!uplodaData.info) {
            message.error("请填写回归主体金额");
            return;
          }
          if (uplodaData.num != backNum) {
            message.error("回归主体金额必须等于回币数量");
            return;
          }
          let jsonData = JSON.stringify(uplodaData.info);
          uplodaData.info = jsonData;
          let UPdata = uplodaData;
          delete UPdata.getNum;
          delete UPdata.selectMain;
          delete UPdata.selectToken;
          axios
            .post("/api/found_project/sell", qs.stringify(UPdata))
            .then(json => {
              if (json.data.code === 0) {
                message.success("更新成功", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              } else {
                message.error("更新失败", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                backtokenVisible: false
              });
              this.props.getFundData(this.props.project_id);
            });

          this.setState({
            sellVisible: false
          });
          break;
        default:
          break;
      }
    } else {
      let uplodaData = {};
      let FromData = {};
      switch (key) {
        case "investVisible":
          uplodaData = this.state.investuplodaData;
          const tokenCurrency = this.state.modData.filter(item => {
            if (item.id == uplodaData.found_id) {
              return item;
            }
          });

          if (!uplodaData.pay_coin_time) {
            message.error("请填写打币时间");
            return;
          }
          if (!uplodaData.total_price) {
            message.error("请填写投资数额");
            return;
          }

          if (tokenCurrency[0].rest_num < uplodaData.total_price) {
            message.error("投资超额");
            return;
          }
          if (!uplodaData.num) {
            message.error("请填写应回币数量");
            return;
          }
          FromData = qs.stringify(uplodaData);
          axios
            .post("/api/found_project/buy", FromData)
            .then(json => {
              if (json.data.code === 0) {
                message.success("添加成功", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  investVisible: false
                });
              } else {
                message.error("添加失败", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  investVisible: false
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                investVisible: false
              });
              this.props.getFundData(this.props.project_id);
            });
          break;
        case "backtokenVisible":
          uplodaData = this.state.backtokenuplodaData;
          const backmodData = this.state.backmodData;
          uplodaData.project_id = this.props.project_id;

          if (!uplodaData.pay_coin_time) {
            message.error("请填写回币时间");
            return;
          }
          if (!uplodaData.num) {
            message.error("请填写回币数量");
            return;
          }
          if (backmodData.rest < uplodaData.num) {
            message.error("回币超额");
            return;
          }

          FromData = qs.stringify(uplodaData);
          axios
            .post("/api/found_project/back", FromData)
            .then(json => {
              if (json.data.code === 0) {
                message.success("添加成功", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              } else {
                message.error("添加失败", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                backtokenVisible: false
              });
              this.props.getFundData(this.props.project_id);
            });

          break;
        case "sellVisible":
          uplodaData = this.state.selluplodaData;
          console.log(uplodaData);
          const sellmodData = this.state.sellmodData;

          var backNum = 0;
          if (uplodaData.info && uplodaData.info.length > 0) {
            for (let index = 0; index < uplodaData.info.length; index++) {
              backNum += parseInt(uplodaData.info[index].num);
            }
          }
          uplodaData.project_id = this.props.project_id;
          if (!uplodaData.pay_coin_time) {
            message.error("请填写卖出时间");
            return;
          }
          if (!uplodaData.num) {
            message.error("请填写卖出数量");
            return;
          }
          if (sellmodData.num_info.rest_num < uplodaData.num) {
            message.error("卖出超额");
            return;
          }
          if (!uplodaData.info) {
            message.error("请填写回归主体金额");
            return;
          }
          console.log(uplodaData);

          if (uplodaData.num != backNum) {
            message.error("回归主体金额必须等于卖出数量");
            return;
          }
          let jsonData = JSON.stringify(uplodaData.info);
          uplodaData.info = jsonData;
          let UPdata = uplodaData;
          UPdata.total_price = UPdata.getNum;
          delete UPdata.getNum;
          delete UPdata.selectMain;
          delete UPdata.selectToken;
          axios
            .post("/api/found_project/sell", qs.stringify(UPdata))
            .then(json => {
              if (json.data.code === 0) {
                message.success("添加成功", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              } else {
                message.error("添加失败", [1]);
                this.props.getFundData(this.props.project_id);
                this.setState({
                  backtokenVisible: false
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                backtokenVisible: false
              });
              this.props.getFundData(this.props.project_id);
            });

          this.setState({
            sellVisible: false
          });
          break;
        default:
          break;
      }
    }
  };

  modeCancel = key => {
    this.setState({
      upDataId: "",
      nowNum: 0,
      nowtotal_price: 0
    });
    switch (key) {
      case "investVisible":
        this.setState({
          investVisible: false
        });
        break;
      case "backtokenVisible":
        this.setState({
          backtokenVisible: false
        });
        break;
      case "sellVisible":
        this.setState({
          sellVisible: false
        });
        break;
      default:
        break;
    }
  };

  stageChange = e => {
    let data = this.state.investuplodaData;
    data.invest_stage = e;
    this.setState({
      investuplodaData: data
    });
  };
  electChange = e => {
    let data = this.state.investuplodaData;
    data.found_id = e;
    this.setState({
      investuplodaData: data
    });
  };
  dateOnchange = (value, str) => {
    let data = this.state.investuplodaData;
    data["pay_coin_time"] = str;
    this.setState({
      investuplodaData: data
    });
  };
  //  回币相关数据获取
  backDatechange = (value, str) => {
    let data = this.state.backtokenuplodaData;
    data["pay_coin_time"] = str;
    this.setState({
      backtokenuplodaData: data
    });
  };
  backtokenuplodaDataChange = (key, e) => {
    let data = this.state.backtokenuplodaData;
    data[key] = e.target.value;
    this.setState({
      backtokenuplodaData: data
    });
  };

  // 卖出记录相关

  sellDatechange = (value, str) => {
    let data = this.state.selluplodaData;
    data.pay_coin_time = str;
    this.setState({
      selluplodaData: data
    });
  };

  selluplodaDataChange = (key, e) => {
    let data = this.state.selluplodaData;
    data[key] = e.target.value;
    this.setState({
      selluplodaData: data
    });
  };
  sellchoiceToken = e => {
    let data = this.state.selluplodaData;
    data.selectToken = e.target.value;
    data.selectMain = [];
    this.setState({
      selluplodaData: data
    });
  };
  sellchoiceMain = value => {
    console.log(value);
    let data = this.state.selluplodaData;
    data.selectMain = value;
    this.setState({
      selluplodaData: data
    });
  };
  selluplodaDatainfoChange = (key, e) => {
    let data = this.state.selluplodaData;
    if (!data.info) {
      data.info = [
        {
          found_id: key,
          num: e.target.value
        }
      ];
      this.setState({
        selluplodaData: data
      });
    } else {
      let test = () => {
        var fig = false;
        for (let index = 0; index < data.info.length; index++) {
          if (data.info[index].found_id == key) {
            fig = index;

            break;
          }
        }
        return fig;
      };
      let fig = test();
      if (fig !== false) {
        data.info[fig].num = e.target.value;
      } else {
        data.info = [
          ...data.info,
          {
            found_id: key,
            num: e.target.value
          }
        ];
      }
    }

    console.log(data);
    this.setState({
      selluplodaData: data
    });
  };
  render() {
    const investData = this.state.investData;
    const modData = this.state.modData;
    const investuplodaData = this.state.investuplodaData;
    const backmodData = this.state.backmodData;
    const backtokenuplodaData = this.state.backtokenuplodaData;
    const sellmodData = this.state.sellmodData;
    const selluplodaData = this.state.selluplodaData;
    const tokenCurrency = modData.filter(item => {
      if (item.id == investuplodaData.found_id) {
        return item;
      }
    });
    let sellTokenObj = {};
    let sellTokenArr = [];
    sellmodData.data
      ? (sellTokenArr = sellmodData.data.reduce((cur, next) => {
          sellTokenObj[next.unit]
            ? ""
            : (sellTokenObj[next.unit] = true && cur.push(next));
          return cur;
        }, []))
      : "";
    let sellCheckboxarr =
      sellmodData.data && selluplodaData.selectToken
        ? sellmodData.data.filter(item => {
            return item.unit === selluplodaData.selectToken;
          })
        : "";
    let sellCheckbox = sellCheckboxarr
      ? sellCheckboxarr.map(item => {
          return {
            label: item.name,
            value: item.name + "=" + item.found_id
          };
        })
      : [];
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px"
        }}
      >
        {/* 添加记录弹窗 */}
        <Modal
          title="投资记录"
          visible={this.state.investVisible}
          onOk={this.modeOk.bind(this, "investVisible")}
          okText="确认"
          onCancel={this.modeCancel.bind(this, "investVisible")}
          maskClosable={false}
          destroyOnClose={true}
          width={900}
          cancelText="取消"
          bodyStyle={{ padding: "40px 100px" }}
        >
          <div>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>所投阶段：</span>
            <Select
              defaultValue={investuplodaData.invest_stage}
              style={{ width: 160 }}
              onChange={this.stageChange}
            >
              <Option value="基石">基石</Option>
              <Option value="私募">私募</Option>
              <Option value="公募">公募</Option>
              <Option value="基石第一轮">基石第一轮</Option>
              <Option value="基石第二轮">基石第二轮</Option>
              <Option value="基石第三轮">基石第三轮</Option>
              <Option value="私募第一轮">私募第一轮</Option>
              <Option value="私募第二轮">私募第二轮</Option>
              <Option value="私募第三轮">私募第三轮</Option>
              <Option value="公募第一轮">公募第一轮</Option>
              <Option value="公募第二轮">公募第二轮</Option>
              <Option value="公募第三轮">公募第三轮</Option>
              <Option value="种子轮">种子轮</Option>
              <Option value="天使轮">天使轮</Option>
              <Option value="一个轮">一个轮</Option>
              <Option value="乙轮">乙轮</Option>
              <Option value="上市前">上市前</Option>
              <Option value="预-A轮">预-A轮</Option>
              <Option value="前B轮">前B轮</Option>
              <Option value="前C轮">前C轮</Option>
              <Option value="预D轮">预D轮</Option>
            </Select>
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>投资主体：</span>
            <Select
              defaultValue={investuplodaData.found_id}
              style={{ width: 160 }}
              onChange={this.electChange}
            >
              {modData.map(item => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
            <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 20 }}>
              投资币种：
            </span>
            <span>
              {tokenCurrency.length !== 0 ? tokenCurrency[0].unit : ""}
            </span>
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币时间：</span>
            <DatePicker
              defaultValue={
                investuplodaData.pay_coin_time
                  ? moment(investuplodaData.pay_coin_time, "YYYY-MM-DD HH:mm")
                  : ""
              }
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="选择日期时间"
              onChange={this.dateOnchange}
              onOk={this.dateonOk}
              style={{ width: 160 }}
            />
          </div>
          <div style={{ marginTop: 26 }}>
            <div style={{ display: "inline-block", lineHeight: "34px" }}>
              <span
                style={{
                  color: "#F5222D",
                  verticalAlign: "-webkit-baseline-middle"
                }}
              >
                *
              </span>
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  verticalAlign: "-webkit-baseline-middle"
                }}
              >
                投资数额：
              </span>
            </div>

            <Input
              defaultValue={investuplodaData.total_price}
              onChange={this.inputChange.bind(this, "total_price")}
              type="number"
              style={
                tokenCurrency.length !== 0
                  ? investuplodaData.total_price >
                    tokenCurrency[0].rest_num +
                      parseInt(this.state.nowtotal_price)
                    ? {
                        border: "1px solid #F5222D",
                        borderRadius: "4px",
                        width: 160
                      }
                    : { width: 160 }
                  : {width: 160}
              }
              addonAfter={
                tokenCurrency.length !== 0 ? tokenCurrency[0].unit : ""
              }
            />
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "rgba(0,0,0,0.45)",
                paddingLeft: 78,
                marginTop: 10
              }}
            >
              <span>一期基金总计：</span>
              <span style={{ color: "#004FFF" }}>
                {tokenCurrency.length !== 0 ? tokenCurrency[0].account : ""}
              </span>
              <span>
                {tokenCurrency.length !== 0 ? tokenCurrency[0].unit : ""}
              </span>
              <span style={{ marginLeft: 10 }}>已投：</span>
              <span style={{ color: "#004FFF" }}>
                {tokenCurrency.length !== 0 ? tokenCurrency[0].buy_num : ""}{" "}
              </span>
              <span>
                {tokenCurrency.length !== 0 ? tokenCurrency[0].unit : ""}
              </span>
              <span style={{ marginLeft: 10 }}>剩余可投：</span>
              <span style={{ color: "#004FFF" }}>
                {tokenCurrency.length !== 0
                  ? tokenCurrency[0].rest_num +
                    parseInt(this.state.nowtotal_price)
                  : ""}{" "}
              </span>
              <span>
                {tokenCurrency.length !== 0 ? tokenCurrency[0].unit : ""}
              </span>
            </p>
          </div>

          <div style={{ marginTop: 26, marginLeft: "-14px" }}>
            <div style={{ display: "inline-block", lineHeight: "32px" }}>
              <span style={{ color: "#F5222D" }}>*</span>
              <span style={{ color: "rgba(0,0,0,0.45)" }}>应回币数额：</span>
            </div>

            <Input
              defaultValue={investuplodaData.num}
              onChange={this.inputChange.bind(this, "num")}
              type="number"
              style={{ width: 160 }}
              addonAfter={this.props.token_symbol}
            />
            <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 20 }}>
              兑换比例：
            </span>
            <span>
              {" "}
              <span style={{ color: "#004FFF " }}>1 </span>{" "}
              {tokenCurrency.length !== 0 ? tokenCurrency[0].unit : ""} ={" "}
              {investuplodaData.total_price ? (
                investuplodaData.num ? (
                  <span style={{ color: "#004FFF " }}>
                    {(
                      parseFloat(investuplodaData.num) /
                      parseFloat(investuplodaData.total_price)
                    ).toFixed(2)}{" "}
                  </span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}{" "}
              {this.props.token_symbol}{" "}
            </span>
          </div>

          <div style={{ marginTop: 26, marginLeft: "14px" }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币人：</span>
            <Input
              defaultValue={investuplodaData.pay_coin_name}
              onChange={this.inputChange.bind(this, "pay_coin_name")}
              style={{ width: 160 }}
            />
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币地址：</span>
            <Input
              defaultValue={investuplodaData.pay_coin_address}
              onChange={this.inputChange.bind(this, "pay_coin_address")}
              style={{ width: 280 }}
            />
          </div>

          <div style={{ marginTop: 26, marginLeft: "14px" }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币TX：</span>
            <Input
              defaultValue={investuplodaData.pay_coin_tx}
              onChange={this.inputChange.bind(this, "pay_coin_tx")}
              style={{ width: 280 }}
            />
          </div>

          <div style={{ marginTop: 26, marginLeft: "-32px" }}>
            <span
              style={{
                color: "#F5222D",
                visibility: "hidden",
                verticalAlign: "top"
              }}
            >
              *
            </span>
            <span style={{ color: "rgba(0,0,0,0.45)", verticalAlign: "top" }}>
              折扣/奖金备注：
            </span>
            <TextArea
              defaultValue={investuplodaData.discount_note}
              onChange={this.inputChange.bind(this, "discount_note")}
              style={{ width: "560px" }}
            />
          </div>
          <div style={{ marginTop: 26, marginLeft: "-26px" }}>
            <span
              style={{
                color: "#F5222D",
                visibility: "hidden",
                verticalAlign: "top"
              }}
            >
              *
            </span>
            <span style={{ color: "rgba(0,0,0,0.45)", verticalAlign: "top" }}>
              锁仓机制备注：
            </span>
            <TextArea
              defaultValue={investuplodaData.lock_note}
              onChange={this.inputChange.bind(this, "lock_note")}
              style={{ width: "560px" }}
            />
          </div>
        </Modal>

        {/* 回币弹框*/}
        <Modal
          title="回币记录"
          visible={this.state.backtokenVisible}
          onOk={this.modeOk.bind(this, "backtokenVisible")}
          okText="确认"
          onCancel={this.modeCancel.bind(this, "backtokenVisible")}
          maskClosable={false}
          destroyOnClose={true}
          width={900}
          cancelText="取消"
          bodyStyle={{ padding: "40px 100px" }}
        >
          <div>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>回币时间：</span>
            <DatePicker
              showTime
              defaultValue={
                backtokenuplodaData.pay_coin_time
                  ? moment(
                      backtokenuplodaData.pay_coin_time,
                      "YYYY-MM-DD HH:mm"
                    )
                  : ""
              }
              format="YYYY-MM-DD HH:mm"
              placeholder="选择日期时间"
              onChange={this.backDatechange}
              onOk={this.dateonOk}
              style={{ width: 160 }}
            />
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)", lineHeight: "34px" }}>
              回币数量：
            </span>
            <Input
              defaultValue={backtokenuplodaData.num}
              onChange={this.backtokenuplodaDataChange.bind(this, "num")}
              type="number"
              style={
                Object.keys(backmodData).length != 0
                  ? this.state.backtokenuplodaData.num >
                    parseInt(backmodData.rest) + parseInt(this.state.nowNum)
                    ? {
                        border: "1px solid #F5222D",
                        borderRadius: "4px",
                        width: 160
                      }
                    : { width: 160 }
                  : { width: 160 }
              }
              addonAfter={this.props.token_symbol}
            />
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "rgba(0,0,0,0.45)",
                paddingLeft: 78,
                marginTop: 10
              }}
            >
              <span>应回币：</span>
              <span style={{ color: "#004FFF" }}>
                {Object.keys(backmodData).length != 0
                  ? backmodData.should_back
                  : ""}
              </span>
              <span>{this.props.token_symbol}</span>
              <span style={{ marginLeft: 10 }}>已回币：</span>
              <span style={{ color: "#004FFF" }}>
                {Object.keys(backmodData).length != 0 ? backmodData.back : ""}{" "}
              </span>
              <span>{this.props.token_symbol}</span>
              <span style={{ marginLeft: 10 }}>剩余应回：</span>
              <span style={{ color: "#004FFF" }}>
                {Object.keys(backmodData).length != 0
                  ? parseInt(backmodData.rest) + parseInt(this.state.nowNum)
                  : ""}{" "}
              </span>
              <span>{this.props.token_symbol}</span>
            </p>
          </div>
          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>回币地址：</span>
            <Input
              defaultValue={backtokenuplodaData.pay_coin_address}
              onChange={this.backtokenuplodaDataChange.bind(
                this,
                "pay_coin_address"
              )}
              style={{ width: 280 }}
            />
            <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 60 }}>
              确认人：
            </span>
            <Input
              defaultValue={backtokenuplodaData.confirm_name}
              onChange={this.backtokenuplodaDataChange.bind(
                this,
                "confirm_name"
              )}
              style={{ width: 160 }}
            />
          </div>
        </Modal>

        {/* 卖出弹框*/}
        <Modal
          title="卖出记录"
          visible={this.state.sellVisible}
          onOk={this.modeOk.bind(this, "sellVisible")}
          okText="确认"
          onCancel={this.modeCancel.bind(this, "sellVisible")}
          maskClosable={false}
          destroyOnClose={true}
          width={900}
          cancelText="取消"
          bodyStyle={{ padding: "40px 100px" }}
        >
          <div>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>卖出时间：</span>
            <DatePicker
              showTime
              defaultValue={
                selluplodaData.pay_coin_time
                  ? moment(selluplodaData.pay_coin_time, "YYYY-MM-DD HH:mm")
                  : ""
              }
              format="YYYY-MM-DD HH:mm"
              placeholder="选择日期时间"
              onChange={this.sellDatechange}
              onOk={this.dateonOk}
              style={{ width: 160 }}
            />
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)", lineHeight: "34px" }}>
              卖出数额：
            </span>
            <Input
              defaultValue={selluplodaData.num}
              onChange={this.selluplodaDataChange.bind(this, "num")}
              type="number"
              style={
                Object.keys(selluplodaData).length != 0
                  ? this.state.selluplodaData.num >
                    sellmodData.num_info.total_num
                    ? {
                        border: "1px solid #F5222D",
                        borderRadius: "4px",
                        width: 160
                      }
                    : { width: 160 }
                  : { width: 160 }
              }
              addonAfter={this.props.token_symbol}
            />
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "rgba(0,0,0,0.45)",
                paddingLeft: 78,
                marginTop: 10
              }}
            >
              <span>总计：</span>
              <span style={{ color: "#004FFF" }}>
                {Object.keys(sellmodData).length != 0
                  ? sellmodData.num_info.total_num
                  : ""}
              </span>
              <span>{this.props.token_symbol}</span>
              <span style={{ marginLeft: 10 }}>已卖出：</span>
              <span style={{ color: "#004FFF" }}>
                {Object.keys(sellmodData).length != 0
                  ? sellmodData.num_info.sell_num
                  : ""}{" "}
              </span>
              <span>{this.props.token_symbol}</span>
              <span style={{ marginLeft: 10 }}>剩余可卖：</span>
              <span style={{ color: "#004FFF" }}>
                {Object.keys(sellmodData).length != 0
                  ? sellmodData.num_info.rest_num
                  : ""}{" "}
              </span>
              <span>{this.props.token_symbol}</span>
            </p>
          </div>
          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>兑换币种：</span>

            <RadioGroup onChange={this.sellchoiceToken}>
              {sellTokenArr
                ? sellTokenArr.map((item, index) => {
                    return (
                      <Radio key={index} value={item.unit}>
                        {item.unit}
                      </Radio>
                    );
                  })
                : ""}
            </RadioGroup>
          </div>
          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)", lineHeight: "34px" }}>
              获得数量：
            </span>
            <Input
              defaultValue={selluplodaData.getNum}
              onChange={this.selluplodaDataChange.bind(this, "getNum")}
              type="number"
              style={{ width: 160, marginRight: 20 }}
              addonAfter={selluplodaData.selectToken}
            />
            <span>
              兑换比例： <span style={{ color: "#004FFF" }}>1</span>
              {this.props.token_symbol} =
              <span style={{ color: "#004FFF" }}>
                {" "}
                {selluplodaData.getNum / selluplodaData.num}{" "}
              </span>
              {selluplodaData.selectToken}
            </span>
          </div>

          <div
            style={{
              marginTop: 26,
              display: selluplodaData.selectToken ? "block" : "none"
            }}
          >
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>回归主体：</span>

            <CheckboxGroup
              key={Date.parse(new Date())}
              value={selluplodaData.selectMain}
              options={sellCheckbox}
              onChange={this.sellchoiceMain}
            />
          </div>
          {selluplodaData.selectMain
            ? selluplodaData.selectMain.map(item => {
                let arr = item.split("=");
                console.log(arr);

                return (
                  <div style={{ marginTop: 26 }}>
                    <span style={{ color: "#F5222D" }}>*</span>
                    <span
                      style={{ color: "rgba(0,0,0,0.45)", lineHeight: "34px" }}
                    >
                      {arr[0]}：
                    </span>
                    <Input
                      onChange={this.selluplodaDatainfoChange.bind(
                        this,
                        arr[1]
                      )}
                      type="number"
                      style={{ width: 160, marginRight: 20 }}
                      addonAfter={this.props.token_symbol}
                    />
                  </div>
                );
              })
            : ""}

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)", lineHeight: "34px" }}>
              获币地址：
            </span>
            <Input
              onChange={this.selluplodaDataChange.bind(
                this,
                "pay_coin_address"
              )}
              style={{ width: 280, marginRight: 20 }}
            />
          </div>
        </Modal>

        {/* 投资记录 */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                width: 24,
                height: 24,
                display: "inline-block",
                marginRight: 20,
                verticalAlign: "text-bottom"
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={Investmenticon}
              />
            </div>
            <span style={{ fontSize: 18, fontWeight: "600" }}>投资记录</span>
            <Button
              type="primary"
              onClick={this.showModal.bind(this, "investVisible", {
                invest_stage: "基石",
                found_id: 1,
                project_id: this.props.project_id
              })}
              style={{ width: 76, borderRadius: "100px", float: "right" }}
            >
              +添加
            </Button>
          </div>
          {investData.buy ? (
            investData.buy.length !== 0 ? (
              investData.buy.map((item, index) => {
                return (
                  <Record
                    key={index}
                    showModal={this.showModal}
                    project_id={this.props.project_id}
                    getFundData={this.props.getFundData}
                    data={item}
                    token_symbol={this.props.token_symbol}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                还没有投资记录，请点击右侧按键添加。
              </p>
            )
          ) : (
            <p style={{ textAlign: "center" }}>
              还没有投资记录，请点击右侧按键添加。
            </p>
          )}
        </div>
        {/* 回币记录 */}
        <div style={{ marginTop: 35 }}>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                width: 24,
                height: 24,
                display: "inline-block",

                marginRight: 20,
                verticalAlign: "text-bottom"
              }}
            >
              <img style={{ width: "100%", height: "100%" }} src={Backicon} />
            </div>
            <span style={{ fontSize: 18, fontWeight: "600" }}>
              回币记录
              <span style={{ fontSize: 14, fontWeight: "500" }}>
                (回币进度{investData.rate})
              </span>
            </span>
            <Button
              type="primary"
              onClick={this.showModal.bind(this, "backtokenVisible", {})}
              style={{ width: 76, borderRadius: "100px", float: "right" }}
            >
              +添加
            </Button>
          </div>

          {investData.back ? (
            investData.back.length !== 0 ? (
              investData.back.map((item, index) => {
                return (
                  <Back
                    showModal={this.showModal}
                    project_id={this.props.project_id}
                    getFundData={this.props.getFundData}
                    key={index}
                    data={item}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                还没有回币记录，请点击右侧按键添加。
              </p>
            )
          ) : (
            <p style={{ textAlign: "center" }}>
              还没有回币记录，请点击右侧按键添加。
            </p>
          )}
        </div>
        {/* 卖出记录 */}
        <div style={{ marginTop: 35, marginBottom: 20 }}>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                width: 24,
                height: 24,
                display: "inline-block",
                marginRight: 20,
                verticalAlign: "text-bottom"
              }}
            >
              <img style={{ width: "100%", height: "100%" }} src={sellicon} />
            </div>
            <span style={{ fontSize: 18, fontWeight: "600" }}>卖出记录</span>
            <Button
              type="primary"
              onClick={this.showModal.bind(this, "sellVisible", {})}
              style={{ width: 76, borderRadius: "100px", float: "right" }}
            >
              +添加
            </Button>
          </div>
          {investData.sell ? (
            investData.sell.length !== 0 ? (
              investData.sell.map((item, index) => {
                return (
                  <Sell
                    showModal={this.showModal}
                    getFundData={this.props.getFundData}
                    key={index}
                    data={item}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                还没有卖出记录，请点击右侧按键添加。
              </p>
            )
          ) : (
            <p style={{ textAlign: "center" }}>
              还没有卖出记录，请点击右侧按键添加。
            </p>
          )}
        </div>
      </div>
    );
  }
}
