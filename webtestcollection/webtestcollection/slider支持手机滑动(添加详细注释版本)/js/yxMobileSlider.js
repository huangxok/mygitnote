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
        debugger;
        var a = this.each(function (index, item) {
            console.log(index + "," + item);
        });
        return this.each(function () {
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

            //设置滚动元素div .slider中ul的样式
            oMover.css({
                position: 'absolute',           //绝对定位
                left: 0                         //左0px
            });
            //设置滚动单元div .slider ul li 的样式
            oLi.css({
                float: 'left',                  //左浮动
                display: 'inline'               //表现形式 
            });
            //设置li中的img的样式
            $("img", oLi).css({
                width: '100%',                  //宽度100% 640px
                height: '100%'                  //高度100% 320px
            });
            //设置li中的img的样式 方式二
            //$("img", oLi).css({
            //    width: s.width,
            //    height: s.height
            //});
            //初始化焦点容器及按钮
            _this.append('<div class="focus"><div></div></div>');         //加入一个遮罩显示按钮 
            /////有些东东需要
            var oFocusContainer = $(".focus");                            //获取这个遮罩的div   
            for (var i = 0; i < num; i++) {
                $("div", oFocusContainer).append("<span></span>");        //根据图片的个数创建相应的按钮个数
            }
            var oFocus = $("span", oFocusContainer);                      //获取div .focus中的span元素
            //设置div .focus的样式
            oFocusContainer.css({
                minHeight: $(this).find('span').height() * 2,             //设置div .focus的最小高度 高度为span的高度的2倍
                position: 'absolute',                                     //绝对定位
                bottom: 0,                                                //底部0px
                background: 'rgba(0,0,0,0.5)'                             //rgba格式设置颜色 a是透明度
            })
            //设置在div .focus中的span元素的样式
            $("span", oFocusContainer).css({
                display: 'block',               //显示为块
                float: 'left',                  //左浮动
                cursor: 'pointer'               //鼠标hover的样式
            })
            //设置div .focus中的div元素的样式  方式一
            //$("div", oFocusContainer).width(oFocus.outerWidth(true) * num).css({
            //    position: 'absolute',
            //    right: 10,
            //    top: '50%',
            //    marginTop: -$(this).find('span').width() / 2
            //});
            //设置div .focus中的div元素的样式  方式二
            $("div", oFocusContainer).css({
                width: oFocus.outerWidth(true) * num,                      //设置宽度 
                position: 'absolute',                                      //绝对定位
                right: 10,                                                 //右边10px
                top: '40%',                                                //上边40%   
                //marginTop: -$(this).find('span').width() / 2             //调整位置 若top：50% 时加这个
            });
            oFocus.first().addClass("current");                            //默认给第一张图片添加当前样式
            //页面加载或发生改变
            $(window).bind('resize load', function () {
                if (isMobile()) {                                          //判断是否是手机端 若是
                    mobileSettings();                                      //手机端则需要重新设置东西 
                    bindTochuEvent();                                      //绑定手机端触屏事件
                }

                //oLi.width(_this.width()).height(_this.height()); 方式一  //设定滚动单元宽高
                oLi.css({                                                 //方式二
                    width: _this.width(),                                 //640px
                    height: _this.height()                                //320px
                });
                //设定滚动单元宽 即ul的宽度 即li的个数 * li的宽度
                oMover.width(num * oLi.width());
                //设定div .focus的样式                                    //方式一  
                oFocusContainer.width(_this.width())                     //设定焦点（按钮）容器宽  div .focus的宽
                               .height(_this.height() * 0.15)            //设定焦点（按钮）容器高  div .focus的高
                               .css({
                                   zIndex: 2
                               });
                //oFocusContainer.css({                                  //同上   方式二
                //    width: _this.width(),
                //    heigth: _this.height() * 0.15,
                //    zIndex: 2
                //});
                _this.fadeIn(300);                                       //渐隐   
            });

            //PC机下焦点切换
            if (!isMobile()) {
                oFocus.hover(function () {                                //给span指定hover事件 
                    iCurr = $(this).index() - 1;                          //this 是元素span 
                    stopMove();                                           //停止自动滚动
                    doMove();                                             //滚动到指定的屏
                }, function () {
                    autoMove();                                           //单鼠标移除时，自动滚动
                })
            }
            //运动效果
            function doMove() {
                iCurr = iCurr >= num - 1 ? 0 : iCurr + 1;                //判断并给iCurr赋值 icurr为当前屏的索引 即li的索引
                doAnimate(-moveWidth * iCurr);                           //执行动画效果到指定的屏  即li
                oFocus.eq(iCurr)                                         //获取对应的span
                    .addClass("current")                                 //给对应的span添加样式 即改变的焦点的颜色 
                    .siblings()                                          //获取该span的兄弟节点
                    .removeClass("current");                             //移除兄弟节点的样式current
            }
            //动画效果
            function doAnimate(iTarget, fn) {                            //执行动画 参数itarget为移动的像素 正负均可 正值为左移动 负值为右移动 fn为回调函数名称 可省略 主要是为了调用automove而设置的
                oMover.stop().animate({ left: iTarget }, _this.speed, function () {  //回调函数可以省略
                    if (fn) {
                        fn();
                    }
                });
            }
            //自动滚动
            function autoMove() {
                timer = setInterval(doMove, s.during);                    //定时滚动
            }
            //页面加载完毕BANNER自动滚动
            autoMove();                                                   //调用autoMove()方法
            //判断是否是移动设备
            function isMobile() {                                         //若是则返回true 否则false 用于对样式的设置
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || navigator.userAgent.indexOf('iPad') != -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //停止自动运动
            function stopMove() {
                clearInterval(timer);
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
                    clearInterval(timer);                                           //清空timer
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
