import React, { Component } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import Project from "./project/T_project/project";
import Projectinf from "./project/T_project/projectinf";
import { Route, Link } from "react-router-dom";
import logo from "./img/logo.png";
import Page404 from "./project/404/404";
import Contacts from "./project/T-contacts/contacts";
import Contactsinf from "./project/T-contacts/contactsinf";
import AddContacts from "./project/T-contacts/addcontacts";
import Uploadingproject from "./project/T-uploading/uploading";
import Fund from "./project/T-fund/fund";
import Fundlist from "./project/T-fund/fundlist";
import Fundinf from "./project/T-fund/fundinf";
import Tag from "./project/T-tag/tag";
import addContactsinf from "./project/T-web/content_management/addcontentManagement";

import ICOprogect from './project/T_project/ICOproject'
import Rateproject from './project/T_project/rateproject'

import Investmentproject from "./project/T-investmentproject/investmentproject";
import Contentmanagement from "./project/T-web/content_management/contentManagement";

import Investmentlayout from "./project/T-web/Investmentlayout/Investmentlayout";

import Contentlist from "./project/T-web/content_management/contentlist";

import Item from "./project/T-web/teammembers/teammembers";

import Personalcenter from "./project/T-personalcenter/personalcenter";

import Talk from './project/T-talk/talk'
import AddTalk from './project/T-talk/addtalk'
import Talkinf from './project/T-talk/talkinf'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class App extends Component {
  exit = () => {
    localStorage.removeItem("backtoken");
    localStorage.removeItem("img");
    localStorage.removeItem("permission");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.reload();
  };
  render() {
    const menu = (
      <Menu style={{ border: "1px solid #28282a" }}>
        <Menu.Item style={{ padding: "0 10px" }}>
          <a onClick={this.exit} style={{ fontSize: "14px" }}>
            退出
          </a>
        </Menu.Item>
      </Menu>
    );
    const menucenter = (
      <Menu>
        <Menu.Item key="0">
        <Link to={"/site/personalcenter"}>个人中心</Link>  
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={this.exit}>退出登录</span>
        </Menu.Item>
        
      </Menu>
    );
    return (
      <Layout style={{ height: "100%" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div
            className="logo"
            style={{ color: "#fff", textAlign: "center", margin: "15px 0" }}
          >
            <Link to="/site/dashboard">
              <img
                style={{ width: "102px", height: "36px" }}
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {/*<Menu.Item key="1">
              {" "}
              <Link to="/site/dashboard">
                <Icon type="profile" />
                看板
              </Link>
    </Menu.Item>*/}
            <SubMenu
              key="2"
              title={
                <span>
                  <Icon type="form" />
                  <span>项目库</span>
                </span>
              }
            >
              <Menu.Item key="2.1">
                {" "}
                <Link to={"/site/project/projects"}>项目池</Link>
              </Menu.Item>
              <Menu.Item key="2.4">
              <Link to="/site/project/ICO">ICO项目</Link>
            </Menu.Item>
              <Menu.Item key="2.2">
                <Link to="/site/project/analysis">评级项目</Link>
              </Menu.Item>
              <Menu.Item key="2.3">
                <Link to="/site/project/invest">投资项目</Link>
              </Menu.Item>
            {/*  <Menu.Item key="2.5">
                <Link to="/site/project/tag">标签管理</Link>
            </Menu.Item>*/}
            </SubMenu>
            <Menu.Item key="3">
              <Link to="/site/fund">
                <Icon type="dashboard" theme="outlined" />
                基金管理
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/site/source">
                <Icon type="team" theme="outlined" />
                人脉资源
              </Link>
            </Menu.Item>
          { /* <Menu.Item key="5">
              <Link to="/site/exchange">
                <Icon type="swap" theme="outlined" />
                交易
              </Link>
          </Menu.Item>
            <Menu.Item key="6">
              <Link to="/site/industry">
                <Icon type="pie-chart" theme="outlined" />
                行业数据库
              </Link>
            </Menu.Item>*/}
            <SubMenu
              key="7"
              title={
                <span>
                  <Icon type="form" />
                  <span>网站管理</span>
                </span>
              }
            >
              <Menu.Item key="7.1">
                <Link to="/site/web/contentlist">内容管理</Link>
              </Menu.Item>
              <Menu.Item key="7.2">
                <Link to="/site/web/members">成员管理</Link>
              </Menu.Item>
              {/*<Menu.Item key="7.3">
                <Link to="/site/web/job">职位管理</Link>
            </Menu.Item>*/}
              <Menu.Item key="7.4">
                <Link to="/site/web/investment">投资布局</Link>
              </Menu.Item>
              {/*<Menu.Item key="7.5">
                <Link to="/site/web/email">邮件订阅</Link>
          </Menu.Item>*/}
            </SubMenu>
            <Menu.Item key="8">
              {" "}
              <Link to="/site/talk">
                {" "}
                <Icon type="setting" theme="outlined" />
                讨论
              </Link>
            </Menu.Item>
            <Menu.Item key="9" style={{paddingLeft: 14,}}>
       <Icon type="" />
              使用说明
              
                 <a target="_blank" href="http://token.collinstar.com.cn/uploads/pdf/1548143166878__collinstar__%E3%80%90%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%E3%80%91%E7%A7%91%E9%93%B6%E8%B5%84%E6%9C%AC%E6%8A%95%E7%A0%94%E7%B3%BB%E7%BB%9F1.0%E4%BA%A7%E5%93%81%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf">使用说明</a>  
              
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              textAlign: "right",
              borderBottom: "4px solid #F0F2F5"
            }}
          >
          <Dropdown overlay={menucenter} trigger={['click']}>
         
        
              <div style={{ display: "inline-block" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 24,
                    background: "#A6DBFF",
                    borderRadius: "50%",
                    lineHeight: "24px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >

                {localStorage.img?<img style={{width:"100%",height: "100%",borderRadius:"50%",marginTop:"-5px"}} src={localStorage.img}></img>:
                
                localStorage.username?  localStorage.username.substring(0, 1):""}
                  
                </div>
                <div style={{ display: "inline-block", marginLeft: "8px" }}>
                  {localStorage.username}
                </div>
              </div>
              </Dropdown>
          </Header>
          <Content style={{ margin: "0", padding: "0" }}>
            <div style={{ background: "#fff", minHeight: 0 }}>
              <Route path={"/site/dashboard"} exact component={Page404} />
              <Route path={"/"} exact component={Page404} />
              <Route path={"/site/project"} exact component={Page404} />
              <Route
                path={"/site/project/projects"}
                exact
                component={Project}
              />
              <Route
                path="/site/project/projects/projectinf/:id"
                exact
                component={Projectinf}
              />
              <Route
              path= "/site/project/ICO"
              exact
              component={ICOprogect}
            />
              <Route
                path="/site/project/projects/uploading"
                exact
                component={Uploadingproject}
              />
              <Route path="/site/project/analysis" exact component={Rateproject} />
              <Route
                path="/site/project/invest"
                exact
                component={Investmentproject}
              />
              <Route path="/site/project/tag" exact component={Tag} />
              <Route
                path="/site/personalcenter"
                exact
                component={Personalcenter}
              />

              <Route path="/site/fund" exact component={Fundlist} />
              <Route path="/site/addfund" exact component={Fund} />
              <Route path="/site/fundinf" exact component={Fundinf} />

              <Route path="/site/source" exact component={Contacts} />
              <Route
                path="/site/source/addsource"
                exact
                component={AddContacts}
              />
              <Route
                path="/site/source/sourceinf/:id"
                component={Contactsinf}
              />

              <Route path="/site/exchange" exact component={Page404} />
              <Route path="/site/industry" exact component={Page404} />

              <Route path="/site/web" exact component={Page404} />
              <Route
                path="/site/web/contentlist"
                exact
                component={Contentlist}
              />
              <Route
                path="/site/web/contentinf/:id"
                exact
                component={Contentmanagement}
              />
              <Route
                path="/site/web/addcontentinf"
                exact
                component={addContactsinf}
              />

              <Route path="/site/web/members" exact component={Item} />
              <Route path="/site/web/job" exact component={Page404} />
              <Route
                path="/site/web/investment"
                exact
                component={Investmentlayout}
              />
              <Route path="/site/web/email" exact component={Page404} />
              <Route path="/site/talk" exact component={Talk} />
              <Route path="/site/addtalk" exact component={AddTalk} />
              <Route path="/site/talkinf/:id" exact component={Talkinf} />

              <Route path="/site/set" exact component={Page404} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center", color: "rgba(0 0 0 0.45)" }}>
            <span>帮助</span>
            <span style={{ margin: "0 40px" }}>隐私</span>
            <span>条款</span>
            <br />
            collinstar ©2018 Created by collinstar
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
