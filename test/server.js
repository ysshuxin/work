var express = require("express");
var app = express();
var fs = require("fs");
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get("/listUsers", function(req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
    console.log(req);
    res.end(data);
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

 
});
