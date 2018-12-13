import React, { Component } from "react";
import { Button, Breadcrumb, Table } from "antd";

import {Link } from "react-router-dom";
import './fundlist.css'
import axios from '../../api/api'



const data = [{
  name: 'test',
    token: "etc",
    truepayment: 'aa',
    money: 'bb',
    remainingMoney: 'cc',
    projectNum:"2018"
  },
  {
    projectname: 'test',
    token: "etc",
    truepayment: 'aa',
    money: 'bb',
    remainingMoney: 'cc',
    projectNum:"2018"
  },
  {
    projectname: 'test',
    token: "etc",
    truepayment: 'aa',
    money: 'bb',
    remainingMoney: 'cc',
    projectNum:"2018"
  },
  {
    projectname: 'test',
    token: "etc",
    truepayment: 'aa',
    money: 'bb',
    remainingMoney: 'cc',
    projectNum:"2018"
  }];

export default class Fundlist extends Component {

  state={
    data:[]
  }
  callback = key => {
    
    console.log(key);
  };

  componentDidMount(){
    axios.get("/api/found/get").then((json)=>{
      if(json.data.code===0){
        this.setState({
          data:json.data.data
        })
      }
      console.log(json);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  render() {
    const Tabletitle = [
     
      {
        title: "基金名称",
        dataIndex: "name",
        align: "center",
        key: "name"
      },
      {
        title: "募集币种",
        align: "center",
        dataIndex: "unit",
        key: "unit"
      },
      {
        title: "实缴情况",
        dataIndex: "account",
        align: "center",
        key: "account"
      },
      {
        title: "累计投资金额",
        dataIndex: "invest",
        align: "center",
        key: "invest"
      },
      {
        title: "剩余可投",
        dataIndex: "rest",
        align: "center",
        key: "rest"
      },
      {
        title: "投资项目数",
        dataIndex: "project_num",
        align: "center",
        key: "project_num"
      }
  
    ];
 const data=this.state.data
    return (
      <div>
        <div
          style={{
            padding: "16px 48px 0",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/fund">基金管理</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Link to="/site/addfund">
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
              + 创建基金
            </Button>
          </Link>
          <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
           基金列表
          </h3>
         
        </div>
        
<div style={{background:"#F0F2F5",padding:"20px"}}>
<Table
        style={{ textAlign:"center",background:"#fff"}}
        columns={Tabletitle}
        dataSource={data}
        pagination={
          {
            style:{marginRight:"30px"},
            size:"big",
            total:4,
             showSizeChanger :true,
             showQuickJumper:true
          }
        }
        onRow={(record, rowkey) => {
          return {
            onClick: () => {
              console.log(record.id);
              window.location.hash="#/site/fundinf"
            },
          };
        }}
      />
</div>
        
      
      </div>
    );
  }
}

