import axios from 'axios'


const host=window.location.hostname+":"
+ window.location.port+"/#"
let api = axios.create({
  baseURL: host,
  timeout: 10000
});

export default api