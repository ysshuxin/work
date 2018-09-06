import React, { Component } from 'react';
import axios from 'axios'
import { Table, Popover, Button,Radio ,Input} from 'antd';
const RadioGroup = Radio.Group;

const { TextArea } = Input;
const content = (
  <div>
  <h3 style={{fontSize:"14px",fontWeight:"600"}}>评级</h3>
    <RadioGroup onChange={this.onChange} >
    <p><Radio value={1}>A+</Radio>
    <Radio style={{marginLeft:"50px"}} value={2}>A</Radio>
    <Radio style={{marginLeft:"50px"}} value={3}>A-</Radio></p>
    <p><Radio value={4}>B+</Radio>
    <Radio style={{marginLeft:"50px"}} value={5}>B</Radio>
    <Radio style={{marginLeft:"50px"}} value={6}>B-</Radio>
    <Radio style={{marginLeft:"50px"}} value={7}>C</Radio></p>
  </RadioGroup>
  <h3 style={{fontSize:"14px",fontWeight:"600"}}>评级分析</h3>
    <TextArea></TextArea>
    <div style={{textAlign:"right"}} >
    <Button style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",background:"#fff",color:"#000",padding:"0",marginRight:"24px",marginTop:"8px"}}  type='primary'>取消</Button> 
    <Button style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",padding:"0",marginTop:"8px"}}  type='primary'>确认</Button>
    </div>
  </div>
);
const content2 = (
  <div>
  <h3 style={{fontSize:"14px",fontWeight:"600"}}>综合意见</h3>
    <RadioGroup onChange={this.onChange} >
    <p><Radio value={1}>持续观察</Radio>
    <Radio style={{marginLeft:"50px"}} value={2}>投行孵化</Radio>
    </p>
    <p><Radio  value={3}>投资＋孵化</Radio><Radio style={{marginLeft:"36px"}} value={4}>投资</Radio>
    </p>
     <Radio  value={5}>拒绝</Radio>
  </RadioGroup>
    <div style={{textAlign:"right"}} >
    <Button style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",background:"#fff",color:"#000",padding:"0",marginRight:"24px",marginTop:"8px"}}  type='primary'>取消</Button> 
    <Button style={{width:"50px",height:"24px",textAlign:"center",fontSize:"14px",padding:"0",marginTop:"8px"}}  type='primary'>确认</Button>
    </div>
  </div>
);
const columns = [{  
  title: 'logo',
  dataIndex: 'logo',
  key: 'logo',
}, {
  title: '名称',
  dataIndex: 'projectname',
  key: 'projectname',
}, {
  title: '代币符号',
  dataIndex: 'token',
  key: 'token',
}, {
  title: '行业',
  dataIndex: 'industry',
  key: 'industry',
}, {
  title: '需求',
  dataIndex: 'need',
  key: 'need',
}, {
  title: '录入人',
  dataIndex: 'recordname',
  key: 'recordname',
}, {
  title: '录入时间',
  dataIndex: 'time',
  key: 'time',
  sorter: (a, b) => a.age - b.age,
}, {
  title: '评级',
  key: 'grade',
  dataIndex: 'grade',
  render:()=> (<Popover key="1" style={{width:"295px",height:"218px"}} placement="bottomLeft"  content={content} trigger="click">
  <Button>待评级</Button>
</Popover>)
}, {
  title: '综合意见',
  key: 'opinion',
  dataIndex: 'opinion',
  render:()=> (<Popover key="2" style={{width:"295px",height:"218px"}} placement="bottomLeft"  content={content2} trigger="click">
  <Button>待评估</Button>
</Popover>)
}];

const data = [{
  key: '1',
  logo:'11',
  projectname:'test1',
  token:'火币',
  industry:'金融',
  need:'融资',
  recordname: 'John Brown', 
   time:'2018-3-4',
   opinion:'pass',
}, {
  key: '2',
  logo:'11',
  projectname:'test1',
  token:'火币',
  industry:'金融',
  need:'融资',
  recordname: 'John Brown', 
   time:'2018-3-4',
   opinion:'pass',
}, {
  key: '3',
  logo:'11',
  projectname:'test1',
  token:'火币',
  industry:'金融',
  need:'融资',
  recordname: 'John Brown', 
   time:'2018-3-4',
   opinion:'pass',
}];


export default class Form extends Component{
  state = {
    value: 1,
    visible:false,
    data : [{
      key: '1',
      logo:'11',
      projectname:'test1',
      token:'火币',
      industry:'金融',
      need:'融资',
      recordname: 'John Brown', 
       time:'2018-3-4',
       opinion:'pass',
    }, {
      key: '2',
      logo:'11',
      projectname:'test1',
      token:'火币',
      industry:'金融',
      need:'融资',
      recordname: 'John Brown', 
       time:'2018-3-4',
       opinion:'pass',
    }, {
      key: '3',
      logo:'11',
      projectname:'test1',
      token:'火币',
      industry:'金融',
      need:'融资',
      recordname: 'John Brown', 
       time:'2018-3-4',
       opinion:'pass',
    }]
  }
  componentWillMount(){
   let page=0
   let  grade=""
   let project_name=""
   let token="3098fe1ee244864510d1595c81e2d8b10eba54d4"
    axios
    .get("http://www.sosoapi.com/pass/mock/12182/index/Project/ProjectList?page="+page+"&grade="+grade+"&project_name="+project_name+"&token"+token)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log("error"+error);
    });

  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
    render(){
        return(
            <Table  columns={columns} dataSource={this.state.data} />
        )
    }
}
