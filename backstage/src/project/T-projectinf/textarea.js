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
          autosize={this.props.autosize}
          id={this.props.id}
          disabled={this.props.disabled}
          className={this.props.disabled ? "inputhidden" : "inputshow"}
          defaultValue={this.props.inf}
           style={this.props.padding?{ verticalAlign: "top", height: "100px" ,background:"#fff",padding:"0",resize:"none"}:{ verticalAlign: "top", height: "100px" ,background:"#fff",resize:"none"}}
          />
        </div>
      </div>
    );
  }
}
export default Textarea;
