import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter,Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
                <Route  path="/" component={App}></Route>
    </BrowserRouter> , document.getElementById('root'));
registerServiceWorker();
