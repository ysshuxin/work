import React, { Component } from "react";
import Nav from "./Component/Nav";
import Foot from "./Component/Foot";
import S1index from "./Component/uploadItem/S1index";
import S2index from "./Component/uploadItem/S2index";
import S3index from "./Component/uploadItem/S3index";
import S4index from "./Component/uploadItem/S4index";

import F from './context/f'


import { BrowserRouter, Switch,Route} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>   
        <Nav /> 
         <F></F>
        S1index
      <Foot />
     
      </div>
    );
  }
}

export default App;
