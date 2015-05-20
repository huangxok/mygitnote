  /**
   * @fileoverview
   *
   * @description Is JavaScript Framework
   */


  /**
   * @description 构造函数
   */
  var Is = function() {


    if(this === window) {
      return new Is.node(arguments[0]);
    }


    var _getBrowser = function() {
      var ua = navigator.userAgent;
      var b;
      if(b = ua.match(/msie ([\d.]+)/i            )) return {toString : function() {return "Internet Explorer " + b[1]}, valueOf : function() {return (1 + b[1]).replace(/\./g, '')}}
      if(b = ua.match(/firefox\/([\d.]+)/i        )) return {toString : function() {return "Firefox "           + b[1]}, valueOf : function() {return (2 + b[1]).replace(/\./g, '')}}
      if(b = ua.match(/version\/([\d.]+).*safari/i)) return {toString : function() {return "Safari "            + b[1]}, valueOf : function() {return (3 + b[1]).replace(/\./g, '')}}
      if(b = ua.match(/opera.([\d.]+)/i           )) return {toString : function() {return "Opera "             + b[1]}, valueOf : function() {return (4 + b[1]).replace(/\./g, '')}}
      if(b = ua.match(/chrome\/([\d.]+)/i         )) return {toString : function() {return "Chrome "            + b[1]}, valueOf : function() {return (5 + b[1]).replace(/\./g, '')}}
    };


    var _getCookie = function() {
      return _afreshAccess(document.cookie);
    };


    var _getDocument = function(e/* element */) {
      return e ? e.ownerDocument || e.document || e : document;
    };


    var _getDocumentScroll = function(e/* element */) {
      var d = _getDocument(e);
      return {
        x : d.documentElement.scrollLeft || d.body.scrollLeft || 0,
        y : d.documentElement.scrollTop  || d.body.scrollTop  || 0
      };
    };


    var _getDocumentSize = function(e/* element */) {
      var d = _getDocument(e);
      var w = _getWindow(e);
      return {
        width  : w.innerWidth  || d.documentElement.clientWidth  || d.body.clientWidth  || 0,
        height : w.innerHeight || d.documentElement.clientHeight || d.body.clientHeight || 0
      };
    };


    var _getElement = function(i/* id */, w/* window */) {
      return typeof i == "string" ? (w || window).document.getElementById(i) : i;
    };


    var _getElementPosition = function(i/* id */, w/* window */) {
      for(var i = _getElement(i, w), j = i.scrollLeft, k = i.scrollTop; i && i != (w || window).document.body; i = i.offsetParent) {
        j += i.offsetLeft - i.scrollLeft;
        k += i.offsetTop  - i.scrollTop ;
      }
      return {
        left : j,
        top  : k
      };
    };


    var _getElementStyle = function(i/* id */, w/* window */) {
      return _getElement(i, w).currentStyle || (w || window).getComputedStyle(_getElement(i, w), null);
    };


    var _getWindow = function(e/* element */) {
      return e ? _getDocument(e).defaultView || _getDocument(e).parentWindow || window : window;
    };


    var _forBubble = function(e/* event */, f/* function */) {
      for(var i = e.target || e.srcElement; i && i.nodeType == 1; i = i.parentNode) {
        if(f(i)) {
          return i;
        }
      }
    };


    var _forElement = function(e/* element */, f/* function */) {
      for(var i = e.firstChild, j = i && i.nextSibling; i; i = j, j = i && i.nextSibling) {
        _forElement(i, f);
      }
      if(e.nodeType == 1 && !e.getAttribute("nofor")) {
        f(e);
      }
    };


    var _forSibling = function(e/* element */, f/* function */) {
      for(var i = ((e || {}).parentNode || {}).firstChild, j = i && i.nextSibling; i; i = j, j = i && i.nextSibling) {
        if(i.nodeType == 1 && !i.getAttribute("nofor")) {
          f(i);
        }
      }
    };


    var _cancelBubble = function(e/* event */) {
      if(e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    };


    var _cancelDefault = function(e/* event */) {
      if(e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    };


    var _usableCookie = function() {
      return navigator.cookieEnabled;
    };


    var _createAnimate = function(a/* animate */, p/* param */) {
      p.timer = setInterval(function() {
        if(p.elapse) {
          p.elapse += p.interval;
        } else {
          p.elapse = p.interval;
        }
        if(p.method) {
          p.method(p);
        }
        for(var i in a) {
          try {
            p.element.style[i] = a[i](p);
          } catch(error) {
            continue;
          }
        }
        if(p.duration <= p.elapse) {
          clearInterval(p.timer);
        }
      }, p.interval);
    };


    var _createElement = function(t/* tagName */, a/* attribute */, c/* child */, r/* refer */) {
      var d = _getDocument(r);
      var e = d.createElement(t);
      if(a && a.constructor != Object) {
        c = a;
        a = undefined;
      }
      if(a) {
        for(var i in a) {
          switch(i) {
            case "style"       : {e.style.cssText = a[i]; continue}
            case "class"       : {e.className     = a[i]; continue}
            case "inner"       : {e.innerHTML     = a[i]; continue}
            case "onclick"     : {e.onclick       = a[i]; continue}
            case "ondblclick"  : {e.ondblclick    = a[i]; continue}
            case "onfocus"     : {e.onfocus       = a[i]; continue}
            case "onblur"      : {e.onblur        = a[i]; continue}
            case "onchange"    : {e.onchange      = a[i]; continue}
            case "onmouseover" : {e.onmouseover   = a[i]; continue}
            case "onmouseout"  : {e.onmouseout    = a[i]; continue}
            case "onmousedown" : {e.onmousedown   = a[i]; continue}
            case "onmouseup"   : {e.onmouseup     = a[i]; continue}
            case "onkeypress"  : {e.onkeypress    = a[i]; continue}
            case "onkeydown"   : {e.onkeydown     = a[i]; continue}
            case "onkeyup"     : {e.onkeyup       = a[i]; continue}
            default : {e.setAttribute(i, a[i], false)}
          }
        }
      }
      if(c) {
        if(c.constructor == Array) {
          for(var i = 0; i < c.length; i++) {
            if(c[i].constructor == String) {
              c[i] = d.createTextNode(c[i]);
            }
            e.appendChild(c[i]);
          }
        } else if(c.constructor == String) {
          e.appendChild(d.createTextNode(c));
        } else {
          e.appendChild(c);
        }
      }
      return e;
    };


    var _createRequest = function() {
      try {
        return new XMLHttpRequest();
      } catch(error) {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch(error) {
          return new ActiveXObject("Msxml2.XMLHTTP");
        }
      }
    };


    var _createXMLDocument = function() {
      try {
        return document.implementation.createDocument("", "", null);
      } catch(error) {
        return new ActiveXObject("MSXML2.DOMDocument");
      }
    };


    var _attachEvent = function(t/* target */, e/* event */) {
      if(document.addEventListener) {
        for(var i in e) {
          t.addEventListener(i, e[i], false);
        }
      } else if(document.attachEvent) {
        for(var i in e) {
          t.attachEvent("on" + i, e[i]);
        }
      }
    };


    var _detachEvent = function(t/* target */, e/* event */) {
      if(document.removeEventListener) {
        for(var i in e) {
          t.removeEventListener(i, e[i], false);
        }
      } else if(document.detachEvent) {
        for(var i in e) {
          t.detachEvent("on" + i, e[i]);
        }
      }
    };


    var _afreshAccess = function(a/* access */, i/* innerJoin */, r/* rightJoin */) {
      if(a.constructor == String) {
        var d = {};
        var r = new RegExp("([\\w\\-]+?)(?:" + (i || "=") + ")([^" + (r || ";") + "]+)", "g");
        while(r.test(a)) {
          d[RegExp.$1] = decodeURIComponent(RegExp.$2);
        }
        return d;
      } else {
        var d = "";
        for(var j in a) {
          d += j + (i || "=") + encodeURIComponent(a[j]) + (r || ";");
        }
        return d;
      }
    };


    var _afreshCookie = function(a/* access */, e/* expires */, p/* path */, d/* domain */, s/* secure */) {
      for(var i in a) {
        document.cookie = (i + "=" + encodeURIComponent(a[i])) + (e ? "; expires=" + new Date(new Date().getTime() + e * 1000).toGMTString() + "; max-age=" + e : "") + (p ? "; path=" + p : "") + (d ? "; domain=" + d : "") + (s ? "; secure" : "");
      }
    };


    var _plugin = function(n/* name */, p/* param */) {
      if(Is.bin[n]) {
        return Is.bin[n].call(this, this, p);
      } else {
        throw new Error("'" + n + "' Plugin Undefined");
      }
    };


    this.getBrowser         = _getBrowser         ;
    this.getCookie          = _getCookie          ;
    this.getDocument        = _getDocument        ;
    this.getDocumentScroll  = _getDocumentScroll  ;
    this.getDocumentSize    = _getDocumentSize    ;
    this.getElement         = _getElement         ;
    this.getElementPosition = _getElementPosition ;
    this.getElementStyle    = _getElementStyle    ;
    this.getWindow          = _getWindow          ;
    this.forBubble          = _forBubble          ;
    this.forElement         = _forElement         ;
    this.forSibling         = _forSibling         ;
    this.cancelBubble       = _cancelBubble       ;
    this.cancelDefault      = _cancelDefault      ;
    this.usableCookie       = _usableCookie       ;
    this.createAnimate      = _createAnimate      ;
    this.createElement      = _createElement      ;
    this.createRequest      = _createRequest      ;
    this.createXMLDocument  = _createXMLDocument  ;
    this.attachEvent        = _attachEvent        ;
    this.detachEvent        = _detachEvent        ;
    this.afreshAccess       = _afreshAccess       ;
    this.afreshCookie       = _afreshCookie       ;
    this.plugin             = _plugin             ;


  };


  /**
   * @description 配置对象
   */
  Is.cfg = {};


  /**
   * @description 常用对象
   */
  Is.com = {};


  /**
   * @description 插件对象
   */
  Is.bin = {};


  /**
   * @description 节点选择器
   */
  Is.node = function(p/* path */) {
    if(typeof p === 'string') {
      this.element = Is.select(p, document.body);
    } else {
      this.element = [p];
    }
  };

  Is.node.prototype = {

    echo : function(f/* function */) {

      //元素遍历
      for(var i = 0, j = this.element.length; i < j; i++) {
        f.call(this, this.element[i]);
      }

      return this;
    },

    html : function(h/* html */) {

      //行为判断
      if(typeof h === 'string') {
        var f = function(e) {
          e.innerHTML = h;
        };
      } else {
        var f = function(e) {
          h(e.innerHTML);
        };
      }

      //元素遍历
      this.echo(f);

      return this;
    },

    attr : function(a/* attr */, f/* function */) {

      //行为判断
      if(typeof a === 'string') {
        var _f = function(e) {
          f(e.getAttribute(a));
        };
      } else {
        var _f = function(e) {
          for(var i in a) {
            e.setAttribute(i, a[i]);
          }
        }
      }

      //元素遍历
      this.echo(_f);

      return this;
    },

    value : function(v/* value */) {

      //判断行为
      if(typeof v === 'string') {
        var _f = function(e) {
          e.setAttribute('value', v);
        };
      } else {
        var _f = function(e) {
          v(e.getAttribute('value'));
        };
      }

      //元素遍历
      this.echo(_f);

      return this;
    },

    style : function(s/* style */, f/* function */) {

      //行为判断
      if(typeof s === 'string') {
        var _f = function(e) {
          f(e.currentStyle[s] || window.getComputedStyle(e, null)[s]);
        };
      } else {
        var _f = function(e) {
          for(var i in s) {
            e.style[i] = s[i];
          }
        };
      }

      //元素遍历
      this.echo(_f);

      return this;
    },

    attachEvent : function(e/* event */, f/* function */) {

      //定义函数
      var _f = function(_e) {
        if(document.addEventListener) {
          _e.addEventListener(e, f, false);
        } else if(document.attachEvent) {
          _e.attachEvent("on" + e, f);
        }
      };

      //元素遍历
      this.echo(_f);

      return this;
    },

    detachEvent : function(e/* event */, f/* function */) {

      //定义函数
      var _f = function(_e) {
        if(document.addEventListener) {
          _e.removeEventListener(e, f, false);
        } else if(document.attachEvent) {
          _e.detachEvent("on" + e, f);
        }
      };

      //元素遍历
      this.echo(_f);

      return this;
    }

  };


  /**
   * @description 节点选择器
   */
  Is.select = function(p/* path */, r/* root */) {

    //定义集合
    var path                  = [];
    var node                  = [];
    var select                = [];

    //定义正则
    var pathRegExp            = null;
    var forPathRegExp         = /(\/\/|\/)(\w+|\*)(?:\[(.+?)\])?(?:\/(\.+))?/g;
    var replacePathRegExp     = /\=>|\=|&|\|/g;
    var replaceCalcRegExp     = /(@|\b)(.+?)(?: ?)($|\)|&|\|)/g;
    var replaceAttrRegExp     = /(\w+)(\=\=|>\=|<\=|\!\=|>|<)?([^$]+)?/;
    var replaceNumberRegExp   = /^(\d+)(?: +)?$/;
    var replaceFirstRegExp    = /first/g;
    var replacePositionRegExp = /position/g;
    var replaceLastRegExp     = /last/g;

    //定义函数
    var selectPath = function(n/* node */, i/* index */, p/* path */) {

      //参数赋值
      i++;
      p += '/' + n.nodeName;

      //类型判断
      if(n.nodeType === 1) {

        //索引判断
        if(i >= path.length) {

          //路径判断
          if(pathRegExp.test(p)) {

            //定义参数
            var _n = n;
            var _i = path.length - 1;
            var _p = p.match(pathRegExp);

            //路径遍历
            do {

              if(_n !== node[_i][0][0]) {

                if(_n !== n && node[_i][0][0]) {
                  node[_i + 1].unshift([node[_i + 1][0].shift()]);
                  node[_i + 1][0].last = node[_i + 1][1].last--;
                }

                node[_i][0].unshift(_n);
                node[_i][0].last++;
                node[_i].last++;

              }

              if(path[_i].$1 === '//') {
                for(var j = _p.pop().split('/').length; j > 0; j--) {
                  _n = _n.parentNode;
                }
              } else {
                _n = _n.parentNode;
              }

            } while(_i--);

          }

        }

        //节点遍历
        for(n = n.firstChild; n; n = n.nextSibling) {
          selectPath(n, i, p);
        }

      }

    };

    var selectNode = function(i/* index */, j/* index */) {

      //定义参数
      var _i = node[i][j].length - 1;
      var _j = node[i].last - node[i][j].last;

      //节点遍历
      do {

        //计算判断
        if(selectCalc(i, j, _i)) {

          //行为判断
          if(i + 1 === node.length) {
            select.push(node[i][j][_i]);
          } else {
            selectNode(i + 1, _i + _j);
          }

        }

      } while(_i--);

    };

    var selectCalc = function(i/* index */, j/* index */, k/* index */) {
      if(path[i].$3) {
        return eval(path[i].$3.replace(replaceCalcRegExp, function($0, $1, $2, $3) {return replaceCalc(i, j, k, $1, $2, $3)}));
      } else {
        return true;
      }
    };

    var replacePath = function($) {
      return {
        '=>' : '>=',
        '='  : '==',
        '&'  : '&&',
        '|'  : '||'
      }[$];
    };

    var replaceCalc = function(i/* index */, j/* index */, k/* index */, $1, $2, $3) {

      //行为判断
      if($1 === '@') {

        //格式判断
        if(replaceAttrRegExp.test($2)) {

          //定义属性值
          var _$1 = node[i][j][k].getAttribute(RegExp.$1);

          //判断属性值
          if(_$1 !== null) {

            //定义对比值
            var _$3 = parseFloat(RegExp.$3) || RegExp.$3;

            //属性值判断
            if(typeof _$3 === 'number') {

              _$1 = parseFloat(_$1);

              return {
                '==' : (_$1 == _$3) + $3,
                '>=' : (_$1 >= _$3) + $3,
                '<=' : (_$1 <= _$3) + $3,
                '!=' : (_$1 != _$3) + $3,
                '>'  : (_$1 >  _$3) + $3,
                '<'  : (_$1 <  _$3) + $3
              }[RegExp.$2];

            } else {

              _$1 = _$1.toLowerCase();

              return {
                '==' : (_$1 == _$3) + $3,
                '>=' : (_$1 == _$3 || _$1.indexOf(_$3) > -1) + $3,
                '<=' : (_$1 == _$3 || _$3.indexOf(_$1) > -1) + $3,
                '!=' : (_$1 != _$3) + $3,
                '>'  : (_$1 != _$3 && _$1.indexOf(_$3) > -1) + $3,
                '<'  : (_$1 != _$3 && _$3.indexOf(_$1) > -1) + $3
              }[RegExp.$2];

            }

          } else {
            return false + $3;
          }

        } else {
          return false + $3;
        }

      } else {

        //格式判断
        if(replaceNumberRegExp.test($2)) {
          return ($2 == node[i][j].last - k) + $3;
        } else {

          //计算表达式
          $2 = eval($2
            .replace(replaceFirstRegExp, 0)
            .replace(replacePositionRegExp, node[i][j].last - k)
            .replace(replaceLastRegExp, node[i].last)
          );

          //计算值转换
          if(typeof $2 === 'number') {
            $2 = $2 === node[i][j].last - k;
          }

          return $2 + $3;
        }

      }

    };

    //路径赋值
    p = p.toLowerCase().replace(replacePathRegExp, replacePath);

    //路径遍历
    while(forPathRegExp.test(p)) {

      path.push({
        $1 : RegExp.$1,
        $2 : RegExp.$2,
        $3 : RegExp.$3,
        $4 : RegExp.$4
      });

      node.unshift([[]]);
      node[0][0].last = -1;
      node[0].last = -1;

      pathRegExp = (pathRegExp || '') + (RegExp.$1 === '//' ? '\\/(.+?)\\/' : '\\/') + (RegExp.$2 === '*' ? '\\w+' : RegExp.$2);

    }

    //路径正则
    pathRegExp = new RegExp('^' + pathRegExp + '$', 'i');

    //路径选择
    selectPath(r, 0, '');

    //节点选择
    selectNode(0, 0);

    //返回选择
    return select;

  };


  /*
   * @description 默认插件
   */
  (function() {


    /*
     * @description 请求插件
     */
    var _request = function(that, param) {

      /*
       * "Cache-Control" : "no-cache"
       * "Content-Type"  : "text/html; charset=utf-8"
       * "Content-Type"  : "application/x-www-form-urlencoded;"
       *
       * param => method    
       * param => action
       * param => status
       * param => header
       * param => access
       * param => readyState
       * param => readyText
       * param => readyXML
       */

      try {


        //定义请求
        var request = that.createRequest();


        //请求打开
        request.open(param.method, encodeURI(param.action), param.status === undefined ? true : param.status);

        //默认头部
        if(param.method === 'post') {
          param.header['Cache-Control'] = 'no-cache';
          param.header['Content-Type' ] = 'text/html; charset=utf-8';
          param.header['Content-Type' ] = 'application/x-www-form-urlencoded;';
        }

        //请求头部
        for(var i in param.header) {
          request.setRequestHeader(i, param.header[i]);
        }


        //请求事件
        request.onreadystatechange = function() {
          if(request.readyState == 4 && request.status == 200) {
            if(param.readyText) {
              param.readyText(request.responseText);
            }
            if(param.readyXML) {
              param.readyXML(request.responseXML);
            }
          } else if(request.readyState == 4) {
            if(param.readyState) {
              param.readyState(request.status, request.statusText);
            }
          }
        };


        //请求发送
        request.send(param.access);


      } catch(error) {
        throw new Error("'request' Error Plugin Unknown");
      }
    };


    /*
     * @description 注册插件
     */
    Is.bin["request"] = _request;


  })();


  /*
   * @description 初始函数
   */
  (function() {


    /*
     * @description 创建实例
     */
    is = new Is();


    /*
     * @description 创建映射
     */
    _getBrowser         = is.getBrowser         ;
    _getCookie          = is.getCookie          ;
    _getDocument        = is.getDocument        ;
    _getDocumentScroll  = is.getDocumentScroll  ;
    _getDocumentSize    = is.getDocumentSize    ;
    _getElement         = is.getElement         ;
    _getElementPosition = is.getElementPosition ;
    _getElementStyle    = is.getElementStyle    ;
    _getWindow          = is.getWindow          ;
    _forBubble          = is.forBubble          ;
    _forElement         = is.forElement         ;
    _forSibling         = is.forSibling         ;
    _cancelBubble       = is.cancelBubble       ;
    _cancelDefault      = is.cancelDefault      ;
    _usableCookie       = is.usableCookie       ;
    _createAnimate      = is.createAnimate      ;
    _createElement      = is.createElement      ;
    _createRequest      = is.createRequest      ;
    _createXMLDocument  = is.createXMLDocument  ;
    _attachEvent        = is.attachEvent        ;
    _detachEvent        = is.detachEvent        ;
    _afreshAccess       = is.afreshAccess       ;
    _afreshCookie       = is.afreshCookie       ;
    _plugin             = is.plugin             ;


    /*
     * @description 创建转义
     */
    _$ = is.getElement;


    /*
     * @description 创建转义
     */
    _request = function() {
      is.plugin("request", arguments[0]);
    };


    /*
     * @description 监听错误
     */
    window.onerror = function() {
      return true;
    };


  })();