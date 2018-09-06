import React, { Component } from "react";
import { Input, Icon } from 'antd';
import Inputs from './inputs'
const { TextArea } = Input;


export default class Teammembers extends Component {
  
  del=e=>{
    
  };
  render() {
      return (
      <div key={this.props.key} id={this.props.id}  className="timemembers">
      {this.props.ifdel? < Icon  onClick={this.del} style={{position:"absolute",right:"10px",top:"10px",fontSize:"24px"}} type="close-circle-o" />:<div></div>}
      <Inputs titlewidth="36px" id="ceoname" text="姓名" width="160px" right="38px" red="true"></Inputs>
      <Inputs titlewidth="36px" id="ceojob" text="职位" width="160px" right="38px" red="true"></Inputs>
      <div style={{marginTop:"10px",marginBottom:"16px"}}>
           <TextArea className="ceoinf"  style={{width:"100%",verticalAlign:"top",height:"120px",display:"inline-block"}}   defaultValue="" />
        </div>
      </div>
    );
    }
  }


