import React, { Component } from "react";
import {Link} from 'react-router-dom'
import coming from '../../img/coming.png'
class Page404 extends Component {


  render() {
    return (
      <div  style={{textAlign:"center",background:"#f0f2f5" ,height:"400px"}}>
   <img style={{width:"20%",marginTop:"260px"}} src={coming}></img>
   <p>工程师正在拼命赶工，老板 加个鸡腿呗 ......</p>
      </div>
    );
  }
}
export default Page404;
