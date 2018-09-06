import React, { Component } from "react";
import Nav from "../Nav";
import Foot from "../Foot";
import Logininf from './Logininf' 

class Login extends Component {
  render() {
    return (
      <div>
      <Nav></Nav>
      <div style={{width:"100%",position:"absolute",top:"65px",bottom:"65px",overflow:"auto"}} id="S1index"> 
      <Logininf></Logininf>
      </div>
        <Foot></Foot>
      </div>
    );
  }
}
export default Login;
