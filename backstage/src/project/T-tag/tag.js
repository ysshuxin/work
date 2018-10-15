import React, { Component } from "react";
import { Tooltip, Icon, Tag, Breadcrumb, Input, Modal } from "antd";
import TAmod from './tagclass'




export default class TA extends Component {
  state = {
    nuumlist: [<TAmod />]
  };

  addtitle = () => {
    let nuumlist = this.state.nuumlist;
    nuumlist = nuumlist.concat();
    nuumlist.push(<TAmod />);
    console.log(nuumlist);
    this.setState({
      nuumlist: nuumlist
    });
    console.log(this.state.nuumlist);
  };
  render() {
    console.log(TAmod)
    return (
      <div>
        <div style={{ padding: "16px 32px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/project/projects">项目库</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>标签管理</Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{ fontSize: "20px", marginTop: "16px", fontWeight: "600" }}
          >
            标签管理
          </h3>
        </div>

        {this.state.nuumlist}

        <div style={{ background: "#F0F2F5", padding: "0 20px 20px" }}>
          <div
            onClick={this.addtitle}
            style={{
              background: "#F0F2F5",
              overflow: "hidden",
              textAlign: "center",
              border: "1px dashed #bbb"
            }}
          >
            <Icon
              style={{
                color: "#004FFF",
                fontSize: "30px",
                margin: "56px 0",
                fontWeight: "600"
              }}
              type="plus"
            />
          </div>
        </div>
      </div>
    );
  }
}
