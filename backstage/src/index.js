import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './project/login';
import { BrowserRouter,Route,HashRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HashRouter>
                {
                    window.location.hash=="#/login"?<Route  path="/login"  component={Login}></Route>: <Route  path="/"  component={App}></Route>
                }
            </HashRouter> , document.getElementById('root'));
        registerServiceWorker();
