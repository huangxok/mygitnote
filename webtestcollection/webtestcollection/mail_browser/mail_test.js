var app = require('app');
app.on('ready', function () {
var BrowserWindow = require('browser-window');
mainWindow = new BrowserWindow({});
  mainWindow.loadUrl('file://' + __dirname + '/mail_test.html');
  mainWindow.openDevTools();
});

