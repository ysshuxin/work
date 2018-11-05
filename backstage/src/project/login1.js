import React, { Component } from "react";
import {  Form, Icon, Input, Button, Checkbox } from "antd";
import axios from "../api/api";



 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }

 


  render() {
     const { userName } = this.state;
  const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div style={{width: "100%",height: "100%",}}>
      
        <div style={{width: "300px",margin:"0 auto"}}>
         <Input
        placeholder="Enter your username"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        ref={node => this.userNameInput = node}
      />
        </div>
      
      </div>
    );
  }
}


export default Login