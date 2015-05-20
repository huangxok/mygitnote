// JavaScript Document

$(document).ready(function () {
    $(".list ul li").mouseover(function () {
        $(this).children("ul").show();
    })
    //背景图片
    var point = $(".x_mid_xt ul li");
    var index = 1;
    $(".x_mid_jt a.x_jt_left").click(function () {
        if (index == 1) {
            index = 5;
            point.eq(3).addClass("current").siblings().removeClass("current");
        }
        index--;
        for (var i = 0; i < index; i++) {
            point.eq(i).addClass("current").siblings().removeClass("current");
        }
        $('.x_mid_bigtp .big-pic').css('background', 'url(image/' + (index) + '.jpg)');
    });
    $(".x_mid_jt a.x_jt_right").click(function () {
        index++;
        if (index == 5) {
            index = 1;
            point.eq(0).addClass("current").siblings().removeClass("current");
        }
        for (var i = 0; i < index; i++) {
            point.eq(i).addClass("current").siblings().removeClass("current");

        }

        $('.x_mid_bigtp .big-pic').css('background', 'url(Image/' + (index) + '.jpg)');
    });
    $(".x_mid_xt ul li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        var li = $(this).index() + 1;
        $('#magnifierImg').attr('src', 'Image/' + (li) + '.jpg')
        $('.x_mid_bigtp .big-pic').css('background', 'url(Image/' + (li) + '.jpg)');
        if (index == 5) {
            index = 1;
            point.eq(0).addClass("current").siblings().removeClass("current");
        }
    })

    function getEventObject(W3CEvent) { //事件标准化函数 
        return W3CEvent || window.event;
    }

    function getPointerPosition(e) { //兼容浏览器的鼠标x,y获得函数 
        e = e || getEventObject(e);
        var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        return { 'x': x, 'y': y };
    }

    function setOpacity(elem, level) { //兼容浏览器设置透明值 
        if (elem.filters) {
            elem.style.filter = 'alpha(opacity=' + level * 100 + ')';
        } else {
            elem.style.opacity = level;
        }
    }

    function css(elem, prop) { //css设置函数,可以方便设置css值,并且兼容设置透明值 
        for (var i in prop) {
            if (i == 'opacity') {
                setOpacity(elem, prop[i]);
            } else {
                elem.style[i] = prop[i];
            }
        }
        return elem;
    }
    var magnifier = {
        m: null,
        init: function (magni) {
            var m = this.m = magni || {
                cont: null, //装载原始图像的div 
                img: null, //放大的图像 
                mag: null, //放大框  
                scale: 15 //比例值,设置的值越大放大越大,但是这里有个问题就是如果不可以整除时,会产生些很小的白边,目前不知道如何解决 
            }
            css(m.img, {
                'position': 'absolute',
                'width': (m.cont.clientWidth * m.scale) + 'px', //原始图像的宽*比例值  
                'height': (m.cont.clientHeight * m.scale) + 'px' //原始图像的高*比例值 
            }
                                                               )
            css(m.mag, {
                'display': 'none', 'width': m.cont.clientWidth + 'px', //m.cont为原始图像,与原始图像等宽 
                'height': m.cont.clientHeight + 'px',
                'position': 'absolute',
                'left': m.cont.offsetLeft + m.cont.offsetWidth + 10 + 'px', //放大框的位置为原始图像的右方远10px  
                'top': m.cont.offsetTop + 'px'
            })

            //var borderWid = m.cont.getElementsByTagName('div')[0].offsetWidth - m.cont.getElementsByTagName('div')[0].clientWidth; //获取border的宽 	
            var borderWid = $("#Browser")[0].offsetWidth - $("#Browser")[0].clientWidth; //获取border的宽 	
            css(m.cont.getElementsByTagName('div')[0], {
                //m.cont.getElementsByTagName('div')[0]为浏览框  
                'display': 'none', //开始设置为不可见  
                'width': m.cont.clientWidth / m.scale - borderWid + 'px',
                'height': m.cont.clientHeight / m.scale - borderWid + 'px',
                'opacity': 0.5
            })
            m.img.src = "Image/" + (index) + ".jpg";
            m.cont.style.cursor = 'crosshair';
            m.cont.onmouseover = magnifier.start;
        },

        start: function (e) {
            if (document.all) { //只在IE下执行,主要避免IE6的select无法覆盖 
                magnifier.createIframe(magnifier.m.img);
            }
            this.onmousemove = magnifier.move; //this指向m.cont 
            this.onmouseout = magnifier.end;
        },

        move: function (e) {
            var pos = getPointerPosition(e); //事件标准化   
            this.getElementsByTagName('div')[0].style.display = '';
            var a = this.clientHeight - this.getElementsByTagName('div')[0].offsetHeight;
            var b = Math.max(pos.y - this.offsetTop - parseInt(this.getElementsByTagName('div')[0].style.height) / 2, 0);
            css(this.getElementsByTagName('div')[0], {
                'top': Math.min(Math.max(pos.y - this.offsetTop - parseInt(this.getElementsByTagName('div')[0].style.height) / 2, 0), this.clientHeight - this.getElementsByTagName('div')[0].offsetHeight) + 'px',
                'left': Math.min(Math.max(pos.x - this.offsetLeft - parseInt(this.getElementsByTagName('div')[0].style.width) / 2, 0), this.clientWidth - this.getElementsByTagName('div')[0].offsetWidth) + 'px' //left=鼠标x - this.offsetLeft - 浏览框宽/2,Math.max和Math.min让浏览框不会超出图像 
            }
             )
            magnifier.m.mag.style.display = '';
            css(magnifier.m.img, {
                'top': -(parseInt(this.getElementsByTagName('div')[0].style.top) * magnifier.m.scale) + 'px',
                'left': -(parseInt(this.getElementsByTagName('div')[0].style.left) * magnifier.m.scale) + 'px'
            })
        },

        end: function (e) {
            this.getElementsByTagName('div')[0].style.display = 'none';
            magnifier.removeIframe(magnifier.m.img); //销毁iframe  
            magnifier.m.mag.style.display = 'none';
        },

        createIframe: function (elem) {
            var layer = document.createElement('iframe');
            layer.tabIndex = '-1';
            layer.src = 'javascript：false;';
            elem.parentNode.appendChild(layer);
            layer.style.width = elem.offsetWidth + 'px'; layer.style.height = elem.offsetHeight + 'px';
        },

        removeIframe: function (elem) {
            var layers = elem.parentNode.getElementsByTagName('iframe');
            while (layers.length > 0) {
                layers[0].parentNode.removeChild(layers[0]);
            }
        }
    }

    magnifier.init({
        cont: document.getElementById('magnifier'),
        img: document.getElementById('magnifierImg'),
        mag: document.getElementById('mag'),
        scale: 3
    });
})