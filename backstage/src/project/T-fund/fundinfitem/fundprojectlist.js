import React, { Component } from "react";
import {  Input, Button, Table, Radio, Popover,Spin} from "antd";
import { Link } from "react-router-dom";
import axios from '../../../api/api'

const RadioGroup = Radio.Group;
const { TextArea } = Input;


export default class Fundprojectlist extends Component {
  state={
    id:this.props.id
  }
  callback = key => {
    console.log(key);
  };
  
  componentWillReceiveProps(props,next){
    console.log('aaa')
    console.log(props)
    console.log(next)
    if(props!=next){
      axios.get("/api/found/detail?id="+props.id).then((json)=>{
        if(json.data.code===0){
          this.setState({
            data:json.data.data,
            loading:false
          })
        }
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
    
  }
  componentDidMount = () => {
    

  };

  componentWillMount = () => {};


  render() {
    const Tabletitle = [
      {
        title: "logo",
        dataIndex: "logo",
        key: "logo",
        align: "center",
        render: (text, record, index) => {
          if(text){
            return <img style={{ width: "40px", height: "40px" }} src={text} />
          }
          else{
            if(record.name){
              let red = parseInt(Math.random() * 125);
              let yellow = parseInt(Math.random() * 125);
              let blue = parseInt(Math.random() * 125);
              
              let bgColor = `rgb(${red} ${yellow} ${blue})`;
               return <div style={{width: 40,height: 40,display:"inline-block",textAlign:"center",lineHeight:"40px",fontSize:"24px",background:bgColor,color:"#fff"}}>{record.name.substring(0,1)}</div>
            }
          }
        }
      },
      {
        title: "名称",
        dataIndex: "name",
        align: "center",
        key: "name"
      },
      {
        title: "代币符号",
        align: "center",
        dataIndex: "token_symbol",
        key: "token_symbol"
      },
      
      {
        title: "录入来源",
        dataIndex: "up_name",
        align: "center",
        key: "up_name"
      },
      {
        title: "操作",
        dataIndex: "operate",
        align: "center",
        key: "operate",
        render: (text, record, index) => {
          return (
            <div>
            <Link
              to={{
                pathname: "/site/project/projects/projectinf/" + (record.id+"=0")
              }}
            >
              <span style={{ color: "rgb(0, 79, 255)" }}>详情</span>
            </Link>
            
            </div>
          );
        }
      }
    ];

    return (
      <Spin spinning={this.state.loading}>
      <div>
        <Table
        style={{ textAlign:"center" }}
        columns={Tabletitle}
        dataSource={this.state.data}
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
            onMouseEnter: () => {}
          };
        }}
      />
      </div>
      </Spin>
    );
  }
}
