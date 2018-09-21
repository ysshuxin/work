import React, { Component } from "react";
import { Tabs, Input, Button } from "antd";
import { Route, Link } from "react-router-dom";
import axios from "axios";
const TabPane = Tabs.TabPane;
const Search = Input.Search;

export default class Contacts extends Component {
  callback = key => {
    console.log(key);
  };

  componentWillMount = () => {};
  render() {
    return (    
      <div>
        <div
          style={{
            padding: "0 48px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Link to="/site/project/projects/uploading">
            {" "}
            <Button
              style={{
                width: "110px",
                height: "35px",
                lineHeight: "35px",
                position: "absolute",
                right: "60px",
                bottom: "0",
                background: "#004FFF",
                color: "#fff",
                borderRadius:"100px",
                border:"none"
              }}
              type="primary"
            >
              + 添加人脉
            </Button>
          </Link>
          <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
            人脉资源库
          </h3>
          <Search
            style={{ width: "350px", height: "35px" }}
            placeholder="请输入人脉关键字搜索"
            onSearch={value => console.log(value)}
          />
        </div>
        <div style={{ padding: "0 33px" }}>
          <Tabs
            size={"large"}
            tabBarStyle={{ fontSize: "14px" }}
            defaultActiveKey="1"
            onChange={this.callback}
          >
            <TabPane tab={"全部（0）"} key="1" />
            <TabPane tab={"待评级（0）"} key="2" />
            <TabPane tab={"已评级（0）"} key="3" />
            <TabPane tab={"拒绝（0）"} key="4" />
          </Tabs>
        </div>
      </div>
    );
  }
}
