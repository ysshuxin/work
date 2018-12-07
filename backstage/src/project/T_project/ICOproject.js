import React, { Component } from "react";
import { Tabs, Input, Breadcrumb, message, Table,Spin,Modal,Radio  } from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const confirm=Modal.confirm
const TextArea=Input.TextArea

const RadioGroup=Radio.RadioGroup





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
          console.log(text);
          console.log(record);
          console.log(index);
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
        title: "国家",
        dataIndex: "country",
        align: "center",
        key: "country"
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
        align: "center",
        key: "start_time"
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
        align: "center",
        key: "end_time"
      },
      {
        title: "状态",
        dataIndex: "is_ing",
        align: "center",
        key: "is_ing"
      },
      // {
      //   title: "评级",
      //   dataIndex: "projectNum",
      //   align: "center",
      //   key: "projectNum"
      // },
      // {
      //   title: "综合意见",
      //   dataIndex: "projectNum",
      //   align: "center",
      //   key: "projectNum"
      // },
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
          <Breadcrumb.Item>ICO项目</Breadcrumb.Item>
        </Breadcrumb>
            <h3
              style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}
            >
            ICO项目
            </h3>
            <Search
              style={{ width: "350px", height: "35px" }}
              placeholder="请输入项目关键字搜索"
              onSearch={value => console.log(value)}
            />
          </div>
          
        </div>
        <div>
          <Table
            columns={Tabletitle}
            dataSource={this.state.data}
            pagination={{
              style: { marginRight: "30px" },
              current: this.state.pagenow,
              total: this.state.total,
              onChange: this.pageonChange
            }}
          />
        </div>
      </div>
      </Spin>
    );
  }
}
