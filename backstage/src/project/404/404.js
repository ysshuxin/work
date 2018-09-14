import React, { Component } from "react";
import {Link} from 'react-router-dom'
class Ceo extends Component {


  render() {
    return (
      <div  style={{textAlign:"center" }}>
       <p style={{padding:"40px 0"}}>
            请<Link to='/'><a style={{color:"blue"}}>登陆</a></Link>
       </p>
      </div>
    );
  }
}
export default Ceo;
