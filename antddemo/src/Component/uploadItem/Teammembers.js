import React, { Component } from "react";
import { Input, Icon } from "antd";
import Out from "../style";
import Inputs from "./Inputs";
import store from "../../redux/redux";
import Redicon from "./Redicon";
const { TextArea } = Input;

class Teammembers extends Component {
  state = {
    num: store.getState(),
    ifshow: true,
    ifdel: true
  };

  del = e => {
    store.dispatch({ type: "DEL" });
    this.setState({
      ifshow: false
    });
  };
  render() {
    if (this.state.ifshow) {
      return (
        <div id={this.props.id} style={Out} className="timemembers">
          <h3 style={{ fontSize: "24px", fontWeight: "600" }}>
            {this.props.text}
          </h3>
          {this.props.ifdel ? (
            <Icon
              onClick={this.del}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "24px"
              }}
              type="close-circle-o"
            />
          ) : (
            <div />
          )}
          <Inputs
            value={this.props.name}
            titlewidth="36px"
            id="ceoname"
            text="姓名"
            width="160px"
            right="38px"
            red="true"
          />
          <Inputs
            value={this.props.job}
            titlewidth="36px"
            id="ceojob"
            text="职位"
            width="240px"
            right="38px"
            red="true"
          />
          <div style={{ marginTop: "20px", marginBottom: "16px" }}>
            <span
              style={{
                marginRight: "10px",
                fontSize: "16px",
                display: "inline-block",
                marginBottom: "20px"
              }}
            >
              <Redicon>*</Redicon>
              简介
            </span>
            <TextArea
              className="ceoinf"
              style={{
                width: "100%",
                verticalAlign: "top",
                height: "120px",
                display: "inline-block"
              }}
              defaultValue={this.props.inf}
            />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

console.log(document.getElementById("id" + 1));

export default Teammembers;
