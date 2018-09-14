import React, { Component } from "react";
import Head from './Head'
import Success from './Success'
import Nav from "../Nav";
import Foot from "../Foot";
class S1index extends Component {
 
  
  add = e => {
    
  };

  render() {
    return (
      <div>
      <Nav></Nav>
      <div style={{width:"100%",position:"absolute",top:"65px",bottom:"65px",overflow:"auto",minWidth:"1200px"}}>
      <div style={{width:"50%",minWidth:"1200px",margin:"0 auto"}}>
        <div id="S3index">
        <Head step={3}></Head>
        <Success></Success>
        </div>
      </div>
      </div>
      <Foot ifposition={true}></Foot>
      </div>
    );
  }
}
export default S1index;
