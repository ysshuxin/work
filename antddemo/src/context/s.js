import React, { Component } from "react";
import PropTypes from "prop-types";

class S extends Component {
 static contextTypes ={
     num:PropTypes.number,
     name:PropTypes.string
 }
 componentWillReceiveProps(props){
     console.log(props);
     
 }
componentWillMount(){
    console.log(this.context);
}
  render() {
    return (
 <div style={{position:"absolute",fontSize:"50px",color:"red",zIndex:"1000",top:"150px"}}> {this.context.name}</div>
    )
  }
}
export default S;
