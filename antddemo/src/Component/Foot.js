import React, { Component } from 'react';
import { Menu,Icon } from 'antd';


const style={
  float:"right"
}
  class Foot extends Component {
    state = {
      current: '01',
    }
    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }
    render() {
      return (
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ marginBottom:"0px",height:"65px",position:"absolute",bottom:"0",left:"0",width:"100%",minWidth:"1200px"}}
          theme="dark"
        >
        <p style={{textAlign:"center" }} >© 2014-2015 by Collinstar Capital Pty Ltd. All Rights Reserved</p> 
        </Menu>
      );
    }
  }
export default Foot;