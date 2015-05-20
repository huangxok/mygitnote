/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.3.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2010-01-23
 * @link    http://jscolor.com
 */


var jscolor = {


    dir: '', // location of jscolor directory (leave empty to autodetect)
    bindClass: 'color', // class name
    binding: true, // automatic binding via <input class="...">
    preloading: true, // use image preloading?


    install: function () {
        jscolor.addEvent(window, 'load', jscolor.init);
    },


    init: function () {
        if (jscolor.binding) {
            jscolor.bind();
        }
        if (jscolor.preloading) {
            jscolor.preload();
        }
    },


    getDir: function () {
        if (!jscolor.dir) {
            var detected = jscolor.detectDir();
            jscolor.dir = detected !== false ? detected : 'jscolor/';
        }
        return jscolor.dir;
    },


    detectDir: function () {
        var base = location.href;

        var e = document.getElementsByTagName('base');
        for (var i = 0; i < e.length; i += 1) {
            if (e[i].href) { base = e[i].href; }
        }

        var e = document.getElementsByTagName('script');
        for (var i = 0; i < e.length; i += 1) {
            if (e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
                var src = new jscolor.URI(e[i].src);
                var srcAbs = src.toAbsolute(base);
                srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
                srcAbs.query = null;
                srcAbs.fragment = null;
                return srcAbs.toString();
            }
        }
        return false;
    },


    bind: function () {
        var matchClass = new RegExp('(^|\\s)(' + jscolor.bindClass + ')\\s*(\\{[^}]*\\})?', 'i');
        var e = document.getElementsByTagName('input');
        for (var i = 0; i < e.length; i += 1) {
            var m;
            if (!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
                var prop = {};
                if (m[3]) {
                    try {
                        eval('prop=' + m[3]);
                    } catch (eInvalidProp) { }
                }
                e[i].color = new jscolor.color(e[i], prop);
            }
        }
    },


    preload: function () {
        for (var fn in jscolor.imgRequire) {
            if (jscolor.imgRequire.hasOwnProperty(fn)) {
                jscolor.loadImage(fn);
            }
        }
    },


    images: {
        pad: [181, 101],
        sld: [16, 101],
        cross: [15, 15],
        arrow: [7, 11]
    },


    imgRequire: {},
    imgLoaded: {},


    requireImage: function (filename) {
        jscolor.imgRequire[filename] = true;
    },


    loadImage: function (filename) {
        if (!jscolor.imgLoaded[filename]) {
            jscolor.imgLoaded[filename] = new Image();
            jscolor.imgLoaded[filename].src = jscolor.getDir() + filename;
        }
    },


    fetchElement: function (mixed) {
        return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
    },


    addEvent: function (el, evnt, func) {
        if (el.addEventListener) {
            el.addEventListener(evnt, func, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + evnt, func);
        }
    },


    fireEvent: function (el, evnt) {
        if (!el) {
            return;
        }
        if (document.createEventObject) {
            var ev = document.createEventObject();
            el.fireEvent('on' + evnt, ev);
        } else if (document.createEvent) {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent(evnt, true, true);
            el.dispatchEvent(ev);
        } else if (el['on' + evnt]) { // alternatively use the traditional event model (IE5)
            el['on' + evnt]();
        }
    },


    getElementPos: function (e) {
        var e1 = e, e2 = e;
        var x = 0, y = 0;
        if (e1.offsetParent) {
            do {
                x += e1.offsetLeft;
                y += e1.offsetTop;
            } while (e1 = e1.offsetParent);
        }
        while ((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
            x -= e2.scrollLeft;
            y -= e2.scrollTop;
        }
        return [x, y];
    },


    getElementSize: function (e) {
        return [e.offsetWidth, e.offsetHeight];
    },


    getMousePos: function (e) {
        if (!e) { e = window.event; }
        if (typeof e.pageX === 'number') {
            return [e.pageX, e.pageY];
        } else if (typeof e.clientX === 'number') {
            return [
				e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            ];
        }
    },


    getViewPos: function () {
        if (typeof window.pageYOffset === 'number') {
            return [window.pageXOffset, window.pageYOffset];
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            return [document.body.scrollLeft, document.body.scrollTop];
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
        } else {
            return [0, 0];
        }
    },


    getViewSize: function () {
        if (typeof window.innerWidth === 'number') {
            return [window.innerWidth, window.innerHeight];
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            return [document.body.clientWidth, document.body.clientHeight];
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            return [document.documentElement.clientWidth, document.documentElement.clientHeight];
        } else {
            return [0, 0];
        }
    },


    URI: function (uri) { // See RFC3986

        this.scheme = null;
        this.authority = null;
        this.path = '';
        this.query = null;
        this.fragment = null;

        this.parse = function (uri) {
            var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
            this.scheme = m[3] ? m[2] : null;
            this.authority = m[5] ? m[6] : null;
            this.path = m[7];
            this.query = m[9] ? m[10] : null;
            this.fragment = m[12] ? m[13] : null;
            return this;
        };

        this.toString = function () {
            var result = '';
            if (this.scheme !== null) { result = result + this.scheme + ':'; }
            if (this.authority !== null) { result = result + '//' + this.authority; }
            if (this.path !== null) { result = result + this.path; }
            if (this.query !== null) { result = result + '?' + this.query; }
            if (this.fragment !== null) { result = result + '#' + this.fragment; }
            return result;
        };

        this.toAbsolute = function (base) {
            var base = new jscolor.URI(base);
            var r = this;
            var t = new jscolor.URI;

            if (base.scheme === null) { return false; }

            if (r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
                r.scheme = null;
            }

            if (r.scheme !== null) {
                t.scheme = r.scheme;
                t.authority = r.authority;
                t.path = removeDotSegments(r.path);
                t.query = r.query;
            } else {
                if (r.authority !== null) {
                    t.authority = r.authority;
                    t.path = removeDotSegments(r.path);
                    t.query = r.query;
                } else {
                    if (r.path === '') { // TODO: == or === ?
                        t.path = base.path;
                        if (r.query !== null) {
                            t.query = r.query;
                        } else {
                            t.query = base.query;
                        }
                    } else {
                        if (r.path.substr(0, 1) === '/') {
                            t.path = removeDotSegments(r.path);
                        } else {
                            if (base.authority !== null && base.path === '') { // TODO: == or === ?
                                t.path = '/' + r.path;
                            } else {
                                t.path = base.path.replace(/[^\/]+$/, '') + r.path;
                            }
                            t.path = removeDotSegments(t.path);
                        }
                        t.query = r.query;
                    }
                    t.authority = base.authority;
                }
                t.scheme = base.scheme;
            }
            t.fragment = r.fragment;

            return t;
        };

        function removeDotSegments(path) {
            var out = '';
            while (path) {
                if (path.substr(0, 3) === '../' || path.substr(0, 2) === './') {
                    path = path.replace(/^\.+/, '').substr(1);
                } else if (path.substr(0, 3) === '/./' || path === '/.') {
                    path = '/' + path.substr(3);
                } else if (path.substr(0, 4) === '/../' || path === '/..') {
                    path = '/' + path.substr(4);
                    out = out.replace(/\/?[^\/]*$/, '');
                } else if (path === '.' || path === '..') {
                    path = '';
                } else {
                    var rm = path.match(/^\/?[^\/]*/)[0];
                    path = path.substr(rm.length);
                    out = out + rm;
                }
            }
            return out;
        }

        if (uri) {
            this.parse(uri);
        }

    },


    /*
	 * Usage example:
	 * var myColor = new jscolor.color(myInputElement)
	 */

    color: function (target, prop) {


        this.required = true; // refuse empty values?
        this.adjust = true; // adjust value to uniform notation?
        this.hash = true; // prefix color with # symbol?
        this.caps = true; // uppercase?
        this.valueElement = target; // value holder
        this.styleElement = target; // where to reflect current color
        this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
        this.rgb = [1, 1, 1, 1]; // read-only  0-1, 0-1, 0-1

        this.pickerOnfocus = true; // display picker on focus?
        this.pickerMode = 'HSV'; // HSV | HVS
        this.pickerPosition = 'bottom'; // left | right | top | bottom
        this.pickerFace = 10; // px
        this.pickerFaceColor = 'ThreeDFace'; // CSS color
        this.pickerBorder = 1; // px
        this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
        this.pickerInset = 1; // px
        this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
        this.pickerZIndex = 10000;


        for (var p in prop) {
            if (prop.hasOwnProperty(p)) {
                this[p] = prop[p];
            }
        }


        this.hidePicker = function () {
            if (isPickerOwner()) {
                removePicker();
            }
        };


        this.showPicker = function () {
            if (!isPickerOwner()) {
                var tp = jscolor.getElementPos(target); // target pos
                var ts = jscolor.getElementSize(target); // target size
                var vp = jscolor.getViewPos(); // view pos
                var vs = jscolor.getViewSize(); // view size
                var ps = [ // picker size
					2 * this.pickerBorder + 4 * this.pickerInset + 2 * this.pickerFace + jscolor.images.pad[0] + 2 * jscolor.images.arrow[0] + jscolor.images.sld[0],
					2 * this.pickerBorder + 2 * this.pickerInset + 2 * this.pickerFace + jscolor.images.pad[1]
                ];
                var a, b, c;
                switch (this.pickerPosition.toLowerCase()) {
                    case 'left': a = 1; b = 0; c = -1; break;
                    case 'right': a = 1; b = 0; c = 1; break;
                    case 'top': a = 0; b = 1; c = -1; break;
                    default: a = 0; b = 1; c = 1; break;
                }
                var l = (ts[b] + ps[b]) / 2;
                var pp = [ // picker pos
					-vp[a] + tp[a] + ps[a] > vs[a] ?
                                                   (
                                                       -vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 && tp[a] + ts[a] - ps[a] >= 0 ?
                                                                                                                             tp[a] + ts[a] - ps[a]
                                                                                                                            : tp[a])
                                                   :
						                           tp[a],
					-vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b] ?
						(-vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 && tp[b] + ts[b] - l - l * c >= 0 ? tp[b] + ts[b] - l - l * c : tp[b] + ts[b] - l + l * c) :
						(tp[b] + ts[b] - l + l * c >= 0 ? tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l - l * c)
                ];
                drawPicker(pp[a], pp[b]);
            }
        };


        this.importColor = function () {
            if (!valueElement) {
                this.exportColor();
            } else {
                if (!this.adjust) {
                    if (!this.fromString(valueElement.value, leaveValue)) {
                        styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                        styleElement.style.color = styleElement.jscStyle.color;
                        this.exportColor(leaveValue | leaveStyle);
                    }
                } else if (!this.required && /^\s*$/.test(valueElement.value)) {
                    valueElement.value = '';
                    styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                    styleElement.style.color = styleElement.jscStyle.color;
                    this.exportColor(leaveValue | leaveStyle);

                } else if (this.fromString(valueElement.value)) {
                    // OK
                } else {
                    this.exportColor();
                }
            }
        };


        this.exportColor = function (flags, a) {
            if (!a) {
                a = 0;
            }
            if (jscolor.picker) {
                jscolor.picker.iptcr.value = Math.round(255 * this.rgb[0]);
                jscolor.picker.iptcg.value = Math.round(255 * this.rgb[1]);
                jscolor.picker.iptcb.value = Math.round(255 * this.rgb[2]);
                jscolor.picker.iptca.value = a * 100;
                jscolor.picker.iptcav.value = a * 100;
            }
            if (!(flags & leaveValue) && valueElement) {
                //var value = this.toString();
                var value = 'rgba('
                + Math.round(255 * this.rgb[0]) + ','
                + Math.round(255 * this.rgb[1]) + ','
                + Math.round(255 * this.rgb[2]) + ','
                + a + '' +
                ')';
                //if (this.caps) { value = value.toUpperCase(); }
                //if (this.hash) { value = '#' + value; }
                valueElement.value = value;
            }
            if (!(flags & leaveStyle) && styleElement) {
                //styleElement.style.backgroundColor =
                //	'#' + this.toString();
                styleElement.style.color =
                	0.213 * this.rgb[0] +
                	0.715 * this.rgb[1] +
                	0.072 * this.rgb[2]
                	< 0.5 ? '#FFF' : '#000'
                ;
                styleElement.style.backgroundColor = 'rgba('
                + Math.round(255 * this.rgb[0]) + ','
                + Math.round(255 * this.rgb[1]) + ','
                + Math.round(255 * this.rgb[2]) + ','
                + a
                ')';
            }
            if (!(flags & leavePad) && isPickerOwner()) {
                redrawPad();
            }
            if (!(flags & leaveSld) && isPickerOwner()) {
                redrawSld();
            }
        };


        this.fromHSV = function (h, s, v, flags, a) { // null = don't change
            h < 0 && (h = 0) || h > 6 && (h = 6);
            s < 0 && (s = 0) || s > 1 && (s = 1);
            v < 0 && (v = 0) || v > 1 && (v = 1);
            this.rgb = HSV_RGB(
				h === null ? this.hsv[0] : (this.hsv[0] = h),
				s === null ? this.hsv[1] : (this.hsv[1] = s),
				v === null ? this.hsv[2] : (this.hsv[2] = v),
                a
			);
            this.exportColor(flags, a);
        };


        this.fromRGB = function (r, g, b, flags, a) { // null = don't change
            r < 0 && (r = 0) || r > 1 && (r = 1);
            g < 0 && (g = 0) || g > 1 && (g = 1);
            b < 0 && (b = 0) || b > 1 && (b = 1);
            var hsv = RGB_HSV(
				r === null ? this.rgb[0] : (this.rgb[0] = r),
				g === null ? this.rgb[1] : (this.rgb[1] = g),
				b === null ? this.rgb[2] : (this.rgb[2] = b),
                a === null ? this.rgb[3] : (this.rgb[3] = a)
			);
            if (hsv[0] !== null) {
                this.hsv[0] = hsv[0];
            }
            if (hsv[2] !== 0) {
                this.hsv[1] = hsv[1];
            }
            this.hsv[2] = hsv[2];
            this.exportColor(flags);
        };


        this.fromString = function (hex, flags) {
            var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
            if (!m) {
                return false;
            } else {
                if (m[1].length === 6) { // 6-char notation
                    this.fromRGB(
						parseInt(m[1].substr(0, 2), 16) / 255,
						parseInt(m[1].substr(2, 2), 16) / 255,
						parseInt(m[1].substr(4, 2), 16) / 255,
						flags
					);
                } else { // 3-char notation
                    this.fromRGB(
						parseInt(m[1].charAt(0) + m[1].charAt(0), 16) / 255,
						parseInt(m[1].charAt(1) + m[1].charAt(1), 16) / 255,
						parseInt(m[1].charAt(2) + m[1].charAt(2), 16) / 255,
						flags
					);
                }
                return true;
            }
        };


        this.toString = function () {
            return (
				(0x100 | Math.round(255 * this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255 * this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255 * this.rgb[2])).toString(16).substr(1)
			);
        };


        function RGB_HSV(r, g, b) {
            var n = Math.min(Math.min(r, g), b);
            var v = Math.max(Math.max(r, g), b);
            var m = v - n;
            if (m === 0) { return [null, 0, v]; }
            var h = r === n ? 3 + (b - g) / m : (g === n ? 5 + (r - b) / m : 1 + (g - r) / m);
            return [h === 6 ? 0 : h, m / v, v];
        }


        function HSV_RGB(h, s, v, a) {
            if (h === null) { return [v, v, v]; }
            var i = Math.floor(h);
            var f = i % 2 ? h - i : 1 - (h - i);
            var m = v * (1 - s);
            var n = v * (1 - s * f);
            switch (i) {
                case 6:
                case 0: return [v, n, m, a];
                case 1: return [n, v, m, a];
                case 2: return [m, v, n, a];
                case 3: return [m, n, v, a];
                case 4: return [n, m, v, a];
                case 5: return [v, m, n, a];
            }
        }


        function removePicker() {
            delete jscolor.picker.owner;
            document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
        }


        function drawPicker(x, y) {
            if (!jscolor.picker) {
                jscolor.picker = {
                    box: document.createElement('div'),   //次最外层的框 与boxB等大的 
                    boxB: document.createElement('div'),  //最外层的框 用于相对于input 定位
                    pad: document.createElement('div'),   //图片的背景的div
                    padB: document.createElement('div'),  //左边鼠标移动的区域
                    padM: document.createElement('div'),  //鼠标拾色时的十字架div背景
                    sld: document.createElement('div'),   //右边slide单个渐变的集合div
                    sldB: document.createElement('div'),  //sld的外层div
                    sldM: document.createElement('div'),   //箭头的div
                    optB: document.createElement('div'),
                    optb: document.createElement('div'),
                    optcr: document.createElement('div'),
                    optcg: document.createElement('div'),
                    optcb: document.createElement('div'),
                    optca: document.createElement('div'),
                    iptcr: document.createElement('input'),
                    iptcg: document.createElement('input'),
                    iptcb: document.createElement('input'),
                    iptca: document.createElement('input'),
                    iptcav: document.createElement('input')
                };
                //渐变的单个div
                for (var i = 0, segSize = 4; i < jscolor.images.sld[1]; i += segSize) {
                    var seg = document.createElement('div');
                    seg.style.height = segSize + 'px';
                    seg.style.fontSize = '1px';
                    seg.style.lineHeight = '0';
                    jscolor.picker.sld.appendChild(seg);
                }

                jscolor.picker.sldB.appendChild(jscolor.picker.sld); //将渐变的集合div                   放入   集合中
                jscolor.picker.box.appendChild(jscolor.picker.sldB); //将渐变的集合div                   放入   外层div中
                jscolor.picker.box.appendChild(jscolor.picker.sldM); //将渐变区域选色的按钮               放入   box
                jscolor.picker.padB.appendChild(jscolor.picker.pad); //将颜色区域pad(颜色背景图的div)     放入   外层padB  
                jscolor.picker.box.appendChild(jscolor.picker.padB); //将颜色区域padB(带有灰色边框的div)  放入   box
                jscolor.picker.box.appendChild(jscolor.picker.padM); //将颜色区域的十字架padM 放入        放入   box
                jscolor.picker.optcr.appendChild(jscolor.picker.iptcr);
                jscolor.picker.optcg.appendChild(jscolor.picker.iptcg);
                jscolor.picker.optcb.appendChild(jscolor.picker.iptcb);
                jscolor.picker.optca.appendChild(jscolor.picker.iptcav);
                jscolor.picker.optca.appendChild(jscolor.picker.iptca);
                jscolor.picker.optb.appendChild(jscolor.picker.optcr);
                jscolor.picker.optb.appendChild(jscolor.picker.optcg);
                jscolor.picker.optb.appendChild(jscolor.picker.optcb);
                jscolor.picker.optb.appendChild(jscolor.picker.optca);
                jscolor.picker.optB.appendChild(jscolor.picker.optb);
                jscolor.picker.box.appendChild(jscolor.picker.optB);
                jscolor.picker.boxB.appendChild(jscolor.picker.box); //将box                             放入  最外层的框 
            }

            var picker = p = jscolor.picker;

            // recompute controls positions
            posPad = [
				x + THIS.pickerBorder + THIS.pickerFace + THIS.pickerInset,
				y + THIS.pickerBorder + THIS.pickerFace + THIS.pickerInset];
            posSld = [
				null,
				y + THIS.pickerBorder + THIS.pickerFace + THIS.pickerInset];

            // controls interaction
            p.box.onmouseup =
			p.box.onmouseout = function () { target.focus(); };
            p.box.onmousedown = function () { abortBlur = true; };
            p.box.onmousemove = function (e) { holdPad && setPad(e); holdSld && setSld(e); };
            p.padM.onmouseup =
			p.padM.onmouseout = function () { if (holdPad) { holdPad = false; jscolor.fireEvent(valueElement, 'change'); } };
            p.padM.onmousedown = function (e) { holdPad = true; setPad(e); };
            p.sldM.onmouseup =
			p.sldM.onmouseout = function () { if (holdSld) { holdSld = false; jscolor.fireEvent(valueElement, 'change'); } };
            p.sldM.onmousedown = function (e) { holdSld = true; setSld(e); };
            //p.iptca.onchange = function (e) { p.iptcav.value = p.iptca.value; };
            (function () {
                p.iptca.addEventListener('change', redraw, false);
                function redraw() {
                    p.iptcav.value = p.iptca.value;
                    redrawPad();
                    redrawSld();
                }
            })()
            // picker
            p.box.style.width = 4 * THIS.pickerInset + 2 * THIS.pickerFace + jscolor.images.pad[0] + 2 * jscolor.images.arrow[0] + jscolor.images.sld[0] + 100 + 'px';
            p.box.style.height = 2 * THIS.pickerInset + 2 * THIS.pickerFace + jscolor.images.pad[1] + 'px';

            // picker border
            p.boxB.style.position = 'absolute';
            p.boxB.style.clear = 'both';
            p.boxB.style.left = x + 'px';
            p.boxB.style.top = y + 'px';
            p.boxB.style.zIndex = THIS.pickerZIndex;
            p.boxB.style.border = THIS.pickerBorder + 'px solid';
            p.boxB.style.borderColor = THIS.pickerBorderColor;
            p.boxB.style.background = THIS.pickerFaceColor;

            // pad image
            p.pad.style.width = jscolor.images.pad[0] + 'px';
            p.pad.style.height = jscolor.images.pad[1] + 'px';

            // pad border
            p.padB.style.position = 'absolute';
            p.padB.style.left = THIS.pickerFace + 'px';
            p.padB.style.top = THIS.pickerFace + 'px';
            p.padB.style.border = THIS.pickerInset + 'px solid';
            p.padB.style.borderColor = THIS.pickerInsetColor;

            // pad mouse area
            p.padM.style.position = 'absolute';
            p.padM.style.left = '0';
            p.padM.style.top = '0';
            p.padM.style.width = THIS.pickerFace + 2 * THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
            p.padM.style.height = p.box.style.height;
            p.padM.style.cursor = 'crosshair';

            // slider image
            p.sld.style.overflow = 'hidden';
            p.sld.style.width = jscolor.images.sld[0] + 'px';
            p.sld.style.height = jscolor.images.sld[1] + 'px';

            // slider border
            p.sldB.style.position = 'absolute';
            //p.sldB.style.right = THIS.pickerFace + 'px';
            p.sldB.style.right = (THIS.pickerFace + 100) + 'px';
            p.sldB.style.top = THIS.pickerFace + 'px';
            p.sldB.style.border = THIS.pickerInset + 'px solid';
            p.sldB.style.borderColor = THIS.pickerInsetColor;

            // slider mouse area
            p.sldM.style.position = 'absolute';
            p.sldM.style.right = 100 + "px";
            p.sldM.style.top = '0';
            p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2 * THIS.pickerInset + 'px';
            p.sldM.style.height = p.box.style.height;
            try {
                p.sldM.style.cursor = 'pointer';
            } catch (eOldIE) {
                p.sldM.style.cursor = 'hand';
            }

            // options boxB --- optB
            p.optB.style.position = 'absolute';
            p.optB.style.right = '0';
            p.optB.style.top = THIS.pickerFace;
            p.optB.style.width = 100 + 'px';
            p.optB.style.height = p.box.style.height;

            //options boxb -- optb     
            p.optb.style.padding = 10 + 'px';
            p.optb.style.width = 100 + 'px';
            p.optb.style.height = 123 + 'px';

            p.iptcr.type = 'text';
            p.iptcr.maxLength = 3;
            p.iptcr.size = 3;
            p.iptcr.style.width = 80 + "px";

            p.iptcg.type = 'text';
            p.iptcg.maxLength = 3;
            p.iptcg.size = 3;
            p.iptcg.style.width = 80 + "px";

            p.iptcb.type = 'text';
            p.iptcb.maxLength = 3;
            p.iptcb.size = 3;
            p.iptcb.style.width = 80 + "px";

            p.iptca.type = 'range';
            p.iptca.defaultValue = 100;
            p.iptca.min = 0;
            p.iptca.max = 100;
            p.iptca.step = 10;
            p.iptca.style.width = 60 + "px";
            p.iptca.style.cssFloat = 'left';

            p.iptcav.type = 'text';
            p.iptcav.value = 0;
            p.iptcav.maxLength = 3;
            p.iptcav.size = 3;
            p.iptcav.style.width = 20 + "px";
            p.iptcav.style.cssFloat = 'left';
            p.iptcav.value = p.iptca.defaultValue;




            // load images in optimal order
            switch (modeID) {
                case 0: var padImg = 'hs.png'; break;
                case 1: var padImg = 'hv.png'; break;
            }
            p.padM.style.background = "url('" + jscolor.getDir() + "cross.gif') no-repeat";
            p.sldM.style.background = "url('" + jscolor.getDir() + "arrow.gif') no-repeat";
            p.pad.style.background = "url('" + jscolor.getDir() + padImg + "') 0 0 no-repeat";

            // place pointers
            redrawPad();
            redrawSld();

            jscolor.picker.owner = THIS;
            document.getElementsByTagName('body')[0].appendChild(p.boxB); //将生成好的颜色选择插件放入body的最后
        }


        function redrawPad() {
            // redraw the pad pointer
            switch (modeID) {
                case 0: var yComponent = 1; break;
                case 1: var yComponent = 2; break;
            }
            var x = Math.round((THIS.hsv[0] / 6) * (jscolor.images.pad[0] - 1));
            var y = Math.round((1 - THIS.hsv[yComponent]) * (jscolor.images.pad[1] - 1));
            jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace + THIS.pickerInset + x - Math.floor(jscolor.images.cross[0] / 2)) + 'px ' +
				(THIS.pickerFace + THIS.pickerInset + y - Math.floor(jscolor.images.cross[1] / 2)) + 'px';

            // redraw the slider image
            var seg = jscolor.picker.sld.childNodes;

            switch (modeID) {
                case 0:
                    var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
                    for (var i = 0; i < seg.length; i += 1) {
                        //seg[i].style.backgroundColor = 'rgba(149,149,149,1)'
                        seg[i].style.backgroundColor = 'rgba(' +
                        	(rgb[0] * (1 - i / seg.length) * 100) + '%,' +
                        	(rgb[1] * (1 - i / seg.length) * 100) + '%,' +
                        	(rgb[2] * (1 - i / seg.length) * 100) + '%,' +
                             jscolor.picker.iptcav.value / 100 + ')'
                        ;
                    }
                    break;
                case 1:
                    var rgb, s, c = [THIS.hsv[2], 0, 0];
                    var i = Math.floor(THIS.hsv[0]);
                    var f = i % 2 ? THIS.hsv[0] - i : 1 - (THIS.hsv[0] - i);
                    switch (i) {
                        case 6:
                        case 0: rgb = [0, 1, 2]; break;
                        case 1: rgb = [1, 0, 2]; break;
                        case 2: rgb = [2, 0, 1]; break;
                        case 3: rgb = [2, 1, 0]; break;
                        case 4: rgb = [1, 2, 0]; break;
                        case 5: rgb = [0, 2, 1]; break;
                    }
                    for (var i = 0; i < seg.length; i += 1) {
                        s = 1 - 1 / (seg.length - 1) * i;
                        c[1] = c[0] * (1 - s * f);
                        c[2] = c[0] * (1 - s);
                        seg[i].style.backgroundColor = 'rgba(167,167,167,1)'
                        seg[i].style.backgroundColor = 'rgba(' +
                        	(c[rgb[0]] * 100) + '%,' +
                        	(c[rgb[1]] * 100) + '%,' +
                        	(c[rgb[2]] * 100) + '%,' +
                             jscolor.picker.iptcav.value / 100 +
                        ')'
                        ;
                    }
                    break;
            }
        }


        function redrawSld() {
            // redraw the slider pointer
            switch (modeID) {
                case 0: var yComponent = 2; break;
                case 1: var yComponent = 1; break;
            }
            var y = Math.round((1 - THIS.hsv[yComponent]) * (jscolor.images.sld[1] - 1));
            jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace + THIS.pickerInset + y - Math.floor(jscolor.images.arrow[1] / 2)) + 'px';
        }


        function isPickerOwner() {
            return jscolor.picker && jscolor.picker.owner === THIS;
        }


        function blurTarget() {
            if (valueElement === target) {
                THIS.importColor();
            }
            if (THIS.pickerOnfocus) {
                THIS.hidePicker();
            }
        }


        function blurValue() {
            if (valueElement !== target) {
                THIS.importColor();
            }
        }


        function setPad(e) {
            var posM = jscolor.getMousePos(e);
            var x = posM[0] - posPad[0];
            var y = posM[1] - posPad[1];
            var a = jscolor.picker.iptcav.value / 100;
            jscolor.picker.iptca.value = jscolor.picker.iptcav.value / 100;
            switch (modeID) {
                case 0: THIS.fromHSV(x * (6 / (jscolor.images.pad[0] - 1)), 1 - y / (jscolor.images.pad[1] - 1), null, leaveSld, a); break;
                case 1: THIS.fromHSV(x * (6 / (jscolor.images.pad[0] - 1)), null, 1 - y / (jscolor.images.pad[1] - 1), leaveSld, a); break;
            }
        }


        function setSld(e) {
            var posM = jscolor.getMousePos(e);
            var y = posM[1] - posPad[1];
            var a = jscolor.picker.iptcav.value / 100;
            jscolor.picker.iptca.value = jscolor.picker.iptcav.value / 100;
            switch (modeID) {
                case 0: THIS.fromHSV(null, null, 1 - y / (jscolor.images.sld[1] - 1), leavePad, a); break;
                case 1: THIS.fromHSV(null, 1 - y / (jscolor.images.sld[1] - 1), null, leavePad, a); break;
            }
        }


        var THIS = this;
        var modeID = this.pickerMode.toLowerCase() === 'hvs' ? 1 : 0;
        var abortBlur = false;
        var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
        var
			holdPad = false,
			holdSld = false;
        var
			posPad,
			posSld;
        var
			leaveValue = 1 << 0,
			leaveStyle = 1 << 1,
			leavePad = 1 << 2,
			leaveSld = 1 << 3;

        // target
        jscolor.addEvent(target, 'focus', function () {
            if (THIS.pickerOnfocus) { THIS.showPicker(); }
        });

        jscolor.addEvent(target, 'blur', function () {
            if (!abortBlur) {
                window.setTimeout(function () { abortBlur || blurTarget(); abortBlur = false; }, 0);
            } else {
                abortBlur = false;
            }
        });

        // valueElement
        if (valueElement) {
            var updateField = function () {
                THIS.fromString(valueElement.value, leaveValue);
            };
            jscolor.addEvent(valueElement, 'keyup', updateField);
            jscolor.addEvent(valueElement, 'input', updateField);
            jscolor.addEvent(valueElement, 'blur', blurValue);
            valueElement.setAttribute('autocomplete', 'off');
        }

        // styleElement
        if (styleElement) {
            styleElement.jscStyle = {
                backgroundColor: styleElement.style.backgroundColor,
                color: styleElement.style.color
            };
        }

        // require images
        switch (modeID) {
            case 0: jscolor.requireImage('hs.png'); break;
            case 1: jscolor.requireImage('hv.png'); break;
        }
        jscolor.requireImage('cross.gif');
        jscolor.requireImage('arrow.gif');

        this.importColor();
    }

};


jscolor.install();
