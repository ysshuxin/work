import axios from 'axios'

axios.defaults.baseURL = 'http://token.collinstar.com.cn';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 axios.defaults.headers.post['Content-Language'] =  localStorage.backtoken
 axios.defaults.headers.get['Content-Language'] =  localStorage.backtoken



//  "proxy": {
//     "/*": {
//         "target": "http://token.collinstar.com.cn",
//         "changeOrigin": true
//     }
//   }
  // "proxy": {
  //   "/*": {
  //       "target": "http://token.collinstar.com.cn",
  //       "changeOrigin": true
  //   }
  // }



export default axios