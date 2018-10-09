import React, { Component } from "react";
import { Breadcrumb, Input, Checkbox, DatePicker,Button, Select  } from "antd";
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;
class Fund extends Component {

  state={
    Dropdownvalue:"ETH",
    tokenstyle:"ETH"
  }
  tokenOchange = checkedValues => {
    console.log("checked = ", checkedValues);
  };
  timeOnchange = values => {
    console.log(values);
  };
  dropdownOnchange=value=>{
    console.log(value)
    this.setState({
      Dropdownvalue:value
    })
    console.log(this.state.Dropdownvalue)
  }
  tokenstyleOnchange=value=>{
    console.log(value)
    this.setState({
      tokenstyle:value
    })
  }
  render() {
    const options = [
      { label: "ETH", value: "ETH" },
      { label: "USDT", value: "USDT" },
      { label: "BTC", value: "BTC" }
    ];
    const select  = (
      <Select defaultValue={this.state.Dropdownvalue} style={{ width: 100 }} onChange={this.dropdownOnchange}>
        {options.map((option,index)=>{
          return (
            <Option value= { option.label} key={index}>
           { option.label}
        </Option >
          )
        })}
      </Select>
    );
    const tokenstyle  = (
      <Select defaultValue={this.state.tokenstyle} style={{ width: 100 }} onChange={this.tokenstyleOnchange}>
        {options.map((option,index)=>{
          return (
            <Option value= { option.label} key={index}>
           { option.label}
        </Option >
          )
        })}
      </Select>
    );
    return (
      <div>
        <div style={{ padding: "16px 32px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/fund">基金管理</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>创建基金</Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{ fontSize: "20px", marginTop: "16px", fontWeight: "600" }}
          >
            基金表单
          </h3>
        </div>
        <div style={{ background: "#F0F2F5", padding: "20px" }}>
          <div style={{ background: "#fff", overflow: "hidden" }}>
            <div style={{ width: "540px", margin: "45px auto" }}>
              <div style={{ marginBottom:"26px"  ,overflow:"hidden"}}>
                <span style={{ display: "inline-block", marginRight: "8px" }}>
                  基金名称:
                </span>
                <Input
                  style={{ width: "468px" }}
                  placeholder="给基金起个名字"
                />
              </div>
              <div style={{marginBottom:"26px"  }}>
                <span style={{ display: "inline-block" }}>
                  募集币种：
                </span>
                <div style={{ display: "inline-block" }}>
                  <CheckboxGroup
                    options={options}
                    defaultValue={["Apple"]}
                    onChange={this.tokenOnchange}
                  />
                </div>
              </div>

              <div style={{ marginBottom:"26px"  }}>
                <span style={{ display: "inline-block", marginRight: "8px" }}>
                  起止时间:
                </span>
                <RangePicker style={{width:"468px"}} placeholder={["开始时间","结束时间"]} onChange={this.timeOnchange} />
              </div>

              <div style={{ marginBottom:"26px"   }}>
              <span style={{ display: "inline-block", marginRight: "8px" ,marginLeft:"-27px"}}>
                计划募集额度:
              </span>
              <Input style={{width:"100px"}}></Input>

              {select}

            </div>
            <div style={{ marginBottom:"26px"   }}>
            <span style={{ display: "inline-block", marginRight: "8px" }}>
            结算币种:
            </span>
            

            {tokenstyle}

          </div>

          <div style={{textAlign:"center",marginTop:"60px"}}>
          <Button
              style={{
                width: "110px",
                height: "32px",
                lineHeight: "32px",
                background: "#004FFF",
                color: "#fff",
                borderRadius: "100px",
                border: "none"
              }}
              type="primary"
            >
            创建基金
            </Button>
          </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Fund;
