/**
 * @fileoverview
 */


  /*
   * @description 对话设置
   * @author zhanhong
   * @date 2011-12-20
   */
  var imcoreTalk = function() {

    //定义对话视图
    var viewTalk =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml">                                                                              \n' +
      '<head>                                                                                                                   \n' +
      '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />                                                    \n' +
      '<title>与  对话中... - 万户通</title>                                                                                    \n' +
      '<script type="text/javascript">                                                                                          \n' +
      '  //<![CDATA[                                                                                                            \n' +
      '  imcoreTalk = function() {                                                                                              \n' +
      '                                                                                                                         \n' +
      '  };                                                                                                                     \n' +
      '  //]]>                                                                                                                  \n' +
      '</' + 'script>                                                                                                           \n' +
      '</head>                                                                                                                  \n' +
      '<frameset cols="*,180" frameborder="no" framespacing="0">                                                                \n' +
      '    <frameset rows="*,27,100,27" frameborder="no" framespacing="0">                                                      \n' +
      '        <frame name="read" src="about:blank" noresize="noresize" />                                                      \n' +
      '        <frame name="exec" src="about:blank" noresize="noresize" />                                                      \n' +
      '        <frame name="send" src="about:blank" noresize="noresize" />                                                      \n' +
      '        <frame name="conn" src="about:blank" noresize="noresize" />                                                      \n' +
      '    </frameset>                                                                                                          \n' +
      '    <frameset rows="100%" frameborder="no" framespacing="0">                                                             \n' +
      '        <frame name="info" src="about:blank" noresize="noresize" />                                                      \n' +
      '    </frameset>                                                                                                          \n' +
      '</frameset>                                                                                                              \n' +
      '</html>                                                                                                                  \n' ;

    //定义读取视图
    var viewRead =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml">                                                                              \n' +
      '<head>                                                                                                                   \n' +
      '<style type="text/css">                                                                                                  \n' +
      '    html, body {width:100%; height:100%; margin:0px; border:none; padding:0px;}                                          \n' +
      '    body {overflow-y:scroll;}                                                                                            \n' +
      '</style>                                                                                                                 \n' +
      '</head>                                                                                                                  \n' +
      '<body>                                                                                                                   \n' +
      '</body>                                                                                                                  \n' +
      '</html>                                                                                                                  \n' ;

    //定义发送视图
    var viewSend =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml">                                                                              \n' +
      '<head>                                                                                                                   \n' +
      '<style type="text/css">                                                                                                  \n' +
      '    html, body {width:100%; height:100%; margin:0px; border:none; padding:0px;}                                          \n' +
      '    body {overflow-y:scroll;}                                                                                            \n' +
      '</style>                                                                                                                 \n' +
      '</head>                                                                                                                  \n' +
      '<body>                                                                                                                   \n' +
      '</body>                                                                                                                  \n' +
      '</html>                                                                                                                  \n' ;

    //定义命令视图
    var viewExec =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml">                                                                              \n' +
      '<head>                                                                                                                   \n' +
      '<style type="text/css">                                                                                                  \n' +
      '    body {margin:0px; border:none; padding:0px; background:#E9E9E9;}                                                     \n' +
      '    img {float:left; border:none; cursor:pointer;}                                                                       \n' +
      '    .left {position:absolute; top:0px; left:0px;}                                                                        \n' +
      '    .left a {float:left; margin:5px; cursor:pointer;}                                                                    \n' +
      '    .right {position:absolute; top:0px; right:20px;}                                                                     \n' +
      '    .right a {float:right; margin:5px; cursor:pointer;}                                                                  \n' +
      '</style>                                                                                                                 \n' +
      '</head>                                                                                                                  \n' +
      '<body>                                                                                                                   \n' +
      '<div class="left">                                                                                                       \n' +
      '    <a href="javascript:;" onclick=""><img src="1.png" /></a>                                                            \n' +
      '    <a href="javascript:;" onclick=""><img src="2.png" /></a>                                                            \n' +
      '    <a href="javascript:;" onclick=""><img src="3.png" /></a>                                                            \n' +
      '</div>                                                                                                                   \n' +
      '<div class="right">                                                                                                      \n' +
      '    <a href="javascript:;" onclick=""><img src="4.png" /></a>                                                            \n' +
      '</div>                                                                                                                   \n' +
      '</body>                                                                                                                  \n' +
      '</html>                                                                                                                  \n' ;

    //定义操舵视图
    var viewConn =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml">                                                                              \n' +
      '<head>                                                                                                                   \n' +
      '<style type="text/css">                                                                                                  \n' +
      '    body {margin:0px; border:none; padding:0px; background:#E9E9E9;}                                                     \n' +
      '    img {float:left; border:none; cursor:pointer;}                                                                       \n' +
      '    .right {position:absolute; top:0px; right:20px;}                                                                     \n' +
      '    .right a {float:right; margin:3px; cursor:pointer;}                                                                  \n' +
      '</style>                                                                                                                 \n' +
      '</head>                                                                                                                  \n' +
      '<body>                                                                                                                   \n' +
      '<div class="right">                                                                                                      \n' +
      '    <a href="javascript:;" onclick="">                                                                                   \n' +
      '      <img src="6.png" />                                                                                                \n' +
      '      <img src="7.png" />                                                                                                \n' +
      '    </a>                                                                                                                 \n' +
      '    <a href="javascript:;" onclick=""><img src="5.png" /></a>                                                            \n' +
      '</div>                                                                                                                   \n' +
      '</body>                                                                                                                  \n' +
      '</html>                                                                                                                  \n' ;

    //定义对话
    var talk = window.open("about:blank", "talk", "width=580, height=460");

    //执行对话视图
    talk.document.write(viewTalk);
    talk.document.close();
    talk.imcoreTalk();

    //执行读取视图
    talk.frames["read"].document.write(viewRead);
    talk.frames["read"].document.close();

    //执行发送视图
    talk.frames["send"].document.write(viewSend);
    talk.frames["send"].document.close();

    //执行命令视图
    talk.frames["exec"].document.write(viewExec);
    talk.frames["exec"].document.close();

    //执行操舵视图
    talk.frames["conn"].document.write(viewConn);
    talk.frames["conn"].document.close();

  };
