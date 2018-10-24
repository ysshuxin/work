var express = require("express"); // 用来引入express模块
var mysql = require("mysql");
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yss8023313",
  database: "yss",
  multipleStatements: true
});
pool.on("connection", function(connection) {
  connection.query("SET SESSION auto_increment_increment=1");
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class resdata {
  constructor(data = [], msg = "网络错误", code = "0") {
    this.data = data;
    this.msg = msg;
    this.code = code;
  }
}

app.set("port", process.env.PORT || 5000);
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/api/getTag", function(req, res, next) {
  let sql = "SELECT * FROM item_tag";
  pool.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }

    let json = result.map(item => {
      return item.item;
    });

    let data = new resdata(json, 200, "请求成功");
    return res.send(data);
  });
});

app.get("/api/getClassinfy", function(req, res, next) {
  let sql = "SELECT * FROM classify";

  pool.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }

    let json = result.map(item => {
      return item.item;
    });

    let data = new resdata(json,"请求成功" , 200);
    return res.send(data);
  });
});

app.post("/api/getInvestment", upload.array(), function(req, res) {

  let fig=true
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
       fig=false
       break
    }
    else{
     fig=true
      break
    }
  }

  if(fig){
    let sql = "SELECT * FROM invest_list";

  pool.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }
    let json=result
    let data = new resdata(json, "请求成功",200);
    return res.send(data);
  });
  }else{
    

    let testNull=new Promise((resolve, reject)=>{
      let fig=true
       for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if(key=="id"){
          continue
        }else{
          if(!req.body[key]) {
          fig=false
          break 
        }
        else{
        }
        }
        
        
      }
    }
    console.log("fig----------"+fig)
    if(fig){
      resolve(fig)
    }else{
      reject(fig)
    }

    })
    testNull.then((fig)=>{
      if(req.body.id===""){
        let sql=`INSERT INTO invest_list (name,web_url,classify,inf,img_path) VALUES ('${req.body.name}','${req.body.web_url}','${req.body.classify}','${req.body.inf}','${req.body.img_path}')`
     
        pool.query(sql, function(err, result) {
          if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            return;
          }
          let data = new resdata({}, "添加成功",200);
          return res.send(data);
        });
     
      }else{
        console.log(fig)
      let sql=`UPDATE invest_list SET name='${req.body.name}',web_url='${req.body.web_url}',classify='${req.body.classify}',inf='${req.body.inf}',img_path='${req.body.img_path}' WHERE id=${req.body.id}`
  
      pool.query(sql, function(err, result) {
        if (err) {
          console.log("[SELECT ERROR] - ", err.message);
          return;
        }
        let sql=`SELECT * FROM invest_list WHERE id=${req.body.id}`
        pool.query(sql, function(err, result) {
          if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            return;
          }
          let data = new resdata(result[0], "修改成功",200);
          return res.send(data);
        });
        
      }); 
    }
    }).catch((fig)=>{
      console.log(fig)
      return  res.send(new resdata({}, "参数不能为空",404));
    })
   
 
      }

      
  
});


app.post("/api/addInvest", urlencodedParser, function(req, res) {
  let data = {};
  data.name = req.body.name;
  data.phon = req.body.phon;
  data.mail = req.body.mail;
  data.wechat = req.body.wechat;
  data.company = req.body.company;
  data.mark = req.body.mark;
  console.log(data);
});

app.post("/api/addFile", upload.any(), function(req, res) {
  console.log(req.files[0])
  let date=new Date
  let time=date.getTime()
  let name=req.files[0].originalname.match(/\.\w*/g)
  name=name[name.length-1]

   
  var des_file = "./img/" + time+name

  fs.readFile(req.files[0].path, function(err, data) {
    fs.writeFile(des_file, data, function(err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: time+name
        };
        console.log(response)
        res.end(JSON.stringify(response));
      }
    })
  })
});






app.listen(5000, function() {
  // 监听端口如果有用户进入页面发送请求我们输出以下语句
  console.log("express started on port 3000");
});
