import React, { Component } from 'react';
import { Layout, Menu, Icon ,Dropdown} from 'antd';
import Progect from './project/project'
import Progectinf from './project/projectinf'
import {Route,Link} from 'react-router-dom'
import logo from './img/logo.png'
import page404 from './project/404/404'
import Uploadingproject from './project/T-uploading/uploading'
const { Header, Content, Footer, Sider } = Layout;  
const SubMenu = Menu.SubMenu;
class App extends Component {
  exit=()=>{
    localStorage.removeItem("backtoken")
    window.location.hash="#/"
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
      <Layout style={{height:"100%"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" style={{ color:"#fff",textAlign:"center",margin:"15px 0"}}>
        < Link to="/site/dashboard"><img style={{width:"107px",height:"36px"}} src={logo}></img></Link>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">    < Link to="/site/dashboard"><Icon type="profile" />看板</Link></Menu.Item>
        <SubMenu
        key="2"
        title={<span><Icon type="form" /><span>项目库</span></span>}
      >
      <Menu.Item key="2.1">  < Link to={"/site/project/projects"}>项目池</Link></Menu.Item>
        <Menu.Item key="2.2">< Link to="/site/project/analysis">评级项目</Link></Menu.Item>
        <Menu.Item key="2.3">< Link to="/site/project/invest">投资项目</Link></Menu.Item>
        <Menu.Item key="2.4">< Link to="/site/project/tag">标签管理</Link></Menu.Item>
      </SubMenu>
        <Menu.Item key="3">< Link to="/site/fund"><Icon type="dashboard" theme="outlined" />基金管理</Link></Menu.Item>
        <Menu.Item key="4">< Link to="/site/source"><Icon type="team" theme="outlined" />人脉资源</Link></Menu.Item>
        <Menu.Item key="5">< Link to="/site/exchange"><Icon type="swap" theme="outlined" />交易</Link></Menu.Item>
        <Menu.Item key="6">< Link to="/site/industry"><Icon type="pie-chart" theme="outlined" />行业数据库</Link></Menu.Item>
      <SubMenu
        key="7"
        title={<span><Icon type="form" /><span>网站管理</span></span>}
      >
        <Menu.Item key="7.1">< Link to="/site/web/content">内容管理</Link></Menu.Item>
        <Menu.Item key="7.2">< Link to="/site/web/members">成员管理</Link></Menu.Item>
        <Menu.Item key="7.3">< Link to="/site/web/job">职位管理</Link></Menu.Item>
        <Menu.Item key="7.4">< Link to="/site/web/investment">投资布局</Link></Menu.Item>
        <Menu.Item key="7.5">< Link to="/site/web/email">邮件订阅</Link></Menu.Item>
      </SubMenu>
    <Menu.Item key="8"> < Link to="/site/set"> <Icon type="setting" theme="outlined" />设置</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff',textAlign:"right",borderBottom:"4px solid #F0F2F5"}}>
        {localStorage.backtoken? <Dropdown overlay={menu}>
        <a style={{color:"#000"}} >
         <Icon type="user" /> {localStorage.user?localStorage.user:""}
        </a>
      </Dropdown>:""}
       
       </Header>
        <Content style={{ margin: '0',padding:"0"}}>
          <div style={{ background: '#fff', minHeight: 360 }}>
          <Route path={'/site/pagenot'} exact  component={page404}/>
          <Route path={'/site/dashboard'} exact  />
          <Route path={'/site/project'} exact  />
          <Route path={'/site/project/projects'} exact  component={Progect}/>
          <Route path='/site/project/projects/projectinf' exact  component={Progectinf}/>
          <Route path='/site/project/projects/uploading' exact  component={Uploadingproject}/>
          <Route path='/site/project/analysis' exact  />
          <Route path='/site/project/invest' exact />
          <Route path='/site/project/tag' exact  />
          <Route path='/site/fund' exact  />
          <Route path='/site/source' exact  />
          <Route path='/site/exchange' exact  />
          <Route path='/site/industry' exact  />
          <Route path='/site/web' exact  />
          <Route path='/site/web/content' exact  />
          <Route path='/site/web/members' exact  />
          <Route path='/site/web/job' exact  />
          <Route path='/site/web/investment' exact  />
          <Route path='/site/web/email' exact  />
          <Route path='/site/set' exact  />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        collinstar ©2018 Created by collinstar
        </Footer>
      </Layout>
    </Layout>)
  }
}

export default App;


