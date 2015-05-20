/*
 * Miniweaver V2.1
 *
 * Copyright (C) By Mr.lonely
 * $Mail: Mr.lonely@vip.163.com Or 411908279@qq.com
 * $Date: 18:23 2009-5-7 (Thursday May 7 18:23 2009)
 */

  MW = {};

  MW.X = 0;
  MW.Y = 0;
  MW.PopUpMenuRelative = [3, 19];
  MW.Width = 588;
  MW.Height = 425;
  MW.ToolboxHeight = 53;
  MW.Color = "#C3DAF9";
  MW.BackgroundColor = "#2A66C9";
  MW.Image = "MW_IMG/";
  MW.Face = [];
  MW.Type = "PRO";
  MW.ToolbarType = ["Often", "Format", "Paragraph", "Media"];
  MW.Content = "";

  MW.$ = function(Type, ID) {
    switch (Type) {
      case 0 : return window.frames[ID]; break;
      case 1 : return window.document.getElementById(ID); break;
    }
  }

  MW.Recode = function() {
    var Code = "";
    if (MW.Mode[1] == "Edit") {Code = MW.$(0, "MW_Edit").document.body.innerHTML;}
    if (MW.Mode[1] == "Code") {Code = MW.$(1, "MW_Code").value;}
    return Code;
  }

  MW.Config = function() {
    MW.Initialize();
    MW.Toolbox();
    MW.PopUpMenu();
    MW.Editor();
    MW.Border();
    MW.$(0, "MW_Edit").document.open();
    MW.$(0, "MW_Edit").document.write(MW.Content);
    MW.$(0, "MW_Edit").document.close();
    MW.$(0, "MW_Edit").document.designMode = "On";
    document.onclick = function() {MW.PopUpMenuClose();}
  }

  MW.Initialize = function() {
    MW.Mode = ["Down", "Edit"];
    MW.Lock = [false, false, true];
  }

  MW.Toolbox = function() {
    MW.Toolbox_Style_Up = "top:" + MW.Y + "px; left:" + MW.X + "px; z-index:99; position:absolute; width:" + (MW.Width - 4) + "px; height:" + MW.ToolboxHeight + "px; border:" + MW.BackgroundColor + " 2px solid; overflow:hidden; background-color:" + MW.Color + "; cursor:move;";
    MW.Toolbox_Style_Down = "top:" + (MW.Y + 3) + "px; left:" + (MW.X + 3) + "px; z-index:99; position:absolute; width:" + (MW.Width - 6) + "px; height:" + MW.ToolboxHeight + "px; border:none; overflow:hidden; background-color:" + MW.Color + ";";
    document.write("<div id=\"MW_Toolbox\" style=\"" + MW.Toolbox_Style_Down + "\" title=\"双击切换模式\" onDblClick=\"MW.Change_Toolbox()\" onMouseDown=\"MW.Toolbox_Down()\" onMouseMove=\"MW.Toolbox_Move()\" onMouseUp=\"MW.Toolbox_Up()\">" + MW.Button() + "</div>");
  }

  MW.PopUpMenu = function() {
    document.write("<div id=\"MW_PopUpMenu\" style=\"display:none;\"></div>");
  }

  MW.Editor = function() {
    MW.Edit_Style_BBS_Big = "top:" + (MW.Y + 3) + "px; left:" + (MW.X + 3) + "px; z-index:98; position:absolute; width:" + (MW.Width - 6) + "px; height:" + (MW.Height - 6) + "px; overflow:auto;";
    MW.Edit_Style_BBS_Little = "top:" + (MW.Y + MW.ToolboxHeight + 3) + "px; left:" + (MW.X + 3) + "px; z-index:98; position:absolute; width:" + (MW.Width - 6) + "px; height:" + (MW.Height - MW.ToolboxHeight - 6) + "px; overflow:auto;";
    MW.Edit_Style_NOBBS_Big = "top:" + (MW.Y + 3) + "px; left:" + (MW.X + 3) + "px; z-index:98; position:absolute; width:" + (MW.Width - 6) + "px; height:" + (MW.Height - 33) + "px; overflow:auto;";
    MW.Edit_Style_NOBBS_Little = "top:" + (MW.Y + MW.ToolboxHeight + 3) + "px; left:" + (MW.X + 3) + "px; z-index:98; position:absolute; width:" + (MW.Width - 6) + "px; height:" + (MW.Height - MW.ToolboxHeight - 33) + "px; overflow:auto;";
    MW.Code_Style_NOBBS_Big = "top:" + (MW.Y + 4) + "px; left:" + (MW.X + 4) + "px; z-index:98; position:absolute; width:" + (MW.Width - 14) + "px; height:" + (MW.Height - 41) + "px; overflow:auto;";
    MW.Code_Style_NOBBS_Little = "top:" + (MW.Y + MW.ToolboxHeight + 4) + "px; left:" + (MW.X + 4) + "px; z-index:98; position:absolute; width:" + (MW.Width - 14) + "px; height:" + (MW.Height - MW.ToolboxHeight - 41) + "px; overflow:auto;";
    if (MW.Type == "BBS") {
      document.write("<iframe id=\"MW_Edit\" src=\"about:blank\" style=\"" + MW.Edit_Style_BBS_Little + "\"></iframe>");
    } else {
      document.write("<iframe id=\"MW_Edit\" src=\"about:blank\" style=\"" + MW.Edit_Style_NOBBS_Little + "\"></iframe>");
      document.write("<textarea id=\"MW_Code\" wrap=\"OFF\" style=\"display:none;\"></textarea>");
    }
  }

  MW.Border = function() {
    MW.Border_Style_BBS = "top:" + MW.Y + "px; left:" + MW.X + "px; z-index:97; position:absolute; width:" + (MW.Width - 4) + "px; height:" + (MW.Height - 4) + "px; border:" + MW.Color + " 2px solid; overflow:hidden;";
    MW.Border_Style_NOBBS_T = "top:" + MW.Y + "px; left:" + MW.X + "px; z-index:97; position:absolute; width:" + (MW.Width - 4) + "px; height:" + (MW.Height - 31) + "px; border-top:" + MW.Color + " 2px solid; border-left:" + MW.Color + " 2px solid; border-bottom:none; border-right:" + MW.Color + " 2px solid; overflow:hidden;";
    MW.Border_Style_NOBBS_BL = "top:" + (MW.Y + MW.Height - 29) + "px; left:" + MW.X + "px; z-index:97; position:absolute; width:20px; height:27px; border-top:" + MW.Color + " 2px solid; border-left:none; border-bottom:none; border-right:none; overflow:hidden;";
    MW.Border_Style_NOBBS_BR = "top:" + (MW.Y + MW.Height - 29) + "px; left:" + (MW.X + 208) + "px; z-index:97; position:absolute; width:" + (MW.Width - 208) + "px; height:27px; border-top:" + MW.Color + " 2px solid; border-left:none; border-bottom:none; border-right:none; overflow:hidden;";
    MW.Border_Style_NOBBS_BU = "top:" + (MW.Y + MW.Height - 29) + "px; z-index:97; position:absolute; width:90px; height:25px; border:" + MW.Color + " 2px solid; overflow:hidden;";
    MW.Border_Style_NOBBS_BD = "top:" + (MW.Y + MW.Height - 29) + "px; z-index:97; position:absolute; width:90px; height:27px; border-top:none; border-left:" + MW.Color + " 2px solid; border-bottom:" + MW.Color + " 2px solid; border-right:" + MW.Color + " 2px solid; overflow:hidden;";
    if (MW.Type == "BBS") {
      document.write("<div style=\"" + MW.Border_Style_BBS + "\"></div>");
    } else {
      document.write("<div style=\"" + MW.Border_Style_NOBBS_T + "\"></div>");
      document.write("<div style=\"" + MW.Border_Style_NOBBS_BL + "\"></div>");
      document.write("<div style=\"" + MW.Border_Style_NOBBS_BR + "\"></div>");
      document.write("<div id=\"MW_Border_NOBBS_B0\" style=\"" + MW.Border_Style_NOBBS_BD + " left:" + (MW.X + 20) + "px;\"><img src=\"" + MW.Image + "Edit.gif\" width=\"90\" height=\"25\" border=\"0\" title=\"设计视图\" style=\"cursor:pointer;\" onClick=\"MW.Change_Editor(\'Edit\')\"></div>");
      document.write("<div id=\"MW_Border_NOBBS_B1\" style=\"" + MW.Border_Style_NOBBS_BU + " left:" + (MW.X + 114) + "px;\"><img src=\"" + MW.Image + "Code.gif\" width=\"90\" height=\"25\" border=\"0\" title=\"代码视图\" style=\"cursor:pointer;\" onClick=\"MW.Change_Editor(\'Code\')\"></div>");
    }
  }

  MW.Button = function() {
    MW.Toolbar_Style = "float:left; height:26px; overflow:hidden; background-image:url(" + MW.Image + "Toolbar_Background.gif); cursor:default;";
    MW.Button_Style_Over = "width:20px; height:20px; margin:2px; border:" + MW.BackgroundColor + " 1px solid; background-image:url(" + MW.Image + "Button_Over.gif);";
    MW.Button_Style_Down = "width:20px; height:20px; margin:2px; border:" + MW.BackgroundColor + " 1px solid; background-image:url(" + MW.Image + "Button_Down.gif);";
    MW.Button_Style_Out = "width:20px; height:20px; margin:3px; border:0px;";
    MW.Button_Style_Lock = "width:20px; height:20px; margin:3px; border:0px; filter:alpha(opacity=40);";
    MW.Separator_Style = "width:4px; height:20px; margin-top:3px; margin-left:0px; margin-bottom:3px; margin-right:0px; border:none;";
    var Button = [];
    var Width, Node = [0, 0];
    var ICO = ["Blank.gif", "SaveAS.gif", "Cut.gif", "Copy.gif", "Paste.gif", "Delete.gif", "RemoveFormat.gif", "Undo.gif", "Redo.gif", "Preview.gif", "Print.gif", "Bold.gif", "Italic.gif", "Underline.gif", "StrikeThrough.gif", "SuperScript.gif", "SubScript.gif", "Font.gif", "FontSize.gif", "Color.gif", "JustifyLeft.gif", "JustifyCenter.gif", "JustifyRight.gif", "JustifyFull.gif", "Outdent.gif", "Indent.gif", "InsertOrderedList.gif", "InsertUnorderedList.gif", "CreateLink.gif", "Unlink.gif", "InsertFieldset.gif", "InsertImage.gif", "InsertTable.gif", "InsertHorizontalRule.gif", "Face.gif", "SpecialChar.gif", "DateTime.gif"];
    var TXT = ["新建", "保存", "剪切", "复制", "粘贴", "删除", "擦除格式", "撤消", "重复", "预览", "打印", "加粗", "倾斜", "下划线", "删除线", "上标", "下标", "字体", "字号", "颜色", "左对齐", "居中", "右对齐", "两端对齐", "向前缩进", "向后缩进", "有序列表", "无序列表", "插入超链接", "删除超链接", "插入矩形", "插入图片", "插入表格", "插入水平线", "表情", "特殊字符", "日期/时间"];
    var CMD = ["MW.Blank()", "MW.Action(\'SaveAS\')", "MW.Exec(\'Cut\')", "MW.Exec(\'Copy\')", "MW.Exec(\'Paste\')", "MW.Exec(\'Delete\')", "MW.Exec(\'RemoveFormat\')", "MW.Exec(\'Undo\')", "MW.Exec(\'Redo\')", "MW.Preview()", "MW.Action(\'Print\')", "MW.Exec(\'Bold\')", "MW.Exec(\'Italic\')", "MW.Exec(\'Underline\')", "MW.Exec(\'StrikeThrough\')", "MW.Exec(\'SuperScript\')", "MW.Exec(\'SubScript\')", "MW.PopUpMenuOpen(\'Font\')", "MW.PopUpMenuOpen(\'FontSize\')", "MW.PopUpMenuOpen(\'Color\')", "MW.Exec(\'JustifyLeft\')", "MW.Exec(\'JustifyCenter\')", "MW.Exec(\'JustifyRight\')", "MW.Exec(\'JustifyFull\')", "MW.Exec(\'Outdent\')", "MW.Exec(\'Indent\')", "MW.Exec(\'InsertOrderedList\')", "MW.Exec(\'InsertUnorderedList\')", "MW.PopUpMenuOpen(\'CreateLink\')", "MW.Exec(\'Unlink\')", "MW.Exec(\'InsertFieldset\')", "MW.PopUpMenuOpen(\'InsertImage\')", "MW.PopUpMenuOpen(\'InsertTable\')", "MW.Exec(\'InsertHorizontalRule\')", "MW.PopUpMenuOpen(\'Face\')", "MW.PopUpMenuOpen(\'SpecialChar\')", "MW.Insert(Date())"];
    for (i = 0; i < MW.ToolbarType.length; i++) {
      switch (MW.ToolbarType[i]) {
        case "Often" : Width = 319; Node[0] = 0; Node[1] = 11; break;
        case "Format" : Width = 263; Node[0] = 11; Node[1] = 20; break;
        case "Paragraph" : Width = 237; Node[0] = 20; Node[1] = 28; break;
        case "Media" : if (MW.Type == "ALL") {Width = 267}; if (MW.Type == "PRO") {Width = 241}; if (MW.Type == "BBS") {Width = 185}; Node[0] = 28; Node[1] = 37; break;
      }
      Button.push("<div id=\"MW_Toolbar_" + MW.ToolbarType[i] + "\" style=\"Width:" + Width + "px; " + MW.Toolbar_Style + "\"><img src=\"" + MW.Image + "Toolbar_Rim_Left.gif\" width=\"10\" height=\"26\" border=\"0\">");
      for (j = Node[0]; j < Node[1]; j++) {
        if (MW.Type == "PRO" && /^34$/.test(j)) {continue;}
        if (MW.Type == "BBS" && /^28$|^29$|^31$/.test(j)) {continue;}
        Button.push("<img style=\"" + MW.Button_Style_Out + "\" src=\"" + MW.Image + ICO[j] + "\" title=\"" + TXT[j] + "\" onClick=\"" + CMD[j] + "\" onMouseOver=\"javascript:this.style.cssText=\'" + MW.Button_Style_Over + "\'; MW.Lock[0] = true; MW.Lock[1] = true;\" onMouseDown=\"javascript:this.style.cssText=\'" + MW.Button_Style_Down + "\';\" onMouseOut=\"javascript:this.style.cssText=\'" + MW.Button_Style_Out + "\'; MW.Lock[0] = false; MW.Lock[1] = false;\">");
        if (/^1$|^6$|^16$|^23$|^29$|^33$/.test(j)) {Button.push("<img style=\"" + MW.Separator_Style + "\" src=\"" + MW.Image + "Separator.gif\">");}
      }
      Button.push("<img src=\"" + MW.Image + "Toolbar_Rim_Right.gif\" width=\"15\" height=\"26\" border=\"0\"></div>");
    }
    return Button.join('');
  }

  MW.Font = function() {
    var Button_Style_Over = "width:120px; height:25px; border:0px; padding-left:8px; padding-right:none; padding-top:none; padding-bottom:none; background-color:" + MW.BackgroundColor + "; text-align:left; color:#FFFFFF; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none;";
    var Button_Style_Out = "width:120px; height:25px; border:0px; padding-left:8px; padding-right:none; padding-top:none; padding-bottom:none; background-color:#FFFFFF; text-align:left; color:" + MW.BackgroundColor + "; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none;";
    var Font = [];
    var TTF = ["宋体", "黑体", "楷体_GB2312", "幼圆", "Arial", "Arial Black", "Times New Roman", "Verdana"];
    Font.push("<div style=\"width:120px;\">");
    for (i = 0; i < TTF.length; i++) {
      Font.push("<button style=\"" + Button_Style_Out + "\" onClick=\"MW.Exec(\'FontName\', \'\', \'" + TTF[i] + "\')\" onMouseOver=\"javascript:this.style.cssText=\'" + Button_Style_Over + "\'; MW.Lock[0]=true;\" onMouseOut=\"javascript:this.style.cssText=\'" + Button_Style_Out + "\'; MW.Lock[0]=false;\"><font face=\"" + TTF[i] + "\">" + TTF[i] + "</font></button>");
    }
    Font.push("</div>");
    return Font.join('');
  }

  MW.FontSize = function() {
    var Button_Style_Over = "width:120px; border:0px; padding-left:8px; padding-right:none; padding-top:none; padding-bottom:none; background-color:" + MW.BackgroundColor + "; text-align:left; color:#FFFFFF; font-family:Arial; font-weight:normal; font-style:normal; text-decoration:none;";
    var Button_Style_Out = "width:120px; border:0px; padding-left:8px; padding-right:none; padding-top:none; padding-bottom:none; background-color:#FFFFFF; text-align:left; color:" + MW.BackgroundColor + "; font-family:Arial; font-weight:normal; font-style:normal; text-decoration:none;";
    var FontSize = [];
    var Size = ["初号", "一号", "二号", "三号", "四号", "五号", "六号"];
    FontSize.push("<div style=\"width:120px;\">");
    for (i = 0; i < Size.length; i++) {
      FontSize.push("<button style=\"" + Button_Style_Out + "\" onClick=\"MW.Exec(\'FontSize\', \'\', \'" + (7 - i) + "\')\" onMouseOver=\"javascript:this.style.cssText=\'" + Button_Style_Over + "\'; MW.Lock[0]=true;\" onMouseOut=\"javascript:this.style.cssText=\'" + Button_Style_Out + "\'; MW.Lock[0]=false;\"><font size=\"" + (7 - i) + "\">" + Size[i] + "</font></button>");
    }
    FontSize.push("</div>");
    return FontSize.join('');
  }

  MW.Palette = function() {
    var Palette = [];
    var Color = "";
    var Code = ["00", "33", "66", "99", "CC", "FF"];
    Palette.push("<div style=\"width:234px; height:186px; background-color:#000000;\"><div style=\"width:224; height:20px; padding:5px; background-color:#ECE9D8;\">\
                  <div id=\"MW_Palette_Color\" style=\"float:left; width:50px; height:20px; margin-right:4px; border-top:#D5CEA8 1px solid; border-left:#D5CEA8 1px solid; border-bottom:#ffffff 1px solid; border-right:#ffffff 1px solid; background-color:#ECE9D8;\"></div>\
                  <div style=\"float:left; width:75px; height:20px; border-top:#D5CEA8 1px solid; border-left:#D5CEA8 1px solid; border-bottom:#ffffff 1px solid; border-right:#ffffff 1px solid; background-color:#FFFFFF;\"><span id=\"MW_Palette_Code\" style=\"color:#000000; font-family:Arial; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none; vertical-align:middle;\"></span></div>\
                  </div><div style=\"float:left; width:78px; height:78px; background-color:#000000;\">");
    for (i = 0; i < 6; i++) {
      for (j = 0; j < 6; j++) {
        for (k = 0; k < 6; k++) {
          if (i > 1 && j == 0 && k == 0) {Palette.push("</div><div style=\"float:left; width:78px; height:78px; background-color:#000000;\">");}
          Color = "#" + Code[i] + Code[k] + Code[j];
          Palette.push("<button style=\"width:12px; height:12px; margin-top:1px; margin-left:1px; margin-bottom:0px; margin-right:0px; border:none; background-color:" + Color + ";\" onClick=\"MW.Exec(\'ForeColor\', \'\', \'" + Color + "\')\" onMouseOver=\"javascript:MW.$(1, \'MW_Palette_Color\').style.backgroundColor=\'" + Color + "\'; MW.$(1, \'MW_Palette_Code\').innerHTML=\'" + Color + "\'; MW.Lock[0]=true;\" onMouseOut=\"javascript:MW.Lock[0]=false;\"></button>");
        }
      }
    }
    Palette.push("</div></div>");
    return Palette.join('');
  }

  MW.CreateLink = function() {
    var CreateLink = "<div style=\"width:350px; padding:10px; background-color:#FFFFFF;\" onMouseOver=\"javascript:MW.Lock[0]=false;\">\
                        <select id=\"MW_CreateLink_AGR\" onClick=\"javascript:MW.Lock[0]=true;\">\
                          <option value=\"#\">#</option>\
                          <option value=\"file://\">file://</option>\
                          <option value=\"ftp://\">ftp://</option>\
                          <option value=\"gopher://\">gopher://</option>\
                          <option value=\"http://\" selected>http://</option>\
                          <option value=\"https://\">https://</option>\
                          <option value=\"mailto:\">mailto:</option>\
                          <option value=\"news:\">news:</option>\
                          <option value=\"telnet://\">telnet://</option>\
                          <option value=\"wais://\">wais://</option>\
                        </select>\
                        <input id=\"MW_CreateLink_URL\" type=\"text\" style=\"width:190px;\" onClick=\"javascript:MW.Lock[0]=true;\">\
                        <input type=\"button\" style=\"width:48px;\" value=\"确定\" onClick=\"MW.Insert(\'<a href=\' + MW.$(1, \'MW_CreateLink_AGR\').value + MW.$(1, \'MW_CreateLink_URL\').value + \'>\' + MW.$(1, \'MW_CreateLink_AGR\').value + MW.$(1, \'MW_CreateLink_URL\').value + \'</a>\')\">\
                      </div>";
    return CreateLink;
  }

  MW.InsertImage = function() {
    InsertImage = "<div style=\"width:350px; padding:10px; background-color:#FFFFFF;\" onMouseOver=\"javascript:MW.Lock[0]=false;\">\
                     <span style=\"color:#000000; font-family:Arial; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none; vertical-align:middle;\">Source:</span>\
                     <input id=\"MW_InsertImage_Source\" type=\"text\" style=\"width:235px;\" onClick=\"javascript:MW.Lock[0]=true;\">\
                     <input type=\"button\" style=\"width:48px;\" value=\"确定\" onClick=\"MW.Exec(\'InsertImage\', \'\', MW.$(1, \'MW_InsertImage_Source\').value)\">\
                   </div>";
    return InsertImage;
  }

  MW.InsertTable = function(C, Y, X) {
    var Button_Style_Over = "width:20px; height:20px; margin:1px; border:" + MW.BackgroundColor + " 1px solid; background-color:" + MW.BackgroundColor + ";";
    var Button_Style_Out = "width:20px; height:20px; margin:1px; border:" + MW.BackgroundColor + " 1px solid; background-color:#FFFFFF;";
    if (C == 0) {
      InsertTable = [];
      InsertTable.push("<div style=\"width:110px; height:110px; background-color:#FFFFFF; text-align:center;\">");
      for (i = 0; i < 4; i++) {
        for (j = 0; j < 5; j ++) {
          InsertTable.push("<button id=\"MW_InsertTable_" + i + "_" + j + "\" style=\"" + Button_Style_Out + "\" onClick=\"MW.InsertTable(2, " + i + ", " + j + ")\" onMouseOver=\"javascript:MW.InsertTable(1, " + i + ", " + j + "); MW.Lock[0]=true;\" onMouseOut=\"javascript:MW.Lock[0]=false;\"></button>");
        }
      }
      InsertTable.push("<br><span id=\"MW_InsertTable_TXT\" style=\"color:" + MW.BackgroundColor + "; font-family:Arial; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none; line-height:22px;\">0&nbsp;×&nbsp;0</span></div>");
      return InsertTable.join('');
    }
    if (C == 1) {
      for (i = 0; i < 4; i++) {
        for (j = 0; j < 5; j ++) {
          if (i <= Y && j <= X) {
            MW.$(1, "MW_InsertTable_" + i + "_" + j).style.cssText = Button_Style_Over;
          } else {
            MW.$(1, "MW_InsertTable_" + i + "_" + j).style.cssText = Button_Style_Out;
          }
        }
      }
      MW.$(1, "MW_InsertTable_TXT").innerHTML = (Y + 1) + "&nbsp;×&nbsp;" + (X + 1);
    }
    if (C == 2) {
      var Table = [];
      Table.push("<table width=\"100%\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
      for (i = 0; i < Y + 1; i++) {
        Table.push("<tr>");
        for (j = 0; j < X + 1; j ++) {Table.push("<td>&nbsp;</td>");}
        Table.push("</tr>");
      }
      Table.push("</tbody></table>");
      MW.Insert(Table.join(''));
    }
  }

  MW.InsertFace = function() {
    var Button_Style_Over = "float:left; width:28px; height:28px; margin:0px; border:" + MW.BackgroundColor + " 1px solid; background-color:#FFFFFF;";
    var Button_Style_Out = "float:left; width:28px; height:28px; margin:1px; border:none; background-color:#FFFFFF;";
    var Face = [];
    Face.push("<div style=\"width:256px; height:180px; padding:1px; overflow:auto; background-color:#FFFFFF;\">");
    if (MW.Face.length > 0) {
      for (i = 0; i < MW.Face.length; i++) {
        Face.push("<img src=\"" + MW.Face[i] + "\" style=\"" + Button_Style_Out + "\" onClick=\"MW.Exec(\'InsertImage\', \'\', \'" + MW.Face[i] + "\')\" onMouseOver=\"javascript:this.style.cssText=\'" + Button_Style_Over + "\'; MW.Lock[0]=true;\" onMouseOut=\"javascript:this.style.cssText=\'" + Button_Style_Out + "\'; MW.Lock[0]=false;\">");
      }
    } else {
      Face.push("<img src=\"#\" alt=\"暂无表情\" style=\"width:256px; height:180px;\">");
    }
    Face.push("</div>");
    return Face.join('');
  }

  MW.SpecialChar = function() {
    var Button_Style_Over = "float:left; width:16px; height:16px; border:0px; background-color:" + MW.BackgroundColor + "; color:#ffffff; font-family:Arial; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none;";
    var Button_Style_Out = "float:left; width:16px; height:16px; border:0px; background-color:#ffffff; color:" + MW.BackgroundColor + "; font-family:Arial; font-size:10pt; font-weight:normal; font-style:normal; text-decoration:none;";
    var SpecialChar = [];
    var Char = ["　", "、", "。", "·", "ˉ", "ˇ", "¨", "〃", "々", "—", "～", "‖", "…", "‘", "’", "“", "”", "〔", "〕", "〈", "〉", "《", "》", "「", "」", "『", "』", "〖", "〗", "【", "】", "±", "×", "÷", "∶", "∧", "∨", "∑", "∏", "∪", "∩", "∈", "∷", "√", "⊥", "∥", "∠", "⌒", "⊙", "∫", "∮", "≡", "≌", "≈", "∽", "∝", "≠", "≮", "≯", "≤", "≥", "∞", "∵", "∴", "♂", "♀", "°", "′", "″", "℃", "＄", "¤", "￠", "￡", "‰", "§", "№", "☆", "★", "○", "●", "◎", "◇", "◆", "□", "■", "△", "▲", "※", "→", "←", "↑", "↓", "〓"];
    SpecialChar.push("<div style=\"width:176px; background-color:#FFFFFF;\">");
    for (i = 0; i < Char.length; i++) {
      SpecialChar.push("<button style=\"" + Button_Style_Out + "\" onClick=\"MW.Insert(\'" + Char[i] + "\')\" onMouseOver=\"javascript:this.style.cssText=\'" + Button_Style_Over + "\'; MW.Lock[0]=true;\" onMouseOut=\"javascript:this.style.cssText=\'" + Button_Style_Out + "\'; MW.Lock[0]=false;\">" + Char[i] + "</button>");
    }
    SpecialChar.push("</div>");
    return SpecialChar.join('');
  }

  MW.Change_Toolbox = function() {
    if (!MW.Lock[1]) {
      var Command = MW.Mode[0];
      if (Command != "Up") {
        MW.$(1, "MW_Toolbox").style.cssText = MW.Toolbox_Style_Up;
        if (MW.Type == "BBS" && MW.Mode[1] == "Edit") {MW.$(1, "MW_Edit").style.cssText = MW.Edit_Style_BBS_Big;}
        if (MW.Type != "BBS" && MW.Mode[1] == "Edit") {MW.$(1, "MW_Edit").style.cssText = MW.Edit_Style_NOBBS_Big;}
        if (MW.Type != "BBS" && MW.Mode[1] == "Code") {MW.$(1, "MW_Code").style.cssText = MW.Code_Style_NOBBS_Big;}
        MW.Mode[0] = "Up";
      }
      if (Command != "Down") {
        MW.$(1, "MW_Toolbox").style.cssText = MW.Toolbox_Style_Down;
        if (MW.Type == "BBS" && MW.Mode[1] == "Edit") {MW.$(1, "MW_Edit").style.cssText = MW.Edit_Style_BBS_Little;}
        if (MW.Type != "BBS" && MW.Mode[1] == "Edit") {MW.$(1, "MW_Edit").style.cssText = MW.Edit_Style_NOBBS_Little;}
        if (MW.Type != "BBS" && MW.Mode[1] == "Code") {MW.$(1, "MW_Code").style.cssText = MW.Code_Style_NOBBS_Little;}
        MW.Mode[0] = "Down";
      }
    }
  }

  MW.Change_Editor = function(Command) {
    if (Command == "Edit" && MW.Mode[1] != "Edit") {
      if (MW.Mode[0] == "Up") {MW.$(1, "MW_Edit").style.cssText = MW.Edit_Style_NOBBS_Big;}
      if (MW.Mode[0] == "Down") {MW.$(1, "MW_Edit").style.cssText = MW.Edit_Style_NOBBS_Little;}
      MW.$(1, "MW_Code").style.display = "none";
      MW.$(1, "MW_Border_NOBBS_B0").style.cssText = MW.Border_Style_NOBBS_BD + "left:" + (MW.X + 20) + "px;";
      MW.$(1, "MW_Border_NOBBS_B1").style.cssText = MW.Border_Style_NOBBS_BU + "left:" + (MW.X + 114) + "px;";
      MW.$(0, "MW_Edit").document.body.innerHTML = MW.$(1, "MW_Code").value;
      MW.Change_Button("Unlock");
      MW.Mode[1] = "Edit";
    }
    if (Command == "Code" && MW.Mode[1] != "Code") {
      if (MW.Mode[0] == "Up") {MW.$(1, "MW_Code").style.cssText = MW.Code_Style_NOBBS_Big;}
      if (MW.Mode[0] == "Down") {MW.$(1, "MW_Code").style.cssText = MW.Code_Style_NOBBS_Little;}
      MW.$(1, "MW_Edit").style.display = "none";
      MW.$(1, "MW_Border_NOBBS_B0").style.cssText = MW.Border_Style_NOBBS_BU + "left:" + (MW.X + 20) + "px;";
      MW.$(1, "MW_Border_NOBBS_B1").style.cssText = MW.Border_Style_NOBBS_BD + "left:" + (MW.X + 114) + "px;";
      MW.$(1, "MW_Code").value = MW.$(0, "MW_Edit").document.body.innerHTML;
      MW.Change_Button("Lock");
      MW.Mode[1] = "Code";
    }
  }

  MW.Change_Button = function(Command) {
    for (i = 0; i < MW.ToolbarType.length; i++) {
      var Toolbar = MW.$(1, "MW_Toolbar_" + MW.ToolbarType[i]);
      var Button = Toolbar.getElementsByTagName("img");
      for(j = 0; j < Button.length; j++) {
        if (MW.ToolbarType[i] == "Often" && /^0$|^1$|^2$|^3$|^9$|^12$|^13$|^14$/.test(j)) {continue;}
        if (MW.ToolbarType[i] == "Format" && /^0$|^7$|^11$/.test(j)) {continue;}
        if (MW.ToolbarType[i] == "Paragraph" && /^0$|^5$|^10$/.test(j)) {continue;}
        if (MW.ToolbarType[i] == "Media" && MW.Type == "ALL" && /^0$|^3$|^8$|^12$/.test(j)) {continue;}
        if (MW.ToolbarType[i] == "Media" && MW.Type == "PRO" && /^0$|^3$|^8$|^11$/.test(j)) {continue;}
        if (Command == "Unlock") {Button[j].style.cssText = MW.Button_Style_Out; Button[j].onmouseover = function() {this.style.cssText = MW.Button_Style_Over; MW.Lock[0] = true; MW.Lock[1] = true}; Button[j].onmousedown = function() {this.style.cssText = MW.Button_Style_Down}; Button[j].onmouseout = function() {this.style.cssText = MW.Button_Style_Out; MW.Lock[0] = false; MW.Lock[1] = false};}
        if (Command == "Lock") {Button[j].style.cssText = MW.Button_Style_Lock; Button[j].onmouseover = ""; Button[j].onmousedown = ""; Button[j].onmouseout = "";}
      }
    }
  }

  MW.Toolbox_Down = function() {
    if (MW.Mode[0] == "Up") {
      MW.Lock[2] = false;
      MW.$(1, "MW_Toolbox").setCapture();
    }
  }

  MW.Toolbox_Move = function() {
    if (!MW.Lock[2]) {
      MW.PopUpMenuClose(true);
      MW.$(1, "MW_Toolbox").style.top = parseInt(MW.$(1, "MW_Toolbox").style.top) - MW.Toolbox_Y + event.clientY;
      MW.$(1, "MW_Toolbox").style.left = parseInt(MW.$(1, "MW_Toolbox").style.left) - MW.Toolbox_X + event.clientX;
    }
    MW.Toolbox_Y = event.clientY;
    MW.Toolbox_X = event.clientX;
  }

  MW.Toolbox_Up = function() {
    if (MW.Mode[0] == "Up") {
      MW.$(1, "MW_Toolbox").releaseCapture();
      MW.Lock[2] = true;
    }
  }

  MW.PopUpMenuOpen = function(Command) {
    if (MW.Mode[1] == "Edit") {
      var PopUpMenu;
      switch (Command) {
        case "Font" : PopUpMenu = MW.Font(); break;
        case "FontSize" : PopUpMenu = MW.FontSize(); break;
        case "Color" : PopUpMenu = MW.Palette(); break;
        case "CreateLink" : PopUpMenu = MW.CreateLink(); break;
        case "InsertImage" : PopUpMenu = MW.InsertImage(); break;
        case "InsertTable" : PopUpMenu = MW.InsertTable(0); break;
        case "Face" : PopUpMenu = MW.InsertFace(); break;
        case "SpecialChar" : PopUpMenu = MW.SpecialChar(); break;
        default : return;
      }
      MW.$(1, "MW_PopUpMenu").innerHTML = PopUpMenu;
      MW.$(1, "MW_PopUpMenu").style.cssText = "top:" + (event.clientY - event.offsetY + MW.PopUpMenuRelative[1]) + "px; left:" + (event.clientX - event.offsetX - MW.PopUpMenuRelative[0]) + "px; z-index:100; position:absolute; border:" + MW.BackgroundColor + " 1px solid;";
    }
  }

  MW.PopUpMenuClose = function(Command) {
    if (!MW.Lock[0] || Command) {
      MW.$(1, "MW_PopUpMenu").style.display = "none";
      MW.$(1, "MW_PopUpMenu").innerHTML = "";
    }
  }

  MW.Action = function(Command) {
    MW.Change_Editor("Edit");
    MW.Exec(Command);
  }

  MW.Exec = function(Command, Config, Value) {
    if (MW.Mode[1] == "Edit") {
      MW.PopUpMenuClose(true);
      MW.$(0, "MW_Edit").focus();
      MW.$(0, "MW_Edit").document.execCommand(Command, Config, Value);
    }
  }

  MW.Insert = function(Code) {
    if (MW.Mode[1] == "Edit") {
      MW.PopUpMenuClose(true);
      MW.$(0, "MW_Edit").focus();
      MW.$(0, "MW_Edit").document.selection.createRange().pasteHTML(Code);
    }
  }

  MW.Blank = function() {
    MW.PopUpMenuClose(true);
    var Q = confirm("您可能会丢失未保存的文档，确定继续操作？");
    if (Q == true) {MW.Change_Editor("Edit"); MW.$(1, "MW_Edit").src = "about:blank";}
  }

  MW.Preview = function() {
    MW.PopUpMenuClose(true);
    var Window = window.open();
    Window.document.write(MW.Recode());
    Window.document.close();
  }