import React, { Component } from "react";
import { Input } from "antd";
import Redicon from "./Redicon";
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
              fontSize: "18px"
            }}
          >
            {this.props.red ? <Redicon>*</Redicon> : ""} {this.props.text}
          </div>
          <TextArea
            id={this.props.id}
            placeholder={this.props.inf}
            style={{ verticalAlign: "top", height: "160px" }}
            defaultValue={this.props.value}
          />
        </div>
      </div>
    );
  }
}
export default Textarea;
