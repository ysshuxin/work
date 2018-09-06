import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Progect from './project/project'
import Progectinf from './project/projectinf'
import {Route,Link} from 'react-router-dom'
import logo from './img/logo.png'

const { Header, Content, Footer, Sider } = Layout;  
const SubMenu = Menu.SubMenu;
class App extends Component {
  render() {
    return (
      <Layout style={{height:"100%"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" style={{ color:"#fff",textAlign:"center",margin:"80px 0"}}>
        <img style={{width:"107px",height:"36px"}} src={logo}></img>
        
        logo</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <SubMenu
        key="1"
        title={<span><Icon type="profile" /><span>项目库</span></span>}
      >
        <Menu.Item key="3">   <Link to="/progect">  项目列表</Link></Menu.Item>
      </SubMenu>
      <SubMenu
        key="2"
        title={<span><Icon type="form" /><span>网站管理</span></span>}
      >
        <Menu.Item key="4">内容管理</Menu.Item>
        <Menu.Item key="5">成员管理</Menu.Item>
        <Menu.Item key="6">职位管理</Menu.Item>
        <Menu.Item key="7">投资布局</Menu.Item>
        <Menu.Item key="8">邮件订阅</Menu.Item>
      </SubMenu>
          
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff',textAlign:"right",borderBottom:"4px solid #F0F2F5"}}><Icon type="user" /> 用户名</Header>
        <Content style={{ margin: '0',padding:"0"}}>
          <div style={{ background: '#fff', minHeight: 360 }}>
          <Route path='/progect' exact  component={Progect}/>
          <Route path='/progectinf' exact  component={Progectinf}/>
          <Route path='/' exact  component={Progect}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>)
  }
}

export default App;


