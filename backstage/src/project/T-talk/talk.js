import React, { Component } from "react";
import { Breadcrumb, message, Table, Button } from "antd";
import {Link} from 'react-router-dom'
import axios from "../../api/api";
import qs from "qs";



export default class Talk extends Component {
    state={
        data:[]
    }
componentDidMount(){
    axios.get("/api/discussion/get").then((json)=>{
       if(json.data.code===0){
           console.log(json.data.data.data)
           this.setState({
               data:json.data.data.data
           })
       }
    }).catch((err)=>{

    })
    console.log(this.state)
}
  render() {
    const Tabletitle = [
     
        {
          title: "编号",
          dataIndex: "id", 
          align: "center",
          key: "id"
        },
        {
          title: "标题",
          align: "left",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "发布时间",
          dataIndex: "add_time",
          align: "center",
          key: "add_time"
        },
        {
          title: "发起人",
          dataIndex: "name",
          align: "center",
          key: "name"
        },
        {
          title: "操作",
          
          align: "center",
          key: "remainingMoney",
          render:(text, record, index)=>{
            return (
                <div>
                  <span
                    style={{ color: "red", marginRight: "20px" }}
                  >
                    删除
                  </span>
                  <Link to={{ pathname: "/site/source/sourceinf/" + record.id }}>
                    详情
                  </Link>
                </div>
              );
          }
        }
     
    
      ];
    return (
      <div style={{background:"#F0F2F5"}}>
      <div
      style={{
        padding: "16px 48px 0",
        position: "relative",
        overflow: "hidden",
        background:"#fff"
      }}
    >
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="#/site/fund">讨论中心</a>
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
          + 发布讨论
        </Button>
      </Link>
      <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
      讨论列表
      </h3>
     
    </div>
    <div style={{ marginTop: "20px" ,padding:"0 20px"}}>
            <Table
              style={{ background: "#fff" }}
              locale={{ emptyText: "暂无数据" }}
              loading={this.state.loading}
              dataSource={this.state.data}
              columns={Tabletitle}
              pagination={{
                current:this.state.pagenow,
                pageSizeOptions:'10',
                total:this.state.total,
                onChange:this.pageonChange
              }}
            />
             
          </div>
      </div>
    );
  }
}
