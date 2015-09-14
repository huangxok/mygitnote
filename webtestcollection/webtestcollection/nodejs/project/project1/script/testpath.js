debugger;
var path = require('path');
var newp = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')

function fileUrl(str) {
  if (typeof str !== 'string') {
    throw new Error('Expected a string');
  }

  var pathName = path.resolve(str).replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== '/') {
    pathName = '/' + pathName;
  }

  return encodeURI('file://' + pathName);
};
fileUrl(__dirname);