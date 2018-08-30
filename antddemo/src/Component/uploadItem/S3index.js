import React, { Component } from "react";
import { Button,Modal,Icon} from 'antd';
import Head from './Head'
import {Redirect} from 'react-router-dom'

import S3inf from './S3inf'
import Out from '../style'
import Nav from "../Nav";
import Foot from "../Foot";
import {Link} from 'react-router-dom'
const headtext =
  "表单填写大约需要10~15分钟";
class S1index extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    window.location.hash='#/step2'
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
      <Nav></Nav>
      <div style={{width:"100%",position:"absolute",top:"65px",bottom:"65px",overflow:"auto",minWidth:"1200px"}}>
      <div style={{width:"50%",minWidth:"1200px",margin:"0 auto"}}>
      <div id="S3index">
      <Head step={2} text={headtext}></Head>
      <div style={Out}>
      <h3 style={{fontWeight:"600",fontSize:"24px",marginTop:"15px"}}>投资相关</h3>
        <S3inf></S3inf>
      </div>
     
      </div>
    </div>
    <p style={{textAlign:"center"}}>
    <Button  onClick={this.showModal} style={{ margin: "30px 43px 0 0",fontSize:"16px",height:"40px",width:"100px",background:"#fff",color:"#000",border:"none"}} type="primary">上一步</Button>
    <Link to="/step4">
    <Button style={{ margin: "30px 0",fontSize:"16px",height:"40px",width:"100px"}} type="primary">提交</Button>
    </Link>
    </p>
      </div>
    
      <Foot></Foot>
      <div>
      <Modal
        title=""
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        closable={false}
        width="430px"
      >
        <p style={{fontSize:"16px",fontWeight:"600"}}><Icon type="question-circle" /> 确认要返回上一步吗?</p>
        <p style={{color:"#000",opacity:"0.65"}}>返回上一步，当前页面信息不会被保存。</p>
      </Modal>
    </div>
      </div>
      
    );
  }
}
export default S1index;
