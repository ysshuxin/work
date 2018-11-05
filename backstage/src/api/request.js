// import axios from 'axios'

// axios.defaults.baseURL = 'http://token.collinstar.com.cn';




// // axios.defaults.headers.post["token"]=localStorage.backtoken
// // axios.defaults.headers.get["token"]=localStorage.backtoken
// console.log(axios.defaults.headers)
// axios.interceptors.response.use(function (response) {
//   if(response.data.code===0){
//       return response.data
//   }else if(response.data.code=="-99"){
//       localStorage.removeItem("backtoken")
//       window.location.reload()
//   }
//   }, function (error) {
//    console.log(error)
//   });
// export default axios