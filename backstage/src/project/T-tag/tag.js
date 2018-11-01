import React, { Component } from "react";
import { Icon, Breadcrumb } from "antd";
import TAmod from "./tagclass";
import axios from "../../api/api";
export default class TA extends Component {
  state = {
    nuumlist: [<TAmod returnIndex={this.returnIndex} index={0} />],
    num: 0
  };
  
  componentDidMount() {
    axios
      .get("/api/lab/get")
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      });
  }
  returnIndex = index => {
    let nuumlist = this.state.nuumlist;
    nuumlist = nuumlist.concat();
    let numlistFilter = nuumlist.map((curValue, mapindex) => {
      if (curValue) {
        if (curValue.props.index !== index) {
          return curValue;
        } else {
          return "";
        }
      } else {
        return "";
      }
    });

    console.log(numlistFilter);

    this.setState({
      nuumlist: numlistFilter
    });
  };

  
  addtitle = () => {
    let nuumlist = this.state.nuumlist;
    let num = this.state.num;
    num += 1;
    nuumlist = nuumlist.concat();
    nuumlist.push(<TAmod returnIndex={this.returnIndex} index={num} />);
    this.setState({
      nuumlist: nuumlist,
      num: num
    });
  };
  render() {
    return (
      <div>
        <div style={{ padding: "16px 32px", overflow: "hidden" }}>
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
        <h1
          style={{
            height: "10px",
            background: "#F0F2F5",
            margin: "0",
            padding: "0"
          }}
        />
        {this.state.nuumlist}

        <div style={{ background: "#F0F2F5", padding: "0 20px 20px" }}>
          <div
            onClick={this.addtitle}
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
        </div>
      </div>
    );
  }
}
