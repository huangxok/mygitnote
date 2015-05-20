var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello，你妹!");
    console.log(123);
    response.end();
}).listen(8888);
