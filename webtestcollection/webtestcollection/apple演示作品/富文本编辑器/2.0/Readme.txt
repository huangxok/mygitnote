※ Miniweaver Property Description
 MW.X：水平绝对位置，有效值数值，默认值为0；
 MW.Y：垂直绝对位置，有效值数值，默认值为0；
 MW.PopUpMenuRelative：菜单、窗口相对位置，有效值为数值型数组，默认值为[3, 19]；
 MW.Width：宽度，有效值为数值，默认值为588；
 MW.Height：高度，有效值为数值，默认值为425；
 MW.ToolboxHeight：工具箱高度，有效值为数值，默认值为53；
 MW.Color：颜色，有效值为十六进制颜色字符串，默认值为"#C3DAF9"；
 MW.BackgroundColor：背景颜色，有效值为十六进制颜色字符串，默认值为"#2A66C9"；
 MW.Image：图片包位置，有效值为URL字符串，默认值为"MW_IMG/"；
 MW.Face：表情位置，有效值为URL字符串型数组，默认值为[]；
 MW.Type：模式设置，有效值为"ALL"、"PRO"、"BBS"，默认值为"PRO"；
 MW.ToolbarType：工具条设置，有效值为"Often", "Format", "Paragraph", "Media"，默认值为["Often", "Format", "Paragraph", "Media"]；
 MW.Content：初始内容，有效值为字符串，默认值为""；
 MW.Config()：刷新属性，输出编辑器；
 MW.Recode()：返回编辑器中的内容；

※ Miniweaver Example
1) HTML文档声明方式建议：
   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" " http://www.w3.org/TR/html4/loose.dtd">
2) 在需要应用编辑器的文档中引入类：
   <script type="text/javascript" src="URL"></script>
3) 在文档需要应用编辑器的地方插入脚本：
   <script type="text/javascript">
     <!--
     /* 设置属性，若使用某一属性的默认值则该属性设置可以缺省 */
     MW.X = 10;
     MW.Y = 50;
     ...

     /* Config 方法要出现在设置属性完毕后 */
     MW.Config();
     //-->
   </script>
4) 双击工具箱的空白处可以工具箱切换模式。
5) 例：
   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
   <html>
   <head>
   <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
   <script type="text/javascript" src="MW_OBJ.js"></script>
   </head>

   <body>
   <button onClick="alert(MW.Recode())">获取内容</button>
   <script type="text/javascript">
    <!--
    MW.X = 10;
    MW.Y = 50;
    MW.Config();
    //-->
  </script>
  </body>
  </html>