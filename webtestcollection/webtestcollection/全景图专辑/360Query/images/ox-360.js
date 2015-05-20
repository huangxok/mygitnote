(function () {
    var G = KISSY, Q = G.DOM, U = G.Event;
    var B = 0;      //0
    var J = B;      //J backgroundPosition的x像素 
    var O = 0;
    var T = "";     //T移动方向
    var I = 0;      //I backpos的y像素
    var L = false;  //判断按钮J_Left 和J_Right   mousedown 和touchstart是否按下
    var R = false;  //判断backgroundPosition的x像素时候小于5
    var K = false;  //判断     div J_View360     mousedown 和touchstart是否按下
    var E = 0;
    var F = 0;
    var P = 0;
    var N = [0, 0, 0, 0];
    var M = { 2: "images/banner01.jpg", 3: "images/banner02.jpg", 4: "images/banner03.jpg", 5: "images/banner04.jpg", 1: "images/banner05.jpg" };
    var A = 1;
    var H = function () {
        Q.css("#J_View360", "backgroundPosition", J + "px " + I + "px")//移动像素
    };
    Q.css("#J_View360", "backgroundImage", "url(" + M[1] + ")");
    var D = function (W) {  //设置a标签  后面调用
        var V = Q.width(W); //a标签的宽度
        var X = Q.offset(W).left - Q.offset(W.parentNode).left;
        G.Anim(".views-block", { left: X + 11 + "px", width: V + "px" }, 0.3, G.Easing.easeNone).run();//设置当前a标签的位置和宽度
        var S = W.className.substr(W.className.length - 1, 1);         //获取标签class中的数字
        Q.css("#J_View360", "backgroundImage", "url(" + M[S] + ")");   //设置对应的div背景
        /*设置默认值*/{
            O = -10;
            J = B + 50;
            R = true
        }
    };
    var C = Q.query("a", Q.get(".views-trigger")); //获取a标签集合

    D(C[A]);    //调用D函数 默认设置第二个a标签 A=1 索引从0开始

    U.on(C, "click", function (S) { //给a标签绑定click事件
        D(this)
    });
    U.on(C, "tap", function (S) { //给a标签绑定click事件
        D(this)
    });
    /*设置默认值返回J_view360的原始状态*/{
        O = -10;
        J = B + 50;
        R = true;
    }
    H();
    setInterval(function () {
        if (R) {  //设置J_view360的值
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

    document.body.onkeydown = function (S) { //键盘按下事件
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

    U.on("#J_Left", "mousedown", function () { //给左滚动按钮设置鼠标按下事件
        T = "left";                            //方向向左  
        L = true                               //标示
    });
    U.on("#J_Left", "touchstart", function () { //给左滚动按钮设置鼠标按下事件
        T = "left";                            //方向向左  
        L = true                               //标示
    });
    U.on("#J_Right", "mousedown", function () { //给右滚动按钮设置鼠标按下事件
        T = "right";                            //方向向右
        L = true                                //标示
    });
    U.on("#J_Right", "touchstart", function () { //给右滚动按钮设置鼠标按下事件
        T = "right";                            //方向向右
        L = true                                //标示
    });
    U.on(["#J_Left", "#J_Right"], "mouseup", function () {  //给左滚动右滚动按钮设置鼠标弹起事件
        L = false
    });
    U.on(["#J_Left", "#J_Right"], "touchend", function () {  //给左滚动右滚动按钮设置鼠标弹起事件
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
    U.on("#J_View360", "mousedown", function (S) {   //给div J_View360 设置鼠标按下事件
        O = 0;
        E = F;
        K = true
    });
    U.on("#J_View360", "touchstart", function (S) {   //给div J_View360 设置鼠标按下事件
        O = 0;
        E = F;
        K = true
    });
    U.on(document, "mouseup", function () {    //给文档设置鼠标弹起事件
        K = false
    });
    U.on(document, "touchend", function () {    //给文档设置鼠标弹起事件
        K = false
    });
    U.on(document, "mousemove", function (S) {  //给文档设置鼠标移动事件
        var S = window.event || S;
        F = document.all ? S.clientX : S.pageX  //F为当前鼠标的位置x
    });
    U.on(document, "touchmove", function (S) {  //给文档设置鼠标移动事件
        var S = window.event || S;
        F = document.all ? S.clientX : S.pageX  //F为当前鼠标的位置x
    });
    U.on(document, "dragstart", function (S) { //拖动开始事件 不允许拖动
        return false
    }
)
})();