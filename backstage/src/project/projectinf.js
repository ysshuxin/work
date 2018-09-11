import React, { Component } from 'react';

import Details from "./T-projectinf/details"
import Grade from "./T-projectinf/grade"
import Contacts from "./T-projectinf/contacts"
import Inf from "./T-projectinf/inf"
import axios from 'axios'

export default class Progect extends Component{
    state={
        inffig:false,
        inf:""
    }
    componentWillMount (){
        axios.post("http://cm.hrjykj.com:8090/index.php/index/project/ProjectOneInfoData",{
                  project_id:localStorage.projectidnow,
                  token:localStorage.backtoken
                }).then(json=>{
                 localStorage.projectinf=JSON.stringify(json.data.data)
                    this.setState({
                        inffig:true,
                        inf:json.data.data
                    })
                }).catch(err=>{
                  console.log(err)
                })
    }
    
    render(){
  
       if(this.state.inffig==true){
        return(
            <div>
            <Details projectinf={this.state.inf}></Details>
            <Grade  projectinf={this.state.inf}></Grade>
            <Contacts  projectinf={this.state.inf}></Contacts>
            <Inf  projectinf={this.state.inf}></Inf>
            </div>
        )
       }else{
        return ""
       }
       
    }
}
