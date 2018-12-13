import React, { Component } from "react";
import { Tabs, Input, Breadcrumb, message, Table,Spin,Modal,Popover,Radio  } from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";

const Search = Input.Search;
const confirm=Modal.confirm
const TabPane = Tabs.TabPane;
export default class ICOprogect extends Component {
  state = {
    data: [{}],
    total: 0,
    next_page_url: "",
    loading: true,
    nowKey:1,
    nowUrl:"/api/project/get_grade"
  };

  componentDidMount = () => {
    this.updata1("/api/project/get_grade");
  };
  callback = key => {
    if(this.state.nowKey!=key){
      this.setState({
        loading:true
      })
    switch (key) {
          case "1":
          this.updata1("/api/project/get_grade");
          this.setState({
            nowKey:"1"
          })
            break;
          case "2":
          this.updata("/api/project/get_wait");
          this.setState({
            nowKey:"2"
          })
            break;
          case "3":
          this.updata("/api/project/get_continue");
          this.setState({
            nowKey:"3"
          })
            break;
          case "4":
          this.updata("/api/project/get_hatch");
          this.setState({
            nowKey:"4"
          })
            break;
            case "5":
            this.updata("/api/project/get_reject");
            this.setState({
              nowKey:"5"
            })
              break;
          default:
            break;
        }
    }

  };
  updata1 = (url, data = {}) => {
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
            loading:false,
            nowUrl:url
          });
        }else{
            this.setState({
                loading:false,
             
            })
        }
      })
      .catch((err) => {
          this.setState({
              loading:false
          })
      });
  };
  updata = (url, data = {}) => {
    axios
      .get(url, data)
      .then(json => {
        console.log(json);
        if (json.data.code === 0) {
          this.setState({
            data: json.data.data.data.data,
            total: json.data.data.data.total,
            next_page_url: json.data.data.data.next_page_url,
            pagenow: json.data.data.data.current_page,
            loading:false,
            nowUrl:url
          });
        }else{
            this.setState({
                loading:false,
             
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
              this.updata("/api/project/get_grade");
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

search=(value)=>{
  this.setState({
    loading:true,
    keyword:value
  })
  axios
  .get("/api/project/search_grade", { params: {keyword:value} })
  .then(json => {
    
      console.log(json);
      if (json.data.code === 0) {
        this.setState({
          data: json.data.data.data,
          total: json.data.data.total,
          next_page_url: json.data.data.next_page_url,
          pagenow: json.data.data.current_page,
          loading:false,
          nowUrl:"/api/project/search_grade"
        });
      }else{
          this.setState({
              loading:false,
         
          })
      }
  })
  .catch(err => {
    this.setState({
      loading:false,
 
  })
    message.error("网络错误",[1])
  });
  
}

  pageonChange = (current, size) => {
    this.setState({
      loading: true,
      data: []
    });

    let data = {
      page: current
    };
    if(this.state.nowUrl=="/api/project/get_grade"){
       this.updata1(this.state.nowUrl, { params: data })
    }else if(this.state.nowUrl=="/api/project/search_grade"){
      let data = {
        page: current,
        keyword:this.state.keyword
      };
      this.updata1(this.state.nowUrl, { params: data })
    }
    
    
    else{
      this.updata(this.state.nowUrl, { params: data })

    }
  
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
              let red = parseInt(Math.random() * 125);
              let yellow = parseInt(Math.random() * 125);
              let blue = parseInt(Math.random() * 125);
              
              let bgColor = `rgb(${red} ${yellow} ${blue})`;
               return <div style={{width: 40,height: 40,display:"inline-block",textAlign:"center",lineHeight:"40px",fontSize:"24px",background:bgColor,color:"#fff"}}>{record.name.substring(0,1)}</div>
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
        title: "需求",
        dataIndex: "requirements",
        align: "center",
        key: "requirements"
      },
      {
        title: "综合意见",
        dataIndex: "opinion",
        align: "center",
        key: "opinion"
      },
      {
        title: "录入来源",
        dataIndex: "up_name",
        align: "center",
        key: "up_name"
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
                pathname: "/site/project/projects/projectinf/" + record.id+"=2"
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
              overflow: "hidden"
            }}
          >
          <Breadcrumb style={{ marginTop: 16 }}>
          <Breadcrumb.Item href="#/site/project/projects">
            <span>项目库</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>评级项目</Breadcrumb.Item>
        </Breadcrumb>
            <h3
              style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}
            >
              项目库
            </h3>
            <Search
              style={{ width: "350px", height: "35px" }}
              placeholder="请输入项目关键字搜索"
              onSearch={this.search}
            />
          </div>
          <div style={{ padding: "0 33px" }}>
            <Tabs
              size={"large"}
              tabBarStyle={{ fontSize: "14px" }}
              defaultActiveKey="1"
              onChange={this.callback}
            >
              <TabPane tab={"全部（" + this.state.total + "）"} key="1" />
              <TabPane tab={"待上会（3）"} key="2" />
              <TabPane tab={"持续观察（19)"} key="3" />
              <TabPane tab={"投行孵化（1)"} key="4" />
              <TabPane tab={"拒绝（1)"} key="5" />
            </Tabs>
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
              showQuickJumper:true,
              onChange: this.pageonChange
            }}
          />
        </div>
      </div>
      </Spin>
    );
  }
}
