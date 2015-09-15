var mbe_ui;
(function (mbe_ui) {
    /**
     * 一个简单的虚拟 DOM 渲染器。
     */
    var Domer = (function () {
        /**
         * @param options 选项。参数有：
         *  - doc 用于创建节点的文档对象。默认为 document。
         *  - bookkeeper 用于簿记添加到元素上的属性的名字，默认为 '_domerBookkeeper'。
         */
        function Domer(options) {
            this._doc = options && options.doc || document;
            this._bookkeeper = options && options.bookkeeper || '_domerBookkeeper';
        }
        /**
         * 将虚拟元素 virtualElem 渲染为实际元素 realElem。
         *
         * @param virtualElem 虚拟元素。
         * @param realElem 实际元素是 DOM 元素。如果提供，则渲染时会尽可能的重用它，如果不能重用则替换它；
         *   如果不提供，则新建一个元素。
         * @return 渲染出来的元素。如果 realElem 被重用，则返回的是 realElem。
         *
         * 如果提供 realElem，则渲染时会尽可能的重用它及其子节点。目前的重用/新建规则是：如果节点类型、名字和位置都相同，
         * 则重用，否则就新建一个，并替换 realElem 的元素。如果 virtualElem 的 Name 没有指定，则认为总是与
         * 对应的 realElem 名字相同；如果没有对应的 realElem，则创建一个 div 元素。
         *
         * 渲染时添加的属性被记录在 DOM 元素的 JS 属性 '_domerBookkeeper' （簿记表）中。下次渲染时，会对比新的属性表
         * 和簿记表中的属性，如果一个属性在新的属性表中不存在或者为 undefined/null，但是在簿记表中存在，则删除该属性
         * （WebIDL / JS 属性赋值为 null）。
         */
        Domer.prototype.render = function (virtualElem, realElem) {
            return this._render(virtualElem, realElem);
        };
        /**
         * 在即将把 virtualElem 渲染到 realElem 之前调用。
         * 子类可覆盖此方法，返回一个不同的虚拟节点，将会采用返回值做真正的渲染。
         * 返回 false 则表示中止此次 virtualElem 的渲染。
         * 返回 null/undefined 则表示遇到了错误。
         */
        Domer.prototype.onBeforeRender = function (virtualElem, realElem) {
            return virtualElem;
        };
        /**
         * 在已经将 virtualElem 渲染到新的 realElem 之后调用。
         */
        Domer.prototype.onAttached = function (virtualElem, realElem) { };
        /**
         * 在已经将 virtualElem 渲染到 realElem 之后调用。
         */
        Domer.prototype.onRendered = function (virtualElem, realElem) { };
        /**
         * 在渲染即将造成 realElem 被删除之前调用。
         */
        Domer.prototype.onBeforeRemove = function (realElem) { };
        /**
         * 从虚拟元素的名字推断命名空间。
         * 此方法的默认实现只识别 'svg' 和 'math' 元素，其他情况下返回 undefined 表示不确定（注意 null 是合法的命名空间）。
         * 默认实现应已经能满足大多数情况，客户代码也可以覆盖此方法来应对更特殊的情形。
         * 注意，HTML元素的命名空间必须是 'http://www.w3.org/1999/xhtml'（Domer.NS_HTML），不能是 null。
         *
         * 如果此方法返回 undefined，则 Domer 这样确定元素的命名空间：
         * 如果该元素的父元素（可以是虚拟元素）存在，则采用父元素的命名空间；否则，采用 Domer 关联的 Document 的根元素的命名空间。
         */
        Domer.prototype.inferNamespace = function (tagName) {
            switch (tagName) {
                case 'svg':
                    return Domer.NS_SVG;
                case 'math':
                    return Domer.NS_MATHML;
                default:
                    return undefined;
            }
        };
        /**
         * @param futureParent 将要成为 vnode 渲染结果的父节点的节点。
         * 不变式：如果 rnode 和 futureParent 都存在，则 rnode.parentNode === futureParent 。
         */
        Domer.prototype._render = function (vnode, rnode, futureParent) {
            var newNode;
            var currentParent = rnode && rnode.parentNode;
            if (typeof vnode === 'string') {
                if (rnode && rnode.nodeType === Node.TEXT_NODE) {
                    rnode.data = vnode;
                }
                else {
                    newNode = this._doc.createTextNode(vnode);
                }
            }
            else {
                var velem = this.onBeforeRender(vnode, rnode);
                if (velem === false)
                    return rnode;
                if (velem == null) {
                    console.warn('Domer.render: onBeforeRender returned null/undefined, abort!');
                    return null;
                }
                var rname = rnode ? rnode.localName : null;
                var name = velem.Name || rname || 'div';
                if (!rnode || name !== rname) {
                    var ns = this.inferNamespace(name);
                    if (ns === undefined) {
                        var parentNode = futureParent || currentParent;
                        ns = parentNode ? parentNode.namespaceURI : this._doc.documentElement.namespaceURI;
                    }
                    newNode = this._doc.createElementNS(ns, name);
                }
                var targ = (newNode || rnode);
                var fresh = !targ[this._bookkeeper];
                // _assginProps() 要在 _assignChildren() 之后，否则 select 元素的 value 值将不会是指定的值。
                if (!velem.Terminal)
                    this._assignChildren(velem.Kids, targ);
                this._assginProps(velem, targ);
                if (fresh)
                    this.onAttached(velem, targ);
                this.onRendered(velem, targ);
            }
            if (newNode && currentParent) {
                if (rnode.nodeType === Node.ELEMENT_NODE)
                    this.onBeforeRemove(rnode);
                rnode.parentNode.replaceChild(newNode, rnode);
            }
            return newNode || rnode;
        };
        Domer.prototype._assginProps = function (props, realElem) {
            if (!props)
                return;
            var bkn = this._bookkeeper;
            var bookkeeper = realElem[bkn] || (realElem[bkn] = {});
            // 删除 props 中不存在的属性
            for (var key in bookkeeper) {
                if (!(bookkeeper[key] !== null && props[key] == null))
                    continue;
                var fc = key.charCodeAt(0) | 0;
                switch (fc) {
                    case PF_ATTR:
                        realElem.removeAttribute(key.slice(1));
                        break;
                    case PF_STYLE:
                        realElem.style.removeProperty(key.slice(1));
                        break;
                    case PF_CLASS:
                        realElem.classList.remove(key.slice(1));
                        break;
                    case PF_EVENT:
                    case PF_EVENT_CAPTURE:
                        replaceEventHandlers(realElem, key.slice(1), bookkeeper[key], undefined, fc === PF_EVENT_CAPTURE);
                        break;
                    default:
                        // 对应 HTML 属性的 WebIDL 属性（如 id、className），有的浏览（blink/FF）将写入的 null/undefined 视为字符串 'null'/'undefined'，
                        // 有的（webkit）将写入的 null 视为删除对应的 HTML 属性，但仍将 undefined 视为 'undefined'。
                        // 所以先对著名的这类属性使用removeAttribute，其他的只能退而求其次设置为空串。
                        // 这里也不能用 delete，因为其行为对 WebIDL 属性是不确定的。
                        var attr = webIdl2html[key];
                        if (attr)
                            realElem.removeAttribute(attr);
                        else {
                            realElem[key] = null;
                            if (realElem[key] === 'null')
                                realElem[key] = '';
                        }
                }
                bookkeeper[key] = null;
            }
            // 添加/修改 props 中与 bookkeeper 中不同的属性
            for (var key in props) {
                var val = props[key];
                // HTMLInputElement.value 等IDL属性是“易变的”，因为可以被用户的操作改变，这可能导致 bookkeeper 中的值与
                // HTMLInputElement.value 的值不一致。因此对于 volatileIdl 中列出的属性，忽略 bookkeeper，总是修改IDL属性。
                if (val === bookkeeper[key] && !volatileIdl[key] || val == null)
                    continue;
                var fc = key.charCodeAt(0) | 0;
                switch (fc) {
                    case PF_ATTR:
                        realElem.setAttribute(key.slice(1), val);
                        break;
                    case PF_STYLE:
                        realElem.style.setProperty(key.slice(1), val);
                        break;
                    case PF_CLASS:
                        var cl = realElem.classList;
                        if (val)
                            cl.add(key.slice(1));
                        else
                            cl.remove(key.slice(1));
                        break;
                    case PF_EVENT:
                    case PF_EVENT_CAPTURE:
                        replaceEventHandlers(realElem, key.slice(1), bookkeeper[key], val, fc === PF_EVENT_CAPTURE);
                        break;
                    default:
                        realElem[key] = val;
                }
                bookkeeper[key] = val;
            }
        };
        Domer.prototype._assignChildren = function (vKids, realElem) {
            var rKids = realElem.childNodes;
            if (!vKids || !vKids.length) {
                var lc;
                while (lc = realElem.lastChild) {
                    this.onBeforeRemove(lc);
                    realElem.removeChild(lc);
                }
                return;
            }
            for (var i = 0, n = Math.max(vKids.length, rKids.length); i < n; i++) {
                var vKid = vKids[i], rKid = rKids[i];
                if (rKid) {
                    if (vKid == null) {
                        var ns;
                        while (ns = rKid.nextSibling) {
                            this.onBeforeRemove(ns);
                            realElem.removeChild(ns);
                        }
                        realElem.removeChild(rKid);
                        return;
                    }
                    else {
                        this._render(vKid, rKid, realElem);
                    }
                }
                else if (vKid != null) {
                    realElem.appendChild(this._render(vKid, null, realElem));
                }
            }
        };
        // 常用命名空间
        Domer.NS_HTML = 'http://www.w3.org/1999/xhtml';
        Domer.NS_SVG = 'http://www.w3.org/2000/svg';
        Domer.NS_MATHML = 'http://www.w3.org/1998/Math/MathML';
        return Domer;
    })();
    mbe_ui.Domer = Domer;
    var PF_ATTR = 64; //'@'
    var PF_STYLE = 45; //'-'
    var PF_CLASS = 46; //'.'
    var PF_EVENT = 42; //'*'
    var PF_EVENT_CAPTURE = 33; //'!'
    var webIdl2html = { id: 'id', className: 'class', title: 'title', src: 'src', href: 'href', __proto__: null };
    var volatileIdl = { value: true, __proto__: null };
    function replaceEventHandlers(realElem, evName, olds, news, capture) {
        if (equalsOrArrayEquals(olds, news))
            return;
        if (Array.isArray(olds)) {
            for (var i = 0, n = olds.length; i < n; i++)
                realElem.removeEventListener(evName, olds[i], capture);
        }
        else if (olds) {
            realElem.removeEventListener(evName, olds, capture);
        }
        if (Array.isArray(news)) {
            for (var i = 0, n = news.length; i < n; i++)
                news[i] && realElem.addEventListener(evName, news[i], capture);
        }
        else if (news) {
            realElem.addEventListener(evName, news, capture);
        }
    }
    function equalsOrArrayEquals(a1, a2) {
        if (a1 === a2)
            return true;
        if (!Array.isArray(a1) || !Array.isArray(a2) || a1.length != a2.length)
            return false;
        for (var i = 0, n = a1.length; i < n; i++) {
            if (a1[i] !== a2[i])
                return false;
        }
        return true;
    }
})(mbe_ui || (mbe_ui = {}));
