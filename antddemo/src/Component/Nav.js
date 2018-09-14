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
          minWidth: "1200px",
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
          {localStorage.phone?localStorage.phone:<Icon type="global" />} 
        </Menu.Item>
      </Menu>
    );
  }
}
export default Nav;
