import React, { Component } from "react";
import { Tabs, Input, Button, Radio, Tag, Table } from "antd";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import RadioGroup from "antd/lib/radio/group";
import url from '../url'
import "./contacts.css";
const TabPane = Tabs.TabPane;
const Search = Input.Search;

export default class Contacts extends Component {
  callback = key => {
    console.log(key);
  };
  tag = [
    "全部",
    "FA",
    "媒体",
    "芯片矿机",
    "实验室",
    "安全审计",
    "评级",
    "法务合规",
    "交易所",
    "ICO平台",
    "政务",
    "社群",
    "基金",
    "高校实验室",
    "其他"
  ];
  Radiodom = [];


columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align:"center"
  }, {
    title: '所在公司',
    dataIndex: 'company',
    key: 'company',
  },{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '岗位',
    dataIndex: 'job',
    key: 'job',
  }, {
    title: '岗位',
    key: 'joblevel',
    dataIndex: 'joblevel'
  
  }, {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  }, {
    title: '操作',
    key: 'do'
  }];




  componentWillMount = () => {
    for (let index = 0; index < this.tag.length; index++) {
      this.Radiodom.push(
          <div style={{display:"inline-block",width:"100px",textAlign:"left",marginRight:"10px",marginBottom:"16px"}}>
          <Radio.Button
          style={{
            
            height: "18px",
            lineHeight: "18px",
            borderRadius: "6px",
            border: "none"
          }}
          value={index+1}
        >
          {this.tag[index]}
        </Radio.Button>
          </div>
      );
    }

    this.updata()
  };

  updata=()=>{
      axios.get("../../../src/project/T-contacts/json.json").then(json=>{
        console.log(json)
      }).catch(err=>{
        console.log(err)
      })
  }

  tagchange=e=>{
      console.log(e.target.value)
  }

   

  render() {
    return (
      <div>
        <div
          style={{
            padding: "0 48px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          
            <Button
              style={{
                width: "110px",
                height: "35px",
                lineHeight: "35px",
                position: "absolute",
                right: "60px",
                bottom: "20px",
                background: "#004FFF",
                color: "#fff",
                borderRadius: "100px",
                border: "none"
              }}
              type="primary"
            >
              + 添加人脉
            </Button>
          
          <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
            人脉资源库
          </h3>
          <Search
            style={{ width: "350px", height: "35px" }}
            placeholder="请输入人脉关键字搜索"
            onSearch={value => console.log(value)}
          />
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
              <Radio.Group onChange={this.tagchange} defaultValue="1" buttonStyle="solid">
                {this.Radiodom}
              </Radio.Group>
            </div>
          </div>

              <div style={{marginTop:"20px"}}>
              
              <Table columns={this.columns}></Table>
              </div>


        </div>
      </div>
    );
  }
}
