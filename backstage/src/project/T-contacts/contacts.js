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
    state={
        dataSource:[],
        loading:false
    }
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



columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
          
      )
   }
  }, {
    title: '所在公司',
    dataIndex: 'company',
    key: 'company',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
      )
   }
},{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
      )
   }
}, {
    title: '岗位',
    dataIndex: 'job',
    key: 'job',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
      )
   }
}, {
    title: '岗位',
    key: 'joblevel',
    dataIndex: 'joblevel',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
      )
   }
  
  }, {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
      )
   }
}, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    align:"center",
    render:(text, record, index)=>{
      return(
          <div>
          <a style={{color:"#000"}} href="#/site/source/sourceinf" onClick={this.turn} >{text}</a>
          </div>
      )
   }
}, {
    title: '操作',
    key: 'do',
    align:"center",
    render:(text, record, index)=>{
       return(
           <div>
           <span  onClick={this.del} style={{color:"red"}}>删除</span>
           </div>
           
       )
    }
}];


// 标签元素
Radiodom = [];
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
      this.setState({
        dataSource:[
            {
              "name": "李明明",
              "company": "神话",
              "type": "FA",
              "job": "人事",
              "joblevel": "经理",
              "phone": "13952412458",
              "email": "752033214@qq.com",
              "id":"1"
            },
            {
              "name": "李明明",
              "company": "神话",
              "type": "FA",
              "job": "人事",
              "joblevel": "经理",
              "phone": "13952412458",
              "email": "752033214@qq.com",
              "id":"2"
            },
            {
              "name": "李明明",
              "company": "神话",
              "type": "FA",
              "job": "人事",
              "joblevel": "经理",
              "phone": "13952412458",
              "email": "752033214@qq.com",
              "id":"3"
            }
          ]
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
        <Link to="/site/source/addsource">
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
              <Table style={{background:"#fff"}} locale={{"emptyText":"暂无数据"}} loading={this.state.loading} dataSource={this.state.dataSource} columns={this.columns}></Table>
              </div>
        </div>
      </div>
    );
  }
}
