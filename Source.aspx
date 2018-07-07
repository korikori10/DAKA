<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Source.aspx.cs" Inherits="Application_Source" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:Button runat="server" ID="btn" Text="start global Timer" onclick="btn_Start"/><br /><br />
        <asp:Button runat="server" ID="Button2" Text="end global Timer" onclick="btn_End"/><br />
        <asp:Label runat="server" Text="Label" ID="interval"></asp:Label>
    </form>
</body>
</html>
