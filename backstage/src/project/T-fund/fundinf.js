import React, { Component } from "react";
import {
  Breadcrumb,

  Checkbox,
  DatePicker,

  Select,
  Tabs
} from "antd";
import moment from "moment";
import Fundprojectlist from './fundinfitem/fundprojectlist'
import Funddata from './fundinfitem/funddata'
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const tokenOptions = [
  { label: "ETH", value: "ETH" },
  { label: "USDT", value: "USDT" },
  { label: "BTC", value: "BTC" }
];

export default class Fundinf extends Component {
  state = {
    titleEdit: false,
    tokenName: ["ETH"],
    tokenstyle: "ETH",
    defaultDate: ["2018-1-1", "2018-1-1"]
  };
  defaultToken = ["ETH"];

  changeTitleedit = () => {
    let fig = this.state.titleEdit;
    let token = this.state.tokenName;
    if (fig) {
      this.defaultToken = token.map((item, index) => {
        return (
          <span
            key={index}
            style={{ marginRight: "10px", display: "inline-block" }}
          >
            {item}
          </span>
        );
      });
    }

    this.setState({
      titleEdit: !fig
    });
  };
  tokenOnchange = value => {
    this.setState({
      tokenName: value
    });
  };
  tokenstyleOnchange = value => {
    console.log(value);
    this.setState({
      tokenstyle: value
    });
  };
  timeOnchange = (dates, dateStrings) => {
    if(dateStrings[0]===""){
      this.setState({
        defaultDate: ["2017-1-1","2018-1-1"]
      });
    }else{
      this.setState({
      defaultDate: dateStrings
    });
    }

  };
  tabsCallback=(key)=>{
    console.log(key);
  }
  render() {
    const tokenstyle = (
      <Select
        defaultValue={this.state.tokenstyle}
        style={{ width: 100 }}
        onChange={this.tokenstyleOnchange}
      >
        {tokenOptions.map((option, index) => {
          return (
            <Option value={option.label} key={index}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    );

    return (
      <div>
      <div style={{ padding: "16px 32px",fontSize:"14px" ,color:"#000",minHeight:"100px"}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="#/site/fund">基金管理</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>基金详情</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{position:"relative"}}>
          <h3
            style={{
              margin: "16px 0",
              fontSize: "22px",
              fontWeight: "600",
              position: "relative"
            }}
          >
            基金列表
            <span
              onClick={this.changeTitleedit}
              style={{
                position: "absolute",
                fontSize: "16px",
                color: "#004FFF",
                fontWeight: "500",
                top: "5px",
                right: "0",
                cursor: "pointer"
              }}
            >
              [{this.state.titleEdit ? "保存" : "编辑"}]
            </span>
          </h3>
          <div style={{ height: "32px", lineHeight: "32px" }}>
            <div style={{ display: "inline-block", width: "330px" }}>
              <span style={{ display: "inline-block" }}>募集币种：</span>
              {this.state.titleEdit ? (
                <div style={{ display: "inline-block" }}>
                  <CheckboxGroup
                    options={tokenOptions}
                    defaultValue={this.state.tokenName}
                    onChange={this.tokenOnchange}
                  />
                </div>
              ) : (
                this.defaultToken
              )}
            </div>
            <div style={{ display: "inline-block" }}>
              <span style={{ display: "inline-block", marginRight: "8px" }}>
                结算币种:
              </span>
              {this.state.titleEdit ? (
                tokenstyle
              ) : (
                <span>{this.state.tokenstyle}</span>
              )}
            </div>
          </div>
          <div style={{ height: "34px", lineHeight: "34px" }}>
            <span style={{ display: "inline-block", marginRight: "8px" }}>
              起止时间:
            </span>
            {this.state.titleEdit ? (
              <RangePicker
                style={{ width: "468px" }}
                placeholder={["开始时间", "结束时间"]}
                onChange={this.timeOnchange}
                defaultValue={[
                  moment(this.state.defaultDate[0], "YYYY-MM-DD"),
                  moment(this.state.defaultDate[1], "YYYY-MM-DD")
                ]}
              />
            ) : (
              <span>
                {this.state.defaultDate.map((item, index) => {
                  if (index === 0) {
                    return <span> {item.replace(/-/g, ".")} — </span>;
                  } else {
                    return <span> {item.replace(/-/g, ".")}</span>;
                  }
                })}
              </span>
            )}
          </div>
                <div style={{textAlign:"right",position:"absolute",bottom:"0",right:"0"}}>
                  <div style={{display:"inline-block",marginRight:"36px"}}>
                  <p style={{color:"#737373",marginBottom:"0"}}> 累计募集</p>
                  <h3 style={{fontSize:"20px",color:"#004FFF"}}>1000 USDT</h3>
                  </div>
                  <div style={{display:"inline-block"}}>
                  <p style={{color:"#737373",marginBottom:"0"}}>剩余可投</p>
                  <h3 style={{fontSize:"20px",color:"#004FFF"}}>200 USDT</h3>
                  </div>
                </div>

        </div>
      </div>
          <div style={{background:"#F0F2F5",padding:"20px"}}>
                <div style={{background:"#fff"}}>
                <Tabs tabBarStyle={{marginBottom:"0"}} size="small"  defaultActiveKey="1" onChange={this.tabsCallback}>
                <TabPane tab="基金数据" key="1">
                <Funddata></Funddata> </TabPane>
                <TabPane tab="投资项目列表" key="2">
                <Fundprojectlist></Fundprojectlist>
                </TabPane>
                <TabPane tab="募资记录" key="3"></TabPane>
              </Tabs>
                
                </div>
          
          
          </div>

      </div>
    );
  }
}
