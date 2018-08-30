import React, { Component } from "react";

import { Input } from 'antd';
import Redicon from './Redicon'

class Inputs extends Component {
  state = {
    current: "01"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
     <div style={{display:"inline-block",marginRight:this.props.right,marginTop:"10px",marginBottom:"10px"}}>
      {this.props.red?<Redicon></Redicon>:<span style={{visibility:"hidden"}}>*</span>}<span style={{display:"inline-block", marginRight:"10px",width:this.props.titlewidth,fontSize:"16px"}}>{this.props.text}</span><Input id={this.props.id} style={{width:this.props.width,height:"40px"}}></Input>
     </div>
    );
  }
}
export default Inputs;
