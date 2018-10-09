import React, { Component } from "react";
import { Input ,Icon} from "antd";
import Inputs from './inputs'
const { TextArea } = Input;
class Ceo extends Component {

 style={display:"none"}
  delt=()=>{
    this.props.del(this)
  }
  render() {
    return (
      <div  style={{ margin: "12px 0 22px 0" ,position:"relative"}}>
      <Icon  style={this.props.num===1?this.style:{position:"absolute",right:"0",top:"20px" ,fontSize:"30px"}}  onClick={this.delt}  type="close-circle" theme="outlined" />
        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              marginBottom: "14px",
              fontSize: "16px"
            }}
          >
          <Inputs right="40px" width="160px" value="张全蛋" dis={this.props.disabled} text="姓名"></Inputs>
          <Inputs width="160px" value="质检员" text="职位" dis={this.props.disabled}></Inputs>
          </div>
          <TextArea
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
export default Ceo;
