import React, { Component } from "react";
import { Breadcrumb, Input, DatePicker,Button, Select  ,message,Spin} from "antd";

import qs from 'qs'
import axios from "../../api/api";

const { RangePicker } = DatePicker;
const Option = Select.Option;

class Fund extends Component {

  state={
    updata:{
      unit:"ETC",
      
    },
    loading:false
  }


inputChange=(key,e)=>{
  let data=this.state.updata

  
  data[key]=e.target.value
  this.setState({
    updata:data,
 
  })
}

tokenstyleOnchange=(value)=>{
  let data=this.state.updata
  data.unit=value
  this.setState({
    updata:data
  })
}


dateChange=(date,str)=>{

let data=this.state.updata
data.start_time=str[0]
data.end_time=str[1]
this.setState({
updata:data
})
}
save=()=>{
  let data=this.state.updata
  if(!data.name){
    message.error("请填写基金名字",[1])
    return
  }
  if(!data.unit){
    message.error("请填写募集币种",[1])
    return
  }
  if(!data.start_time){
    message.error("请填写开始时间",[1])
    return
  }
  if(!data.end_time){
    message.error("请填写结束时间",[1])
    return
  }
  if(!data.plan_account){
    message.error("请填写计划募资额度",[1])
    return
  }
  if(!data.account){
    message.error("请填写实际募资额度",[1])
    return
  }
  let FromData=qs.stringify(data)
  this.setState({
    loading:true
  })
  

  
  axios.post("/api/found/add",FromData).then((json)=>{
    if(json.data.code===0){
      message.success("添加成功",[1],()=>{
        this.props.history.push('/site/fund');
      })
    }else{
      message.error("系统错误，请重试",[1])
      this.setState({
        loading:false
      })
      
    }
    
  }).catch(()=>{
    message.error("系统错误，请重试",[1])
    this.setState({
      loading:false
    })
    
  })


}
  render() {
    const options = [
      { label: "ETH", value: "ETH" },
      { label: "USDT", value: "USDT" },
      { label: "BTC", value: "BTC" }
    ];
 
    const tokenstyle  = (
      <Select defaultValue={this.state.updata.unit} style={{ width: 100 }} onChange={this.tokenstyleOnchange}>
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
      <Spin spinning={this.state.loading}>
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
                  onChange={this.inputChange.bind(this,"name")}
                />
              </div>
              <div style={{marginBottom:"26px"  }}>
                <span style={{ display: "inline-block" }}>
                  募集币种：
                </span>
                <div style={{ display: "inline-block" }}>
                {tokenstyle}
                </div>
              </div>

              <div style={{ marginBottom:"26px"  }}>
                <span style={{ display: "inline-block", marginRight: "8px" }}>
                  起止时间:
                </span>
                <RangePicker style={{width:"468px"}} placeholder={["开始时间","结束时间"]} onChange={this.dateChange} />
              </div>

              <div style={{ marginBottom:"26px"   }}>
              <span style={{ display: "inline-block", marginRight: "8px" ,marginLeft:"-27px"}}>
                计划募集额度:
              </span>
              <Input 
              onChange={this.inputChange.bind(this,"plan_account")}
              type="number" style={{width:"100px"}}></Input>

          

            </div>
            <div style={{ marginBottom:"26px"   }}>
              <span style={{ display: "inline-block", marginRight: "8px" ,marginLeft:"-27px"}}>
              实际募集额度:
              </span>
              <Input
              onChange={this.inputChange.bind(this,"account")}
              type="number" style={{width:"100px"}}></Input>

          

            </div>
            {/*<div style={{ marginBottom:"26px"   }}>
            <span style={{ display: "inline-block", marginRight: "8px" }}>
            结算币种:
            </span>
            

            {tokenstyle}

    </div>*/}

          <div style={{textAlign:"center",marginTop:"60px"}}>
          <Button
          onClick={this.save}
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
      </Spin>
    );
  }
}
export default Fund;
