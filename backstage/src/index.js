import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./project/login";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(

  window.location.hash == "#/"? (
    <HashRouter>
      <Login />
    </HashRouter>
  ) : (
    <HashRouter>
      <App />
    </HashRouter>
    
  ),
  document.getElementById("root")
);
registerServiceWorker();
