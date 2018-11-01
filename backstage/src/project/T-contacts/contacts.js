import React, { Component } from "react";
import { Input, Button, Radio, Table, message, Modal,Pagination  } from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";

const confirm = Modal.confirm;
const Search = Input.Search;

export default class Contacts extends Component {
  state = {
    dataSource: [],
    tagarr: [],
    loading: false,
    tagchangefig: false,
    Radiodom: [],
    total:10,
    pagenow:1,
    category_id:""
  };

  componentDidMount = () => {
    // 列表页
    axios
      .get("/api/relationship/group")
      .then(json => {
        let data = json.data.data.data;
        console.log(json);
        this.setState({
          dataSource: data,
          total:json.data.data.total
        });
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误，请刷新重试", [1]);
      });
    // 所属类目
    axios
      .get("/api/category/get")
      .then(json => {
        if (json.status === 200) {
          console.log(json.data.data);
          let tagarr = json.data.data.map(item => {
            return (
              <div
                style={{
                  display: "inline-block",
                  width: "100px",
                  textAlign: "left",
                  marginRight: "10px",
                  marginBottom: "16px"
                }}
              >
                <Radio.Button
                  style={{
                    height: "18px",
                    lineHeight: "18px",
                    borderRadius: "6px",
                    border: "none"
                  }}
                  value={item.id}
                >
                  {item.name}
                </Radio.Button>
              </div>
            );
          });

          this.setState({
            tagarr: tagarr
          });
        } else {
          message.error("网络错误，请刷新重试", [1]);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误，请刷新重试", [1]);
      });
  };

  del = id => {
    let that=this
    confirm({
      title: "确认删除此条人脉信息？",
      onOk() {
        axios
          .get("/api/relationship/delete", { params: { id: id } })
          .then(json => {
            if (json.status === 200) {
              id=parseInt(id)
             let data=that.state.dataSource.filter((item)=>{
               return item.id!==id
             })

              message.success("删除成功", [0.5],()=>{
                that.setState({
                dataSource:data
               })
              });
            } else {
              message.error("网络错误，请刷新重试", [1]);
            }
          })
          .catch(err => {
            console.log(err);
            message.error("网络错误，请刷新重试", [1]);
          });
      },
      okText:"确认",
      cancelText:"取消",
      onCancel() {}
    });
  };

  search = e => {
    if (e) {
      this.setState({
        loading: true,
        tagchangefig: true
      });

      axios
          .get("/api/relationship/search", { params: { keyword: e } })
          .then(json => {
            if (json.status === 200) {
              console.log(json)
              this.setState({
                loading: false,
                tagchangefig: false,
                dataSource:json.data.data.data
                
              });
            } else {
              message.error("网络错误，请刷新重试", [1]);
            }
          })
          .catch(err => {
            console.log(err);
            message.error("网络错误，请刷新重试", [1]);
          });
      
      
     
    } else {
      message.error("搜索内容不能为空", [1]);
    }
  };

  columns = [
     {
      title: "公司",
      dataIndex: "company",
      key: "company",
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
   
    {
      title: "类型",
      dataIndex: "category_id_text",
      key: "category_id_text",
      align: "center"
    },
    {
      title: "岗位",
      dataIndex: "position",
      key: "position",
      align: "center"
    },
    {
      title: "职级",
      key: "title",
      dataIndex: "title",
      align: "center"
    },
    {
      title: "对接人",
      dataIndex: "linkman",
      key: "linkman",
      align: "center"
    },
    {
      title: "对接人手机",
      dataIndex: "link_phone",
      key: "link_phone",
      align: "center"
    },
    {
      title: "操作",
      key: "do",
      align: "center",
      render: (text, record, index) => {
        return (
          <div>
            <span
              onClick={this.del.bind(this, record.id)}
              style={{ color: "red", marginRight: "20px" }}
            >
              删除
            </span>
            <Link to={{ pathname: "/site/source/sourceinf/" + record.id }}>
              详情
            </Link>
          </div>
        );
      }
    }
  ];

  tagchange = e => {
    this.setState({
      loading: true,
      tagchangefig: true
    });
    let data = { params: { category_id: e.target.value } };
    let category_id= e.target.value
    if (e.target.value === "all") {
      data = {};
      category_id=""
    }
    axios
      .get("/api/relationship/group", data)
      .then(json => {
        if (json.status === 200) {
          this.setState({
            dataSource:json.data.data.data,
            loading: false,
            tagchangefig: false,
            category_id:category_id,
            pagenow:1,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  pageonChange=(current, size)=>{
    this.setState({
      loading: true,
      tagchangefig: true
    });
    let data={}
    let category_id=this.state.category_id
    if(category_id){ data={
        page:current,
        category_id:category_id
      }
       
    }else{
      data={
          page:current
        }
    }
    
    axios
    .get("/api/relationship/group", { params: data })
    .then(json => {
      if (json.status === 200) {
        console.log(json)
        
        this.setState({
          dataSource:json.data.data.data,
          loading: false,
          tagchangefig: false,
          pagenow:json.data.data.current_page
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            padding: "0 48px 20px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Link to="/site/source/addsource">
            <Button
              style={{
                width: "110px",
                height: "35px",
                lineHeight: "35px",
                position: "absolute",
                right: "60px",
                bottom: "20px",
                background: "#004FFF",
                color: "#fff",
                borderRadius: "100px",
                border: "none"
              }}
              type="primary"
            >
              + 添加人脉
            </Button>
          </Link>

          <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
            人脉资源库
          </h3>
          <Search
            style={{ width: "350px", height: "35px" }}
            placeholder="请输入人脉关键字搜索"
            onSearch={this.search}
          />
        </div>

        <div style={{ background: "#F0F2F5", padding: "20px" }}>
          <div
            style={{
              background: "#fff",
              overflow: "hidden",
              padding: "24px 36px 10px"
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "7%",
                verticalAlign: "top"
              }}
            >
              所属类目:
            </div>
            <div style={{ display: "inline-block", width: "93%" }}>
              <Radio.Group
                disabled={this.state.tagchangefig}
                onChange={this.tagchange}
                defaultValue="all"
                buttonStyle="solid"
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "100px",
                    textAlign: "left",
                    marginRight: "10px",
                    marginBottom: "16px"
                  }}
                >
                  <Radio.Button
                    style={{
                      height: "18px",
                      lineHeight: "18px",
                      borderRadius: "6px",
                      border: "none"
                    }}
                    value="all"
                  >
                    全部
                  </Radio.Button>
                </div>
                {this.state.tagarr}
              </Radio.Group>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Table
              style={{ background: "#fff" }}
              locale={{ emptyText: "暂无数据" }}
              loading={this.state.loading}
              dataSource={this.state.dataSource}
              columns={this.columns}
              pagination={{
                current:this.state.pagenow,
                pageSizeOptions:'10',
                total:this.state.total,
                onChange:this.pageonChange
              }}
            />
             
          </div>
        </div>
      </div>
    );
  }
}
