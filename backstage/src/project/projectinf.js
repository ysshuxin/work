import React, { Component } from 'react';

import Details from "./T-projectinf/details"
import Grade from "./T-projectinf/grade"
import Contacts from "./T-projectinf/contacts"
import Inf from "./T-projectinf/inf"
export default class Progect extends Component{
    render(){
        return(
            <div>
            <Details></Details>
            <Grade></Grade>
            <Contacts></Contacts>
            <Inf></Inf>
            </div>
        )
    }
}
