import { Breadcrumb, Button, Table } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
const data = [
  {
    num: "test",
    title: "etc",
    time: "1",
    author: "bb"
  },
  {
    num: "test",
    title: "etc",
    time: "2",
    author: "bb"
  },
  {
    num: "test",
    title: "etc",
    time: "3",
    author: "bb"
  },
  {
    num: "test",
    title: "etc",
    time: "4",
    author: "bb"
  }
];
export default class Contentlist extends Component {
  revocation = () => {};
  issue = () => {};
  render = () => {
    const Tabletitle = [
      {
        title: "编号",
        dataIndex: "num",
        align: "center",
        key: "num",
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
        dataIndex: "time",
        align: "center",
        key: "time",
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
        dataIndex: "done",
        align: "center",
        key: "done",
        className: "done",
        render: () => {
          return (
            <div>
              <span
                onClick={this.revocation}
                style={{ color: "#F5222D ", cursor: "pointer" }}
              >
                撤销
              </span>
              <span style={{ margin: "0 8px" }}>|</span>
              <span
                onClick={this.issue}
                style={{ color: "#004FFF", cursor: "pointer" }}
              >
                发布
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
          <Link to="/site/web/contentinf">
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
              dataSource={data}
              pagination={{
                style: { marginRight: "30px" },
                size: "big",
                total: 4,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              onRow={(record, rowkey) => {
                return {
                  onMouseEnter: () => {},
                  onClick: e => {
                    if (
                      e.target.className === "num" ||
                      e.target.className === "title" ||
                      e.target.className === "time" ||
                      e.target.className === "author"
                    ) {
                      window.location.hash = "#/site/web/contentinf";
                    }
                  }
                };
              }}
            />
          </div>
        </div>
      </div>
    );
  };
}
