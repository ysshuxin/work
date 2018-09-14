import React, { Component } from 'react';
import { Tabs,Input,Button  } from 'antd';
import axios from 'axios'
const TabPane = Tabs.TabPane;
const Search = Input.Search;
function callback(key) {
  console.log(key);
}


export default class Head extends Component{

state={
    allnum:0
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
                <Button style={{width:"115px",height:"40px",lineHeight:"40px",position:"absolute",right:"20px",top:"22px"}} type="primary">上传项目</Button>
                <h3 style={{margin:"20px 0",fontSize:"22px",fontWeight:"600"}}>项目库</h3>
                <Search
                style={{width:"350px",height:"35px"}}
                placeholder="请输入项目关键字搜索"
                onSearch={value => console.log(value)}
              />
              </div>
              <div style={{padding:"0 33px"}}>
                <Tabs defaultActiveKey="1" onChange={callback}>
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
