import React, { Component } from 'react';
import { Menu, Row, Col } from 'antd';
import logo from '../img/logo.png'

export default  class Header extends Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
    <div>

       <Row type="flex">
      <Col span={4} order={1}>
        <img style={{width:"100%",minWidth:"80px"}} src={logo}></img>
      
      </Col>
      <Col span={20} order={2}>
      
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{textAlign:"right"}}
        
      >
        <Menu.Item key="mail">
         Navigation One
        </Menu.Item>
        <Menu.Item key="app">
       Navigation Two
        </Menu.Item>
      
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>
      
      </Col>
     
    </Row>

    </div>
    );
  }
}


