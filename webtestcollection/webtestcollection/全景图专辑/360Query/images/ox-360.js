(function () {
    var G = KISSY, Q = G.DOM, U = G.Event;
    var B = 0;      //0
    var J = B;      //J backgroundPosition��x���� 
    var O = 0;
    var T = "";     //T�ƶ�����
    var I = 0;      //I backpos��y����
    var L = false;  //�жϰ�ťJ_Left ��J_Right   mousedown ��touchstart�Ƿ���
    var R = false;  //�ж�backgroundPosition��x����ʱ��С��5
    var K = false;  //�ж�     div J_View360     mousedown ��touchstart�Ƿ���
    var E = 0;
    var F = 0;
    var P = 0;
    var N = [0, 0, 0, 0];
    var M = { 2: "images/banner01.jpg", 3: "images/banner02.jpg", 4: "images/banner03.jpg", 5: "images/banner04.jpg", 1: "images/banner05.jpg" };
    var A = 1;
    var H = function () {
        Q.css("#J_View360", "backgroundPosition", J + "px " + I + "px")//�ƶ�����
    };
    Q.css("#J_View360", "backgroundImage", "url(" + M[1] + ")");
    var D = function (W) {  //����a��ǩ  �������
        var V = Q.width(W); //a��ǩ�Ŀ��
        var X = Q.offset(W).left - Q.offset(W.parentNode).left;
        G.Anim(".views-block", { left: X + 11 + "px", width: V + "px" }, 0.3, G.Easing.easeNone).run();//���õ�ǰa��ǩ��λ�úͿ��
        var S = W.className.substr(W.className.length - 1, 1);         //��ȡ��ǩclass�е�����
        Q.css("#J_View360", "backgroundImage", "url(" + M[S] + ")");   //���ö�Ӧ��div����
        /*����Ĭ��ֵ*/{
            O = -10;
            J = B + 50;
            R = true
        }
    };
    var C = Q.query("a", Q.get(".views-trigger")); //��ȡa��ǩ����

    D(C[A]);    //����D���� Ĭ�����õڶ���a��ǩ A=1 ������0��ʼ

    U.on(C, "click", function (S) { //��a��ǩ��click�¼�
        D(this)
    });
    U.on(C, "tap", function (S) { //��a��ǩ��click�¼�
        D(this)
    });
    /*����Ĭ��ֵ����J_view360��ԭʼ״̬*/{
        O = -10;
        J = B + 50;
        R = true;
    }
    H();
    setInterval(function () {
        if (R) {  //����J_view360��ֵ
            if (Math.abs(J - B) < 5) {
                R = false;
                return
            }
            O = (B - J) * 0.0485;
            J += O;
            H();
            return
        }
        if (K) {
            P = F - E;
            N.push(P);
            N.shift();
            P = 0;
            for (var S = 0; S < N.length; S++) {
                P += N[S]
            }
            P = P / N.length;
            O = P * 0.485;
            J += O;
            H();
            E = F;
            return
        }
        if (L) {
            if (T == "right") {
                O -= 0.05
            } else {
                if (T == "left") {
                    O += 0.05
                }
            }
        } if (!L) {
            O = O * 0.97
        }
        J += O;
        H();
    }, 10);

    document.body.onkeydown = function (S) { //���̰����¼�
        var S = window.event || S;
        L = true;
        if (S.keyCode == 37) {
            T = "left"
        } else {
            if (S.keyCode == 39) {
                T = "right"
            }
        }
    };
    document.body.onkeyup = function () {
        L = false
    };

    U.on("#J_Left", "mousedown", function () { //���������ť������갴���¼�
        T = "left";                            //��������  
        L = true                               //��ʾ
    });
    U.on("#J_Left", "touchstart", function () { //���������ť������갴���¼�
        T = "left";                            //��������  
        L = true                               //��ʾ
    });
    U.on("#J_Right", "mousedown", function () { //���ҹ�����ť������갴���¼�
        T = "right";                            //��������
        L = true                                //��ʾ
    });
    U.on("#J_Right", "touchstart", function () { //���ҹ�����ť������갴���¼�
        T = "right";                            //��������
        L = true                                //��ʾ
    });
    U.on(["#J_Left", "#J_Right"], "mouseup", function () {  //��������ҹ�����ť������굯���¼�
        L = false
    });
    U.on(["#J_Left", "#J_Right"], "touchend", function () {  //��������ҹ�����ť������굯���¼�
        L = false
    });
    U.on("#J_Back", "mousedown", function () {
        R = true
    });
    U.on("#J_Back", "touchstart", function () {
        R = true
    });
    U.on("#J_Back", "mousedown", function () {
        R = true
    })
    U.on("#J_Back", "touchstart", function () {
        R = true
    })
    U.on("#J_View360", "mousedown", function (S) {   //��div J_View360 ������갴���¼�
        O = 0;
        E = F;
        K = true
    });
    U.on("#J_View360", "touchstart", function (S) {   //��div J_View360 ������갴���¼�
        O = 0;
        E = F;
        K = true
    });
    U.on(document, "mouseup", function () {    //���ĵ�������굯���¼�
        K = false
    });
    U.on(document, "touchend", function () {    //���ĵ�������굯���¼�
        K = false
    });
    U.on(document, "mousemove", function (S) {  //���ĵ���������ƶ��¼�
        var S = window.event || S;
        F = document.all ? S.clientX : S.pageX  //FΪ��ǰ����λ��x
    });
    U.on(document, "touchmove", function (S) {  //���ĵ���������ƶ��¼�
        var S = window.event || S;
        F = document.all ? S.clientX : S.pageX  //FΪ��ǰ����λ��x
    });
    U.on(document, "dragstart", function (S) { //�϶���ʼ�¼� �������϶�
        return false
    }
)
})();