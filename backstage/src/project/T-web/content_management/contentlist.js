import { Breadcrumb, Button, Table, Modal, message } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/api";
const confirm = Modal.confirm;
class Issue extends Component {
  state = {
    issue: this.props.issue
  };
  data = this.props.data;
  issue = e => {
    let that = this;
    let name = e.target.innerText;
    if (this.data.status === 0) {
      this.data.status = 1;
    } else {
      this.data.status = 0;
    }
    confirm({
      title: `确认要${name}这篇文章吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        axios
          .get("/api/article/pub_cancel", { params: that.data })
          .then(json => {
            console.log(json);
            if (json.status === 200) {
              let issue = that.state.issue;
              if (issue === 0) {
                issue = 1;
                message.success("发布成功", [1]);
              } else {
                issue = 0;
                message.success("撤销成功", [1]);
              }
              that.setState({
                issue: issue
              });
            }
          })
          .catch(err => {});
      },
      onCancel() {}
    });
  };

  render() {
    return (
      <span
        onClick={this.issue}
        style={{ color: "#004FFF", cursor: "pointer" }}
      >
        {this.state.issue ? <span style={{ color: "red" }}>撤销</span> : "发布"}
      </span>
    );
  }
}
export default class Contentlist extends Component {
  state = {
    dataSource: [],
    issue: false,
    total: "",
    loading: false,
    pagenow: 1
  };

  componentDidMount() {
    axios
      .get("/api/article/get")
      .then(json => {
        console.log(json);
        if (json.status === 200 && json.data.code === 0) {
          this.setState({
            dataSource: json.data.data.data,
            total: json.data.data.total
          });
        } else {
          message.error("网络错误，请刷新重试", [1]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  pageonChange = (current, size) => {
    this.setState({
      loading: true,
      dataSource: []
    });

    let data = {
      page: current
    };
    axios
      .get("/api/article/get", { params: data })
      .then(json => {
        if (json.status === 200 && json.data.code === 0) {
          console.log(json.data.data.data);
          this.setState({
            dataSource: json.data.data.data,
            pagenow: json.data.data.current_page
          });
        } else {
          message.error("网络错误，请刷新重试", [1]);
        }
        this.setState({
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
  revocation = record => {
    let reg = /.*-\d{2}/;
    let time = record.publish_time.match(reg)[0];
    localStorage.contentlistTime = time;
    localStorage.contentlistInf = record.summary;
  };
  render = () => {
    const Tabletitle = [
      {
        title: "编号",
        dataIndex: "id",
        align: "center",
        key: "id",
        className: "num"
      },
      {
        title: "文章名称",
        align: "center",
        dataIndex: "title",
        key: "title",
        className: "title"
      },
      {
        title: "发布时间",
        dataIndex: "publish_time",
        align: "center",
        key: "publish_time",
        className: "time",
        sorter: (a, b) => {
          console.log(a);
          console.log(b);
        }
      },
      {
        title: "作者",
        dataIndex: "author",
        align: "center",
        key: "author",
        className: "author"
      },
      {
        title: "操作",
        dataIndex: "status",
        align: "center",
        key: "status",
        className: "done",
        render: (text, record, index) => {
          console.log(record);
          return (
            <div>
              <span
                onClick={this.revocation.bind(this, record)}
                style={{ color: " #004FFF", cursor: "pointer" }}
              >
                <Link to={{ pathname: "/site/web/contentinf/" + record.id }}>
                  查看
                </Link>
              </span>
              <span style={{ margin: "0 8px" }}>
                <Issue
                  issue={record.status}
                  data={{ id: record.id, status: record.status }}
                />
              </span>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <div
          style={{
            padding: "16px 32px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
          <Link to="/site/web/addcontentinf">
            <Button
              style={{
                width: "110px",
                height: "35px",
                lineHeight: "35px",
                position: "absolute",
                right: "80px",
                bottom: "32px",
                background: "#004FFF",
                color: "#fff",
                borderRadius: "100px",
                border: "none"
              }}
              type="primary"
            >
              + 新建资讯
            </Button>
          </Link>
          <h3 style={{ margin: "16px 0", fontSize: "20px", fontWeight: "600" }}>
            资讯列表
          </h3>
        </div>
        <div
          style={{
            background: "#F0F2F5",
            padding: "20px"
          }}
        >
          <div
            style={{
              background: "#fff"
            }}
          >
            <Table
              style={{ textAlign: "center", background: "#fff" }}
              columns={Tabletitle}
              loading={this.state.loading}
              dataSource={this.state.dataSource}
              pagination={{
                style: { marginRight: "30px" },
                current: this.state.pagenow,
                total: this.state.total,
                onChange: this.pageonChange
              }}
            />
          </div>
        </div>
      </div>
    );
  };
}
