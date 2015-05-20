<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication3.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script>
        var d = document.getElementById("ddd");
        d.getBoundingClientRect
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="ddd">
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" Height="373px" Width="739px">
                <Columns>
                    <asp:BoundField DataField="Id" HeaderText="ID" />
                    <asp:BoundField DataField="goodsname" HeaderText="商品名称" />
                    <asp:BoundField DataField="goodsnum" HeaderText="商品编号" />
                    <asp:BoundField DataField="goodsdecription" HeaderText="商品描述" />
                    <asp:BoundField HeaderText="商家地址" DataField="goodsPId" />
                </Columns>
            </asp:GridView>
        </div>
    </form>
</body>
</html>
