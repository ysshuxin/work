import React, { Component } from "react";
import { message, Icon, Input, Spin,Upload } from "antd";
import axios from "../../api/api";
import qs from "qs";
import img from './../../img/logo.png'
// 正则
const regphone = /^1[345789]\d{9}$/;
const regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export default class Basicinformation extends Component {
  state={
    edit:false,
    defaultData:{
    },
    loading:false
  }
  componentDidMount=()=>{
    this.getData()
  }

getData=()=>{
  // axios.get("/api/user_center/get").then((json)=>{
  //   if (json.data.code===0) {
  //     this.setState({
  //       defaultData:json.data.data
  //     })
  //   } else {    
  //   }
  //   console.log(json)
  // }).catch((err)=>{
  //   console.log(err);
  // })

  


  axios({
    method: 'get',
    url: "/api/user_center/get",
    headers:{
      'token':'111'}
      }).then((json)=>{
        console.log(json)
      }).catch((err)=>{
    console.log(err);
  })



//   axios({
//     method: 'get',
//     url: "/api/getClassinfy",
//     headers:{token:localStorage.backtoken}
//   }).then((json)=>{
//     console.log(json)
//   }).catch((err)=>{
// console.log(err);

//   })
}

  beforeUpload=(file)=>{
    const isJPG = (file.type === 'image/jpeg'||file.type ==='image/jpg'||file.type ==='image/png');
    console.log(isJPG)
    if (!isJPG) {
      message.error('图片格式错误',[1]);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大为2M');
    }
    return isJPG && isLt2M;
  }
  uploadimg=(info)=>{
    this.setState({
      loading:true
    })
    let formdata = new FormData();
    formdata.append("file", info.file);
    axios
      .post("/api/upload", formdata)
      .then(json => {
        let updata = this.state.defaultData;
        updata.avatar_url = json.data.data.file_url;
        this.setState({
          defaultData:updata,
          loading:false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading:false
        })
      });
  }

  nameChange=(e)=>{

    let updata = this.state.defaultData;
    updata.name = e.target.value;
    this.setState({
      defaultData:updata
    });
  }
emailChange=(e)=>{
    
  let updata = this.state.defaultData;
  updata.email = e.target.value;
  this.setState({
    defaultData:updata
  });
  }

  edit=()=>{
    this.setState({
      edit:true
    })
  }
  save=()=>{
    let updata =JSON.parse(JSON.stringify( this.state.defaultData)) 
     delete updata["phone"]
    if(!updata.name){
      message.error("姓名不能为空",[1])
      return
    }
    if(!regmail.test(updata.email) ){
      message.error("请输入正确邮箱",[1])
      return
    }


     console.log(updata);
     
    let formdata = qs.stringify(updata);
   
    
    axios
      .post("/api/user_center/update_info", formdata)
      .then(json => {
        console.log(json);
        if(json.data.code===0){
          message.success("修改成功",[1])
          localStorage.img=this.state.defaultData.avatar_url
        }else{
          this.getData()
        }
        
      })
      .catch(err => {
        this.getData()
      });


    this.setState({
      edit:false
    })
  }
  render() {
    const uploadButton = (
      <div>
        <Icon style={{fontsize:"20px"}} type={this.state.upfileloading ? 'loading' : 'plus'} />
      </div>
    );
    const imageUrl = this.state.defaultData.avatar_url;
    return (
<Spin spinning={this.state.loading}>
      <div>
      <div style={{padding:"20px 32px",position:"relative",borderBottom:"1px solid #E9E9E9"}}>
      <span style={{fontsize:"16px",color:"rgba(0,0,0,0.85)",fontWeight:"600"}}>基础信息</span>
      <span style={{color:"#004FFF",fontsize:"14px",position:"absolute",right:"32px"}}>[{this.state.edit?<span onClick={this.save}>保存</span> :<span onClick={this.edit}>编辑</span>}]</span>
      </div>
      
      <div style={{padding:"33px 48px"}}>
      {this.state.edit?
        <div style={{display:"inline-block",width: 110,textAlign:"center",overflow:"hidden",verticalAlign:'top'}}>
          <div style={{display:"inline-block",width: 80,height: 80,verticalAlign:"top",borderRadius:"50%",overflow:"hidden"}}>
          <Upload
          
          name="avatar"
          listType="picture-card"
          className="avatar-uploader yss_upload"
          showUploadList={false}
          customRequest={this.uploadimg}
          beforeUpload={this.beforeUpload}
        >
          {imageUrl ? <img style={{width: "100%",}} src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
          
          </div>
          <div style={{fontsize:"12px",color:" rgba(0,0,0,0.65)",marginTop:"10px"}}>上传头像</div>
          <div style={{fontsize:"10px",color:" rgba(0,0,0,0.45)"}}>支持.jpg.jpeg.png 格式</div>
          </div>:  <div style={{display:"inline-block",width: 110,textAlign:"center",overflow:"hidden",verticalAlign:"top"}}><img src={this.state.defaultData.avatar_url} style={{width: 80,height: 80,borderRadius: "50%",verticalAlign:"top"}}></img></div> }
          

          <div style={{display:"inline-block",marginLeft:"35px"}}>
           <div><span>姓名：</span>{this.state.edit? <Input onChange={this.nameChange} defaultValue={this.state.defaultData.name}  style={{width: 160,marginLeft:"10px"}}></Input>:<span style={{display:"inline-block",width: 160,marginLeft:"10px",height:"32px",lineHeight:"32px"}}>{this.state.defaultData.name}</span> } </div> 
           <div style={{marginTop:"15px"}}><span>邮箱：</span>{this.state.edit? <Input onChange={this.emailChange} defaultValue={this.state.defaultData.email} style={{width: 160,marginLeft:"10px"}}></Input>:<span style={{display:"inline-block",width: 160,marginLeft:"10px",height:"32px",lineHeight:"32px"}}>{this.state.defaultData.email}</span> }  </div> 
           <div style={{marginTop:"15px"}}><span>手机：</span> <span style={{display:"inline-block",width: 160,marginLeft:"10px"}}>{this.state.defaultData.phone}</span> </div> 
          </div>
      </div>
      </div>
      </Spin>
    );
  }
}


