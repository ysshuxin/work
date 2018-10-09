import React, { Component } from "react";
import { Button, Breadcrumb, Table } from "antd";

import {Link } from "react-router-dom";
import './fundlist.css'



const data = [{
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
  callback = key => {
    
    console.log(key);
  };

  componentWillMount = () => {};

  render() {
    const Tabletitle = [
     
      {
        title: "基金名称",
        dataIndex: "projectname",
        align: "center",
        key: "projectname"
      },
      {
        title: "募集币种",
        align: "center",
        dataIndex: "token",
        key: "token"
      },
      {
        title: "实缴情况",
        dataIndex: "truepayment",
        align: "center",
        key: "truepayment"
      },
      {
        title: "累计投资金额",
        dataIndex: "money",
        align: "center",
        key: "money"
      },
      {
        title: "剩余可投",
        dataIndex: "remainingMoney",
        align: "center",
        key: "remainingMoney"
      },
      {
        title: "投资项目数",
        dataIndex: "projectNum",
        align: "center",
        key: "projectNum"
      }
  
    ];

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
            onMouseEnter: () => {
             
            },
            onClick: () => {
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

