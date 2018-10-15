import React from "react";
import ReactDOM from "react-dom";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import "./index.css";
import App from "./App";
import Login from "./project/login";
import {  Route, HashRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  
  <HashRouter> 
  <div style={{height:"100%",width:"100%"}}>
  <Route exact path="/" component={Login} ></Route>
  <Route  path="/site" component={App} ></Route>
  </div>
  </HashRouter>
  
  ,
  document.getElementById("root")
);
registerServiceWorker();
