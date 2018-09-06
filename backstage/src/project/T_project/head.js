import React, { Component } from 'react';
import { Tabs,Input,Button  } from 'antd';
import Form from './title'
const TabPane = Tabs.TabPane;
const Search = Input.Search;
function callback(key) {
  console.log(key);
}

export default class Head extends Component{
    render(){
        return(
            <div style={{padding:"0 20px",position:"relative",overflow:"hidden"}}>
                <Button style={{width:"115px",height:"40px",lineHeight:"40px",position:"absolute",right:"20px",top:"22px"}} type="primary">上传项目</Button>
                <h3 style={{margin:"20px",fontSize:"22px",fontWeight:"600"}}>项目库</h3>
                <Search
                style={{width:"350px",height:"35px",margin:"15px 0 10px 20px"}}
                placeholder="请输入项目关键字搜索"
                onSearch={value => console.log(value)}
              />
                <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="全部（21）" key="1"></TabPane>
                <TabPane tab="待评  级（0）" key="2"></TabPane>
                <TabPane tab="已评级（21）" key="3"></TabPane>
                <TabPane tab="拒绝（3）" key="4"></TabPane>
              </Tabs>
            </div>
        )
    }
}
