import React, { Component } from "react";
import PropTypes from "prop-types";
import C from './c'
class F extends Component {

static childContextTypes={
    num:PropTypes.number,
    name:PropTypes.string,
}

getChildContext=(a=11,b="ss")=>{
    return{
        num:a,
        name:b
    }
}
click=()=>{
   this.getChildContext(22,"333")
   
}
  render() {
    return (
 <div>
 
 <C></C>

 <div style={{position:"absolute",top:"200px",left:"100px",zIndex:"100"}} onClick={this.click}>点击</div>
 </div>
    )
  }
}
export default F;
