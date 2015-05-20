// JavaScript Document

$(document).ready(function () {
    $(".list ul li").mouseover(function () {
        $(this).children("ul").show();
    })
    //����ͼƬ
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

    function getEventObject(W3CEvent) { //�¼���׼������ 
        return W3CEvent || window.event;
    }

    function getPointerPosition(e) { //��������������x,y��ú��� 
        e = e || getEventObject(e);
        var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        return { 'x': x, 'y': y };
    }

    function setOpacity(elem, level) { //�������������͸��ֵ 
        if (elem.filters) {
            elem.style.filter = 'alpha(opacity=' + level * 100 + ')';
        } else {
            elem.style.opacity = level;
        }
    }

    function css(elem, prop) { //css���ú���,���Է�������cssֵ,���Ҽ�������͸��ֵ 
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
                cont: null, //װ��ԭʼͼ���div 
                img: null, //�Ŵ��ͼ�� 
                mag: null, //�Ŵ��  
                scale: 15 //����ֵ,���õ�ֵԽ��Ŵ�Խ��,���������и���������������������ʱ,�����Щ��С�İױ�,Ŀǰ��֪����ν�� 
            }
            css(m.img, {
                'position': 'absolute',
                'width': (m.cont.clientWidth * m.scale) + 'px', //ԭʼͼ��Ŀ�*����ֵ  
                'height': (m.cont.clientHeight * m.scale) + 'px' //ԭʼͼ��ĸ�*����ֵ 
            }
                                                               )
            css(m.mag, {
                'display': 'none', 'width': m.cont.clientWidth + 'px', //m.contΪԭʼͼ��,��ԭʼͼ��ȿ� 
                'height': m.cont.clientHeight + 'px',
                'position': 'absolute',
                'left': m.cont.offsetLeft + m.cont.offsetWidth + 10 + 'px', //�Ŵ���λ��Ϊԭʼͼ����ҷ�Զ10px  
                'top': m.cont.offsetTop + 'px'
            })

            //var borderWid = m.cont.getElementsByTagName('div')[0].offsetWidth - m.cont.getElementsByTagName('div')[0].clientWidth; //��ȡborder�Ŀ� 	
            var borderWid = $("#Browser")[0].offsetWidth - $("#Browser")[0].clientWidth; //��ȡborder�Ŀ� 	
            css(m.cont.getElementsByTagName('div')[0], {
                //m.cont.getElementsByTagName('div')[0]Ϊ�����  
                'display': 'none', //��ʼ����Ϊ���ɼ�  
                'width': m.cont.clientWidth / m.scale - borderWid + 'px',
                'height': m.cont.clientHeight / m.scale - borderWid + 'px',
                'opacity': 0.5
            })
            m.img.src = "Image/" + (index) + ".jpg";
            m.cont.style.cursor = 'crosshair';
            m.cont.onmouseover = magnifier.start;
        },

        start: function (e) {
            if (document.all) { //ֻ��IE��ִ��,��Ҫ����IE6��select�޷����� 
                magnifier.createIframe(magnifier.m.img);
            }
            this.onmousemove = magnifier.move; //thisָ��m.cont 
            this.onmouseout = magnifier.end;
        },

        move: function (e) {
            var pos = getPointerPosition(e); //�¼���׼��   
            this.getElementsByTagName('div')[0].style.display = '';
            var a = this.clientHeight - this.getElementsByTagName('div')[0].offsetHeight;
            var b = Math.max(pos.y - this.offsetTop - parseInt(this.getElementsByTagName('div')[0].style.height) / 2, 0);
            css(this.getElementsByTagName('div')[0], {
                'top': Math.min(Math.max(pos.y - this.offsetTop - parseInt(this.getElementsByTagName('div')[0].style.height) / 2, 0), this.clientHeight - this.getElementsByTagName('div')[0].offsetHeight) + 'px',
                'left': Math.min(Math.max(pos.x - this.offsetLeft - parseInt(this.getElementsByTagName('div')[0].style.width) / 2, 0), this.clientWidth - this.getElementsByTagName('div')[0].offsetWidth) + 'px' //left=���x - this.offsetLeft - ������/2,Math.max��Math.min������򲻻ᳬ��ͼ�� 
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
            magnifier.removeIframe(magnifier.m.img); //����iframe  
            magnifier.m.mag.style.display = 'none';
        },

        createIframe: function (elem) {
            var layer = document.createElement('iframe');
            layer.tabIndex = '-1';
            layer.src = 'javascript��false;';
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