import React, { Component } from "react";
import { Icon, Breadcrumb } from "antd";

import axios from "../../api/api";
export default class TA extends Component {

  
  render() {
    return (
      <div>
        <div style={{ padding: "16px 32px", overflow: "hidden" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/project/projects">项目库</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>标签管理</Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{ fontSize: "20px", marginTop: "16px", fontWeight: "600" }}
          >
            标签管理
          </h3>
        </div>
      <div style={{padding:"20px",background:"#F0F2F5"}}>
      <div style={{background:"#fff",padding:20}}>
      <div style={{display:"inline-block",minWidth:300,width:300,position:"relative",marginRight:40}}>
        <h3>一级标签</h3>
        <div style={{border:"1px solid #ddd",height: 600,borderRadius:"4px",padding:20,textAlign:"right"}}>
          111
        
        </div>
        
        <div style={{position:"absolute",top:"50%",right:"-40px"}}>>></div>

        </div>

        <div style={{display:"inline-block",minWidth:300,width:300,verticalAlign:"top"}}>
        <h3>二级标签</h3>
        <div style={{border:"1px solid #ddd",height: 600,borderRadius:"4px",padding:20,textAlign:"right"}}>

        
        </div>
        
        </div>
      
      </div>
        
      </div>
      </div>
    );
  }
}
