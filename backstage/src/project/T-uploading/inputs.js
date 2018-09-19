import React, { Component } from "react";
import { Input, message } from "antd";
import { width } from "window-size";
export default class Inputs extends Component {
  render() {
    return (
      <div style={{ display: "inline-block" ,
        marginRight:this.props.right,
     marginTop:this.props.top?this.props.top:"4px",
    marginBottom:"4px"}}>
        <span
          style={this.props.show ? { color: "red" } : { visibility: "hidden" }}
        >
          *
        </span>
        <span
          style={{
            marginRight: "8px",
            fontSize: "14px",
            display: "inline-block",
            width: "80px"
          }}
        >
          {this.props.name}
        </span>
        <Input
        id={this.props.id}
          placeholder={this.props.placeholder}
          style={{ width: "160px", height: "32px" }}
        />
      </div>
    );
  }
}
