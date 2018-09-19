import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../img/logo.png";
import axios from 'axios'

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
    const menu = (
      <Menu style={{border:"1px solid #28282a"}}>
        <Menu.Item style={{padding:"0 10px"}}>
       <a onClick={this.exit} style={{fontSize:"14px"}}>退出</a> 
        </Menu.Item>
      </Menu>
    );
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
        <Menu.Item key="02" style={style}>
        {window.location.hash=="#/"?"": <span onClick={this.exit}>退出</span>}
        </Menu.Item>
      </Menu>
    );
  }
}
export default Nav;
