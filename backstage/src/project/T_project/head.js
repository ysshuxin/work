import React, { Component } from 'react';
import { Tabs,Input,Button  } from 'antd';
import {Route,Link} from 'react-router-dom'
import axios from 'axios'
const TabPane = Tabs.TabPane;
const Search = Input.Search;


export default class Head extends Component{
state={
    allnum:0
}
 callback=(key)=>{
  console.log(key);
}

componentWillMount=()=>{
    let that=this
    let page=0
    let  grade=""
    let project_name=""
    let token=localStorage.backtoken
     axios
     .get("http://cm.hrjykj.com:8090/index/Project/ProjectList?page="+page+"&grade="+grade+"&project_name="+project_name+"&token="+token)
     .then((data)=> {
       if(data.data.code=="1001"){
         this.setState({
             num:data.data.lists.length
         })
       }
     })
     .catch(function(error) {
       console.log("error"+error);
     });
  }
    render(){
        return(
          <div>
            <div style={{padding:"0 48px",position:"relative",overflow:"hidden"}}>
            <Link to="/site/project/projects/uploading">
            
            <Button
            style={{
              width: "110px",
              height: "35px",
              lineHeight: "35px",
              position: "absolute",
              right: "60px",
              bottom: "0px",
              background: "#004FFF",
              color: "#fff",
              borderRadius: "100px",
              border: "none"
            }}
            type="primary"
          >
            + 上传项目
          </Button>
            </Link>
                <h3 style={{margin:"20px 0",fontSize:"22px",fontWeight:"600"}}>项目库</h3>
                <Search
                style={{width:"350px",height:"35px"}}
                placeholder="请输入项目关键字搜索"
                onSearch={value => console.log(value)}
              />
              </div>
              <div style={{padding:"0 33px"}}>
                <Tabs size={"large"} tabBarStyle={{fontSize:"14px"}} defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab={"全部（"+this.state.num+"）"} key="1"></TabPane>
                <TabPane tab={"待评级（0）"} key="2"></TabPane>
                <TabPane tab={"已评级（0）"} key="3"></TabPane>
                <TabPane tab={"拒绝（0）"} key="4"></TabPane>
              </Tabs>
            </div>
            </div>
        )
    }
}
