import React, { Component } from "react";
import { Input } from "antd";

export default class Inputs extends Component {
  render() {
    return (
      <div style={{ display: "inline-block" ,
        marginRight:this.props.right,
        marginTop:"8px",
        marginBottom:"8px"
    }}>
        <span
          style={this.props.show ? { color: "red" } : { visibility: "hidden" }}
        >
          *
        </span>
        <span
          style={{
            width:"68px",
            
            fontSize: "14px",
            display: "inline-block"
          }}
        >
          {this.props.name}
        </span>
        <Input
        disabled={this.props.disabled}
        defaultValue={this.props.defaultValue}
        id={this.props.id}
          placeholder={this.props.placeholder}
          style={this.props.disabled?{width:"160px",height:"32px",border:"none",background:"#fff"}:{ width: "160px", height: "32px" }}
        />
      </div>
    );
  }
}
