import React, { Component } from "react";
import { Breadcrumb, Radio, Table, message, Spin } from "antd";

import axios from "../../../api/api";
import Item from "./item";
import "./style.css";
export default class Investmentlayout extends Component {
  state = {
    Radiodom: [],
    item: [],
    tagdata: {},
    num: 1,
    industry: [],
    loading: false,
    next: "",
    loading: false,
    add: ""
  };

  componentDidMount = () => {
    let tag = [];
    axios
      .get("/api/category/get")
      .then(json => {
        if (json.status === 200 && json.data.code === 0) {
          console.log(json);
          let data = json.data.data;
          let Radiodom = data.map(item => {
            return (
              <div
                style={{
                  display: "inline-block",
                  width: "100px",
                  textAlign: "left",
                  marginRight: "10px",
                  marginBottom: "16px"
                }}
              >
                <Radio.Button
                  style={{
                    height: "18px",
                    lineHeight: "18px",
                    borderRadius: "6px",
                    border: "none"
                  }}
                  value={item.name}
                >
                  {item.name}
                </Radio.Button>
              </div>
            );
          });
          this.setState({
            Radiodom: Radiodom,
            industry: data
          });
          // 数据初始化
          axios
            .get("/api/investment_layout/get")
            .then(json => {
              if (json.status === 200 && json.data.code === 0) {
                let data = json.data.data.data;

                let item = data.map(item => {
                  return (
                    <Item
                      edit={false}
                      defaultValue={item}
                      changeValue={item}
                      industry={this.state.industry}
                      del={this.del}
                      changedata={this.changedata}
                    />
                  );
                });
                this.setState({
                  item: item,
                  next: json.data.data.next_page_url
                });
              } else {
                message.error("网络错误，请刷新重试", [1]);
              }
            })
            .catch(e => {
              message.error("网络错误，请刷新重试", [1]);
            });
        } else {
          message.error("网络错误，请刷新重试", [1]);
        }
      })
      .catch(() => {
        message.error("网络错误，请刷新重试", [1]);
      });
    axios
      .get("/api/investment_layout/get_by_category")
      .then(json => {
        if (json.status === 200 && json.data.code === 0) {
          this.setState({
            tagdata: json.data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  changedata = fig => {
    if (fig) {
      axios
        .get("/api/investment_layout/get_by_category")
        .then(json => {
          if (json.status === 200 && json.data.code === 0) {
            this.setState({
              tagdata: json.data.data
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  afteradd = fig => {
    console.log(fig);
    if (fig) {
      axios
        .get("/api/investment_layout/get")
        .then(json => {
          if (json.status === 200 && json.data.code === 0) {
            console.log(json);
            let data = json.data.data.data;
            console.log(data);
            let item = data.map(item => {
              return (
                <Item
                  edit={false}
                  defaultValue={item}
                  changeValue={item}
                  industry={this.state.industry}
                  del={this.del}
                  changedata={this.changedata}
                />
              );
            });
            this.setState({
              item: item,
              next: json.data.data.next_page_url
            });
          } else {
            message.error("网络错误，请刷新重试", [1]);
          }
        })
        .catch(e => {
          message.error("网络错误，请刷新重试", [1]);
        });
    }
  };
  del = id => {
    console.log(id);
    let item = this.state.item;
    if (id) {
      console.log(item);
      let newitem = item.filter(item => {
        return item.props.defaultValue.id !== id;
      });
      this.setState({
        item: newitem
      });
    } else {
      let newitem = item.filter((item, index) => {
        return index !== 0;
      });
      this.setState({
        item: newitem
      });
    }

    axios
      .get("/api/investment_layout/get_by_category")
      .then(json => {
        if (json.status === 200 && json.data.code === 0) {
          console.log(json);
          this.setState({
            tagdata: json.data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  addItem = () => {
    let itemList = this.state.item.concat();
    this.setState({
      item: []
    });

    let defdata = {
      category_id: 1,
      id: "",
      img: "",
      link: "",
      summary: "",
      title: "",
      token_symbol: ""
    };
    let newdom = [
      <Item
        edit={true}
        defaultValue={defdata}
        changeValue={defdata}
        industry={this.state.industry}
        afteradd={this.afteradd}
        del={this.del}
        changedata={this.changedata}
      />
    ];
    itemList = newdom.concat(itemList);
    setTimeout(() => {
      this.setState({
        item: itemList
      });
    }, 10);
  };
  more = () => {
    let next = this.state.next;
    let olditem = this.state.item;
    if (next) {
      this.setState({
        loading: true
      });
      axios
        .get(next)
        .then(json => {
          if (json.status === 200 && json.data.code === 0) {
            console.log(json);
            let data = json.data.data.data;
            console.log(data);
            let item = data.map(item => {
              return (
                <Item
                  edit={false}
                  defaultValue={item}
                  changeValue={item}
                  industry={this.state.industry}
                  del={this.del}
                  changedata={this.changedata}
                />
              );
            });
            let newdata = olditem.concat(item);
            this.setState({
              item: newdata,
              next: json.data.data.next_page_url,
              loading: false
            });
          } else {
            message.error("网络错误，请刷新重试", [1]);
          }
        })
        .catch(e => {
          message.error("网络错误，请刷新重试", [1]);
        });
    }
  };
  tagchange = e => {
    this.setState({
      loading: true
    });
    if (e.target.value === "all") {
      axios
        .get("/api/investment_layout/get")
        .then(json => {
          if (json.status === 200 && json.data.code === 0) {
            this.setState({
              item: []
            });
            let data = json.data.data.data;

            let item = data.map(item => {
              return (
                <Item
                  edit={false}
                  defaultValue={item}
                  changeValue={item}
                  industry={this.state.industry}
                  del={this.del}
                  changedata={this.changedata}
                />
              );
            });
            this.setState({
              item: item,
              next: json.data.data.next_page_url,
              loading: false
            });
          } else {
            message.error("网络错误，请刷新重试", [1]);
          }
        })
        .catch(e => {
          message.error("网络错误，请刷新重试", [1]);
        });
    } else {
      console.log(e.target.value);
      let data = this.state.tagdata[e.target.value];
      console.log(data);
      if (data) {
        this.setState({
          next: "",
          item: []
        });
        let item = data.map(item => {
          return (
            <Item
              edit={false}
              defaultValue={item}
              changeValue={item}
              industry={this.state.industry}
              del={this.del}
              changedata={this.changedata}
            />
          );
        });
        setTimeout(() => {
          this.setState({
            item: item,
            loading: false
          });
        }, 200);

        console.log(this.state.item);
      } else {
        message.warning("暂无数据", [1]);
        this.setState({
          loading: false,
          item: [
            <p
              style={{ textAlign: "center", color: "#333", marginTop: "20px" }}
            >
              暂无数据
            </p>
          ],
          next: ""
        });
      }
    }
  };
  render = () => {
    return (
      <Spin spinning={this.state.loading}>
        <div id="investment">
          <div
            style={{
              padding: "16px 32px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>投资布局</Breadcrumb.Item>
            </Breadcrumb>

            <h3
              style={{
                margin: "16px 0 0 0",
                fontSize: "20px",
                fontWeight: "600"
              }}
            >
              投资列表
            </h3>
          </div>

          <div style={{ background: "#F0F2F5", padding: "20px" }}>
            <div
              style={{
                background: "#fff",
                overflow: "hidden",
                padding: "24px 36px 10px"
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "7%",
                  verticalAlign: "top"
                }}
              >
                所属类目:
              </div>
              <div style={{ display: "inline-block", width: "93%" }}>
                <Radio.Group
                  onChange={this.tagchange}
                  defaultValue="all"
                  buttonStyle="solid"
                >
                  <div
                    style={{
                      display: "inline-block",
                      width: "100px",
                      textAlign: "left",
                      marginRight: "10px",
                      marginBottom: "16px"
                    }}
                  >
                    <Radio.Button
                      style={{
                        height: "18px",
                        lineHeight: "18px",
                        borderRadius: "6px",
                        border: "none"
                      }}
                      value={"all"}
                    >
                      {"全部"}
                    </Radio.Button>
                  </div>
                  {this.state.Radiodom}
                </Radio.Group>
              </div>
            </div>
            <div
              style={{
                padding: "20px 36px",
                background: "#fff",
                marginTop: "20px"
              }}
            >
              <div
                onClick={this.addItem}
                style={{
                  border: "1px dashed #D9D9D9",
                  width: "100%",
                  height: "32px",
                  lineHeight: "32px",
                  textAlign: "center",
                  color: "#004FFF",
                  fontSize: "14px"
                }}
              >
                <span>+ 添加</span>
              </div>
              <div>{this.state.add}</div>
              <div>{this.state.item}</div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#004FFF"
                }}
              >
                {" "}
                {this.state.next ? (
                  <span onClick={this.more} style={{ cursor: "pointer" }}>
                    加载更多
                  </span>
                ) : (
                  ""
                )}{" "}
              </p>
            </div>
          </div>
        </div>
      </Spin>
    );
  };
}
