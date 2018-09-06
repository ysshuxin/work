import React, { Component } from "react";

import { Input } from "antd";

class Inputs extends Component {
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          marginRight: this.props.right,
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >
        <span
          style={{
            display: "inline-block",
            marginRight: "10px",
            width: "36px",
            fontSize: "14px"
          }}
        >
          {this.props.text}
        </span>
        <Input
          id={this.props.id}
          style={{ width: this.props.width, height: "32px" ,background:"#fff"}}
          disabled={this.props.dis}
          className={this.props.dis?"inputhidden":"inputshow"}
          defaultValue={this.props.value}
        />
      </div>
    );
  }
}
export default Inputs;
