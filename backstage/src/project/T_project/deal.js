import React, { Component } from "react";
import { Tabs, Button,Modal,Select  } from "antd";
import './deal.css'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Record extends Component {
  state = {
    edit: false,
    show:false,
    showTxt:"展开",
    ifClick:true,
    showClassname:"",
    showDomClassname:""
  };
  animateDown=()=>{
    this.setState({
      ifClick:false
    })
    let show=this.state.show
    if(show){
      this.setState({
        show:false,
        showTxt:"展开",
        ifClick:true,
        showClassname:"yss_up",
        showDomClassname:"yss_downDom"
      })
    }else{
      this.setState({
        show:true,
        showTxt:"收起",
        ifClick:true,
  
        showClassname:"yss_down",
      })
    }
  }
  render() {
    return (
      <div
        style={{
          marginLeft: 28,
          padding: "10px 18px",
          background: "rgba(0,79,255,0.05)",
          marginTop:10,
          position:"relative"
        }}
      >
        <div>
          <span>投资阶段：私募第一轮</span>
          <div style={{float:"right",}}><span style={{color:"#F5222D",marginRight:10}}>[ 删除 ]</span> <span style={{color:"#004FFF"}}>[ 编辑 ]</span></div>
        </div>
        <div>
          <div style={{ width: 300,display:"inline-block" }}>
            <span>投资主体： </span>
            <span style={{ color: "#004FFF" }}>一期基金</span>
          </div>
          <div style={{display:"inline-block"}}>
            <span>打币时间：</span>
            <span style={{ color: "#004FFF" }}>2018-2-12 16:30 </span>
          </div>
        </div>
        <div>
          <div style={{ width: 300,display:"inline-block" }}>
            <span>投资数额：  </span>
            <span style={{ color: "#004FFF" }}>500 ETH</span>
          </div>
          <div style={{display:"inline-block"}}>
            <span>兑换比例：</span>
            <span style={{ color: "#004FFF" }}>1 ETH = 2000 DNY   </span>
          </div>
        </div>
        <div>
        <div style={{ width: 300,display:"inline-block" }}>
        <span>应回币数量：   </span>
        <span style={{ color: "#004FFF" }}>2000 DNY</span>
      </div>
        </div>

<div className={this.state.showDomClassname}  style={ this.state.show?{display:"block"}:{display:"none",maxHeight:0}}>
        <div>
        <div style={{ width: 300,display:"inline-block" }}>
          <span>投资数额：  </span>
          <span style={{ color: "#004FFF" }}>500 ETH</span>
        </div>
        <div style={{display:"inline-block"}}>
          <span>兑换比例：</span>
          <span style={{ color: "#004FFF" }}>1 ETH = 2000 DNY   </span>
        </div>
      </div>

      <div>
      <div style={{ width: 300,display:"inline-block" }}>
        <span>投资数额：  </span>
        <span style={{ color: "#004FFF" }}>500 ETH</span>
      </div>
      <div style={{display:"inline-block"}}>
        <span>兑换比例：</span>
        <span style={{ color: "#004FFF" }}>1 ETH = 2000 DNY   </span>
      </div>
    </div>

    <div>
    <div style={{ width: 300,display:"inline-block" }}>
      <span>投资数额：  </span>
      <span style={{ color: "#004FFF" }}>500 ETH</span>
    </div>
    <div style={{display:"inline-block"}}>
      <span>兑换比例：</span>
      <span style={{ color: "#004FFF" }}>1 ETH = 2000 DNY   </span>
    </div>
  </div>




  </div>
  <div onClick={this.state.ifClick?this.animateDown:""} style={{position:"absolute",right:24,bottom:10,color:"rgba(0,0,0,0.65)"}}>

  {this.state.showTxt}  <span className={this.state.showClassname} style={{fontSize:12,display:"inline-block",verticalAlign:"bottom"}}>▼</span>
  </div>
      </div>
    );
  }
}

export default class Deal extends Component {
  state={
    visible:false
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
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
  electChange=(e)=>{
    console.log(e);
    
  }
  render() {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          border: "20px solid  #F0F2F5"
        }}
      >
{/* 添加记录弹窗 */}
      <Modal
      title="投资记录"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      maskClosable={false}
      width={900}
      bodyStyle={{padding:"40px 100px"}}
    >
    <div>
    <span style={{color:"#F5222D"}}>*</span><span style={{color:"rgba(0,0,0,0.45)"}}>所投阶段：</span>

    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.electChange}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Disabled</Option>
    <Option value="Yiminghe">yiminghe</Option>
  </Select>
    
    </div>
    

    <div>
    <span style={{color:"#F5222D"}}>*</span><span style={{color:"rgba(0,0,0,0.45)"}}>投资主体：</span>

    <Select defaultValue="一期基金" style={{ width: 120 }} onChange={this.electChange}>
      <Option value="jack">一期基金</Option>
      <Option value="lucy">一期基金</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <span style={{color:"rgba(0,0,0,0.45)"}}>投资币种：</span><span>ETH </span>
    </div>
    </Modal>
        <Tabs style={{ padding: "0 46px 10px" }} defaultActiveKey="1">
          <TabPane tab="交易记录" key="1">
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "inline-block",
                  background: "blue",
                  marginRight: 20,
                  verticalAlign: "text-bottom"
                }}
              />
              <span style={{ fontSize: 18, fontWeight: "600" }}>投资记录</span>
              <Button
                type="primary"
                onClick={this.showModal}
                style={{ width: 76, borderRadius: "100px", float: "right" }}
              >
                +添加
              </Button>
            </div>
            <Record />
          </TabPane>
          <TabPane tab="数据统计" key="2" />
          <TabPane tab="项目信息" key="3" />
        </Tabs>
      </div>
    );
  }
}
