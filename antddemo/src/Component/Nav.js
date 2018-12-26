import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../img/logo.png";


const style = {
  float: "right"
};

class Nav extends Component {
  state = {
    current: "01"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
exit=()=>{
  window.location.hash = "#/";
  localStorage.clear()
}
  render() {
   
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{
          marginBottom: "10px",
          height: "65px",
          lineHeight: "65px",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "100",
         
          background: "rgba(0, 0, 0, 0.95)"
        }}
        theme="dark"
      >
      <Menu.Item key="01" style={{
        width: "140px",
        height: "36px",
        position: "absolute",
        overflow: "hidden",
        top: "16px",
        left: "20px"
      }} >
       <img
            style={{ width: "100%", height: "100%", float: "left" }}
            src={logo}
          />
      </Menu.Item>
        <Menu.Item style={style}>
        {window.location.hash=="#/project/step1"||
        window.location.hash=="#/project/step2"||
        window.location.hash=="#/project/step3"||
        window.location.hash=="#/project/step4"?<span onClick={this.exit}>退出</span>: ""}
        </Menu.Item>
    {/*  <Menu.Item   style={{float:"right"}} >
       <a href="#/investment">投资布局 </a>
      </Menu.Item>
       <Menu.Item  style={{float:"right"}} >
       <a href="#/inflist">资讯 </a>
    </Menu.Item>*/}
      </Menu>
    );
  }
}
export default Nav;
