/**
 * $.yxMobileSlider
 * @charset utf-8
 * @extends jquery.1.9.1
 * @fileOverview 创建一个焦点轮播插件，兼容PC端和移动端，若引用请保留出处，谢谢！
 * @author 李玉玺
 * @email 122452357@qq.com
 * @version 1.0
 * @date 2013-11-12
 * Copyright (c) 2013-2013 李玉玺
 * @example
 * $(".container").yxMobileSlider();
 */
(function ($) {
    $.fn.yxMobileSlider = function (settings) { //settings :是又页面传入的值 这里传入的是一个对象 jq的拓展方法
        var defaultSettings = {                 //设置一个对象：默认值,当么有传入settings的设置
            width: 640,                         //容器宽度
            height: 320,                        //容器高度
            during: 5000,                       //间隔时间
            speed: 30                           //滑动速度
        }
        settings = $.extend(true, {}, defaultSettings, settings);  //将settings对象和defaultsettings对象进行深度合并 合并对象 取并集 然后将相同的键值由后者替换前者
        //合并后的settings {width:640,height:320,during:3000,speed:30}    由页面传入
        return this.each(function () {
            var pos = 0;
            var _this = $(this), s = settings;  //将传入的div .slider对象赋值给_this变量便于在域的操作（优化）,将新的settings赋值个变量s
            var startX = 0, startY = 0;         //触摸开始时手势横纵坐标 
            var temPos;                         //滚动元素当前位置
            var iCurr = 0;                      //当前滚动屏幕数
            var timer = null;                   //计时器
            var oMover = $("ul", _this);        //将div .slider中ul赋值给变量oMover      滚动元素
            var oLi = $("li", oMover);          //将oMover 中的 li赋值给变量oLi          滚动单元
            var num = oLi.length;               //将oLi的个数（长度）赋值给num           滚动屏幕数
            var oPosition = {};                 //触点位置
            var moveWidth = s.width;            //滚动宽度
            ////初始化主体样式div .slider  方式一
            //_this.width(s.width).height(s.height).css({
            //    position: 'relative',           //相对定位于body     注释：这些可以在样式css中设置
            //    overflow: 'hidden',             //多余部分隐藏
            //    margin: '0 auto'                //居中显示 
            //});
            //初始化主体样式div .slider 方式二
            _this.css({
                width: s.width,
                height: s.height,
                position: 'relative',
                overflow: 'hidden',
                margin: '0 auto'
            });


            $(window).bind('resize load', function () {
                if (isMobile()) {                                          //判断是否是手机端 若是
                    mobileSettings();                                      //手机端则需要重新设置东西 
                    bindTochuEvent();                                      //绑定手机端触屏事件
                }
                else {
                    bingmouseEvent(_this)
                }
                _this.fadeIn(300);                                       //渐隐   
            });


            function doAnimate(iTarget, fn) {                            //执行动画 参数itarget为移动的像素 正负均可 正值为左移动 负值为右移动 fn为回调函数名称 可省略 主要是为了调用automove而设置的
                pos = _this.css("backgroundPositionX")
                _this.animate({ backgroundPositionX: pos - iTarget }, {
                    duration: _this.speed, complete: function () {
                        if (fn) {
                            fn();
                        }
                    }
                });
                //_this.stop().animate({ backgroundPositionX: pos - iTarget }, _this.speed, function () {  //回调函数可以省略

                //});
            }
            //判断是否是移动设备
            function isMobile() {                                         //若是则返回true 否则false 用于对样式的设置
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || navigator.userAgent.indexOf('iPad') != -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //function doMove() {
            //    doAnimate(600);
            //}
            //function autoMove() {
            //    timer = setInterval(doMove, s.speed);                    //定时滚动
            //}
            //停止自动运动
            //function stopMove() {
            //    clearInterval(timer);
            //}
            //autoMove();
            var f = false;
            //PC端窗口
            {
                function bingmouseEvent(t) {
                    _this.get(0).addEventListener('mousedown', mousedown, false);
                    _this.get(0).addEventListener('mousemove', mousemove, false);
                    _this.get(0).addEventListener('mouseup', mouseup, false);
                }
                function mousePos(e) {
                    var tagX, tagY;
                    tagX = e.clientX || e.pageX;
                    tagY = e.clientY || e.pageY;
                    oPosition.x = tagX;
                    oPosition.y = tagY;
                    return oPosition;
                }
                function mousedown(e, obj) {
                    mousePos(e);
                    startX = oPosition.x;
                    startY = oPosition.y;
                    temPos = _this.position().left;
                    f = true;
                }
                function mousemove(e, obj) {
                    if (f) {
                        mousePos(e);
                        var moveX = oPosition.x - startX;
                        var moveY = oPosition.y - startY;
                        if (Math.abs(moveY) < Math.abs(moveX)) {                       //若y的绝对值小于x 则水平滚动
                            e.preventDefault();                                        //阻止默认事件
                            //_this.css({                                               //设置ul的样式
                            //    backgroudPositionX: temPos + moveX                    //移动时的效果当前位置加减移动的像素
                            //});
                            doAnimate(temPos + moveX)
                        }
                    }
                    else {
                        return;
                    }
                }
                function mouseup(e) {
                    f = false;
                    mousePos(e);                                                   //获取触碰结束时的位置   
                    var moveX = oPosition.x - startX;                              //获取触碰结束时移动的x像素 结束x-开始x
                    var moveY = oPosition.y - startY;                              //获取触碰结束时移动的y像素 结束y-开始y
                    if (Math.abs(moveY) < Math.abs(moveX)) {                       //判断是否是水平移动
                        if (moveX > 0) {                                           //若移动的x像素大于0 则左移动
                            //那么移动的距离为 （索引*屏的宽度） 像素
                            //doAnimate(-moveX);                       //执行动画并调用回调函数 自动滚动   

                        }
                        else {                                                     //当移动x像素小于0时 则右移动
                            //那么移动的距离为 （索引*屏的宽度） 像素
                            //doAnimate(moveX);                       //执行动画并调用回调函数 自动滚动   

                        }

                    }
                }

            }
            //移动端操作
            {
                //移动设备基于屏幕宽度设置容器宽高
                function mobileSettings() {
                    moveWidth = $(window).width();                                 //设置移动屏幕的宽度
                    var iScale = $(window).width() / s.width;                      //转换div .slider的宽度百分比  移动屏幕
                    //_this.height(s.height * iScale).width($(window).width());    //设置div .slider的高度和宽度
                    //_this.height(s.height * iScale).width(moveWidth);            //优化上句代码
                    _this.css({                                                    //设置在移动端div .slider的样式
                        height: s.height * iScale,
                        width: moveWidth
                    });
                    oMover.css({
                        left: -iCurr * moveWidth                                   //屏幕的屏数距离
                    });
                }
                //绑定触摸事件
                function bindTochuEvent() {
                    oMover.get(0).addEventListener('touchstart', touchStartFunc, false);
                    oMover.get(0).addEventListener('touchmove', touchMoveFunc, false);
                    oMover.get(0).addEventListener('touchend', touchEndFunc, false);
                }
                //获取触点位置
                function touchPos(e) {
                    var touches = e.changedTouches, l = touches.length, touch, tagX, tagY; //设置触屏的对象 设置触屏的长度 设置单个触屏对象 获取触碰相对于可视区域的x y
                    for (var i = 0; i < l; i++) {
                        touch = touches[i];                                         //获取触碰的第i个对象
                        tagX = touch.clientX;                                       //获取触碰的位置x
                        tagY = touch.clientY;                                       //获取触碰的位置y
                    }
                    oPosition.x = tagX;                                             //赋值x
                    oPosition.y = tagY;                                             //赋值y
                    return oPosition;                                               //返回x y
                }
                //触摸开始
                function touchStartFunc(e) {
                    //clearInterval(timer);                                           //清空timer
                    touchPos(e);                                                    //获取触点位置
                    startX = oPosition.x;                                           //oPosition x   开始位置x
                    startY = oPosition.y;                                           //oPosition y   开始位置y
                    temPos = oMover.position().left;                                //ul的left
                }
                //触摸移动 
                function touchMoveFunc(e) {
                    touchPos(e);
                    var moveX = oPosition.x - startX;
                    var moveY = oPosition.y - startY;
                    if (Math.abs(moveY) < Math.abs(moveX)) {                       //若y的绝对值小于x 则水平滚动
                        e.preventDefault();                                        //阻止默认事件
                        oMover.css({                                               //设置ul的样式
                            left: temPos + moveX                                   //移动时的效果当前位置加减移动的像素
                        });
                    }
                }
                //触摸结束
                function touchEndFunc(e) {
                    touchPos(e);                                                   //获取触碰结束时的位置   
                    var moveX = oPosition.x - startX;                              //获取触碰结束时移动的x像素 结束x-开始x
                    var moveY = oPosition.y - startY;                              //获取触碰结束时移动的y像素 结束y-开始y
                    if (Math.abs(moveY) < Math.abs(moveX)) {                       //判断是否是水平移动
                        if (moveX > 0) {                                           //若移动的x像素大于0 则左移动
                            iCurr--;                                               //那么索引-1
                            if (iCurr >= 0) {                                      //如果索引大于等于0 
                                var moveX = iCurr * moveWidth;                     //那么移动的距离为 （索引*屏的宽度） 像素
                                doAnimate(-moveX, autoMove);                       //执行动画并调用回调函数 自动滚动   
                            }
                            else {                                                 //如果索引小于0 
                                doAnimate(0, autoMove);                            //那么移动距离为    (0 * 屏的宽度） 像素
                                iCurr = 0;                                         //并将索引置为0
                            }
                        }
                        else {                                                     //当移动x像素小于0时 则右移动
                            iCurr++;                                               //那么索引+1   
                            if (iCurr < num && iCurr >= 0) {                       //判断索引大于等于0并且小于 li的个数（num）
                                var moveX = iCurr * moveWidth;                     //那么移动的距离为 （索引*屏的宽度） 像素
                                doAnimate(-moveX, autoMove);                       //执行动画并调用回调函数 自动滚动   
                            }
                            else {                                                 //当索引大于li的个数（num）-1
                                iCurr = num - 1;                                   //那么索引强制将索引的值置为num-1 
                                doAnimate(-(num - 1) * moveWidth, autoMove);       //移动的距离为 （索引*屏的宽度） 像素
                            }
                        }
                        oFocus.eq(iCurr).addClass("current").siblings().removeClass("current"); //给焦点（按钮）设置当前选中的样式
                    }
                }
            }
        });
    }
})(jQuery);
