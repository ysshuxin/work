import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./project/login";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
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
