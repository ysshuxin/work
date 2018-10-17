var express = require("express"); // 用来引入express模块
var mysql = require("mysql");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

app.post('/api/addContacts', urlencodedParser, function (req, res) {
    let data={}
    data.name=req.body.name 
    data.phon=req.body.phon
    data.mail=req.body.mail 
    data.wechat=req.body.wechat 
    data.company=req.body.company 
    data.mark=req.body.mark 
    console.log(data)
 })
  
 app.post('/api/addFile', urlencodedParser, function (req, res) {

    console.log(req.body)

 })

app.use(function(req, res, next) {
  // 设置404页面
  res.status(404);
  res.send("404 - Not Found");
});
app.listen(app.get("port"), function() {
  // 监听端口如果有用户进入页面发送请求我们输出以下语句
  console.log("express started on port 3000");
});
