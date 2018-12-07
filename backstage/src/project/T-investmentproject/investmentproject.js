import React, { Component } from "react";
import { Tabs, Input, Breadcrumb, message, Table,Spin,Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";
import './rateproject.css'
const Search = Input.Search;
const confirm=Modal.confirm
const TabPane = Tabs.TabPane;
export default class ICOprogect extends Component {
  state = {
    data: [{}],
    total: 0,
    next_page_url: "",
    loading: true
  };

  componentDidMount = () => {
    this.updata("/api/project/get_ico");
  };
  callback = key => {
    console.log(key);
  };

  updata = (url, data = {}) => {
    axios
      .get(url, data)
      .then(json => {
        console.log(json);
        if (json.data.code === 0) {
          this.setState({
            data: json.data.data.data,
            total: json.data.data.total,
            next_page_url: json.data.data.next_page_url,
            pagenow: json.data.data.current_page,
            loading:false
          });
        }else{
            this.setState({
                loading:false
            })
        }
      })
      .catch((err) => {
          this.setState({
              loading:false
          })
      });
  };
// 下一页

// 删除
del = id => {
  
  confirm({
    title: `确认要删除此项目？`,
    okText: "确定",
    cancelText: "取消",
    onOk:()=>{
      axios
        .get("api/project/delete", { params: {id:id} })
        .then(json => {
          
          if (json.data.code === 0) {
            message.success("删除成功",[1],()=>{
              this.updata("/api/project/get");
            })
          }else{
             message.error(json.data.msg,[1])
          }
        })
        .catch(err => {
          message.error("网络错误",[1])
        });
    },
    onCancel:()=>{

    }
  });
};
  pageonChange = (current, size) => {
    this.setState({
      loading: true,
      data: []
    });

    let data = {
      page: current
    };
   this.updata("/api/project/get_ico", { params: data })
  };

  render() {
    const Tabletitle = [
      {
        title: "logo",
        dataIndex: "logo",
        align: "center",
        key: "logo",
        render: (text, record, index) => {
          if(text){
            return <img style={{ width: "40px", height: "40px" }} src={text} />
          }
          else{
            if(record.name){
             let red= parseInt(Math.random()*255 )
             let yellow= parseInt(Math.random()*255 )
             let blue= parseInt(Math.random()*255 )
             let cred=255-red
             let cyellow=255-yellow
             let cblue=255-blue
            let bgColor=`rgb(${red} ${yellow} ${blue})`
            let color=`rgb(${cred} ${cyellow} ${cblue})`
               return <div style={{width: 40,height: 40,display:"inline-block",textAlign:"center",lineHeight:"40px",fontSize:"24px",background:bgColor,color:color}}>{record.name.substring(0,1)}</div>
            }
          }
        }
      },
      {
        title: "名称",
        align: "center",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "代币符号",
        dataIndex: "token_symbol",
        align: "center",
        key: "token_symbol"
      },
      {
        title: "行业",
        dataIndex: "industry_id_text",
        align: "center",
        key: "industry_id_text"
      },
      {
        title: "录入来源",
        dataIndex: "country",
        align: "center",
        key: "country"
      },
      {
        title: "回币日期",
        dataIndex: "start_time",
        align: "center",
        key: "start_time"
      },
      {
        title: "回币进度",
        align: "center",
        key: "end_time",
        render:(text, record, index)=>{
          return(
            <div style={{width: 70,height:2,background:"#E8E8E8",position:"relative"}}>
            <div style={{position:"absolute",height:2,width: 30,background:"#004FFF"}}> </div>
          </div>
          )
          
        }
      },
      {
        title: "操作",
        dataIndex: "projectNum",
        align: "center",
        key: "projectNum",
        render: (text, record, index) => {
          return (
            <div>
            <Link
              to={{
                pathname: "/site/project/projects/projectinf/" + record.id
              }}
            >
              <span style={{ color: "rgb(0, 79, 255)" }}>详情</span>
            </Link>
            <span style={{marginLeft:10,color:"red"}}  onClick={this.del.bind(this,record.id)}>删除</span>
            </div>
            
          )
        }
      }
    ];
    return (
        <Spin spinning={this.state.loading}>
      <div>
        <div>
          <div
            style={{
              padding: "0 48px",
              position: "relative",
              overflow: "hidden",
              marginBottom:20
            }}
          >
          <Breadcrumb style={{marginTop:16}}>
          <Breadcrumb.Item href="#/site/project/projects">
            <span>项目库</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>投资项目</Breadcrumb.Item>
        </Breadcrumb>
            <h3
              style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}
            >
            投资项目
            </h3>
            <Search
              style={{ width: "350px", height: "35px" }}
              placeholder="请输入项目关键字搜索"
              onSearch={value => console.log(value)}
            />
          </div>
          
        </div>
        <div>
        <Tabs className="yss" defaultActiveKey="1" onChange={this.callback}>
        <TabPane  style={{padding:20,background:"#F0F2F5",}} tab="全部（23）" key="1">
        <Table
        columns={Tabletitle}
        style={{background:"#fff"}}
        dataSource={this.state.data}
        pagination={{
          style: { marginRight: "30px" },
          current: this.state.pagenow,
          total: this.state.total,
          onChange: this.pageonChange
        }}
      />
        </TabPane>
        <TabPane  style={{padding:20,background:"#F0F2F5",}} tab="待打币（3）" key="2">
        
        <Table
        columns={Tabletitle}
        style={{background:"#fff"}}
        dataSource={this.state.data}
        pagination={{
          style: { marginRight: "30px" },
          current: this.state.pagenow,
          total: this.state.total,
          onChange: this.pageonChange
        }}
      />
        </TabPane>
        <TabPane  style={{padding:20,background:"#F0F2F5",}} tab="待回币（13)" key="3">
        
        <Table
        columns={Tabletitle}
        style={{background:"#fff"}}
        dataSource={this.state.data}
        pagination={{
          style: { marginRight: "30px" },
          current: this.state.pagenow,
          total: this.state.total,
          onChange: this.pageonChange
        }}
      />
        </TabPane>
        <TabPane  style={{padding:20,background:"#F0F2F5",}} tab="已回币（13)" key="4">
        
        <Table
        columns={Tabletitle}
        
        dataSource={this.state.data}
        style={{background:"#fff"}}
        pagination={{
          style: { marginRight: "30px" },
          current: this.state.pagenow,
          total: this.state.total,
          onChange: this.pageonChange
        }}
      />
        </TabPane>
      </Tabs>
        </div>
      </div>
      </Spin>
    );
  }
}
