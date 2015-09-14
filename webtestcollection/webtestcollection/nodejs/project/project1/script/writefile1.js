// 加载File System读写模块
var fs = require('fs');

var file = "d:\\message.txt";
writeFile(file);
readFile(file);

function writeFile(file) {
  // 测试用的中文
  var str = "\r\n我是一个人Hello myself!";


  // appendFile，如果文件不存在，会自动创建新文件
  // 如果用writeFile，那么会删除旧文件，直接写新文件
  fs.appendFile(file, str, function (err) {
    if (err)
      console.log("fail " + err);
    else
      console.log("写入文件ok");
  });
}

function readFile(file) {
  fs.readFile(file, function (err, data) {
    if (err)
      console.log("读取文件fail " + err);
    else {
      // 读取成功时
      // 输出字节数组

      console.log(data);
    }
  });
}
