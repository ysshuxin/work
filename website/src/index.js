import React from 'react';
import ReactDOM from 'react-dom';
import Index from './page/index';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
ReactDOM.render(   <Index  />, document.getElementById('root'));

serviceWorker.unregister();
