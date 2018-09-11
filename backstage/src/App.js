import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Progect from './project/project'
import Progectinf from './project/projectinf'
import {Route,Link} from 'react-router-dom'
import logo from './img/logo.png'
import Login from './project/login'

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
        <div className="logo" style={{ color:"#fff",textAlign:"center",margin:"15px 0"}}>
        <img style={{width:"107px",height:"36px"}} src={logo}></img>
        
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">   <Icon type="profile" /> 看板</Menu.Item>


        <SubMenu
        key="2"
        title={<span><Icon type="form" /><span>项目库</span></span>}
      >
      <Menu.Item key="3">  < Link to="/app/progect">项目池</Link></Menu.Item>
        <Menu.Item key="4">评级项目</Menu.Item>
        <Menu.Item key="5">投资项目</Menu.Item>
        <Menu.Item key="5.1">标签管理</Menu.Item>
      </SubMenu>
      
 <Menu.Item key="6"><Icon type="line-chart" theme="outlined" />基金管理</Menu.Item>
 <Menu.Item key="7"><Icon type="team" theme="outlined" />人脉资源</Menu.Item>
 <Menu.Item key="8"><Icon type="swap" theme="outlined" />交易</Menu.Item>
 <Menu.Item key="9"><Icon type="pie-chart" theme="outlined" />行业数据库</Menu.Item>

      
    
      <SubMenu
        key="10"
        title={<span><Icon type="form" /><span>网站管理</span></span>}
      >
        <Menu.Item key="11">内容管理</Menu.Item>
        <Menu.Item key="12">成员管理</Menu.Item>
        <Menu.Item key="13">职位管理</Menu.Item>
        <Menu.Item key="14">投资布局</Menu.Item>
        <Menu.Item key="15">邮件订阅</Menu.Item>
      </SubMenu>

    <Menu.Item key="16">  <Icon type="setting" theme="outlined" />设置</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff',textAlign:"right",borderBottom:"4px solid #F0F2F5"}}><Icon type="user" /> 用户名</Header>
        <Content style={{ margin: '0',padding:"0"}}>
          <div style={{ background: '#fff', minHeight: 360 }}>
          <Route path='/app/progect' exact  component={Progect}/>
          <Route path='/app/progectinf' exact  component={Progectinf}/>
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


