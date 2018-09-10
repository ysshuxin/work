import React, { Component } from "react";
import Head from "./Head";
import S1inf from "./S1inf";
import S1poject from "./S1poject";
import Out from "../style";
import { Button,Modal } from "antd";
import Nav from "../Nav";
import Foot from "../Foot";
import axios from "axios";

const text = "表单填写大约需要10~15分钟";
let data = {
      name: "",
      job: "",
      mail: "",
      phone: "",
      wchat: "",
      project_name: "",
      token:"",
      companyname: "",
      industry:"",
      file:[],
      originator: "",
      logo:"",
      need:"",
      officialwebsite:"",
      referrer:"",
      suggestjob:"",
      filedata:[]
    };   
class S1index extends Component {
  next = e => {
    data.name = document.getElementById("name").value;
    data.job = document.getElementById("job").value;
    data.mail = document.getElementById("mail").value;
    data.phone = document.getElementById("phone").value;
    data.wchat = document.getElementById("wchat").value;
    data.project_name = document.getElementById("objectname").value;
    data.companyname = document.getElementById("companyname").value;
    data.token = document.getElementById("token").value;
    data.originator = document.getElementById("originator").value;
    data.officialwebsite = document.getElementById("officialwebsite").value;
    data.referrer = document.getElementById("referrer").value;
    data.suggestjob = document.getElementById("suggestjob").value;
    // data.filedata=document.querySelector("input[type='file']").files[0]
    let test = () => {
      for (let x in data) {
        if(data[x]==undefined||data[x]=="undefined"||data[x]==""){
          if(x=="wchat"||x=="referrer"||x=="suggestjob"||x=="token"||x=="file"){
            continue
          }
          this.error("必填项不能为空")
          console.log(x+data[x])
          return true
        }
      }
    };
      if(test()==true){
        console.log(data);
        return
      }
      console.log(data.filedata)
      for (let index = 0; index < data.filedata.length; index++) {
        const element = data.filedata[index];
      let formdata=new FormData()
      formdata.append("file",data.filedata[index])
      axios.post("http://cm.hrjykj.com:8090/index/Project/uploadProjectImage",formdata)  
      .then(function(json){
        console.log(json) 
        data.file.push(json.data.image_name)
        console.log(data.file)
        })
        
        .catch(function(err){
          console.log(err)
        })
   
  
  };

 setTimeout(() => {
   axios
  .post("http://cm.hrjykj.com:8090/index/Project/AddProject",{
    token:localStorage.token,
    istart:"0",
    project_name:  data.project_name,
    project_company:  data.companyname,
    token_symbol:  data.job,
    foundle:  data.token,
    industry:  data.industry,
    official_website:  data.officialwebsite,
    requirement:  data.need,
    book_file:  data.file,
    logo:  data.logo,
    refer_name:  data.referrer,
    refer_introduce:  data.suggestjob
  })
  .then(function(data) {
    console.log(data)
   localStorage.project_id=data.data.data
   window.location.hash='#/project/step2'
  })
  .catch(function(error) {
    console.log("error"+error);
  });
}, 3000);

}

  error(title) {
    const modal = Modal.error({
      title: title,
      okText:"关闭"
    });
   
  }
  change=(need)=>{
    for (let index = 0; index < need.length; index++) {
       data.need+= need[index];
    }
  
  }
  jobchange=(value)=>{
    data.industry=value
  }
  file=(value)=>{
    data.filedata=[]
    for (let index = 0; index < value.length; index++) {
      data.filedata.push(value[index].originFileObj)
    }
    console.log( data.file)
  }
  logo=(value)=>{
    data.logo=""
    for (let index = 0; index < value.length; index++) {
      data.logo=value[index].name;
    }
    console.log(data.logo)
  }
  render() {
    return (
      <div>
        <Nav />
        <div
          style={{
            width: "100%",
            position: "absolute",
            top: "65px",
            bottom: "65px",
            overflow: "auto",
            minWidth: "1200px"
          }}
        >
          <div
            style={{ width: "50%", minWidth: "1200px", margin: "0 auto" }}
            id="S1index"
          >
            <Head show={true} step={0} />
            <div style={Out}>
              <S1inf />
            </div>
            <div style={Out}>
              <S1poject logo={this.logo} jobchange={this.jobchange} file={this.file} change={this.change}/>
            </div>
            <p style={{ textAlign: "center" }}>
              <Button
                style={{
                  margin: "30px 0",
                  fontSize: "16px",
                  height: "40px",
                  width: "100px"
                }}
                onClick={this.next}
                type="primary"
              >
                下一步
              </Button>
            </p>
          </div>
        </div>

        <Foot />
      </div>
    );
  }
}
export default S1index;
