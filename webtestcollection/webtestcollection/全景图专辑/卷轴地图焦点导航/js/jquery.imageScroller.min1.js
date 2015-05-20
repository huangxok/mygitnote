(function(a) {
    a.fn.imageScroller = function(m) {
        var j = a.extend({}, a.fn.imageScroller.defaults, m);
        return this.each(function() {
            var c = a(this), f = a.meta ? a.extend({}, j, c.data()) : j, k = c.height(), g = c.find(f.preview), n = g.offset(), e = g.width(), l = c.find("img" + f.featureImg), h = l.width();
            c = k / h;
            var i = Math.round(e * c);
            if (h > k) {
                var d = a("<span/>", {
                    "class": "indicator",
                    css: {
                        opacity: 0.4,
                        height: 90,
                        left: 251
                    }
                });
                a("<span/>", {
                    text: f.indicatorText
                }).appendTo(d);
                d.appendTo(g);
                
                d.bind({
                    mousedown: function(o) {
                    
                        var p = d.offset();
                        a(document).bind({
                            "mousemove.dragging": function(b) {
                                b = b.pageX - n.left - (o.pageX - p.left);
                                if (b <= 0) 
                                    b = 0;
                                else if (b >= e - i - 75) 
                                    b = e - i - 75;
                                d.css("left", b);
                                l.stop().animate({
                                    left: "-" + Math.round(b / e * h)
                                }, 10)
                            },
                            mouseup: function() {
                                a(document).unbind("mousemove.dragging")
                            }
                        })
                        
                        var target = document.getElementById("image");
                        setSelected(target, false);
                    }
                })
            }
        })
    };
    a.fn.imageScroller.defaults = {
        preview: ".preview",
        featureImg: ".feature-image",
        indicatorText: "点击拖动"
    }
})(jQuery);

function setSelected(target, boo) {
    //设置文字是否可以复制boo=true时可以复制，否则禁止复制
    if (typeof target.onselectstart != "undefined") { //IE
        target.onselectstart = function() {
            return boo;
        }
    } else if (typeof target.style.MozUserSelect != "undefined") { //Firefox 
        /*MozUserSelect有三个值:
         *1.none表示所有子元素都不能被选择
         *2.-moz-all子元素的所有文字都可以被选择
         *3.-moz-none子元素的所有文字都不能选择，但input除外
         */
        if (boo) 
            target.style.MozUserSelect = "-moz-all";
        else 
            target.style.MozUserSelect = "none";
    } else { //other
        target.onmousedown = function() {
            return boo;
        }
    }
}
