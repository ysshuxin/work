import React, { Component } from "react";
import {
  Breadcrumb,
  message,
  Upload,
  Icon,
  Spin,
  Input,
  Popconfirm,
  Button,
  Modal
} from "antd";
import { Link } from "react-router-dom";
import axios from "../../api/api";
import qs from "qs";
const TextArea = Input.TextArea;
const confirm = Modal.confirm;
export default class Talkinf extends Component {
  state = {
    titlenum: 0,
    loading: false,
    upfileloading: false,
    imgList: [],
    upData: {},
    edit: false,
    editFig: false,
    data: {},
    discussionChangeData: ""
  };

  //   初始化
  componentDidMount() {
    this.upData();
  }

  upData = () => {
    let userId = localStorage.userid;
    let id = parseInt(this.props.match.params.id);
    axios
      .get("/api/discussion/detail", { params: { id: id } })
      .then(json => {
        console.log(json);

        if (json.data.code === 0) {
          let upData = {
            title: json.data.data.title,
            content: json.data.data.content,
            id: json.data.data.id
          };
          this.setState({
            data: json.data.data,
            imgList: json.data.data.pics,
            editFig: json.data.data.user_id == userId,
            upData: upData
          });
        } else {
          message.error(json.data.msg, [1]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 图片上传
  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
    if (!isJPG) {
      message.error("图片格式错误", [1]);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片最大为2M");
    }
    return isJPG && isLt2M;
  };
  uploadimg = info => {
    this.setState({
      loading: true
    });
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        let data = this.state.imgList.concat([json.data.data.file_url]);
        this.setState({
          imgList: data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };
  // 删除图片
  delImg = index => {
    console.log(index);
    let imgList = this.state.imgList.concat([]);
    imgList.splice(index, 1);
    this.setState({
      imgList: imgList
    });
  };
  // 获取输入数据

  onChange = (key, e) => {
    let data = this.state.upData;
    data[key] = e.target.value;
    if(key=="title"){
        this.setState({
            titlenum:e.target.value.length
        })
    }
    this.setState({
      upData: data,
  
    });
  };

  // 提交
  save = () => {
    let data = this.state.upData;
    data.pics = this.state.imgList.join(",");
    if(!data.title){
        message.error("请输入标题",[1])
        return
    }
    if(data.title.length>65){
        message.error("标题过长",[1])
        return
    }
    if(!data.content){
        message.error("请输入内容",[1])
        return
    }
    if(!data.pics){
      delete data.pics
       
    }
    console.log(data);
    let FormData = qs.stringify(data);
    this.setState({
      loading: true
    });
    axios
      .post("/api/discussion/update", FormData)
      .then(json => {
        if (json.data.code === 0) {
          message.success("提交成功", [1], () => {
            this.setState({
                edit:false,
              loading: false
            });
            this.upData()
          });
        } else {
          message.success(json.data.msg, [1]);
          this.setState({
            edit:false,
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
            edit:false,
          loading: false
        });
      });
  };
  edit = () => {
    this.setState({
      edit: true
    });
    console.log("sss");
  };
  // 删除
  del = () => {
    let id = parseInt(this.props.match.params.id);
    confirm({
      title: "确认删除此篇文章？",
      onOk: () => {
        axios
          .get("/api/discussion/delete", { params: { id: id } })
          .then(json => {
            if (json.data.code === 0) {
              console.log(json);
              message.success("删除成功", [0.5], () => {
                this.props.history.push("/site/talk");
              });
            } else {
              message.error(json.data.msg, [1]);
            }
          })
          .catch(err => {
            console.log(err);
            message.error("网络错误，请刷新重试", [1]);
          });
      },
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {}
    });
  };
  //   评论
// 删除评论
delComment=(id)=>{



    confirm({
        title: "确认删除此条评论？",
        onOk: () => {
            axios
            .get("/api/discussion_comment/delete",  {params:{"id":id}})
            .then(json => {
              if (json.data.code === 0) {
                message.success("删除成功", [1], () => {
                  this.setState({
                      edit:false,
                    loading: false
                  });
                  this.upData()
                });
              } else {
                message.success(json.data.msg, [1]);
                this.setState({
                  edit:false,
                  loading: false
                });
              }
            })
            .catch(err => {
              this.setState({
                  edit:false,
                loading: false
              });
            });
        },
        okText: "确认",
        cancelText: "取消",
        onCancel: () => {}
      });

}
  discussionChangeData = e => {
    this.setState({
      discussionChangeData: e.target.value
    });
  };

  saveDiscussion = () => {
    let id = parseInt(this.props.match.params.id);
    let discussionChangeData = this.state.discussionChangeData;

    if (!discussionChangeData) {
      message.error("请输入评论内容", [1]);
      return;
    }
    let data = {
      discussion_id: id,
      comment: discussionChangeData
    };
    let FormData = qs.stringify(data);
    axios
      .post("/api/discussion_comment/add", FormData)
      .then(json => {
        if (json.data.code === 0) {
          message.success("发布成功", [1], () => {
            this.upData();
            this.setState({
              loading: false,
              
            });
          });
        } else {
          message.error(json.data.msg, [1]);
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.upfileloading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const data = this.state.data;
    return (
      <div style={{ background: "#F0F2F5" }}>
        <div
          style={{
            padding: "16px 48px 0",
            position: "relative",
            overflow: "hidden",
            background: "#fff"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/site/talk">讨论中心</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>详情</Breadcrumb.Item>
          </Breadcrumb>

          <h3 style={{ margin: "20px 0", fontSize: "22px", fontWeight: "600" }}>
          讨论详情页
          </h3>
        </div>

        <Spin spinning={this.state.loading}>
          <div style={{ padding: "20px 20px 5px", background: "#F0F2F5" }}>
            <div
              style={{
                background: "#fff",
                padding: "20px 32px",
                position: "relative"
              }}
            >
              {this.state.editFig ? (
                <div
                  style={{ position: "absolute", top: "20px", right: "32px" }}
                >
                  <span
                    onClick={this.del}
                    style={{ color: "#F5222D", marginRight: 10 }}
                  >
                    [删除]{" "}
                  </span>
                  {this.state.edit ? (
                    <span onClick={this.save} style={{ color: "#004fff" }}>
                      [保存]
                    </span>
                  ) : (
                    <span onClick={this.edit} style={{ color: "#004fff" }}>
                      [编辑]
                    </span>
                  )}
                </div>
              ) : (
                ""
              )}

              {this.state.edit ? (
                <div>
                  <span style={{ fontWeight: "600" }}> 标题：</span>
                  <Input
                    onChange={this.onChange.bind(this, "title")}
                    defaultValue={data.title}
                    suffix={
                      <span
                        style={this.state.titlenum > 65 ? { color: "red" } : {}}
                      >
                        {this.state.titlenum}
                        /65
                      </span>
                    }
                    style={{ width: "60%" }}
                  />
                </div>
              ) : (
                <div>
                  {" "}
                  <span style={{ fontWeight: "600" }}>{data.title}</span>
                </div>
              )}

              <div style={{ margin: "10px 0" }}>
                {data.avatar_url ? (
                  <img
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      verticalAlign: "top"
                    }}
                    src={data.avatar_url}
                  />
                ) : (
                  <div
                    style={{
                      verticalAlign: "top",
                      display: "inline-block",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#ddd"
                    }}
                  />
                )}
                <div
                  style={{
                    display: "inline-block",
                    color: " rgba(0,0,0,0.65)",
                    marginLeft: 20
                  }}
                >
                  <span>{data.name}</span>
                  <br />
                  <span>{data.add_time}</span>
                </div>
              </div>

              <div>
                {this.state.edit ? (
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    >
                      讨论内容：
                    </div>
                    <TextArea
                      onChange={this.onChange.bind(this, "content")}
                      style={{ height: 200 }}
                      defaultValue={data.content}
                    />
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>{data.content}</div>
                )}
              </div>

              <div style={{ margin: "20px 0" }}>
                {this.state.edit ? (
                  <div>
                    <p>
                      <span style={{ fontWeight: "600" }}>图片：</span>{" "}
                      <span style={{ color: "rgba(0,0,0,0.45)" }}>
                        最多上传6张图片,可点击图片删除
                      </span>{" "}
                    </p>
                    <div style={{ paddingLeft: 42 }}>
                      {this.state.imgList.map((item, index) => {
                        return (
                          <Popconfirm
                            placement="top"
                            title={"确认删除此图片？"}
                            onConfirm={this.delImg.bind(this, index)}
                            okText="确认"
                            cancelText="取消"
                          >
                            <img
                              src={item}
                              key={index}
                              style={{
                                width: 90,
                                height: 90,
                                margin: "0 8px",
                                verticalAlign: "top"
                              }}
                            />
                          </Popconfirm>
                        );
                      })}
                      <div
                        style={{
                          display: "inline-block",
                          width: 90,
                          height: 90
                        }}
                      >
                        {this.state.imgList.length >= 6 ? (
                          ""
                        ) : (
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader yss_projectinf_uploading"
                            showUploadList={false}
                            customRequest={this.uploadimg}
                            beforeUpload={this.beforeUpload}
                          >
                            {uploadButton}
                          </Upload>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  this.state.imgList.map((item, index) => {
                    return (
                      <img
                        src={item}
                        key={index}
                        style={{
                          width: 90,
                          height: 90,
                          margin: "0 8px",
                          verticalAlign: "top"
                        }}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div style={{ padding: "5px 20px", background: "#F0F2F5" }}>
            <div
              style={{
                background: "#fff",
                padding: "20px 32px",
                position: "relative"
              }}
            >
              <div>
                <p>
                  <i
                    style={{
                      width: 2,
                      height: 14,
                      display: "inline-block",
                      background: "#004FFF ",
                      verticalAlign: "",
                      position: "relative",
                      top: "2px"
                    }}
                  />{" "}
                  <span style={{ fontWeight: "600", verticalAlign: "" }}>
                    评论
                  </span>
                </p>
                <TextArea
                  onChange={this.discussionChangeData}
                  placeholder="欢迎留言讨论……"
                  style={{ background: "rgba(0,0,0,0.05)", height: 70 }}
                />
                <div style={{ margin: "10px 0 0", textAlign: "right" }}>
                  <Button
                    onClick={this.saveDiscussion}
                    type="primary"
                    style={{ width: 70, height: 32, borderRadius: 100 }}
                  >
                    发 布
                  </Button>
                </div>
              </div>

              {  data.comment?data.comment.map((item,index)=>{
                return(
                    <div key={index} style={{padding :" 20px 0",borderBottom:"1px solid rgba(0,0,0,0.10)",overflow:"hidden",position:"relative"}}>
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        textAlign: "",
                        width: 100,
                        position:"absolute"
                      }}
                    >
                      {item.avatar_url ? (
                        <img
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            verticalAlign: "top"
                          }}
                          src={item.avatar_url}
                        />
                      ) : (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "#ddd",
                            display: "inline-block"
                          }}
                        />
                      )}
    
                      <div>{item.name}</div>
                    </div>
                    <div style={{ display: "inline-block" ,float:"left",marginLeft:"100px"}}>
                      <p style={{ color: "rgba(0,0,0,0.65)" ,marginBottom:"5px"}}>{item.add_time}</p>
                      <div>{item.comment}</div> 
                     
                      
                    </div>  
                   {
                        this.state.editFig?<div style={{textAlign:"right",overflow:"hidden",position:"absolute",right:0,bottom:10}}><span onClick={this.delComment.bind(this,item.id)} style={{color:"#F5222D"}}>[删除]</span></div>:""
                      }
                  </div>
                )
              }):""}
            

            </div>
          </div>
        </Spin>
      </div>
    );
  }
}
