var http = require("http");
var fs = require("fs");
var url = require("url");
http
  .createServer(function(req, res) {
    var Mock = require("mockjs");
    var data = Mock.mock({
      "list|1-10": [
        {
          "id|+1": 1
        }
      ]
    });
    console.log(JSON.stringify(data, null, 4));
    var hostname = req.headers.host;
    var pathname = url.parse(req.url).pathname;
    if (pathname === "/") {
      readFileAndResponse("/index.html", res);
    }
  })
  .listen(9090);
function readFileAndResponse(pathname, response) {
  fs.readFile(pathname.substr(1), "", function(err, data) {
    if (err) {
      response.writeHead(404);
      response.end("page not found");
    } else {
      response.end(data);
    }
  });
}
