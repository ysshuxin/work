import React, { Component } from 'react';
import { Layout, Menu, Icon ,Dropdown} from 'antd';
import Project from './project/T_project/project'
import Projectinf from './project/T_project/projectinf'
import {Route,Link} from 'react-router-dom'
import logo from './img/logo.png'
import Page404 from './project/404/404'
import Contacts from './project/T-contacts/contacts'
import Contactsinf from './project/T-contacts/contactsinf'
import AddContacts from './project/T-contacts/addcontacts'
import Uploadingproject from './project/T-uploading/uploading'
import Fund from './project/T-fund/fund'
import Fundlist from './project/T-fund/fundlist'
import Fundinf from './project/T-fund/fundinf'
import Tag from './project/T-tag/tag'
import addContactsinf from './project/T-web/content_management/addcontentManagement'

import Investmentproject from './project/T-investmentproject/investmentproject'
import Contentmanagement from './project/T-web/content_management/contentManagement'

import Investmentlayout from './project/T-web/Investmentlayout/Investmentlayout'

import Contentlist from './project/T-web/content_management/contentlist'
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
      
      
      >
        <div className="logo" style={{ color:"#fff",textAlign:"center",margin:"15px 0"}}>
        < Link to="/site/dashboard"><img style={{width:"102px",height:"36px"}} src={logo} alt=""></img></Link>
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
        <Menu.Item key="7.1">< Link to="/site/web/contentlist">内容管理</Link></Menu.Item>
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
          <div style={{ background: '#fff', minHeight: 0 }}>
          <Route path={'/site/dashboard'} exact component={Page404} /> 

          <Route path={'/site/project'} exact  component={Page404}/>
          <Route path={'/site/project/projects'} exact  component={Project}/>
          <Route path='/site/project/projects/projectinf' exact  component={Projectinf}/>
          <Route path='/site/project/projects/uploading' exact  component={Uploadingproject}/>
          <Route path='/site/project/analysis' exact   component={Page404}/>
          <Route path='/site/project/invest' exact component={Investmentproject}/>
          <Route path='/site/project/tag' exact  component={Tag}/>
          
          <Route path='/site/fund' exact  component={Fundlist}/>
          <Route path='/site/addfund' exact  component={Fund}/>
          <Route path='/site/fundinf' exact  component={Fundinf}/>


          <Route path='/site/source' exact component={Contacts} />
          <Route path='/site/source/addsource' exact component={AddContacts} />
          <Route path='/site/source/sourceinf/:id'  component={Contactsinf} />


          <Route path='/site/exchange' exact  component={Page404}/>
          <Route path='/site/industry' exact  component={Page404}/>

          <Route path='/site/web' exact  component={Page404}/>
          <Route path='/site/web/contentlist' exact  component={Contentlist}/>
          <Route path='/site/web/contentinf/:id' exact  component={Contentmanagement}/>
          <Route path='/site/web/addcontentinf' exact  component={addContactsinf}/>
          

          <Route path='/site/web/members' exact  component={Page404}/>
          <Route path='/site/web/job' exact  component={Page404}/>
          <Route path='/site/web/investment' exact component={Investmentlayout} />
          <Route path='/site/web/email' exact  component={Page404}/>

          <Route path='/site/set' exact  component={Page404}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center',color:"rgba(0 0 0 0.45)"}}>
        <span >帮助</span><span style={{margin:"0 40px"}}>隐私</span><span>条款</span><br></br>
        collinstar ©2018 Created by collinstar
        </Footer>
      </Layout>
    </Layout>)
  }
}

export default App;


