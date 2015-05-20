<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm4.aspx.cs" Inherits="webtestcollection.WebForm4" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="Scripts/jquery-1.7.1.min.js"></script>
    <title></title>
</head>
<body>
    <div id="DivLocker"></div>
    <form id="form1" runat="server">
        <div>
            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox><asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
            <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
            <asp:GridView ID="GridView1" runat="server"></asp:GridView>
            <asp:Image ID="Image1" runat="server" />
        </div>
    </form>
    <script language="text/javascript">
      $('#DivLocker').css({
        "position": "absolute",
        "margin-left": "1px",
        "margin-top": "1px",
        "background-color": "#000000",
        "height": function () { return $(document).height(); },
        "filter": "alpha(opacity=30)",
        "opacity": "0.3",
        "overflow": "hidden",
        "width": function () { return $(document).width(); },
        "z-index": "999"
    });
    </script>
</body>
</html>
