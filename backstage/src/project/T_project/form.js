import React, { Component } from 'react';
import axios from 'axios'
import { Table, Popover, Button,Radio ,Input,Modal} from 'antd';
import "./form.css"
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const levelinftxtdata=["持续观察","投行孵化","投资+孵化","投资","拒绝"]
export default class Form extends Component{
  state = {
    level: 0,
    levelinf:0,
    visible:{},
    visibleinf:{},
    data : [],
    key:0,
    leveltxt:{},
    levelinftxt:{}
  }
  leveltxt=["A+","A","A-","B+","B","B-","C"]
  levelinftxtdata=["待评估","持续观察","投行孵化","投资+孵化","投资","拒绝"]
  success() {
    const modal = Modal.success({
      title: '保存成功',
      okText:"关闭"
    });
  }
  error() {
    const modal = Modal.error({
      title: '保存失败',
      okText:"关闭"
    });
  }
level=key=>{
  let grade_details=document.getElementById("level"+key).value
  let grade_name=this.leveltxt[this.state.level]
  let leveldata = Object.assign({}, this.state.leveltxt, { ["leveltxt"+key]: grade_name })
  this.setState({
    leveltxt:leveldata
  })
  axios
  .get("http://cm.hrjykj.com:8090/index/Project/ProjectGrade?token="+localStorage.backtoken+"&project_id="+this.state.data[key].project_id+"&grade_id="+this.state.level+"&grade_details="+grade_details+"&grade_name="+grade_name)
  .then(json=>{
    console.log(json)
    if(json.data.code=="1001"){
      this.success()
      this.updata()
    }else{
      this.error()
    }
  })
  .catch(function(error) {
    console.log("error"+error);
  });
}
levelinf=key=>{
  axios
  .get("http://cm.hrjykj.com:8090/index/Project/ProjectOpinion?project_id="+this.state.data[key].project_id+"&opinion_id="+this.state.levelinf+"&token="+localStorage.backtoken)
  .then(json=>{
    if(json.data.code=="1001"){
      console.log(json)
      this.success()
      this.updata()
    }else{
      this.error()
    }
  })
  .catch(function(error) {
    console.log("error"+error);
  });
}
updata(){
  let that=this
  let page=0
  let  grade=""
  let project_name=""
  let token=localStorage.backtoken
   axios
   .get("http://cm.hrjykj.com:8090/index/Project/ProjectList?page="+page+"&grade_id="+grade+"&project_name="+project_name+"&token="+token)
   .then(function(data) {
     if(data.data.code=="1001"){
       console.log(data)
       let json=data.data.lists
       let statedata=[]
      let toLocaleString=(Date)=>{
        return Date.getFullYear() + "/" + (Date.getMonth() + 1) + "/" + Date.getDate();
      };
      let visible={}
      let leveltxt={}
      let visibleinf={}
      let levelinftxt={}
       for (let index = 0; index < json.length; index++) {
         visible["visible"+index]=false
         visibleinf["visible"+index]=false
          leveltxt["leveltxt"+index]="待评估"

          if(json[index].opinion=="0"){
            levelinftxt["levelinftxt"+index]="待评估"
          }else{
            levelinftxt["levelinftxt"+index]=levelinftxtdata[json[index].opinion-1]
          }
          console.log(levelinftxt)
         let unixTimestamp = new Date(json[index].upload_time*1000) ;
         let time= toLocaleString(unixTimestamp);
         statedata.push({
             key: index,
             logo:json[index].logo,
             projectname:json[index].project_name,
             token:json[index].token_symbol,
             industry:json[index].industry,
             need:json[index].requirement,
             recordname: json[index].refer_name, 
              time: time, 
              opinion:json[index].opinion,
              project_id:json[index].project_id,
              level:json[index].grade,
              gradeinf:levelinftxt[json[index].opinion]
         })
       }
       that.state.visible=visible
       that.state.visibleinf=visibleinf;
       that.state.leveltxt=leveltxt
       that.state.levelinftxt=levelinftxt
       that.setState({
         data:statedata
       })
     }
   })
   .catch(function(error) {
     console.log("error"+error);
   });
}
  componentWillMount=()=>{
    this.updata() 
  }
  onChangelevel = (e) => {
    console.log('radio checked', e.target);
    this.setState({
      level: e.target.value,
    });
  }
  onChangelevelinf = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      levelinf: e.target.value,
    });
  }
    render(){
      const columns = [{  
        title: 'logo',
        dataIndex: 'logo',
        key: 'logo',
        render:(e,data)=>{ 
          return(<img style={{width:"40px",height:"40px"}} onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}} src={"http://cm.hrjykj.com:8090"+e}></img>)}
      }, {
        title: '名称',
        dataIndex: 'projectname',
        key: 'projectname',
        render:(projectname,data)=>{
          return(<span  onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}}>{projectname}</span>)
        }
      }, {
        title: '代币符号',
        dataIndex: 'token',
        key: 'token',
        render:(token,data)=>{
          return(<span  onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}}>{token}</span>)
        }
      }, {
        title: '行业',
        dataIndex: 'industry',
        key: 'industry',
        render:(industry,data)=>{
          return(<span  onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}}>{industry}</span>)
        }
      }, {
        title: '需求',
        dataIndex: 'need',
        key: 'need',
        render:(need,data)=>{
          return(<span  onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}}>{need}</span>)
        }
      }, {
        title: '录入人',
        dataIndex: 'recordname',
        key: 'recordname',
        render:(recordname,data)=>{
          return(<span  onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}}>{recordname}</span>)
        }
      }, {
        title: '录入时间',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.age - b.age,
        render:(time,data)=>{
          return(<span  onClick={()=>{window.location.hash="#/app/progectinf";localStorage.projectidnow=data.project_id}}>{time}</span>)
        }
      }, {  
        title: '评级',
        key: 'grade',
        dataIndex: 'key',
        render:(key,json)=> ( <Popover onVisibleChange={ v=>{
          console.log(json.key)
          console.log(key)
          let data = Object.assign({}, this.state.visible, { ["visible"+key]: v })
          console.log(data)
        this.setState({visible:data})}} visible={this.state.visible["visible"+key]} key={key}   style={{width:"295px",height:"218px"}} placement="bottomLeft"  content={ <div className="levelalert" >
        <h3 style={{fontSize:"14px",fontWeight:"600"}}>评级</h3>
          <RadioGroup defaultValue={json.level} onChange={this.onChangelevel} >
          <p><Radio name="A+"  value={1}>A+</Radio>
          <Radio name="A" style={{marginLeft:"50px"}} value={2}>A</Radio>
          <Radio name="A-" style={{marginLeft:"50px"}} value={3}>A-</Radio></p>
          <p><Radio name="B+" value={4}>B+</Radio>
          <Radio name="B" style={{marginLeft:"50px"}} value={5}>B</Radio>
          <Radio name="B-" style={{marginLeft:"50px"}} value={6}>B-</Radio>
          <Radio name="C" style={{marginLeft:"50px"}} value={7}>C</Radio></p>
        </RadioGroup>
        <h3 style={{fontSize:"14px",fontWeight:"600"}}>评级分析</h3>
          <TextArea id={"level"+key}></TextArea>
          <div style={{textAlign:"right"}} >
          <Button onClick={ () => {
            let data = Object.assign({}, this.state.visible, { ["visible"+key]: false })
            this.setState({
              visible: data,
            });
            console.log(this.state)
             }} style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",background:"#fff",color:"#000",padding:"0",marginRight:"24px",marginTop:"8px"}}  type='primary'>取消</Button> 
          <Button onClick={()=>{
            let data = Object.assign({}, this.state.visible, { ["visible"+key]: false })
              this.setState({
                visible: data,
              });
              this.level(key)
          }} style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",padding:"0",marginTop:"8px"}}  type='primary'>确认</Button>
          </div>
        </div>} trigger="click">
        <Button>{this.state.leveltxt["leveltxt"+key]}</Button>
      </Popover>)
      }, {
        title: '综合意见',
        key: 'gradeinf',
        dataIndex: 'key',
        render:(key,data)=> ( <Popover onVisibleChange={ v=>{
          let data = Object.assign({}, this.state.visibleinf, { ["visible"+key]: v })
          console.log(data)
        this.setState({visibleinf:data})}}  visible={this.state.visibleinf["visible"+key]} overlayClassName="levelinf"   style={{width:"295px",height:"218px"}} placement="bottomLeft"  content={<div>
          <h3 style={{fontSize:"14px",fontWeight:"600"}}>综合意见</h3>
            <RadioGroup defaultValue={this.state.data[key].opinion} onChange={this.onChangelevelinf} >
            <p><Radio value={1}>持续观察</Radio>
            <Radio style={{marginLeft:"50px"}} value={2}>投行孵化</Radio>
            </p>
            <p><Radio  value={3}>投资＋孵化</Radio><Radio style={{marginLeft:"36px"}} value={4}>投资</Radio>
            </p>
             <Radio  value={5}>拒绝</Radio>
          </RadioGroup>
            <div style={{textAlign:"right"}} >
            <Button onClick={ () => {
              let data = Object.assign({}, this.state.visibleinf, { ["visible"+key]: false })
              console.log(data)
              this.setState({
                visibleinf: data,
              });
               }} style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",background:"#fff",color:"#000",padding:"0",marginRight:"24px",marginTop:"8px"}}  type='primary'>取消</Button> 
            <Button onClick={()=>{
              let data = Object.assign({}, this.state.visibleinf, { ["visible"+key]: false })
              console.log(data)
              this.setState({
                visibleinf: data,
              });
              this.levelinf(key)
            }} style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",padding:"0",marginTop:"8px"}}  type='primary'>确认</Button>
            </div>
          </div>} trigger="click">
        <Button>{this.state.levelinftxt["levelinftxt"+key]}</Button>
      </Popover>)
      }];
        return(
            <Table style={{background:"#fff"}} columns={columns} dataSource={this.state.data}
            onRow={(record,rowkey)=>{
               return({
                 onMouseEnter:()=>{
                   
                 }
               })
          }} />
        )
    }
}
