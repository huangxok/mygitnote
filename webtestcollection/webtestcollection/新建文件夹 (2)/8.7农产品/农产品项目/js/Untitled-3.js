// JavaScript Document


$(document).ready(function () {
    //背景图片
    var point = $(".yinying li");
    var cle = setInterval(oop2, 5000);
    var index = 1;
    function oop2() {
        ++index;
        for (var i = 0; i < index; i++) {
            point.eq(i).addClass("current").siblings().removeClass("current");
            if (index == 5) {
                point.eq(0).addClass("current").siblings().removeClass("current");
            }
        }
        if (index == 5) {
            index = 1;
        }

        $('.banner').css('background', 'url(Image/' + (index) + '.jpg)');
        $('.banner').css('background-size', '100%');
    }

    $(".banner .prev").click(function () {
        clearInterval(cle);
        if (index == 1) {
            index = 5;
            point.eq(3).addClass("current").siblings().removeClass("current");
        }
        index--;
        for (var i = 0; i < index; i++) {
            point.eq(i).addClass("current").siblings().removeClass("current");

        }
        $('.banner').css('background', 'url(Image/' + (index) + '.jpg)');
        $('.banner').css('background-size', '100%');
        cle = setInterval(oop2, 5000);

    });

    $(".banner .next").click(function () {
        clearInterval(cle);
        index++;
        if (index == 5) {
            index = 1;
            point.eq(0).addClass("current").siblings().removeClass("current");
        }
        for (var i = 0; i < index; i++) {
            point.eq(i).addClass("current").siblings().removeClass("current");

        }

        $('.banner').css('background', 'url(Image/' + (index) + '.jpg)');
        $('.banner').css('background-size', '100%');
        cle = setInterval(oop2, 5000);

    });


    $(".yinying li").click(function () {
        clearInterval(cle);
        $(this).addClass("current").siblings().removeClass("current");
        var li = $(this).index() + 1;
        $('.banner').css('background', 'url(Image/' + (li) + '.jpg)');
        $('.header').css('background-size', '100%');

        index++;
        if (index == 5) {
            index = 1;
            point.eq(0).addClass("current").siblings().removeClass("current");
        }
        cle = setInterval(oop2, 5000);
    })



    //水果图片文字 鼠标放上去和鼠标移开的效果
    $(".fruit_img li").mouseover(function () {
        $(this).children("div").show();
    })

    $(".fruit_img li").mouseout(function () {
        $(this).children("div").hide();
    })


    //回到顶部
    var height = $(window).height();
    $(document).scroll(function () {
        if ($(document).scrollTop() > height) {
            $(".xbq").slideDown();
        } else {
            $(".xbq").slideUp();
        }
    });

    $(".xbq .top-run").click(function () {
        $("html,body").animate({ "scrollTop": 0 }, 1000);
    })

})