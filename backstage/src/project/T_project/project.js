import React, { Component } from "react";
import { Tabs, Input, Button, message, Table,Spin,Modal,Popover,Radio  } from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const confirm=Modal.confirm
const TextArea=Input.TextArea

const RadioGroup=Radio.RadioGroup
class Grade extends Component{
  state={
    visible:false
  }
  
  onCancel=()=>{
    this.setState({
      visible:false
    })
  }
  onShow=()=>{
    this.setState({
      visible:true
    })
  }
  render(){
    return(
      <Popover
            onVisibleChange={this.VisibleChange}
            visible={this.state.visible}
       
            style={{ width: "295px", height: "218px" }}
            placement="bottomLeft"
            content={
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "600" }}>评级</h3>
                <RadioGroup
                  defaultValue={this.props.data.grade}
                  onChange={this.Changelevel}
                >
                  <p>
                    <Radio name="A+" value={"A+"}>
                      A+
                    </Radio>
                    <Radio name="A" style={{ marginLeft: "50px" }} value={"A"}>
                      A
                    </Radio>
                    <Radio name="A-" style={{ marginLeft: "50px" }} value={"A-"}>
                      A-
                    </Radio>
                  </p>
                  <p>
                    <Radio name="B+" value={"B"}>
                      B+
                    </Radio>
                    <Radio name="B" style={{ marginLeft: "50px" }} value={"B"}>
                      B
                    </Radio>
                    <Radio name="B-" style={{ marginLeft: "50px" }} value={"B-"}>
                      B-
                    </Radio>
                    <Radio name="C" style={{ marginLeft: "50px" }} value={"C"}>
                      C
                    </Radio>
                  </p>
                </RadioGroup>
                <h3 style={{ fontSize: "14px", fontWeight: "600" }}>
                  评级分析
                </h3>
                <TextArea defaultValue={this.props.data.analysis} />
                <div style={{ textAlign: "right" }}>
                  <Button
                    onClick={this.onCancel}
                    style={{
                      width: "50px",
                      height: "24px",
                      textAlign: "center",
                      fontSize: "14px",
                      background: "#fff",
                      color: "#000",
                      padding: "0",
                      marginRight: "24px",
                      marginTop: "8px"
                    }}
                    type="primary"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={this.onSave}
                    style={{
                      width: "50px",
                      height: "24px",
                      textAlign: "center",
                      fontSize: "14px",
                      padding: "0",
                      marginTop: "8px"
                    }}
                    type="primary"
                  >
                    确认
                  </Button>
                </div>
              </div>
            }
            trigger="click"
          >
            <div style={{ position: "relative" }}>
             
              <span
                style={{
                  marginLeft: "5px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginBottom: "2px",
                  width: "0",
                  height: "0",
                  borderLeft: "4px solid transparent",
                  borderRight: " 4px solid transparent",
                  borderTop: "6px solid #000"
                }}
              />
            </div>
          </Popover>
    )
  }
}







export default class Progect extends Component {
  state = {
    data: [{}],
    total: 0,
    front_num:0,
    back_num:0,
    system_num:0,
    next_page_url: "",
    loading: true,
    nowKey:1,
    nowUrl:"/api/project/get",
    keyword:""
  };

  componentDidMount = () => {
    this.updata("/api/project/get");
  };
  callback = key => {
      if(this.state.nowKey!=key){
        this.setState({
          loading:true
        })
      switch (key) {
            case "1":
            this.updata("/api/project/get");
            this.setState({
              nowKey:"1"
            })
              break;
            case "2":
            this.updata("/api/project/get_system");
            this.setState({
              nowKey:"2"
            })
              break;
            case "3":
            this.updata("/api/project/get_front");
            this.setState({
              nowKey:"3"
            })
              break;
            case "4":
            this.updata("/api/project/get_back");
            this.setState({
              nowKey:"4"
            })
              break;
            default:
              break;
          }
      }
  };

  updata = (url, data = {}) => {
    axios
      .get(url, data)
      .then(json => {
        console.log(json);
        if (json.data.code === 0) {
          if(url=="/api/project/get"){
            this.setState({
              total: json.data.data.total,
              front_num:json.data.data.front_num,
              back_num:json.data.data.back_num,
              system_num:json.data.data.system_num,
              data: json.data.data.data.data,
              next_page_url: json.data.data.next_page_url,
              pagenow: json.data.data.current_page,
              loading:false,
              nowUrl:url
            })
          }else{
            this.setState({
              data: json.data.data.data,
              next_page_url: json.data.data.next_page_url,
              pagenow: json.data.data.current_page,
              loading:false,
              nowUrl:url
            })
          }
         
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

search=(value)=>{
  this.setState({
    loading:true,
    keyword:value,
  })
  axios
  .get("/api/project/search", { params: {keyword:value} })
  .then(json => {
    
      console.log(json);
      if (json.data.code === 0) {
        this.setState({
          data: json.data.data.data,
          total: json.data.data.total,
          next_page_url: json.data.data.next_page_url,
          pagenow: json.data.data.current_page,
          loading:false,
          nowUrl:"/api/project/search"
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

    if(this.state.nowUrl=="/api/project/search"){
      let data = {
        page: current,
        keyword:this.state.keyword
      };
      this.updata(this.state.nowUrl, { params: data })
    }else{
      let data = {
      page: current
    };
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
        title: "录入来源",
        dataIndex: "up_name",
        align: "center",
        key: "up_name"
      },
      {
        title: "录入时间",
        dataIndex: "upload_time",
        align: "center",
        key: "upload_time"
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
                pathname: "/site/project/projects/projectinf/" + (record.id+"=0")
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
            <Link to="/site/project/projects/uploading">
              <Button
                style={{
                  width: "110px",
                  height: "35px",
                  lineHeight: "35px",
                  position: "absolute",
                  right: "60px",
                  bottom: "0px",
                  background: "#004FFF",
                  color: "#fff",
                  borderRadius: "100px",
                  border: "none"
                }}
                type="primary"
              >
                + 上传项目
              </Button>
            </Link>
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
              <TabPane tab={"系统（" + this.state.system_num + "）"} key="2" />
              <TabPane tab={"表单（" + this.state.front_num + ")"} key="3" />
              <TabPane tab={"后台（" + this.state.back_num + ")"} key="4" />
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
