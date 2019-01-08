import React, { Component } from "react";
import Nav from "../Nav";
import Foot from "../Foot";
import Logininf from './Logininf' 
import F from '../../context/f'
class Login extends Component {
  render() {
    return (
      <div>
      <Nav></Nav>
      <F></F>
      <div style={{width:"100%",position:"absolute",top:"65px",bottom:"65px",overflow:"auto"}} id="S1index"> 
      <Logininf></Logininf>
      </div>
        <Foot ifposition={true}></Foot>
      </div>
    );
  }
}
export default Login;
