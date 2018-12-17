import React, { Component } from "react";
import {
  Tabs,
  Button,
  Modal,
  Select,
  DatePicker,
  message,
  Upload,
  Input,
  Radio,
  Icon,
  Checkbox
} from "antd";
import axios from "../../api/api";
import qs from "qs";
import p1 from '../../img/team/teamicon1.png'
import p2 from '../../img/team/teamicon2.png'
import p3 from '../../img/team/teamicon3.png'
import p4 from '../../img/team/teamicon4.png'
import p5 from '../../img/team/teamicon5.png'
import p6 from '../../img/team/teamicon6.png'
import p7 from '../../img/team/teamicon7.png'
import p8 from '../../img/team/teamicon8.png'
import p9 from '../../img/team/teamicon8.png'
import p10 from '../../img/team/teamicon10.png'





const TextArea = Input.TextArea
export default class Team extends Component {
  state = {
   edit:false,
   data:this.props.data
  }
  render() {
    const edit=this.state.edit
    const data=this.state.data
      return(
        <div style={{marginTop:20}}>
          {
            edit?"":<img style={{width: 70,height: 70,}} src={data.introduce.pic}></img>
          }
        </div>
      )
  }
}

