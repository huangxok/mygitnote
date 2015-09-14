function route(handle, pathname, response, request) {
  console.log('about to route a request for' + pathname)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log('No request handler fountd for' + pathname);
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
    //console.log('no request handler found for' + pathname);
    //return '404 not found';
  }
}
exports.router = route;