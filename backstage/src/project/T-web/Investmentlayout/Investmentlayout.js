import React, { Component } from "react";
import { Breadcrumb, Radio, Table } from "antd";

import axios from "axios";
import Item from "./item";
export default class Investmentlayout extends Component {
  state = {
    Radiodom: [],
    item: [],
    num: 1,
    industry:[]
  };

  componentDidMount = () => {
    let tag = [];
    axios
      .get("http://localhost:5000/api/getTag")
      .then(json => {
        console.log(json);
        tag = json.data.data;
      })
      .then(() => {
        let Radiodom = [];
        for (let index = 0; index < tag.length; index++) {
          Radiodom.push(
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
                value={index + 1}
              >
                {tag[index]}
              </Radio.Button>
            </div>
          );
        }

        this.setState({
          Radiodom: Radiodom
        });
      })
      .catch(e => {
        console.log(e);
      });

    axios
      .get("http://localhost:5000/api/getClassinfy")
      .then(json => {
        if (json.data.code === 200) {
          let industry = json.data.data;
          this.setState({
            industry:industry
          })
          axios
            .post("http://localhost:5000/api/getInvestment")
            .then(json => {
              if (json.data.code === 200) {
                let data = json.data.data;
                let item = [];
                for (let index = 0; index < data.length; index++) {
                  item.push(
                    <Item
                      industry={industry}
                      key={data[index].id}
                      defaultValue={data[index]}
                    />
                  );
                }
                this.setState({
                  item: item
                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  addItem = () => {
    let itemList = this.state.item.concat();
let data=
    {
      classify: "4",
      id: "",
      img_path: "http://b-ssl.duitang.com/uploads/item/201712/13/20171213154156_dM2Kn.thumb.224_0.jpeg",
      inf: "",
      name: "",
      web_url: ""
    }

    itemList.unshift(<Item edit={true} defaultValue={data} changeValue={data} industry={this.state.industry}/>);
    this.setState({
      item: itemList
    });
  };
  revocation = () => {};
  issue = () => {};
  render = () => {
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
                defaultValue="1"
                buttonStyle="solid"
              >
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

            <div>{this.state.item}</div>
          </div>
        </div>
      </div>
    );
  };
}
