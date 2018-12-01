import React, { Component } from "react";
import { Tabs, Button, Modal, Select, DatePicker, Input ,message} from "antd";
import "./deal.css";
import axios from "../../api/api";
import qs from 'qs'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
class Record extends Component {
  state = {
    edit: false,
    show: false,
    showTxt: "展开",
    ifClick: true,
    showClassname: "",
    showDomClassname: "",
    data: this.props.data
  };

  componentWillReceiveProps = props => {
   
    
      if(this.props!=props){
         this.setState({
        data: props.data
      });
      this.props=props
      }
  };
  animateDown = () => {
    this.setState({
      ifClick: false
    });
    let show = this.state.show;
    if (show) {
      this.setState({
        show: false,
        showTxt: "展开",
        ifClick: true,
        showClassname: "yss_up",
        showDomClassname: "yss_downDom"
      });
    } else {
      this.setState({
        show: true,
        showTxt: "收起",
        ifClick: true,
        showClassname: "yss_down"
      });
    }
  };

  investDel=(id)=>{
    confirm({
      title: '确认删除此条记录？',
      content: '',
      onOk:()=> {
        axios.get("/api/found_project/delete?id="+id).then((json)=>{
          if(json.data.code===0){
            message.success("删除成功")
            this.props.getFundData(this.props.project_id)
          }else{
            message.success("删除失败")
            this.props.getFundData(this.props.project_id)
          }
        }).catch((err)=>{
          console.log(err);
          this.props.getFundData(this.props.project_id)
          
        })
      },
      onCancel:()=> {},
    });
  }
  render() {
    const data = this.state.data;
    return (
      <div
        style={{
          marginLeft: 28,
          padding: "10px 18px",
          background: "rgba(0,79,255,0.05)",
          marginTop: 10,
          position: "relative"
        }}
      >
        <div>
          <span>投资阶段：{data.invest_stage}</span>
          <div style={{ float: "right" }}>
            <span onClick={this.investDel.bind(this,data.id)}  style={{ color: "#F5222D", marginRight: 10 }}>[ 删除 ]</span>
            <span onClick={this.props.showModal?this.props.showModal.bind(this,"investVisible",data):""} style={{ color: "#004FFF" }}>[ 编辑 ]</span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>投资主体：</span>
            <span style={{ color: "#004FFF" }}>{data.invest_stage}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span>打币时间：</span>
            <span>{data.pay_coin_time} </span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>投资数额：</span>
            <span style={{ color: "#004FFF" }}>{data.pay_coin_time}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span>兑换比例：</span>
            <span>1 ETH = 2000 DNY </span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>应回币数量：</span>
            <span style={{ color: "#004FFF" }}>{data.num}</span>
          </div>
        </div>
        <div
          className={this.state.showDomClassname}
          style={
            this.state.show
              ? { display: "block" }
              : { display: "none", maxHeight: 0 }
          }
        >
          <div>
            <div style={{ width: 300, display: "inline-block" }}>
              <span>打币人： </span>
              <span>{data.pay_coin_name}</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <span>打币地址：</span>
              <span>{data.pay_coin_address}</span>
            </div>
          </div>

          <div>
            <div style={{ width: 300, display: "inline-block" }}>
              <span>打币TX: </span>
              <span>{data.pay_coin_tx}</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <span>打币TX: </span>
              <span>{data.pay_coin_tx}</span>
            </div>
          </div>

          <div>
            <div style={{ width: 300, display: "inline-block" }}>
              <span>折扣/奖金备注：</span>
              <span>{data.pay_coin_tx}</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <span>锁仓机制备注：</span>
              <span>{data.lock_note}</span>
            </div>
          </div>
        </div>
        <div
          onClick={this.state.ifClick ? this.animateDown : ""}
          style={{
            position: "absolute",
            right: 24,
            bottom: 10,
            color: "rgba(0,0,0,0.65)"
          }}
        >
          {this.state.showTxt}
          <span
            className={this.state.showClassname}
            style={{
              fontSize: 12,
              display: "inline-block",
              verticalAlign: "bottom"
            }}
          >
            ▼
          </span>
        </div>
      </div>
    );
  }
}

// 回币记录

class Back extends Component{
  state = {
    edit: false,
    show: false,
    data: this.props.data
  };

  componentWillReceiveProps = props => {
      if(this.props!=props){
         this.setState({
        data: props.data
      });
      this.props=props
      }
  };
  investDel=(id)=>{
    confirm({
      title: '确认删除此条记录？',
      content: '',
      onOk:()=> {
        axios.get("/api/found_project/delete?id="+id).then((json)=>{
          if(json.data.code===0){
            message.success("删除成功")
            this.props.getFundData(this.props.project_id)
          }else{
            message.success("删除失败")
            this.props.getFundData(this.props.project_id)
          }
        }).catch((err)=>{
          console.log(err);
          this.props.getFundData(this.props.project_id)
          
        })
      },
      onCancel:()=> {},
    });
  }
  render() {
    const data = this.state.data;
    return (
      <div
        style={{
          marginLeft: 28,
          padding: "10px 18px",
          background: "rgba(0,79,255,0.05)",
          marginTop: 10,
          position: "relative"
        }}
      >
        <div>
          <span>回币时间：{data.pay_coin_time}</span>
          <div style={{ float: "right" }}>
            <span onClick={this.investDel.bind(this,data.id)}  style={{ color: "#F5222D", marginRight: 10 }}>[ 删除 ]</span>
            <span onClick={this.props.showModal?this.props.showModal.bind(this,"investVisible",data):""} style={{ color: "#004FFF" }}>[ 编辑 ]</span>
          </div>
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>回币数量： </span>
            <span style={{ color: "#004FFF" }}>{data.num}</span>
          </div>
         
        </div>
        <div>
          <div style={{ width: 300, display: "inline-block" }}>
            <span>回币地址：</span>
            <span style={{ color: "#004FFF" }}>{data.pay_coin_time}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span> 确认人：</span>
            <span>1 ETH = 2000 DNY </span>
          </div>
        </div>
       
      
      </div>
    );
  }
}


export default class Deal extends Component {
  state = {
    investVisible: false,
    backtokenVisible: false,
    sellVisible: false,
    investData: {
      buy: [],
      back: [],
      rate: "",
      sell: []
    },
    modData:[],
    backmodData:[],
    investuplodaData:{
      invest_stage:"基石",
      found_id:1
    },
    backtokenuplodaData:{

    },
    selluplodaData:{

    }
  };

  componentDidMount = () => {
    console.log(this.props);
    
    let id=this.props.project_id?this.props.project_id:""
// 添加投资记录所需基金数据
    axios.get("/api/found_project/buy_info").then((json)=>{
      if(json.data.code===0){
        this.setState({
          modData:json.data.data,
          investuplodaData:{
            found_id:json.data.data[0].id,
            invest_stage:"基石",
          }
        })
      }
    }).catch(()=>{
    })
    // 添加回币记录所需数据
    axios.get("/api/found_project/back_info?project_id="+this.props.project_id).then((json)=>{
      if(json.data.code===0){
        this.setState({
          backmodData:json.data.data,
        })
      }
    }).catch(()=>{
    })
// 卖出所需诗句
    axios.get("/api/found_project/sell").then((json)=>{
      if(json.data.code===0){
        this.setState({
          sellmodData:json.data.data,
        })
      }
    }).catch(()=>{
    })
  };
  componentWillReceiveProps = props => {
    if (this.props !== props) {
      if (props.data.buy) {
        this.setState({
          investData: props.data
        });
      }
     this.props=props
   
    }
  }

  showModal = (key,data={}) => {
    console.log(data);
    this.setState({
      investuplodaData:data
    })
    switch (key) {
      case "investVisible":
         this.setState({
          investVisible: true
          });
        break;
        case "backtokenVisible":
        this.setState({
          backtokenVisible: true
         });
       break;
       case "sellVisible":
       this.setState({
        sellVisible: true
        });
      break;
      default:
        break;
    }
   
  };


  inputChange=(key,e)=>{
    let data=this.state.investuplodaData
    data[key]=e.target.value
    this.setState({
      investuplodaData:data
    })
  }
  backtokenuplodaDataChange=(key,e)=>{
    let data=this.state.backtokenuplodaData
    data[key]=e.target.value
    this.setState({
      backtokenuplodaData:data
    })
  }

  modeOk = (key) => { 
    
    let uplodaData={}
    switch (key) {
      case "investVisible":
      uplodaData=this.state.investuplodaData
      uplodaData.project_id=this.props.project_id
   
      if(!uplodaData.pay_coin_time){
        message.error("请填写打币时间")
        return
      }
      if(!uplodaData.total_price){
        message.error("请填写投资数额")
        return
      }
     
      if(!uplodaData.num){
        message.error("请填写应回币数量")
        return
      }
      
      let FromData=qs.stringify(uplodaData)
      axios.post("/api/found_project/buy",FromData).then((json)=>{
        
        if(json.data.code===0){
          message.success("添加成功",[1])
          this.props.getFundData(this.props.project_id)
         this.setState({
          investVisible: false
          });
        }else{
          message.error("添加失败",[1])
          this.props.getFundData(this.props.project_id)
         this.setState({
          investVisible: false
          });
        }
      }).catch((err)=>{
        console.log(err)
        this.setState({
          investVisible: false
          });
          this.props.getFundData(this.props.project_id)
      })
        break;
        case "backtokenVisible":
        this.setState({
          backtokenVisible: false
         });
       break;
       case "sellVisible":
       this.setState({
        sellVisible: false
        });
      break;
      default:
        break;
    }
   
  };


  modeCancel = (key) => {
    switch (key) {
      case "investVisible":
         this.setState({
          investVisible: false
          });
        break;
        case "backtokenVisible":
        this.setState({
          backtokenVisible: false
         });
       break;
       case "sellVisible":
       this.setState({
        sellVisible: false
        });
      break;
      default:
        break;
    }
   
  };

  stageChange=(e)=>{
    let data= this.state.investuplodaData
    data.invest_stage=e

    this.setState({
      investuplodaData:data
    })
    
  }
  electChange = e => {
    let data= this.state.investuplodaData
    data.found_id=e
    this.setState({
      investuplodaData:data
    })
  };
  dateOnchange = (date,value) => {
    let data=this.state.investuplodaData
    data["pay_coin_time"]=value
    this.setState({
      investuplodaData:data
    })
  };
 
  render() {
    const investData = this.state.investData;
    const modData=this.state.modData
    const investuplodaData =this.state.investuplodaData
    const backmodData = this.state.backmodData
    const sellmodData = this.state.sellmodData
    const tokenCurrency=modData.filter((item)=>{
      if(item.id==investuplodaData.found_id){
        return item
      }
    })

  console.log(backmodData);
  
    
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
          visible={this.state.investVisible}
          onOk={this.modeOk.bind(this,"investVisible")}
          okText="确认"
          onCancel={this.modeCancel.bind(this,"investVisible")}
          maskClosable={false}
          destroyOnClose={true}
          width={900}
          bodyStyle={{ padding: "40px 100px" }}
        >
          <div>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>所投阶段：</span>
            <Select
              defaultValue={investuplodaData.invest_stage}
              style={{ width: 160 }}
              onChange={this.stageChange}
            >
              <Option value="基石">基石</Option>
              <Option value="私募">私募</Option>
              <Option value="公募" >公募</Option>
              <Option value="基石第一轮">基石第一轮</Option>
              <Option value="基石第二轮">基石第二轮</Option>
              <Option value="基石第三轮">基石第三轮</Option>
              <Option value="私募第一轮">私募第一轮</Option>
              <Option value="私募第二轮">私募第二轮</Option>
              <Option value="私募第三轮">私募第三轮</Option>
              <Option value="公募第一轮">公募第一轮</Option>
              <Option value="公募第二轮">公募第二轮</Option>
              <Option value="公募第三轮">公募第三轮</Option>
              <Option value="种子轮">种子轮</Option>
              <Option value="天使轮">天使轮</Option>
              <Option value="一个轮">一个轮</Option>
              <Option value="乙轮">乙轮</Option>
              <Option value="上市前">上市前</Option>
              <Option value="预-A轮">预-A轮</Option>
              <Option value="前B轮">前B轮</Option>
              <Option value="前C轮">前C轮</Option>
              <Option value="预D轮">预D轮</Option>
            </Select>
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>投资主体：</span>
            <Select
              defaultValue={investuplodaData.found_id}
              style={{ width: 160 }}
              onChange={this.electChange}
            >
             
              {modData.map((item)=>{
                 return(
                    <Option value={item.id}>{item.name}</Option>
                 )
              })}
            </Select>
            <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 20 }}>
              投资币种：
            </span>
            <span>
                {tokenCurrency.length!==0?tokenCurrency[0].unit:""}
            </span>
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币时间：</span>
            <DatePicker
            
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="选择日期时间"
              onChange={this.dateOnchange}
              onOk={this.dateonOk}
              style={{ width: 160 }}
            />
          </div>
          <div style={{ marginTop: 26 }}>
            <div style={{ display: "inline-block", lineHeight: "34px" }}>
              <span
                style={{
                  color: "#F5222D",
                  verticalAlign: "-webkit-baseline-middle"
                }}
              >
                *
              </span> 
              <span
                style={{
                  color: "rgba(0,0,0,0.45)",
                  verticalAlign: "-webkit-baseline-middle"
                }}
              >
                投资数额：
              </span>
            </div>

            <Input defaultValue={investuplodaData.total_price} onChange={this.inputChange.bind(this,"total_price")}  type="number" style={  tokenCurrency.length!==0?
              investuplodaData.total_price>   tokenCurrency[0].rest_num?
              {border:"1px solid #F5222D", borderRadius:"4px",width: 160}:
              { width: 160 }:
              "" } addonAfter={tokenCurrency.length!==0?tokenCurrency[0].unit:""} />
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "rgba(0,0,0,0.45)",
                paddingLeft: 78,
                marginTop: 10
              }}
            >
              <span>一期基金总计：</span>
              <span style={{ color: "#004FFF" }}>{tokenCurrency.length!==0?tokenCurrency[0].account:""}</span>
              <span>{tokenCurrency.length!==0?tokenCurrency[0].unit:""}</span>
              <span style={{marginLeft:10}}>已投：</span>
              <span style={{ color: "#004FFF" }}>{tokenCurrency.length!==0?tokenCurrency[0].buy_num:""} </span>
              <span>{tokenCurrency.length!==0?tokenCurrency[0].unit:""}</span>
              <span style={{marginLeft:10}}>剩余可投：</span>
              <span style={{ color: "#004FFF" }}>{tokenCurrency.length!==0?tokenCurrency[0].rest_num:""} </span>
              <span>{tokenCurrency.length!==0?tokenCurrency[0].unit:""}</span>
            </p>
          </div>

          <div style={{ marginTop: 26, marginLeft: "-14px" }}>
            <div style={{ display: "inline-block", lineHeight: "32px" }}>
              <span style={{ color: "#F5222D" }}>*</span>
              <span style={{ color: "rgba(0,0,0,0.45)" }}>应回币数额：</span>
            </div>

            <Input defaultValue={investuplodaData.num} onChange={this.inputChange.bind(this,"num")} type="number" style={{ width: 160 }} addonAfter={   this.props.token_symbol} />
            <span style={{ color: "rgba(0,0,0,0.45)", marginLeft: 20 }}>
              兑换比例：
            </span>
            <span> <span style={{color:"#004FFF "}}>1 </span> {tokenCurrency.length!==0?tokenCurrency[0].unit:""} = {investuplodaData.total_price?
              investuplodaData.num?
              <span style={{color:"#004FFF "}}>{ (parseFloat(investuplodaData.num) /parseFloat( investuplodaData.total_price)).toFixed(2)} </span>  
              :"":""}  { this.props.token_symbol} </span>
          </div>

          <div style={{ marginTop: 26, marginLeft: "14px" }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币人：</span>
            <Input defaultValue={investuplodaData.pay_coin_name} onChange={this.inputChange.bind(this,"pay_coin_name")} style={{ width: 160 }} />
          </div>

          <div style={{ marginTop: 26 }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币地址：</span>
            <Input defaultValue={investuplodaData.pay_coin_address} onChange={this.inputChange.bind(this,"pay_coin_address")}  style={{ width: 280 }} />
          </div>
         
          <div style={{ marginTop: 26, marginLeft: "14px" }}>
            <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
            <span style={{ color: "rgba(0,0,0,0.45)" }}>打币TX：</span>
            <Input defaultValue={investuplodaData.pay_coin_tx} onChange={this.inputChange.bind(this,"pay_coin_tx")} style={{ width: 280 }} />
          </div>

          <div style={{ marginTop: 26, marginLeft: "-32px" }}>
            <span
              style={{
                color: "#F5222D",
                visibility: "hidden",
                verticalAlign: "top"
              }}
            >
              *
            </span>
            <span style={{ color: "rgba(0,0,0,0.45)", verticalAlign: "top" }}>
              折扣/奖金备注：
            </span>
            <TextArea defaultValue={investuplodaData.discount_note}  onChange={this.inputChange.bind(this,"discount_note")} style={{ width: "560px" }} />
          </div>
          <div style={{ marginTop: 26, marginLeft: "-26px" }}>
            <span
              style={{
                color: "#F5222D",
                visibility: "hidden",
                verticalAlign: "top"
              }}
            >
              *
            </span>
            <span style={{ color: "rgba(0,0,0,0.45)", verticalAlign: "top" }}>
              锁仓机制备注：
            </span>
            <TextArea  defaultValue={investuplodaData.lock_note}   onChange={this.inputChange.bind(this,"lock_note")}  style={{ width: "560px" }} />
          </div>
        </Modal>


{/* 回币弹框*/}
<Modal
title="回币记录"
visible={this.state.backtokenVisible}
onOk={this.modeOk.bind(this,"backtokenVisible")}
okText="确认"
onCancel={this.modeCancel.bind(this,"backtokenVisible")}
maskClosable={false}
destroyOnClose={true}
width={900}
bodyStyle={{ padding: "40px 100px" }}
>
<div>
  <span style={{ color: "#F5222D" }}>*</span>
  <span style={{ color: "rgba(0,0,0,0.45)" }}>回币时间：</span>
  <DatePicker
    showTime
    format="YYYY-MM-DD HH:mm"
    placeholder="选择日期时间"
    onChange={this.dateOnchange}
    onOk={this.dateonOk}
    style={{ width: 160 }}
  />
</div>

<div style={{ marginTop: 26 }}>
  <span style={{ color: "#F5222D" }}>*</span>
  <span style={{ color: "rgba(0,0,0,0.45)" }}>回币数量：</span>
  <Input defaultValue={investuplodaData.num} onChange={this.backtokenuplodaDataChange.bind(this,"num")} type="number" style={  Object.keys(backmodData).length!=0?
    this.state.backtokenuplodaData.num>backmodData.rest?
    {border:"1px solid #F5222D", borderRadius:"4px",width: 160}:
    { width: 160 }:
    { width: 160} } addonAfter={   this.props.token_symbol} />
  <p
  style={{
    margin: "0",
    padding: "0",
    color: "rgba(0,0,0,0.45)",
    paddingLeft: 78,
    marginTop: 10
  }}
>
  <span>应回币：</span>
  <span style={{ color: "#004FFF" }}>{Object.keys(backmodData).length!=0?backmodData.should_back:""}</span>
  <span>{this.props.token_symbol}</span>
  <span style={{marginLeft:10}}>已回币：</span>
  <span style={{ color: "#004FFF" }}>{Object.keys(backmodData).length!=0?backmodData.back:""} </span>
  <span>{this.props.token_symbol}</span>
  <span style={{marginLeft:10}}>剩余应回：</span>
  <span style={{ color: "#004FFF" }}>{Object.keys(backmodData).length!=0?backmodData.rest:""} </span>
  <span>{this.props.token_symbol}</span>
</p>

  </div>

  <div style={{ marginTop: 26 }}>
  <span style={{ color: "#F5222D", visibility: "hidden" }}>*</span>
  <span style={{ color: "rgba(0,0,0,0.45)" }}>回币地址：</span>
  <Input defaultValue={investuplodaData.pay_coin_tx} onChange={this.backtokenuplodaDataChange.bind(this,"pay_coin_address")} style={{ width: 280 }} />
  <span style={{ color: "rgba(0,0,0,0.45)" ,marginLeft:60}}>确认人：</span>
  <Input defaultValue={investuplodaData.pay_coin_tx} onChange={this.backtokenuplodaDataChange.bind(this,"confirm_name")} style={{ width: 160 }} />
</div>
</Modal>


        <Tabs style={{ padding: "0 46px 10px" }} defaultActiveKey="1">
          <TabPane tab="交易记录" key="1">
            {/* 投资记录 */}
            <div style={{ marginTop: 25 }}>
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
                <span style={{ fontSize: 18, fontWeight: "600" }}>
                  投资记录
                </span>
                <Button
                  type="primary"
                  onClick={this.showModal.bind(this,"investVisible",{
                    invest_stage:"基石",
                    found_id:1
                  })}
                  style={{ width: 76, borderRadius: "100px", float: "right" }}
                >
                  +添加
                </Button>
              </div>
              {investData.buy.length !== 0 ? (
                investData.buy.map((item, index) => {
          
                  return <Record showModal={this.showModal} project_id={this.props.project_id} getFundData={this.props.getFundData}  data={item} />;
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  还没有投资记录，请点击右侧按键添加。
                </p>
              )}
            </div>
            {/* 回币记录 */}
            <div style={{ marginTop: 35 }}>
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
                <span style={{ fontSize: 18, fontWeight: "600" }}>
                  回币记录
                </span>
                <Button
                  type="primary"
                  onClick={this.showModal.bind(this,"backtokenVisible")}
                  style={{ width: 76, borderRadius: "100px", float: "right" }}
                >
                  +添加
                </Button>
              </div>

              {investData.back.length !== 0 ? (
                investData.back.map((item, index) => {
                  return <Record showModal={this.showModal} key={index} data={item} />;
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  还没有回币记录，请点击右侧按键添加。
                </p>
              )}
            </div>
            {/* 卖出记录 */}
            <div style={{ marginTop: 35, marginBottom: 20 }}>
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
                <span style={{ fontSize: 18, fontWeight: "600" }}>
                  卖出记录
                </span>
                <Button
                  type="primary"
                  onClick={this.showModal}
                  style={{ width: 76, borderRadius: "100px", float: "right" }}
                >
                  +添加
                </Button>
              </div>
              {investData.sell.length !== 0 ? (
                investData.sell.map((item, index) => {
                  return <Record key={index} data={item} />;
                })
              ) : (
                <p style={{ textAlign: "center" }}>
                  还没有卖出记录，请点击右侧按键添加。
                </p>
              )}
            </div>
          </TabPane>
          <TabPane tab="数据统计" key="2" />
          <TabPane tab="项目信息" key="3" />
        </Tabs>
      </div>
    );
  }
}
