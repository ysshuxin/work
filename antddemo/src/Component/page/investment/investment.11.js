import React, { Component } from "react";
import Nav from "../../Nav";
import Foot from "../../Foot";
import { Button } from "antd";
import "./investment.css"

const job=["交易所","钱包","矿池","算力平台","芯片整机","媒体","区块链实验室","众筹平台","基金","众筹平台","众筹平台","基金"]
const all=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
class Investment extends Component {
  state={
    job:job.slice(0,2),
    button:false,
    num:2,
    now:job
  }
  onChange=(checked)=>{
    console.log(`switch to ${checked}`);
  }
  all=()=>{
    let li=document.getElementsByTagName("li")
   for(let i=0;i<li.length;i++){
     li[i].style.color="rgba(0,0 ,0 ,0.45)"
     li[i].style.fontWeight="500"
   }
const allnum=this.state.jobnum
    this.setState({
      job:all.slice(0,2),
      button:true,
      now:all,
      num:2
    })
  }
  job=()=>{
    let li=document.getElementsByTagName("li")
   for(let i=0;i<li.length;i++){
     li[i].style.color="rgba(0,0 ,0 ,0.45)"
     li[i].style.fontWeight="500"
   }

    this.setState({
      job:job.slice(0,2),
      button:false,
      now:job,
      num:2
    })
  }
  more=()=>{
    let num=this.state.num
    let now=this.state.now.slice(0,num)
    this.setState({
      job:now,
      num:num+2
    })
  }
  titlechange=(value)=>{
   let li=document.getElementsByTagName("li")
   for(let i=0;i<li.length;i++){
     li[i].style.color="rgba(0,0 ,0 ,0.45)"
     li[i].style.fontWeight="500"
   }
   value.target.style.color="#000"
   value.target.style.fontWeight="600"

   let text=value.target.innerText
    let now=this.state.now
    let num=this.state.num
    let arrdom=now[value.target.attributes[1].value] 
    now.splice(value.target.attributes[1].value,1)
    now.unshift(arrdom)
      this.setState({
          job:now.slice(0,num),
        })
  }
  render() {
   
    return (
      <div >
        <Nav />
        <div style={{ marginTop: "65px", overflow: "hidden" }}>
          <div
            style={{
              width: "100%",
              height: "544px",
              background: "#ccc",
              textAlign: "center"
            }}
          >
            <h3>投资布局</h3>
            <p>遍布全球6个国家,15个城市,12个区块链细分行业</p>
            <p>
              包括芯片整机、矿池、算力平台、钱包、交易所、ICO平台、基金、媒体、
            </p>
            <p>市值管理、区块链实验室等</p>
          </div>
            <div style={{textAlign:"center",background:"#E8E8E8", overflow: "hidden"}}>
            <div style={{textAlign:"center",minWidth:"1058px",margin:"40px auto",width:"50%"}}>
              <Button onClick={this.all}  type={this.state.button?"primary":""} style={{width:"90px",height:"36px"}}>全部({all.length})</Button>
              <Button onClick={this.job}  type={!this.state.button?"primary":""} style={{width:"90px",height:"36px"}}>行业 ({job.length})</Button>
              </div>
            <ul style={{overflow:"hidden",minWidth:"1058px",margin:"0 auto 70px",paddingLeft:"0"}}>
            {this.state.now.map((itme,index)=>{
            return (
              <li className="li" data-id={index} onClick={this.titlechange} style={{listStyle:"none",display:"inline-block",margin:"0 16px",color:"rgba(0,0 ,0 ,0.45)",fontSize:"16px"}}>{itme}</li>
            )
          })}
            </ul>
            </div>
            <div style={{background:"#f7f6f2", overflow: "hidden",marginBottom:"20px"}}>
              {
                this.state.job.map((item,index)=>{
                  return(
                    <div style={{width:"54%",margin:"0 auto",minWidth:"1258px"}}>
                    <h3 style={{color:"rgba(0,0 ,0 ,0.45)",fontSize:"30px",width:"1000px",margin:"0 auto 12px"}}>{item}</h3>
                    <div style={{padding:"37px 52px 37px 64px",width:"1000px",background:"#fff",boxShadow:"2px 2px 2px #ccc",margin:"0 auto 50px",borderRadius:"4px"}}>
                    <img  src="" style={{width:"150px",height:"150px",display:"inline-block",marginRight:"56px",verticalAlign:"top"}}></img>
                    <div style={{display:"inline-block",width:"625px"}}>
                      <h4 style={{fontSize:"24px"}}>Arc</h4>
                      <p >这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介</p>
                      <a href={"www.hcash.io"}>www.hcash.io</a>
                    </div>
                    </div>

                    <div style={{padding:"37px 64px",width:"1000px",background:"#fff",marginBottom:"50px",margin:"0 auto 50px",boxShadow:"2px 2px 2px #ccc",margin:"0 auto 50px",borderRadius:"4px"}}>
                    <img  src="" style={{width:"150px",height:"150px",display:"inline-block",marginRight:"46px",verticalAlign:"top"}}></img>
                    <div style={{display:"inline-block",width:"675px"}}>
                      <h4 style={{fontSize:"24px"}}>Arc</h4>
                      <p >这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介这里输入简介</p>
                      <a href={"www.hcash.io"}>www.hcash.io</a>
                    </div>
                    </div>
                    </div>
                  )
                })
              }
              <p onClick={this.more} style={{textAlign:"center",cursor: "pointer"}}> 加载更多</p>
            </div>

        </div>

        <Foot />
      </div>
    );
  }
}
export default Investment;
