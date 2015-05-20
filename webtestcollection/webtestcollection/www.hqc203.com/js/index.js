// JavaScript Document
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var bl = 1;
//分辨率屏幕的缩放比例
bl = width / 1920;
var xz = "";
var page5move1;
var page5move2;
var page5move3;
var page5move4;
var page5move5;
var page5move6;
var page5move7;
function adjustImg(className, width) {
    var w = parseInt($("." + className).css("width"));
    var h = parseInt($("." + className).css("height"));
    var l = parseInt($("." + className).css("left"));
    var t = parseInt($("." + className).css("top"));
    bl = width / 1920;
    $("." + className).css({
        "width": w * bl,
        "height": h * bl,
        "left": l * bl,
        "top": t * bl
    });
}
window.onresize = findDimensions;
function findDimensions() {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
}
var page = 1;
$(document).ready(function (e) {
    $("#jiazai").css("height", height);
    var logoHeight = $(".jiazai_logo").css("height");
    var logoWidth = $(".jiazai_logo").css("width");
    logoWidth = parseInt(logoWidth);
    $(".jiazai_logo").css("left", (width - logoWidth) / 2);
    //adjustImg("jiazai_logo",width);
    document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法. 
    function subSomething() {
        if (document.readyState == "complete") { //当页面加载状态
            $("#jiazai").remove();
            //修改元素布局，以满足不同分辨率需求
            bl = width / 1920;
            $(".adjustAuto").each(function (index, element) {
                var w = parseInt($(this).css("width"));
                var h = parseInt($(this).css("height"));
                var l = parseInt($(this).css("left"));
                var t = parseInt($(this).css("top"));
                var mt = parseInt($(this).css("margin-top"));
                $(this).css({
                    "width": w * bl,
                    "height": h * bl,
                    "left": l * bl,
                    "top": t * bl,
                    "margin-top": mt * bl,
                });
            });
            $("p").css({ "margin-top": 10 * bl });
            $("p").css({ "margin-bottom": 10 * bl });
            $(".page8Content").each(function (index, element) {
                var fs = parseInt($(this).css("font-size"));
                var h = parseInt($(this).css("height"));
                var l = parseInt($(this).css("left"));
                var t = parseInt($(this).css("top"));
                var lh = parseInt($(this).css("line-height"));
                var mt = parseInt($(this).css("margin-top"));
                var ml = parseInt($(this).css("margin-left"));
                $(this).css({
                    "font-size": parseInt(fs * bl),
                    "height": h * bl,
                    "left": l * bl,
                    "top": t * bl,
                    "line-height": parseInt(lh * bl) + "px",
                    "margin-top": mt * bl,
                    "margin-left": ml * bl,
                });
            });
            $(".adjustAutoText").not(".page8Content").each(function (index, element) {
                var fs = parseInt($(this).css("font-size"));
                var w = parseInt($(this).css("width"));
                var h = parseInt($(this).css("height"));
                var l = parseInt($(this).css("left"));
                var t = parseInt($(this).css("top"));
                var lh = parseInt($(this).css("line-height"));
                var mt = parseInt($(this).css("margin-top"));
                $(this).css({
                    "font-size": parseInt(fs * bl),
                    "width": w * bl,
                    "height": h * bl,
                    "left": l * bl,
                    "top": t * bl,
                    "line-height": parseInt(lh * bl) + "px",
                    "margin-top": mt * bl,
                });
            });
        }
        moveInPage1();
    }
    //键盘事件
    window.document.onkeydown = disableRefresh;
    function disableRefresh(evt) {
        evt = (evt) ? evt : window.event
        if (evt.keyCode) {
            //向上键按下
            if (evt.keyCode == 38) {
                if ($("*").is(":animated"))
                    return false;
                if ($(".animated").length != 0)
                    return false;
                if (page < 2) {
                    page = 1;
                    return false;
                }
                page = page - 1;
                animateOutPage(page + 1);
            }
            //向下键按下
            if (evt.keyCode == 40) {
                if ($("*").is(":animated")) {
                    console.log(this);
                    return false;
                }
                if ($(".animated").length != 0)
                    return false;
                if (page > 8) {
                    page = 9;
                    return false;
                }
                animateOutPage(page);
                page++;
            }
        }
    }
    //滚轮事件
    document.body.onmousewheel = function (event) {
        event = event || window.event;
        console.log($(".animated").eq(0).attr("class"));
        console.dir(event.wheelDelta || event.detail);//输出滚轮滚动方向
        if (event.wheelDelta < 0 || event.detail < 0) {
            //小于零滚轮往下滚动
            if ($("*").is(":animated")) {
                console.log(this);
                return false;
            }
            if ($(".animated").length != 0)
                return false;
            if (page > 8) {
                page = 9;
                return false;
            }
            animateOutPage(page);
            page++;

        }
        else {
            //滚轮上滚动
            if ($("*").is(":animated"))
                return false;
            if ($(".animated").length != 0)
                return false;
            if (page < 2) {
                page = 1;
                return false;
            }
            page = page - 1;
            animateOutPage(page + 1);

        }
    };
    //点击事件
    $(".pageChose").bind("click", function () {
        if ($("*").is(":animated"))
            return false;
        if ($(".animated").length != 0)
            return false;
        var outPage = page;
        $(".pageChose").removeClass("active");
        page = parseInt(this.id);
        $("#" + page + "pageChose").addClass("active");
        animateOutPage(outPage);
    });
    adjustHeight();
    function adjustHeight() {
        $("#indexDiv").css("height", height);
        $("#indexPageBg1").css("height", height);
        $("#indexPageBg2").css("height", height);
        $(".indexPage").css("height", height);
        var pageChoseHeight = parseInt($("#index_pageChose").css("height"));
        $("#index_pageChose").css("top", (height - pageChoseHeight) / 2);
    }
    function changePage() {
        console.log(page);
        $(".indexPage").css({ top: -(page - 1) * height });
        if (page == 8)
            $("#page7").css({ top: -(page - 2) * height });
        $(".pageChose").removeClass("active");
        $("#" + page + "pageChose").addClass("active");
        animateInPage(page);

    }
    function changePageAnimate() {
        $(".pageChose").removeClass("active");
        $("#" + page + "pageChose").addClass("active");
        $(".indexPage").animate({ top: -(page - 1) * height }, 400);
        animateInPage(page);
    }
    //进入时的动画
    function animateInPage(num) {
        switch (num) {
            case 1: moveInPage1(); break;
            case 2: moveInPage2(); break;
            case 3: moveInPage3(); break;
            case 4: moveInPage4(); break;
            case 5: moveInPage5(); break;
            case 6: moveInPage6(); break;
            case 7: moveInPage7(); break;
            case 8: moveInPage8(); break;
            case 9: moveInPage9(); break;
        }
    }
    //退出时的动画
    function animateOutPage(num) {
        switch (num) {
            case 1: moveOutPage1(); break;
            case 2: moveOutPage2(); break;
            case 3: moveOutPage3(); break;
            case 4: moveOutPage4(); break;
            case 5: moveOutPage5(); break;
            case 6: moveOutPage6(); break;
            case 7: moveOutPage7(); break;
            case 8: moveOutPage8(); break;
            case 9: moveOutPage9(); break;
        }
    }
    //第一页动画
    function moveInPage1() {
        //alert(1);
        //$("#page1").animate({"background-position-y":"-100px"},8000)
        $("#img").animate({ opacity: 1 }, 1000);
        $("#img").css({ top: "-73px" });
        $(".page1Right").animate({ right: "0px" }, 450, function () {
            setTimeout(function () {
                $(".logo").animate({ opacity: 1 }, 500);
            }, 0);
            setTimeout(function () {
                $(".page1text1").animate({ opacity: 1 }, 500);
            }, 200);
            setTimeout(function () {
                $(".page1text2").animate({ opacity: 1 }, 500);
            }, 400);
            setTimeout(function () {
                $(".sign").animate({ opacity: 1 }, 500);
            }, 500);

        });
    }
    //第二页动画
    function moveInPage2() {
        console.log(page);
        $(".indexPage").css({ top: -(page - 1) * height });
        $(".pageImg,.pageImgDiv").css({ "display": "none" });
        $(".page2text1,.page2text2").css("display", "block");
        $(".page2text1").addClass("animated fadeInLeft");
        $(".page2text2").addClass("animated fadeInLeft");
        setTimeout(function () {
            $(".page2img1,.page2imgDiv1").css({ "display": "block" });
            $(".page2img1,.page2imgDiv1").addClass("animated bounceInUp");
        }, 50);
        setTimeout(function () {
            $(".page2img2,.page2imgDiv2").css({ "display": "block" });
            $(".page2img2,.page2imgDiv2").addClass("animated bounceInUp");
        }, 100);
        setTimeout(function () {
            $(".page2img3,.page2imgDiv3").css({ "display": "block" });
            $(".page2img3,.page2imgDiv3").addClass("animated bounceInUp");
        }, 150);
        setTimeout(function () {
            $(".page2img4,.page2imgDiv4").css({ "display": "block" });
            $(".page2img4,.page2imgDiv4").addClass("animated bounceInUp");
        }, 200);
        setTimeout(function () {
            $(".page2img5,.page2imgDiv5").css({ "display": "block" });
            $(".page2img5,.page2imgDiv5").addClass("animated bounceInUp");
        }, 250);
        setTimeout(function () {
            $(".page2img6,.page2imgDiv6").css({ "display": "block" });
            $(".page2img6,.page2imgDiv6").addClass("animated bounceInUp");
        }, 300);
        setTimeout(function () {
            $(".page2img7,.page2imgDiv7").css({ "display": "block" });
            $(".page2img7,.page2imgDiv7").addClass("animated bounceInUp");
        }, 350);
        setTimeout(function () {
            $(".page2img8,.page2imgDiv8").css({ "display": "block" });
            $(".page2img8,.page2imgDiv8").addClass("animated rotateInDownRight");
        }, 400);
        setTimeout(function () {
            $(".pageImg,.pageImgDiv,.page2text1,.page2text2").removeClass("animated rotateInDownRight bounceInUp fadeInLeft")
        }, 1400);
        //$(".pageImgDiv").animate({"background-position-x":-10},1000);
    }
    //第三页动画
    function moveInPage3() {
        $(".page3text1,.page3text2").css("display", "block");
        $(".page3text1").addClass("animated fadeInLeft");
        $(".page3text2").addClass("animated fadeInLeft");
        setTimeout(function () {
            $(".page3img1,.page2imgDiv1").css({ "display": "block" });
            $(".page3img1,.page2imgDiv1").addClass("animated bounceInUp");
        }, 50);
        setTimeout(function () {
            $(".page3img2,.page2imgDiv2").css({ "display": "block" });
            $(".page3img2,.page2imgDiv2").addClass("animated bounceInUp");
        }, 100);
        setTimeout(function () {
            $(".page3img3,.page2imgDiv3").css({ "display": "block" });
            $(".page3img3,.page2imgDiv3").addClass("animated bounceInUp");
        }, 150);
        setTimeout(function () {
            $(".page3img4,.page2imgDiv4").css({ "display": "block" });
            $(".page3img4,.page2imgDiv4").addClass("animated flipInX");
        }, 250);
        setTimeout(function () {
            $(".page3img5,.page2imgDiv5").css({ "display": "block" });
            $(".page3img5,.page2imgDiv5").addClass("animated bounceInUp");
        }, 200);
        setTimeout(function () {
            $(".page3img6,.page2imgDiv6").css({ "display": "block" });
            $(".page3img6,.page2imgDiv6").addClass("animated bounceInUp");
        }, 300);
        setTimeout(function () {
            $(".page2img7,.page2imgDiv7").css({ "display": "block" });
            $(".page2img7,.page2imgDiv7").addClass("animated bounceInUp");
        }, 350);
        setTimeout(function () {
            $(".page2img8,.page2imgDiv8").css({ "display": "block" });
            $(".page2img8,.page2imgDiv8").addClass("animated rotateInDownRight");
        }, 400);
        setTimeout(function () {
            $(".pageImg,.pageImgDiv,.page3text1,.page3text2").removeClass("animated rotateInDownRight flipInX bounceInUp fadeInLeft")
        }, 1400);
    }
    function moveInPage4() {
        $(".page4text1,.page4text2").css("display", "block");
        $(".page4text1").addClass("animated fadeInLeft");
        $(".page4text2").addClass("animated fadeInLeft");
        setTimeout(function () {
            $(".page4img7").css({ "display": "block" });
            $(".page4img7").addClass("animated bounceInUp");
        }, 50);
        setTimeout(function () {
            $(".page4img6").css({ "display": "block" });
            $(".page4img6").addClass("animated bounceInUp");
        }, 100);
        setTimeout(function () {
            $(".page4img8").css({ "display": "block" });
            $(".page4img8").addClass("animated bounceInUp");
        }, 150);
        setTimeout(function () {
            $(".page4img2").css({ "display": "block" });
            $(".page4img2").addClass("animated flipInX");
        }, 250);
        setTimeout(function () {
            $(".page4img5").css({ "display": "block" });
            $(".page4img5").addClass("animated bounceInUp");
        }, 200);
        setTimeout(function () {
            $(".page4img9").css({ "display": "block" });
            $(".page4img9").addClass("animated flipInX");
        }, 600)
        setTimeout(function () {
            $(".page4img1").css({ "display": "block" });
            $(".page4img1").addClass("animated bounceInUp");
        }, 300);
        setTimeout(function () {
            $(".page4img10").css({ "display": "block" });
            $(".page4img10").addClass("animated flipInX");
        }, 500);
        setTimeout(function () {
            $(".pageImg,.pageImgDiv,.page4text1,.page4text2").removeClass("animated rotateInDownRight flipInX bounceInUp fadeInLeft")
        }, 1500);
    }
    function moveInPage5() {
        $(".page5text1,.page5text2").css("display", "block");
        $(".page5text1").addClass("animated fadeInLeft");
        $(".page5text2").addClass("animated fadeInLeft");
        $(".page5Div").hover(function () {
            $(".page5Div div").css({ "transform": "scale(1)", "-webkit-transform": "scale(1)", "-moz-transform": "scale(1)", "-o-transform": "scale(1)", "-ms-transform": "scale(1" });
            $(".color-1").css({ "fill": $(this).css("color") });
            $(this).children().css({ "transform": "scale(1.5)", "-webkit-transform": "scale(1.5)", "-moz-transform": "scale(1.5)", "-o-transform": "scale(1.5)", "-ms-transform": "scale(1.5" });
        });
        setTimeout(function () {
            $(".page5div1,.page5Div div ").css({ "display": "block" });
            $(".page5div1 ").addClass("animated flipInX");
        }, 800);
        setTimeout(function () {
            $(".page5div2 ").css({ "display": "block" });
            $(".page5div2 ").addClass("animated flipInX");
        }, 700);
        setTimeout(function () {
            $(".page5div3 ").css({ "display": "block" });
            $(".page5div3 ").addClass("animated flipInX");
        }, 600);
        setTimeout(function () {
            $(".page5div4 ").css({ "display": "block" });
            $(".page5div4 ").addClass("animated flipInX");
        }, 500);
        setTimeout(function () {
            $(".page5div5").css({ "display": "block" });
            $(".page5div5").addClass("animated flipInX");
        }, 400);
        setTimeout(function () {
            $(".page5svg ").css({ "display": "block" });
            $(".page5svg ").addClass("animated bounceInUp");
        }, 50);
        setTimeout(function () {
            $(".pageImg,.page5Div,.page5text1,.page5text2").removeClass("animated rotateInDownRight flipInX bounceInUp fadeInLeft")
        }, 1500);

    }
    function moveInPage6() {
        $(".page6text1,.page6text2").css("display", "block");
        $(".page6text1").addClass("animated fadeInLeft");
        $(".page6text2").addClass("animated fadeInLeft");
        var img2W = parseInt($(".page6img2").css("width"));
        var img2H = parseInt($(".page6img2").css("height"));
        var img2T = parseInt($(".page6img2").css("top"));
        var img2L = parseInt($(".page6img2").css("left"));
        var img1W = parseInt($(".page6img1").css("width"));
        var img1H = parseInt($(".page6img1").css("height"));
        var img1T = parseInt($(".page6img1").css("top"));
        var img1L = parseInt($(".page6img1").css("left"));
        setTimeout(function () {
            $(".page6img1").css("top", "1000px");
        }, 10);
        setTimeout(function () {
            $(".page6img1").css({ "display": "block" });
            $(".page6img1").clearQueue();
            $(".page6img1").animate({ "top": img1T }, 300, "swing", function () {
                $(".page6img2").css({ "display": "block" });
                $(".page6img2").clearQueue();
                $(".page6img2").animate({ "top": img2T - (200 * bl), left: img2L - (70 * bl) }, 500, "swing");
                $(".page6img1").animate({ "opacity": 0.4 }, 250, "swing");
            });
        }, 10);
        setTimeout(function () {
            $(".page6img3").css({ "display": "block" });
            $(".page6img3").addClass("animated flipInX");
        }, 300);
        setTimeout(function () {
            $(".page6img4").css({ "display": "block" });
            $(".page6img4").addClass("animated flipInX");
        }, 250);
        setTimeout(function () {
            $(".page6img5 ").css({ "display": "block" });
            $(".page6img5 ").addClass("animated rotateInDownRight");
        }, 500);
        setTimeout(function () {
            $(".pageImg,.page6text1,.page6text2").removeClass("animated rotateInDownRight flipInX bounceInUp fadeInLeft")
        }, 1200);

    }
    function moveInPage7() {
        $(".page7text1,.page7text2").css("display", "block");
        $(".page7text1").addClass("animated fadeInLeft");
        $(".page7text2").addClass("animated fadeInLeft");
        setTimeout(function () {
            $(".page7imga1").css({ "display": "block" });
            $(".page7imga1").addClass("animated bounceInUp");
        }, 100);
        setTimeout(function () {
            $(".page7imgCotentC:eq(0)").css({ "display": "block" });
            $(".page7imgCotentC:eq(0)").addClass("animated bounceInDown");
            $(".page7imga2").css({ "display": "block" });
            $(".page7imga2").addClass("animated bounceInUp");
        }, 200);
        setTimeout(function () {
            $(".page7imgCotentC:eq(1)").css({ "display": "block" });
            $(".page7imgCotentC:eq(1)").addClass("animated bounceInDown");
            $(".page7imga3").css({ "display": "block" });
            $(".page7imga3").addClass("animated bounceInUp");
        }, 300);
        setTimeout(function () {
            $(".page7imgCotentC:eq(2)").css({ "display": "block" });
            $(".page7imgCotentC:eq(2)").addClass("animated bounceInDown");
            $(".page7imga4").css({ "display": "block" });
            $(".page7imga4").addClass("animated bounceInUp");
        }, 400);
        setTimeout(function () {
            $(".page7imgCotentC:eq(3)").css({ "display": "block" });
            $(".page7imgCotentC:eq(3)").addClass("animated bounceInDown");
            $(".page7imga5").css({ "display": "block" });
            $(".page7imga5").addClass("animated bounceInUp");
        }, 500);
        setTimeout(function () {
            $(".page7imgCotentC:eq(4)").css({ "display": "block" });
            $(".page7imgCotentC:eq(4)").addClass("animated bounceInDown");
        }, 600);
        setTimeout(function () {
            $(".page7text1,.page7imgCotentC,.page7text2,.page7imga ").removeClass("animated rotateInDownRight flipInX bounceInUp bounceInDown fadeInLeft");
        }, 1400);

    }
    function moveInPage8() {
        $(".page8text").on("click", function () {
            $(".page8text").removeClass("activeText");
            $(this).addClass("activeText");
            $("#page8 .page8bg").animate({ "top": 120 * bl + "px" }, 300);
            var title = $(this).text();
            $(".page8Content").clearQueue();
            $(".page8Content").animate({ "opacity": 0 }, 500, "swing", function () {
                if (title == "自由创意者") {
                    $(".page8Content").css({ "display": "none" });
                    $(".page8text54").css({ "display": "block" });
                    $(".page8text64").css({ "display": "block" });
                    $(".page8img1").animate({ "left": "-=200px", "opacity": "0" }, 300, function () {
                        $(".page8img1 img").css({ "display": "none" });
                        $(".page8img1 img:eq(3)").css({ "display": "block" });
                        //$(".page8img1 img").attr("src","images/8/6.png");
                        $(".page8img1").clearQueue();
                        $(".page8img1").css({ "left": parseInt($(".page8img1").css("left")) + 400, "opacity": "0" });
                        $(".page8img1").animate({ "left": "-=200px", "opacity": "1" }, 300);
                        setTimeout(function () {
                            if ($("*").is(":animated")) {
                                $(this).stop();
                            }
                            $("*").stop();
                            $("*").clearQueue();
                            $(".page8img1").stop();
                            $(".page8img1").clearQueue();
                        }, 400);
                    });

                }
                if (title == "设计师") {
                    $(".page8Content").css({ "display": "none" });
                    $(".page8text53").css({ "display": "block" });
                    $(".page8text63").css({ "display": "block" });
                    $(".page8img1").animate({ "left": "-=200px", "opacity": "0" }, 300, function () {
                        $(".page8img1 img").css({ "display": "none" });
                        $(".page8img1 img:eq(2)").css({ "display": "block" });
                        //$(".page8img1 img").attr("src","images/8/5.png");
                        $(".page8img1").clearQueue();
                        $(".page8img1").css({ "left": parseInt($(".page8img1").css("left")) + 400, "opacity": "0" });
                        $(".page8img1").animate({ "left": "-=200px", "opacity": "1" }, 300);
                        setTimeout(function () {
                            if ($("*").is(":animated")) {
                                $(this).stop();
                            }
                            $("*").stop();
                            $("*").clearQueue();
                            $(".page8img1").stop();
                            $(".page8img1").clearQueue();
                        }, 400);
                    });
                }
                if (title == "企业用户") {
                    $(".page8Content").css({ "display": "none" });
                    $(".page8text52").css({ "display": "block" });
                    $(".page8text62").css({ "display": "block" });
                    $(".page8img1").animate({ "left": "-=200px", "opacity": "0" }, 300, function () {
                        $(".page8img1 img").css({ "display": "none" });
                        $(".page8img1 img:eq(1)").css({ "display": "block" });
                        //$(".page8img1 img").attr("src","images/8/4.png");
                        $(".page8img1").clearQueue();
                        $(".page8img1").css({ "left": parseInt($(".page8img1").css("left")) + 400, "opacity": "0" });
                        $(".page8img1").animate({ "left": "-=200px", "opacity": "1" }, 300);
                        setTimeout(function () {
                            if ($("*").is(":animated")) {
                                $(this).stop();
                            }
                            $("*").stop();
                            $("*").clearQueue();
                            $(".page8img1").stop();
                            $(".page8img1").clearQueue();
                        }, 400);
                    });
                }
                if (title == "个人用户") {
                    $(".page8Content").css({ "display": "none" });
                    $(".page8text51").css({ "display": "block" });
                    $(".page8text61").css({ "display": "block" });
                    $(".page8img1").animate({ "left": "-=200px", "opacity": "0" }, 400, function () {
                        $(".page8img1 img").css({ "display": "none" });
                        $(".page8img1 img:eq(0)").css({ "display": "block" });
                        //$(".page8img1 img").attr("src","images/8/3.png");
                        $(".page8img1").clearQueue();
                        $(".page8img1").css({ "left": parseInt($(".page8img1").css("left")) + 400, "opacity": "0" });
                        $(".page8img1").animate({ "left": "-=200px", "opacity": "1" }, 300);
                        setTimeout(function () {
                            $("*").stop();
                            $("*").clearQueue();
                            $(".page8img1").stop();
                            $(".page8img1").clearQueue();
                        }, 400);
                    });
                }
                $(".page8Content").animate({ "opacity": 1 }, 500);
            });

        });
    }
    function moveInPage9() {
        setTimeout(function () {
            $(".page9img1 ").css({ "display": "block" });
            $(".page9img1 ").addClass("animated rotateInUpRight");

            $(".page9img2 ").css({ "display": "block" });
            $(".page9img2 ").addClass("animated rotateInDownLeft");

            $(".page9img3 ").css({ "display": "block" });
            $(".page9img3 ").addClass("animated rotateInUpLeft");

            $(".page9img4 ").css({ "display": "block" });
            $(".page9img4 ").addClass("animated rotateInDownRight");
            $(".page9img").on("mouseenter", function () {
                $(".page9img").stop();
                $(".page9img").clearQueue();
                $(".page9img11").css({ "-webkit-filter": "blur(8px)", "opacity": 1 });
                $(".page9img").animate({ "opacity": 1 }, 200);
            });
            $(".page9img").on("mouseleave", function () {
                $(".page9img").stop();
                $(".page9img").clearQueue();
                $(".page9img11").css({ "-webkit-filter": "blur(0px)", "opacity": 1 });
                $(".page9img").not(".page9img1,.page9img2,.page9img3,.page9img4").animate({ "opacity": 0.3 }, 500);
            });

        }, 400);
        setTimeout(function () {
            setTimeout(function () {
                $(".page9img5").css({ "display": "block" });
                $(".page9img5").animate({ "opacity": 0.3 }, 1000);
            }, 1);
            setTimeout(function () {
                $(".page9img6").css({ "display": "block" });
                $(".page9img6").animate({ "opacity": 0.3 }, 200);
            }, 250);
            setTimeout(function () {
                $(".page9img6").css({ "display": "block" });
                $(".page9img7").animate({ "opacity": 0.3 }, 250);
            }, 250);
            setTimeout(function () {
                $(".page9img").removeClass("animated rotateInDownRight rotateInUpLeft rotateInDownLeft rotateInUpRight flipInX bounceInUp bounceInDown fadeInLeft");
            }, 250);
        }, 700);
    }
    function moveOutPage1() {
        setTimeout(function () {
            if (page == 2) {
                setTimeout(function () {
                    $("#img").css({ opacity: 0 });
                    $(".page1Right").css({ right: "-700px" });
                    $("#img").css({ top: "-73px" });
                    $(".logo").css({ opacity: 0 });
                    $(".page1text1").css({ opacity: 0 });
                    $(".page1text2").css({ opacity: 0 });
                    $(".sign").css({ opacity: 0 });
                    changePage(page);
                }, 500);
                $("#page1").animate({ top: -height + "px" }, 1000);
                $(".page2bg").css({ "top": 1000 * bl + "px" });
                $(".page2bg").animate({ "top": 120 * bl + "px" }, 400);
                $("#page2").animate({ top: -height + "px" }, 250);
            }
            else {
                $("#img").css({ opacity: 0 });
                $(".page1Right").css({ right: "-700px" });
                $("#img").css({ top: "-73px" });
                $(".logo").css({ opacity: 0 });
                $(".page1text1").css({ opacity: 0 });
                $(".page1text2").css({ opacity: 0 });
                $(".sign").css({ opacity: 0 });
                changePageAnimate();
            }
        }, 1)

    }
    function moveOutPage2() {
        setTimeout(function () {
            if (page == 3 || page == 4 || page == 5 || page == 2) {
                $(".page2text1,.page2text2").css("display", "block");
                $(".page2text1").addClass("animated fadeOutUp");
                $(".page2text2").addClass("animated fadeOutUp");
                $(".pageImg,.pageImgDiv,.page2text1,.page2text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".page2bg div").css({ "display": "none" });
                    $(".pageImg,.pageImgDiv,.page2text1,.page2text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePage(page);
                }, 500);
                console.log(page);
            }
            else {
                $(".page2text1,.page2text2").css("display", "block");
                $(".page2text1").addClass("animated fadeOutUp");
                $(".page2text2").addClass("animated fadeOutUp");
                $(".pageImg,.pageImgDiv,.page2text1,.page2text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".page2bg div").css({ "display": "none" });
                    $(".pageImg,.pageImgDiv,.page2text1,.page2text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePageAnimate(page);
                }, 500);
                console.log(page);
            }
        }, 1)

    }
    function moveOutPage3() {
        setTimeout(function () {
            if (page == 3 || page == 4 || page == 5 || page == 2) {
                $(".page3text1,.page3text2").css("display", "block");
                $(".page3text1").addClass("animated fadeOutUp");
                $(".page3text2").addClass("animated fadeOutUp");
                $(".pageImg,.pageImgDiv,.page3text1,.page3text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".page3bg div").css({ "display": "none" });
                    $(".pageImg,.pageImgDiv,.page3text1,.page3text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePage(page);
                }, 500);
                console.log(page);
            }
            else {
                $(".page3text1,.page3text2").css("display", "block");
                $(".page3text1").addClass("animated fadeOutUp");
                $(".page3text2").addClass("animated fadeOutUp");
                $(".pageImg,.pageImgDiv,.page3text1,.page3text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".page3bg div").css({ "display": "none" });
                    $(".pageImg,.pageImgDiv,.page3text1,.page3text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePageAnimate(page);
                }, 500);
                console.log(page);
            }

        }, 10)
    }
    function moveOutPage4() {
        setTimeout(function () {
            if (page == 3 || page == 4 || page == 5 || page == 2) {
                $(".page4text1,.page4text2").css("display", "block");
                $(".pageImg,.pageImgDiv,.page4text1,.page4text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".page4bg div").css({ "display": "none" });
                    $(".pageImg,.pageImgDiv,.page4text1,.page4text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePage(page);
                }, 500);
            }
            else {
                $(".page4text1,.page4text2").css("display", "block");
                $(".pageImg,.pageImgDiv,.page4text1,.page4text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".page4bg div").css({ "display": "none" });
                    $(".pageImg,.pageImgDiv,.page4text1,.page4text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePageAnimate(page);
                }, 500);

            }


        }, 10);
    }
    function moveOutPage5() {
        setTimeout(function () {
            $(".page5bg div").css({ "display": "none" });
            changePage(page);
        }, 500);
        setTimeout(function () {
            if (page == 6 || page == 7) {
                $("#page5").animate({ top: -(page - 1) * height }, 400);
                $("#page6").animate({ top: -(page - 1) * height }, 250);
            }
            else {
                if (page == 3 || page == 4 || page == 5 || page == 2) {
                    $(".page5text1,.page5text2").css("display", "block");
                    $(".page5bg div").addClass("animated fadeOutUp");
                    setTimeout(function () {
                        $(".page5bg div").css({ "display": "none" });
                        $(".page5bg div").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                        changePage(page);
                    }, 500);
                }
                else
                    changePageAnimate();
            }
        }, 10);
    }
    function moveOutPage6() {
        setTimeout(function () {
            if (page == 7) {
                $(".page6text1,.page6text2").css("display", "block");
                $(".pageImg,.page6text1,.page6text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".pageImg,.page6text1,.page6text2").css({ "display": "none" });
                    $(".pageImg,.page6text1,.page6text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    $(".page6img2").css({ "top": parseInt($(".page6img2").css("top")) + (200 * bl), left: parseInt($(".page6img2").css("left")) + (70 * bl) });
                    $(".page6img1").css({ "opacity": 1 });
                    changePage(page);
                }, 500);
            }
            else {
                $(".page6text1,.page6text2").css("display", "block");
                $(".pageImg,.page6text1,.page6text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".pageImg,.page6text1,.page6text2").css({ "display": "none" });
                    $(".pageImg,.page6text1,.page6text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    $(".page6img2").css({ "top": parseInt($(".page6img2").css("top")) + (200 * bl), left: parseInt($(".page6img2").css("left")) + (70 * bl) });
                    $(".page6img1").css({ "opacity": 1 });
                    changePageAnimate();
                }, 100)
            }
        }, 10);
    }
    function moveOutPage7() {
        setTimeout(function () {
            if (page == 8) {
                $("#page8 .page8bg").css({ "top": 1000 * bl + "px" });
                setTimeout(function () {
                    $("#page8 .page8bg").animate({ "top": 120 * bl + "px" }, 300);
                }, 400);
                $("#page8").animate({ "top": -(page - 1) * height }, 400);
                setTimeout(function () {
                    $(".pageImg,.page7imga,page7imgCotentC,.page7text1,.page7text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePage(page);
                }, 500);
            }
            else {
                $(".page7imga,page7imgCotentC,.page7text1,.page6text2").css("display", "block");
                $(".page7imga,page7imgCotentC,.pageImg,.page7text1,.page7text2").addClass("animated fadeOutUp");
                setTimeout(function () {
                    $(".pageImg,.page7imga,page7imgCotentC,.page7text1,.page7text2").css({ "display": "none" });
                    $(".pageImg,.page7imga,page7imgCotentC,.page7text1,.page7text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                }, 500);
                setTimeout(function () {
                    $(".page7imga,page7imgCotentC,.page7text1,.page7text2").css({ "display": "none" });
                    $(".pageImg,.page7imga,page7imgCotentC,.page7text1,.page7text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                    changePageAnimate();
                }, 500);
            }
        }, 10);

    }
    function moveOutPage8() {
        setTimeout(function () {
            console.log(page);
            if (page == 9) {
                $("#page9").css({ "top": -(page - 1) * height });
                $("#page9").animate({ "background-position-y": -90 * bl + "px" }, 500);
                $("#page8,#page7").animate({ "top": -(page - 1) * height }, 550);
            }
            else {
                $(".pageImg,.page7imga,page7imgCotentC,.page7text1,.page7text2").css({ "display": "none" });
                $(".pageImg,.page7imga,page7imgCotentC,.page7text1,.page7text2").removeClass("animated fadeOutUp bounceInUp fadeInLeft");
                changePageAnimate();
            }
        }, 1);

        setTimeout(function () {
            changePage(page);
        }, 10);
    }
    function moveOutPage9() {
        setTimeout(function () {
            changePageAnimate();
        }, 1);
    }
});
