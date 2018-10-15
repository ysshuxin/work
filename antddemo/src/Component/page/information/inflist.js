import React, { Component } from "react";
import Nav from "../../Nav";
import Foot from "../../Foot";
import img from "../../../img/logo.png";
import { Spin, Icon } from 'antd';
import {Link} from 'react-router-dom'
import axios from "../../../api/api";
import Qs from 'qs'
// import axios from 'axios'
import $ from 'jquery'

let InfDom=(props)=>{
    return (

        <div
        style={{
          display: "inline-block",
          width: "24.5%",
          margin: "0 3%",
          textAlign: "left",
          marginBottom: "50px"
        }}
       
      >
        <div style={{ width: "100%",paddingBottom:"56.25%",overflow: "hidden" ,background:"#000",position:"relative"}}>
        <a target="_blank" href='#/inf' >
        
        <img style={{ position:"absolute",left:"0",bottom:"0",right:"0",top:"0",margin:"auto",width:"100%",height:"100%"}} src={img} tag="" />
        </a>
          
          
        </div>
        <h3 style={{ fontSize: "18px", margin: "16px 0" ,fontWeight:"600"}}>
          这里输入标题这里输入标题这里输入标题这里输入
        </h3>
        <div style={{ fontSize: "14px" }}>
          这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里
        </div>
        <div style={{ marginTop: "10px" }}>2018/08/10</div>
        
      </div>

    )
}

export default class Inflist extends Component {
  state = {
    infNum: 6,
    loading:false
  };

  componentDidMount = () => {
    var data1= {
      page:[1,2,3]
  }
// data1=JSON.stringify(data1)
let formData=new FormData()
formData.append('page',{
  aaa:"sss"
})
    axios.get('http://127.0.0.1:8081/listUsers',{aa:11}).then((data)=>{
      console.log(data)
    })
   
  };

  moreInfDom=()=>{
      let timeOut=setTimeout(()=>{
        let num=this.state.infNum
        this.setState({
          infNum:num+3,
          loading:false
        })
        window.clearTimeout(timeOut)
      },1000)
    this.setState({
        loading:true
      })
     
      
  }


  render() {
    

    let list=[]
        for (let index = 0; index < this.state.infNum; index++) {
            list.push(<InfDom></InfDom>)
        }
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <div>
        <Nav />
        <div style={{ marginTop: "65px"}}>
          <div
            style={{
              width: "100%",
              height: "544px",
              background: "#ccc",
              textAlign: "center"
            }}
          >
            <h1>资讯</h1>
          </div>
          <div>
            <h1
              style={{
                textAlign: "center",
                fontSize: "50px",
                marginTop: "84px",
                marginBottom: "74px"
              }}
            >
              咨询
            </h1>
            <div style={{ textAlign: "center"  ,width:"75%",minWidth:"1200px",margin:"0 auto"}}>
              {list}
              <h3 onClick={this.moreInfDom} style={{marginBottom:"50px"}}>{this.state.loading?<Spin indicator={antIcon} />:"查看更多"} </h3>
            </div>
          </div>
        </div>
        <Foot ifposition={false} />
      </div>
    );
  }
}
