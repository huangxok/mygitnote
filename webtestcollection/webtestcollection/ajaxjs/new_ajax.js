function ajax(url, fnsucc, fuFaild) {
    //1.����Ajax����
    if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
    }
    else {
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.���ӷ�����
    //open���������ļ������첽���䣩
    oAjax.open("GET", url, true);
    //3.��������
    oAjax.send(null);//data {'username':'age'}

    //4.���շ���
    oAjax.onreadystatechange = function () {
        //alert(oAjax.readyState)
        //oAjax.readystate  //������ͷ����������е���һ����
        if (oAjax.readyState == 4)  //��ȡ���
        {
            if (oAjax.status == 200)	//�ɹ�
            {
                //alert("�ɹ�")
                fnsucc(oAjax.responseText);
                ;
            }
            else {
                if (fuFaild) {
                    //alert("ʧ��")

                    fuFaild(oAjax.status);

                }
                //alert("ʧ��:"+);
            }

        }


    };

}