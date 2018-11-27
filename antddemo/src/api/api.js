import axios from 'axios'
import Qs from 'qs'

const host=window.location.hostname+":"
+ window.location.port+"/#"
let api = axios.create({
   baseURL: host,
  timeout: 10000,
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  transformRequest:  (data)=>{
    return Qs.stringify(data)
  }
});


export default api