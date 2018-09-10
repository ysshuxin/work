import React, { Component } from 'react';
import { Menu,Icon } from 'antd';
import logo from '../img/logo.png'

const style={
  float:"right"
}
//  <Menu.Item key="01" style={style}>
        //    品牌
        //   </Menu.Item>
        //   <Menu.Item key="02" style={style}>
        //     资讯
        //   </Menu.Item>
        //   <Menu.Item key="03" style={style}>
        //     工作机会
        //   </Menu.Item>
        //   <Menu.Item key="04" style={style}>
        //     团队
        //   </Menu.Item>
        //   <Menu.Item key="05" style={style}>
        //     投行服务
        //   </Menu.Item>
        //   <Menu.Item key="06" style={style}>
        //     投资布局
        //   </Menu.Item>
        //   <Menu.Item key="07" style={style}>
        //    关于我们
        //   </Menu.Item>
  class Nav extends Component {
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
          style={{ marginBottom:"10px",height:"65px",lineHeight:"65px",position:"fixed",top:"0",left:"0",width:"100%",zIndex:"100",minWidth:"1200px",background:"rgba(0, 0, 0, 0.95)"}}
          theme="dark"
        >
        <div style={{width:"100px",height:"36px",position:"absolute",overflow:"hidden",top:"16px",left:"20px"}}><img style={{width:"100%",height:"100%",float:"left"}} src={logo}></img> </div>
        <Menu.Item key="null" style={style}>
          <Icon type="global" />
          </Menu.Item>
        </Menu>
      );
    }
  }
export default Nav;