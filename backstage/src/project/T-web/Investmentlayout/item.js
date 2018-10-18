import React, { Component } from "react";
import { Input, Menu, Dropdown,Button,Icon,Message} from "antd";
import axios from 'axios'
const TextArea=Input.TextArea
const industry = [
  "金融",
  "物联网",
  "能源",
  "公共事业",
  "人工智能",
  "物流",
  "医疗健康",
  "汽车交通",
  "企业服务",
  "社交",
  "文娱传媒",
  "硬件",
  "旅游",
  "电商",
  "房产家居",
  "消费生活",
  "教育",
  "农业",
  "VR",
  "工具",
  "无人机",
  "其他"
];

export default class Item extends Component {
  state = {
    edit: this.props.edit,
    defaultValue:JSON.parse(JSON.stringify(this.props.defaultValue)),
    changeValue:JSON.parse(JSON.stringify(this.props.defaultValue)),
  };
  globleData={
    industry:this.props.industry,
    industryarr : []
  }
  
  componentWillMount = () => {
   
    this.globleData.industryarr = industry.map((currentValue, index) => {
      return <Menu.Item itemID={index} key={index}>{currentValue}</Menu.Item>;
    });
  };
  edit=()=>{
      let edit=!this.state.edit
      if(edit){
        this.setState({
          edit:edit
      })
      }
     
      
  }
  nameChange=(e)=>{
    let data=this.state.changeValue
    data.name=e.target.value
    this.setState({
      changeValue: data
    });
    
  }
  classifyChange=(e)=>{
    let data=this.state.changeValue
    data.classify=e.item.props.itemID
    
    this.setState({
      changeValue: data
    });
    
  }
  web_urlChange=(e)=>{
    console.log(e.target.value)
    let data=this.state.changeValue
    data.web_url=e.target.value
    this.setState({
      changeValue:data
    })
  }
  infOnchange=(e)=>{
    let data=this.state.changeValue
    data.inf=e.target.value

    this.setState({
      changeValue:data
    })
  }

  upData=()=>{
    let data=this.state.changeValue
      let edit=!this.state.edit


     
        console.log(this.state.defaultValue)
        axios
        .post("http://172.105.200.109:5000/api/getInvestment",data)
        .then(json => {
          if (json.data.code === 200) {
            Message.success('修改成功',[1]);
            
  
            console.log(json.data.data)
            this.setState({
              defaultValue:json.data.data,
              edit:edit
            })
          }else{
            Message.error(json.data.msg,[1]);
                this.setState({
          edit:edit
        })
          }
        })
        .catch(e => {
          console.log(e);
        });
        
     



   
    
  }
  cancel=()=>{
    let edit=!this.state.edit
    this.setState({
      edit:edit
    })
  }
  render() {
    return (
      <div
        style={{
          padding: "25px 15px",
          borderBottom: "1px solid #F0FAFF",
          background: "#fff",
          position: "relative"
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "4px",
           
            position: "absolute",
            top:"40px"
          }}
        >
        <img style={{width:"100%"}} src={this.state.defaultValue.img_path}></img>
        </div>
        <div style={{ marginLeft: "75px" ,overflow:"hidden"}}>
          <div style={{ position: "relative", height:"44px",lineHeight:"44px"}}>
            {this.state.edit ? (
              <div>
                <span>名称：</span>
                <Input defaultValue={this.state.defaultValue.name} onChange={this.nameChange} style={{width:"160px"}} />
              </div>
            ) : (
              <span>{this.state.defaultValue.name}</span>
            )}
            <div style={{ position: "absolute", right: "0",bottom:"0"}}>
              <span onClick={this.edit} style={{ color: "#004FFF" }}>
                {this.state.edit ? (<span> <span onClick={this.upData}>保存</span>   <span onClick={this.cancel} style={{marginLeft:"20px"}}>取消</span></span>): "编辑"}
              </span>
              <span style={{ margin: "0 8px" }}>|</span>
              <span style={{ color: "#F5222D" }}>删除</span>
            </div>
          </div>
          <div style={{height:"44px",lineHeight:"44px"}}>
            <div style={{ display: "inline-block" }}>
              <span style={{ display: "inline-block" }}>网址： </span>
              {this.state.edit ? (
                <Input defaultValue={this.state.defaultValue.web_url} onChange={this.web_urlChange} style={{ width: "160px" }} />
              ) : (
                <span style={{display:"inline-block",width: "160px" }}> {this.state.defaultValue.web_url}</span>
              )}
            </div>
            <div style={{ display: "inline-block", marginLeft: "46px" }}>
              <span style={{ display: "inline-block" }}>分类： </span>
              {this.state.edit ? (
                 <Dropdown
                 trigger={["click"]}
                 overlay={
                   <Menu
                     style={{
                       height: "200px",
                       background: "#fff",
                       overflowY: "scroll"
                     }}
                     onClick={this.classifyChange}
                   >
                     { this.globleData.industryarr}
                   </Menu>
                 }
               >
                 <Button
                   style={{ width: "160px", height: "32px", textAlign: "left",verticalAlign:"middle",marginBottom:"4px"}}
                 >
                   {this.globleData.industry[this.state.changeValue.classify] }
                   <Icon
                     style={{ position: "absolute", right: "8px", top: "10px" }}
                     type="down"
                   />
                 </Button>
               </Dropdown>
              ) : (
                <span style={{display:"inline-block",width: "160px" }}> {this.globleData.industry[this.state.defaultValue.classify] }</span>
              )}
            </div>
          </div>
        <div style={{position:"relative",marginTop:"6px"}}>
            <span style={{position:"absolute"}}> 简介：</span>
            
            {this.state.edit?<div style={{marginLeft:"42px"}}> <TextArea autosize={true} onChange={this.infOnchange} defaultValue={this.state.defaultValue.inf} style={{padding:"0px"}}></TextArea></div>:<div style={{marginLeft:"42px",padding:"1px "}}>{this.state.defaultValue.inf}</div>}
        </div>

        </div>
      </div>
    );
  }
}
