import axios from 'axios'

axios.defaults.baseURL = 'http://token.collinstar.com.cn';
// axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//  axios.defaults.headers.post['token'] =  localStorage.backtoken


export default axios