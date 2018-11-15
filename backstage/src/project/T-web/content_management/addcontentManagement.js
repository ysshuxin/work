import React, { Component } from "react";
import {
  Breadcrumb,
  Input,
  Button,
  DatePicker,
  Upload,
  Icon,
  message,
  LocaleProvider,
  Modal,
  Spin
} from "antd";
import Edit from "wangeditor";
import axios from "../../../api/api";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import qs from "qs";
import "moment/locale/zh-cn";
import './style.css'
const confirm = Modal.confirm;
const TextArea = Input.TextArea;

export default class Contentmanagement extends Component {
  state = {
    upData: {
      author: "科银资本",
      content: "",
  
      img: "",
     
      publish_time: "",
 
      summary: "",
      title: "",
  
    },
    titlenum: 0,
    textareanum: 0,
    loading: false,
    imageUrl: false,
    pageloading:false
  };
  globle = {
    editor: null
  };




  

  componentDidMount = () => {
    




    this.globle.editor = new Edit("#editmenu","#editor");
    this.globle.editor.customConfig.zIndex = 1;
    this.globle.editor.customConfig.customUploadImg = function (file, insert) {


      let imgup=(file,index)=>{
  
        const isLt2M = file[index].size / 1024 / 1024 > 2;
        if (isLt2M) {
          message.error("上传文件最大不超过2M");
        }else{
     let formdata = new FormData();
          formdata.append("file", file[index]);
          axios
          .post("/api/upload", formdata)
          .then(json => { 
            insert(json.data.data.file_url)
            index++
            if(index>file.length){
              return 
            }else{
               imgup(file,index)
            }
           
          })
          .catch(err => {
            console.log(err);
          });
        }
      }

      imgup(file,0)

  
    
   
  }
  
    this.globle.editor.create();
  };

 
  titlechange = e => {
    if (e.target.value) {
    } else {
      message.error("标题不能为空", [1]);
    }

    let upData = this.state.upData;
    upData.title = e.target.value;

    this.setState({
      titlenum: e.target.value.length,
      upData: upData
    });
  };
  textareaChange = e => {
    let upData = this.state.upData;
    upData.summary = e.target.value;
    this.setState({
      textareanum: e.target.value.length,
      upData: upData
    });
  };
  onChange = (date, dateString) => {
    let upData = this.state.upData;
    upData.publish_time = dateString;
    this.setState({
      upData: upData
    });
  };
  author = e => {
    if (e.target.value) {
    } else {
      message.error("作者不能为空", [1]);
      return;
    }
    let upData = this.state.upData;
    upData.author = e.target.value;
    this.setState({
      upData: upData
    });
  };
  save = () => {
    let upData = this.state.upData;
    upData.content = this.globle.editor.txt.html();

    delete upData.is_delete;
    delete upData.status;
    delete upData.user_id;
    console.log(upData);
    if (upData.title === "") {
      message.error("标题不能为空", [1]);
      return;
    } else if (upData.title.length > 65) {
      message.error("标题过长", [1]);
      return;
    }
    if (upData.summary === "") {
      message.error("摘要不能为空", [1]);
      return;
    } else if (upData.summary.length > 80) {
      message.error("摘要过长", [1]);
      return;
    }
    if (upData.publish_time === "") {
      message.error("请选择时间", [1]);
      return;
    }
    if (upData.author === "") {
      message.error("作者不能为空", [1]);
      return;
    }
    if (upData.img === "") {
      message.error("请添加头图", [1]);
      return;
    }
    if (upData.content === "") {
      message.error("请填写文章内容", [1]);
      return;
    }
    let formdata = qs.stringify(upData);
    this.setState({
      loading:true
    })
    axios
      .post("/api/article/add", formdata, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(json => {
        console.log(json);

        if (json.status === 200) {
          let ifedit = !this.state.ifedit;
          this.setState({
            ifedit: ifedit
          });
          message.success("保存成功", [1],()=>{
            this.props.history.push('/site/web/contentlist');
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  logobeforeUpload = file => {
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJPG) {
      message.error("仅支持上传.jpg/.jpeg/.png文件");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传文件最大不超过2M");
    }
    return isJPG && isLt2M;
  };
  render = () => {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">建议尺寸16：9，大小小于2M.</div>
      </div>
    );
    return (
      <div>
        <div
          style={{
            padding: "16px 32px"
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#/site/web/contentlist"> 内容管理 </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item> 资讯详情 </Breadcrumb.Item>
          </Breadcrumb>
          <h3
            style={{
              fontSize: "20px",
              marginTop: "16px",
              fontWeight: "600"
            }}
          >
            编辑资讯
          </h3>
        </div>

          <Spin spinning={this.state.loading}>
        <div
          style={{
            background: "#F0F2F5",
            padding: "20px"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px 30px"
            }}
          >
            <div style={{ position: "relative" }}>
              <span style={{ fontWeight: "600" }}> 标题： </span>
              <Input
                onChange={this.titlechange}
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
              <div
                style={{
                  display: "inline-block",
                  position: "absolute",
                  right: "0"
                }}
              >
                <Button
                  style={{
                    width: "80px",
                    height: "32px",
                    color: "#F5222D",
                    border: "1px solid #F5222D",
                    borderRadius: "100px",
                    marginRight: "25px"
                  }}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  onClick={this.save}
                  style={{
                    width: "80px",
                    height: "32px",
                    borderRadius: "100px",
                    color: "#fff"
                  }}
                >
                  保存
                </Button>
              </div>
            </div>
            <div style={{ marginTop: "15px" }}>
              <span style={{ fontWeight: "600" }}> 时间： </span>
              <LocaleProvider locale={zh_CN}>
                <DatePicker
                  //  format="YYYY-MM-DD HH:mm:ss" showTime={true}
                  onChange={this.onChange}
                
                />
              </LocaleProvider>
              <span style={{ fontWeight: "600", marginLeft: "60px" }}>
                作者：
              </span>
              <Input onChange={this.author} defaultValue="科银资本" style={{ width: "160px" }} />
            </div>
            <div
              style={{ marginTop: "20px", width: "100%", overflow: "hidden" }}
            >
              <span style={{ float: "left", width: "46px", fontWeight: "600" }}>
                摘要：
              </span>
              <div style={{ marginLeft: "46px" }}>
                <TextArea onChange={this.textareaChange} />
              </div>
            </div>
            <p
              style={
                this.state.textareanum > 80
                  ? { color: "red", textAlign: "right", marginBottom: "0" }
                  : { textAlign: "right", marginBottom: "0" }
              }
            >
              {this.state.textareanum}
              /80
            </p>
            <div style={{ marginTop: "", width: "100%", overflow: "hidden" }}>
              <span style={{ float: "left", width: "46px", fontWeight: "600" }}>
                头图：
              </span>
              <div style={{ marginLeft: "46px" }}>
                <div  style={{width:'320px',height:"180px"}}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.logobeforeUpload}
                    onChange={this.logohandleChange}
                    customRequest={info => {
                      this.setState({
                        imageUrl: false,
                        loading: true
                      });
                      this.setState({ loading: true });
                      let formdata = new FormData();
                      formdata.append("file", info.file);
                      axios
                        .post("/api/upload", formdata)
                        .then(json => {
                          let upData = this.state.upData;
                          upData.img = json.data.data.file_url;
                          this.setState({
                            imageUrl: json.data.data.file_url,
                            loading: false,
                            upData: upData
                          });

                        
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }}
                  >
                    {this.state.imageUrl ? (
                      <img
                        style={{ width: "100%" }}
                        src={this.state.imageUrl}
                        alt="avatar"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
              </div>
            </div>
              <div id="editmenu" style={{marginTop:"15px",background:"#f1f1f1",border:"1px solid #ccc"}}></div>   
            <div id="editor" style={{ height:"710px",border:"1px solid #ccc" }} />
          </div>
        </div>
        </Spin>
      </div>
    );
  };
}
