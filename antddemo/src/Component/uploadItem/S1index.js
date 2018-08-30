import React, { Component } from "react";
import Head from "./Head";
import S1inf from "./S1inf";
import S1poject from "./S1poject";
import Out from "../style";
import { Button } from "antd";
import {Link} from 'react-router-dom'
import Nav from "../Nav";
import Foot from "../Foot";
import axios from 'axios';

const text =
  "表单填写大约需要10~15分钟";
class S1index extends Component {
  next = e => {
    let data={
    name: "",
    job: "",
    mail: "",
    phone: "",
    wchat: "",
    objectname: "",
    companyname: "",
    originator: "",
    officialwebsite: "",
    need: [],
    whitebook: "",
    referrer: "",
    suggestjob: ""
  }

    // data.name=document.getElementById("name").value
    // data.job=document.getElementById("job").value
    // data.mail=document.getElementById("mail").value
    // data.phone=document.getElementById("phone").value
    // data.wchat=document.getElementById("wchat").value
    // data.objectname=document.getElementById("objectname").value
    // data.companyname=document.getElementById("companyname").value
    // data.originator=document.getElementById("originator").value
    // data.officialwebsite=document.getElementById("officialwebsite").value
    // data.need=document.getElementById("need").value
    // data.whitebook=document.getElementById("whitebook").value
    // data.referrer=document.getElementById("referrer").value
    // data.suggestjob=document.getElementById("suggestjob").value



    axios.get("http://localhost:8000/api").then(
      function(data){
        console.log(data.data)
      }
    ).catch(
      function(error){
        console.log(error)
      }
    )

  };
  render() {
    return (
      <div>
      <Nav></Nav>

      <div style={{width:"100%",position:"absolute",top:"65px",bottom:"65px",overflow:"auto",minWidth:"1200px"}}>
      <div style={{width:"50%",minWidth:"1200px",margin:"0 auto"}} id="S1index">
          <Head step={0} text={text} />
          <div style={Out}>
            <S1inf />
          </div>
          <div style={Out}>
            <S1poject />
          </div>
          <p style={{ textAlign: "center" }}>
          <Link to="/step2">
            <Button
              style={{ margin: "30px 0",fontSize:"16px",height:"40px",width:"100px"}}
              onClick={this.next}
              type="primary"
            >
              下一步
            </Button>
          </Link>
          </p>
        </div>
      </div>
     

        
        <Foot></Foot>
        
      </div>
    );
  }
}
export default S1index;
