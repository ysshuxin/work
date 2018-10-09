import React, { Component } from "react";
import {  Input, Select, message} from "antd";
import axios from 'axios'
import './grade.css'
const { TextArea } = Input;

const InputGroup = Input.Group;
const Option = Select.Option;
const grade = ["A+", "A", "A-", "B+", "B", "B-", "C"];
const opinion = ["持续观察", "投资孵化", "投资+孵化","投资","拒绝"];
let gradelist = [];
let opinionlist = [];
for (let i = 0; i < grade.length; i++) {
  gradelist.push(
    <Option key={i} style={{ height: "32px" }} value={i}>
      {grade[i]}
    </Option>
  );
}
for (let i = 0; i < opinion.length; i++) {
  opinionlist.push(
    <Option key={i} style={{ height: "32px" }} value={i}>
      {opinion[i]}
    </Option>
  );
}





export default class Grade extends Component {
  state = {
    disabled: true,
    style: true
  };
 
  data={
    level:this.props.projectinf.project_detail.project_grade?this.props.projectinf.project_detail.project_grade.grade_id:"",
    levelinf:this.props.projectinf.project_detail.project_grade?this.props.projectinf.project_detail.project_grade.opinion_id:"",
    leveltext:this.props.projectinf.project_detail.project_grade?this.props.projectinf.project_detail.project_grade.grade_details:""
  }
  onChange = checkedValues => {
    this.setState({
      need: checkedValues
    });
  };
  level=(e)=>{
    
    this.data.level=e+1
  }
  levelinf=(e)=>{
    this.data.levelinf=e+1
  }
  changedisabled = e => {
    this.setState({
      disabled: !this.state.disabled,
      style: !this.state.disabled
    });



    if(!this.state.disabled){
      this.data.leveltext=document.getElementById("leveltext").value

      axios.post("http://cm.hrjykj.com:8090/index/Project/AddUpdateProject?start=2",{
        project_id:localStorage.projectidnow,
        token:localStorage.backtoken,
        grade_id:   this.data.level,
        grade_details:   this.data.leveltext,
        opinion_id:   this.data.levelinf
      })
      .then(function(json){

        json.status===200?message.success("修改成功",[1]):message.success("修改失败",[1]);
      })
      .catch(function(err){
        console.log(err)
      })
    }
  };
  render() {
    
    return (
      <div
        style={{
          position: "relative",
          minHeight: "200px",
          padding:"24px"
        }}
      >
        <div
          id="edit"
          onClick={this.changedisabled}
          style={{
            position: "absolute",
            right: "24px",
            top: "18px",
            fontSize: "14px",
            color: "#1890FF"
          }}
        >
          [{this.state.disabled ? "编辑" : "保存"}]
        </div>
        <h3 style={{ fontSize: "22px", margin: "20px", marginBottom: "0" ,marginTop:"0"}}>
          评级分析
        </h3>
        <div style={{ height: "70px" }}>
          <div
            style={{
              display: "inline-block",
              color: "#FF1000",
              position: "relative",
              width: "200px",
              marginLeft: "20px"
            }}
          >
            <span
              style={{
                position: "absolute",
                width: "38px",
                left: "0",
                 color: "#000",
                top: "7px",
                fontSize: "16px"
              }}
            >
              评级:
            </span>
            <InputGroup
              style={{
                width: "60px",
                color: "#FF1000",
                position: "absolute",
                left: "32px",
                fontSize: "16px"
              }}
              disabled={this.state.disabled}
            >
              <Select
              className={this.state.disabled?"hiddenselect":""}
                disabled={this.state.disabled}
                onChange={this.level}
                style={{
                  width: "140px",
                  height: "32px",
                  padding: "4px 0",
                  color: "#FF1000",
                  fontSize: "16px"
                }}
                defaultValue={grade[this.data.level-1]?grade[this.data.level-1]:"待评级"}
              >
                {gradelist}
              </Select>
            </InputGroup>
          </div>

          <div
            style={{
              display: "inline-block",
              
              position: "relative",
              width: "300px"
            }}
          >
            <span
              style={{
                position: "absolute",
                width: "80px",
                left: "0",
                color: "#000",
                top: "7px",
                fontSize: "16px"
              }}
            >
              综合意见
            </span>
            <InputGroup
              style={{
                width: "60px",
                color: "#FF1000",
                position: "absolute",
                left: "66px",
                fontSize: "16px"
              }}
              disabled={this.state.disabled}
            >
              <Select
              className={this.state.disabled?"hiddenselect":""}
                disabled={this.state.disabled}
                onChange={this.levelinf}
                style={{
                  width: "140px",
                  height: "32px",
                  padding: "4px 0",
                  color: "#FF1000",
                  fontSize: "16px"
                }}
                defaultValue={opinion[this.data.levelinf-1]?opinion[this.data.levelinf-1]:"待评估"}
              >
                {opinionlist}
              </Select>
            </InputGroup>
          </div>
        </div>
        <p style={{}} />
        <TextArea
        id="leveltext"
        className={this.state.disabled?"texthidden":"inputshow"}
          defaultValue={this.data.leveltext}
          placeholder="暂无"
          disabled={this.state.disabled}
          style={{
            textAlign:"left",
            marginLeft: "20px",
            width: "94%",
            height: "140px",
            background: "#fff",
            marginBottom:"20px",
            resize:"none",
            padding:"0"
          }}  
        />
        <p style={{position:"relative"}}>
         <span style={{color:"#1890FF",position:"absolute",right:"80px",fontSize:"16px"}}>生成报告</span>
        </p>
      </div>
    );
  }
}
