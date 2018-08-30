import React, { Component } from 'react';
import { Menu,Icon } from 'antd';


const style={
  float:"right"
}

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
          style={{ marginBottom:"10px",height:"65px",lineHeight:"65px",position:"absolute",top:"0",left:"0",width:"100%",minWidth:"1200px"}}
          theme="dark"
        >
        
        <Menu.Item key="null" style={style}>
          <Icon type="global" />
          </Menu.Item>
         <Menu.Item key="01" style={style}>
            <a href="#a">品牌</a>
          </Menu.Item>
          <Menu.Item key="02" style={style}>
            <a href="#b" >资讯</a>
          </Menu.Item>
          <Menu.Item key="03" style={style}>
            <a href="#c">工作机会</a>
          </Menu.Item>
          <Menu.Item key="04" style={style}>
            <a href="#d" >团队</a>
          </Menu.Item>
          <Menu.Item key="05" style={style}>
            <a href="#e" >投行服务</a>
          </Menu.Item>
          <Menu.Item key="06" style={style}>
            <a href="#f" >投资布局</a>
          </Menu.Item>
          <Menu.Item key="07" style={style}>
            <a href="#g" >关于我们</a>
          </Menu.Item>
         
        </Menu>
      );
    }
  }
export default Nav;