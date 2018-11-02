import React, { Component } from "react";

export default class Item extends Component {


  render() {
    return (
    <div>
    <div style={{ padding: "16px 32px", overflow: "hidden" }}>
    <Breadcrumb>
      <Breadcrumb.Item>成员管理</Breadcrumb.Item>
    </Breadcrumb>
    <h3
      style={{ fontSize: "20px", marginTop: "16px", fontWeight: "600" }}
    >
      标签管理
    </h3>
  </div>
    
    </div>
    );
  }
}

