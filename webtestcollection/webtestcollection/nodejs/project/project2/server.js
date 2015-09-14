var http = require('http');
var url = require('url');

function start(route, handle) {

  function onRequest(request, response) {
    //var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for' + pathname + 'received.');

    //request.setEncoding('utf-8');

    //request.addListener('data', function (postDataChunk) {
    //  postdata += postDataChunk;
    //  console.log('Received post data chunk ' + postDataChunk + ' .')
    //});

    route(handle, pathname, response, request);
    //response.writeHead(200, { "Content-Type": "text/plain" });
    //var content = route(handle, pathname);
    //response.write(content);
    //response.end();
  }
  http.createServer(onRequest).listen(56565);
  console.log('Server has started');
}
exports.start = start;