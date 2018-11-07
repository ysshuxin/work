import React, { Component } from "react";
import { Tabs, Icon, Input, Button } from "antd";
import Tab1 from './basicinformation'
import Tab2 from './changepassword'
import Tab3 from './resetpasswords'


import axios from "../../api/api";
import qs from "qs";
import './style.css'
import img from './../../img/logo.png'
// 正则
const regphone = /^1[345789]\d{9}$/;
const regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

class Personal extends Component {
 

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <div
          style={{
            height: 58,
            width: "100%",
            lineHeight: "58px",
            paddingLeft: "34px"
          }}
        >
          <span style={{ color: "rgba(0,0,0,0.65)", fontsize: "14px" }}>
            个人中心
          </span>
        </div>

        <div className="yss_tabs" style={{ padding: "20px", background: "#f0f2f5" }}>
         

    <Tabs tabBarStyle={{fontSize: "16px",width:"154px",textAlign:"center"}} style={{background:"#fff",height:506 ,}} tabPosition="left" >
    <TabPane tab="基础信息" key="1">
<Tab1></Tab1>

    </TabPane>
    <TabPane tab="修改密码" key="2">
    
<Tab2></Tab2>
    
    </TabPane>
    {/*<TabPane tab="重置密码" key="3">
    
    
<Tab3></Tab3>
    
        </TabPane>*/}
  </Tabs>
        </div>
      </div>
    );
  }
}

export default Personal;
