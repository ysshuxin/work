import { Breadcrumb, Button, Table ,Modal,message} from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from '../../../api/api'
const confirm=Modal.confirm
const data = [
  {
    num: "test",
    title: "etc",
    time: "1",
    author: "bb"
  },
  {
    num: "test",
    title: "etc",
    time: "2",
    author: "bb"
  },
  {
    num: "test",
    title: "etc",
    time: "3",
    author: "bb"
  },
  {
    num: "test",
    title: "etc",
    time: "4",
    author: "bb"
  }
];
export default class Contentlist extends Component {
  state={
    dataSource:[],
    total:1
  }
  revocation = () => {};
  issue = () => {
    confirm({
      title: '确认要发布这篇文章吗？',
      okText:"确定",
      cancelText:"取消",
      onOk() {
        return new Promise((resolve, reject) => {
          reject
        }).then(()=>{

        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };
  componentDidMount(){
    axios.get('/api/article/get').then((json)=>{
      console.log(json)
      if(json.status===200&&json.data.code===0){
        this.setState({
        dataSource:json.data.data.data,
        total:json.data.total
      })
      }else{
        message.error("网络错误，请刷新重试",[1])
      }
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  render = () => {
    const Tabletitle = [
      {
        title: "编号",
        dataIndex: "id",
        align: "center",
        key: "id",
        className: "num"
      },
      {
        title: "文章名称",
        align: "center",
        dataIndex: "title",
        key: "title",
        className: "title"
      },
      {
        title: "发布时间",
        dataIndex: "publish_time",
        align: "center",
        key: "publish_time",
        className: "time",
        sorter: (a, b) => {
          console.log(a);
          console.log(b);
        }
      },
      {
        title: "作者",
        dataIndex: "author",
        align: "center",
        key: "author",
        className: "author"
      },
      {
        title: "操作",
        dataIndex: "done",
        align: "center",
        key: "done",
        className: "done",
        render: (text, record, index) => {
          return (
            <div>
              <span
                onClick={this.revocation}
                style={{ color: " #004FFF", cursor: "pointer" }}
              >
               <Link to={{ pathname: "/site/web/contentinf/" + record.id }}>
              查看
            </Link>
              </span>
              <span style={{ margin: "0 8px" }}></span>
              <span
                onClick={this.issue}
                style={{ color: "#004FFF", cursor: "pointer" }}
              >
                发布
              </span>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <div
          style={{
            padding: "16px 32px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
          <Link to="/site/web/addcontentinf">
            <Button
              style={{
                width: "110px",
                height: "35px",
                lineHeight: "35px",
                position: "absolute",
                right: "80px",
                bottom: "32px",
                background: "#004FFF",
                color: "#fff",
                borderRadius: "100px",
                border: "none"
              }}
              type="primary"
            >
              + 新建资讯
            </Button>
          </Link>
          <h3 style={{ margin: "16px 0", fontSize: "20px", fontWeight: "600" }}>
            资讯列表
          </h3>
        </div>

        <div
          style={{
            background: "#F0F2F5",
            padding: "20px"
          }}
        >
          <div
            style={{
              background: "#fff"
            }}
          >
            <Table
              style={{ textAlign: "center", background: "#fff" }}
              columns={Tabletitle}
              dataSource={this.state.dataSource}
              pagination={{
                style: { marginRight: "30px" },
                size: "big",
                total:this.state.total ,
            
                
              }}
              onRow={(record, rowkey) => {
                return {
                  onMouseEnter: () => {},
                  onClick: e => {
                    if (
                      e.target.className === "num" ||
                      e.target.className === "title" ||
                      e.target.className === "time" ||
                      e.target.className === "author"
                    ) {
                      window.location.hash = "#/site/web/contentinf";
                    }
                  }
                };
              }}
            />
          </div>
        </div>
      </div>
    );
  };
}
