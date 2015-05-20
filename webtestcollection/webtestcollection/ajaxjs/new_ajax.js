function ajax(url, fnsucc, fuFaild) {
    //1.创建Ajax对象
    if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
    }
    else {
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.连接服务器
    //open（方法，文件名，异步传输）
    oAjax.open("GET", url, true);
    //3.发送请求
    oAjax.send(null);//data {'username':'age'}

    //4.接收返回
    oAjax.onreadystatechange = function () {
        //alert(oAjax.readyState)
        //oAjax.readystate  //浏览器和服务器，进行到哪一步了
        if (oAjax.readyState == 4)  //读取完成
        {
            if (oAjax.status == 200)	//成功
            {
                //alert("成功")
                fnsucc(oAjax.responseText);
                ;
            }
            else {
                if (fuFaild) {
                    //alert("失败")

                    fuFaild(oAjax.status);

                }
                //alert("失败:"+);
            }

        }


    };

}