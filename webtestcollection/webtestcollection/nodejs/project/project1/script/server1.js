var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  debugger;
  res.writeHead(200, { "Content-Type": "test/plain" });
  res.write("hello world");
  res.end(path);
}).listen(56565, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');