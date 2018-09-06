import React, { Component } from "react";
import { Input } from "antd";
const { TextArea } = Input;
class Textarea extends Component {
  render() {
    return (
      <div style={{ margin: "12px 0 22px 0" }}>
        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              marginBottom: "14px",
              fontWeight: "600",
              fontSize: "16px"
            }}
          >
            {this.props.text}
          </div>
          <TextArea
          id={this.props.id}
            disabled={this.props.disabled}
            className={this.props.disabled ? "inputhidden" : "inputshow"}
            defaultValue={this.props.inf}
            style={{ verticalAlign: "top", height: "100px" ,background:"#fff"}}
          />
        </div>
      </div>
    );
  }
}
export default Textarea;
