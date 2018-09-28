
import S1index from "../Component/uploadItem/S1index";
import S2index from "../Component/uploadItem/S2index";
import S3index from "../Component/uploadItem/S3index";
import Investment from "../Component/page/investment/investment"
import { BrowserRouter ,Route ,Switch,HashRouter } from 'react-router-dom';
import S4index from "../Component/uploadItem/S4index";
import Login from "../Component/uploadItem/Login";
import React, { Component } from "react";
class App extends Component {
  render() {
    return (
        <div>
        <HashRouter>
            <Switch>
                <Route path='/' component={Login} exact />
                <Route path='/project/step1' component={S1index}  exact  />
                <Route path='/project/step2' component={S2index} exact />
                <Route path='/project/step3' component={S3index}  exact/>
                <Route path='/project/step4' component={S4index}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/investment' component={Investment}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
                <Route path='/login' component={Login}  exact/>
            </Switch>
        </HashRouter>
    </div>
    );
  }
}
export default App;

