import React, { Component } from "react";
import { Button, Breadcrumb, Table,Spin,Modal,message } from "antd";

import {Link } from "react-router-dom";
import './fundlist.css'
import axios from '../../api/api'
const confirm=Modal.confirm



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
          data:json.data.data,
          loading:false
        })
      }
      console.log(json);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  };
    // 删除
del = (id,num) => {

if(num!=0){
  message.error("请先删除此基金下的所有投资记录",[1])
 return
}



  confirm({
    title: `确认要删除此基金？`,
    okText: "确定",
    cancelText: "取消",
    onOk:()=>{
      axios
        .get("api/found/delete", { params: {id:id} })
        .then(json => {
          
          if (json.data.code === 0) {
            axios.get("/api/found/get").then((json)=>{
              if(json.data.code===0){
                this.setState({
                  data:json.data.data,
                  loading:false
                })
              }
              console.log(json);
              
            }).catch((err)=>{
              console.log(err);
              
            })
            message.success("删除成功",[1],()=>{
            
            })
          }else{
             message.error(json.data.msg,[1])
          }
        })
        .catch(err => {
          message.error("网络错误",[1])
        });
    },
    onCancel:()=>{

    }
  });
};
//跳转
jump=(record)=>{
  localStorage.found = JSON.stringify(record)
  console.log(record.id);
  window.location.hash="#/site/fundinf"
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
      },
      {
        title: "操作",
        align: "center",
        key: "operate",
        render: (text, record, index) => {
          return (
            <div>
              <span style={{ color: "rgb(0, 79, 255)" }} onClick={this.jump.bind(this,record)}>详情</span>
            <span style={{marginLeft:10,color:"red"}}  onClick={this.del.bind(this,record.id,record.project_num)}>删除</span>
            </div>
          );
        }
      }
  
    ];
 const data=this.state.data
    return (
      <Spin spinning={this.state.loading}>
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
        // onRow={(record, rowkey) => {
        //   return {
        //     onClick: () => {
        //       localStorage.found = JSON.stringify(record)
        //       console.log(record.id);
        //       window.location.hash="#/site/fundinf"
        //     },
        //   };
        // }}
      />
</div>
        
      
      </div>
      </Spin>
    );
  }
}

