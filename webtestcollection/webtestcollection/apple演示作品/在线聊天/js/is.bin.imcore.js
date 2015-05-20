/**
 * @fileoverview
 *
 * @description Is JavaScript Framework Bin
 */


(function () {


    /*
     * @description 即时聊天核心插件
     */
    var _imcore = function (that, param) {
        try {


            //定义数据对象
            var access = null;


            //定义配置对象
            var set = {

                //时钟
                "timer_interval": new Number(),
                "timer_step": new Number(),
                "timer_step_setting": new Number(),
                "timer_step_waiting": new Number(),
                "timer_step_reading": new Number(),
                "timer_step_reinner": new Number(),

                //行为
                "action_setting": new String(),
                "action_waiting": new String(),
                "action_reading": new String(),
                "action_sending": new String(),
                "action_history": new String(),

                //方法
                "method_waiting": new Function(),
                "method_reading": new Function(),
                "method_sending": new Function(),
                "method_changed": new Function(),

                //格式
                "format_reading": new Function(),
                "format_sending": new Function(),

                //控制
                "master_readmax": new Number(),
                "master_readcss": new Object(),
                "master_sendcss": new Object(),
                "master_codekey": new RegExp(),
                "master_ctrlkey": new Boolean()

            };


            //定义时钟函数
            var timeout = function () {
                try {

                    //请求函数
                    if (set["timer_step"] % set["timer_step_setting"] == 0) { setting() }
                    if (set["timer_step"] % set["timer_step_waiting"] == 0) { waiting() }
                    if (set["timer_step"] % set["timer_step_reading"] == 0) { reading() }
                    if (set["timer_step"] % set["timer_step_reinner"] == 0) { reinner() }

                } catch (error) {

                    //踹出错误
                    throw new Error(error);

                } finally {

                    //设置时钟
                    setTimeout(timeout, set["timer_interval"]);
                    set["timer_step"]++;

                }
            };


            //定义命令函数
            var command = function () {

                //定义参数
                var param = arguments;

                //返回执行
                return {

                    //打印
                    "print": function () {

                        //定义参数
                        var message = param[1];

                        try {

                            //定义消息参数
                            var iframe = frames[afreshNote(selectPath("//talking//param[@name='usering-id' and (@value='" + message["usering-reader"] + "' or @value='" + message["usering-sender"] + "')]")[0].parentNode)["reading-iframe"]].document.body;
                            var method = set["method_reading"](message);
                            var format = set["format_reading"](message);

                            //打印消息对象
                            if (method && format) {

                                //打印消息
                                iframe.appendChild(that.createElement("div", { inner: format }, null, iframe));
                                iframe.scrollTop += that.getElementPosition(iframe.lastChild).top;

                                //删除冒泡
                                if (iframe.childNodes[set["master_readmax"]]) {
                                    iframe.removeChild(iframe.firstChild);
                                }

                                return true;
                            }

                        } catch (error) {
                            return;
                        }
                    },

                    //发送
                    "send": function () {

                        //定义参数
                        var message = param[1];

                        try {

                            //定义消息参数
                            var method = set["method_sending"](message);
                            var format = set["format_sending"](message);

                            //发送消息对象
                            if (method && format) {

                                //格式内容
                                message["message-content"] = format;

                                //打印消息
                                command("print", message);
                                selectPath("//message")[0].appendChild(afreshNote(message));

                                //定义参数
                                var method = "get";
                                var action = set["action_sending"];
                                var access = createAccess(that.createXMLDocument().createElement("message"), afreshNote(message));
                                var readyXML = function (d) {
                                    message = d.getElementsByTagName("note")[0].cloneNode(true);
                                    command("print", afreshNote(message));
                                    selectPath("//message")[0].appendChild(message);
                                };

                                //执行请求
                                that.plugin("request", {
                                    method: method,
                                    action: action,
                                    //access   : access ,
                                    readyXML: readyXML
                                });

                                return true;
                            }

                        } catch (error) {
                            return;
                        }
                    },

                    //对话
                    "talk": function () {

                        //返回执行
                        return command("send", {
                            "usering-reader": param[1]["usering-id"],
                            "usering-sender": selectPath("//usering/param[@name='id']")[0].getAttribute("value"),
                            "usering-name": selectPath("//usering/param[@name='name']")[0].getAttribute("value"),
                            "message-type": "talk",
                            "message-elapse": new Date().getTime(),
                            "message-font": decodeURIComponent(that.afreshAccess(selectFont(), ":", ";")),
                            "message-content": param[2] || frames[param[1]["sending-iframe"]].document.body.innerHTML
                        });

                    },

                    //广播
                    "news": function () {

                        //返回执行
                        return command("print", {
                            "usering-reader": param[1]["usering-id"],
                            "usering-sender": selectPath("//usering/param[@name='id']")[0].getAttribute("value"),
                            "usering-name": selectPath("//usering/param[@name='name']")[0].getAttribute("value"),
                            "message-type": "news",
                            "message-icon": param[2],
                            "message-elapse": new Date().getTime(),
                            "message-content": param[3]
                        });

                    },

                    //执行
                    "exec": function () {

                        //定义参数
                        var window = that.getWindow(param[1]);
                        var refer = param[1];

                        //定义属性
                        window.imcoreNode = window.imcoreNode || that.createElement("br", null, null, window);
                        window.focus();

                        if (!window.getSelection) {

                            //执行对象
                            var index = (Math.random() * 1E18).toString(16);
                            var range = window.document.selection.createRange();

                            //执行属性
                            refer.setAttribute("id", index);
                            range.pasteHTML(refer.outerHTML);
                            range.select();

                            //执行标记
                            that.getElement(index, window).imcoreNode = that.getElement(index, window);
                            that.getElement(index, window).parentNode.scrollTop += that.getElementPosition(that.getElement(index, window)).top;
                            that.getElement(index, window).removeAttribute("id");

                        } else {

                            //执行对象
                            var selection = window.getSelection();
                            var range = selection.getRangeAt(0);

                            //执行属性
                            range.insertNode(refer);
                            refer.parentNode.appendChild(window.imcoreNode);
                            range.selectNode(refer.nextSibling);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            selection.collapseToStart();

                            //执行标记
                            refer.imcoreNode = refer;
                            refer.parentNode.scrollTop += that.getElementPosition(refer).top;

                        }
                    },

                    //回车
                    "enter": function () {

                        //定义参数
                        var window = frames[param[1]["sending-iframe"]];
                        var event = param[2];

                        //执行屏蔽
                        if (/^13$|^10$/.test(event.keyCode)) {
                            that.cancelDefault(event);
                        }

                        //执行发送
                        if (set["master_codekey"].test(event.keyCode) && set["master_ctrlkey"] == event.ctrlKey) {
                            if (reinner() && command("talk", param[1])) {
                                window.document.body.innerHTML = "";
                            }
                        }

                        //执行回车
                        if (set["master_codekey"].test(event.keyCode) && set["master_ctrlkey"] != event.ctrlKey) {
                            command("exec", that.createElement("br", null, null, window));
                        }

                    },

                    //处理
                    "regex": function () {

                        //定义参数
                        var window = frames[param[1]["sending-iframe"]];
                        var body = window.document.body;

                        //执行方法
                        set["method_changed"](body);

                        //执行处理
                        if (/^<.+>.+<\/.+>$/.test(body.innerHTML)) {
                            body.innerHTML = "";
                        }

                    }

                }[param[0]]();

            };


            //定义配置函数
            var setting = function () {

                //定义参数
                var method = "get";
                var action = set["action_setting"].length ? set["action_setting"] : arguments[0];
                var status = set["action_setting"].length ? true : false;
                var readyXML = function (d) {

                    //定义配置对象
                    var setting = d.getElementsByTagName("setting")[0].cloneNode(true);

                    //遍历配置对象
                    that.forSibling(setting.firstChild, function (e) {
                        try {
                            if (set[e.getAttribute("name")].constructor == String) {
                                set[e.getAttribute("name")] = e.getAttribute("value");
                            } else {
                                eval("set['" + e.getAttribute("name") + "'] = " + e.getAttribute("value"));
                            }
                        } catch (error) {
                            return;
                        }
                    });

                    //定义用户对象
                    var usering = d.getElementsByTagName("usering")[0].cloneNode(true);

                    //遍历用户对象
                    that.forSibling(usering.firstChild, function (e) {
                        try {
                            var _e = selectPath("//usering/param[@name='" + e.getAttribute("name") + "']")[0];
                            if (_e) {
                                _e.setAttribute("value", e.getAttribute("value"));
                            } else {
                                selectPath("//usering")[0].appendChild(e);
                            }
                        } catch (error) {
                            return;
                        }
                    });

                };

                //执行请求
                that.plugin("request", {
                    method: method,
                    action: action,
                    status: status,
                    readyXML: readyXML
                });

            };


            //定义伺侯函数
            var waiting = function () {

                //定义参数
                var method = "get";
                var action = set["action_waiting"];
                var readyXML = function (d) {

                    //定义伺侯对象
                    var waiting = d.getElementsByTagName("waiting")[0].cloneNode(true);

                    //遍历伺侯对象
                    that.forSibling(waiting.firstChild, function (e) {
                        try {
                            set["method_waiting"](afreshNote(e));
                        } catch (error) {
                            return;
                        }
                    });

                };

                //执行请求
                that.plugin("request", {
                    method: method,
                    action: action,
                    readyXML: readyXML
                });

            };


            //定义读取函数
            var reading = function () {

                //定义对话
                var talking = createAccess("talking");

                if (talking) {

                    //定义参数
                    var method = "get";
                    var action = set["action_reading"];
                    var readyXML = function (d) {

                        //定义消息对象
                        var message = d.getElementsByTagName("message")[0].cloneNode(true);

                        //遍历消息对象
                        that.forSibling(message.firstChild, function (e) {
                            try {
                                command("print", afreshNote(e));
                                selectPath("//message")[0].appendChild(e);
                            } catch (error) {
                                return;
                            }
                        });

                    };

                    //执行请求
                    that.plugin("request", {
                        method: method,
                        action: action,
                        //access   : talking ,
                        readyXML: readyXML
                    });

                }
            };


            //定义历史函数
            var history = function () {

            };


            //定义重写函数
            var reinner = function () {

                //定义目标
                var target = arguments[0];

                if (target) {

                    //遍历目标
                    for (var i = target.firstChild, j = i && i.nextSibling; i; i = j, j = i && i.nextSibling) {
                        try {
                            if (i.imcoreNode == i || i == that.getWindow(target).imcoreNode) {
                                continue;
                            } else if (i.nodeType == 3) {
                                continue;
                            } else if (i.nodeType == 1) {
                                if (!/object|iframe|script|style/i.test(i.tagName)) {
                                    reinner(i);
                                    i.parentNode.replaceChild(target.ownerDocument.createTextNode(i.innerHTML.replace(/&.+;/g, "")), i);
                                } else {
                                    throw new Error();
                                }
                            } else {
                                throw new Error();
                            }
                        } catch (error) {
                            i.parentNode.removeChild(i);
                        } finally {
                            continue;
                        }
                    }

                } else {

                    //遍历对话
                    for (var i = selectPath("//talking//param[@name='sending-iframe']"), j = 0; i[j]; j++) {
                        reinner(frames[i[j].getAttribute("value")].document.body);
                    }

                    return true;
                }

            };


            //定义工具函数：创建数据
            var createAccess = function () {

                //定义数据
                var access = arguments;

                //创建数据
                if ((access[0] || {}).constructor == String) {

                    if (access[0] == "talking") {

                        //定义对话
                        var talking = selectPath("//talking/note");

                        //创建数据
                        if (talking.length) {

                            //定义数据对象
                            var _access = createAccess(that.createXMLDocument().createElement("talking"));

                            //定义数据节点
                            for (var i = _access.getElementsByTagName("talking")[0], j = 0, k = talking[j]; k = k && afreshNote(k) ; j++, k = talking[j]) {
                                i.appendChild(afreshNote({
                                    "usering-id": k["usering-id"],
                                    "usering-name": k["usering-name"]
                                }));
                            }

                            //返回数据对象
                            return _access;

                        }

                    } else {
                        return createAccess(selectPath("//" + access[0])[0].cloneNode(true));
                    }

                } else {

                    //定义数据对象
                    var _access = that.createXMLDocument();

                    //定义数据节点
                    _access.appendChild(_access.createElement("imdata"));

                    //定义参数节点
                    for (var i = 0; i < access.length; i++) {
                        if (i) {
                            access[i - 1].appendChild(access[i]);
                        } else {
                            _access.documentElement.appendChild(access[0]);
                        }
                    }

                    //返回数据对象
                    return _access;

                }

            };


            //定义工具函数：附加绑定
            var attachBinding = function () {

                //定义绑定
                var binding = arguments[0];

                if (binding.constructor == String) {

                    //附加绑定
                    attachBinding(afreshNote(selectPath("//talking//param[@name='usering-id' and @value='" + binding + "']")[0].parentNode));

                } else {

                    //附加框架
                    if (binding["reading-iframe"]) {

                        //定义框架
                        var iframe = frames[binding["reading-iframe"]].document.body;

                        //定义消息
                        for (var i = selectPath("//message//param[(@name='usering-reader' and @value='" + binding["usering-id"] + "') or (@name='usering-sender' and @value='" + binding["usering-id"] + "')]"), j = 0; i[j]; j++) {
                            command("print", afreshNote(i[j].parentNode));
                        }

                    }

                    //附加框架
                    if (binding["sending-iframe"]) {

                        //定义框架
                        var iframe = frames[binding["sending-iframe"]].document.body;

                        //定义属性
                        iframe.contentEditable = true;
                        iframe.keypress = function (event) { command("enter", binding, event) };
                        iframe.keyup = function (event) { command("regex", binding, event) };

                        //定义事件
                        that.attachEvent(iframe, {
                            "keypress": iframe.keypress,
                            "keyup": iframe.keyup
                        });

                    }

                }
            };


            //定义工具函数：分离绑定
            var detachBinding = function () {

                //定义绑定
                var binding = arguments[0];

                if (binding.constructor == String) {

                    //分离绑定
                    detachBinding(afreshNote(selectPath("//talking//param[@name='usering-id' and @value='" + binding + "']")[0].parentNode));

                } else {

                    //分离框架
                    if (binding["reading-iframe"]) {

                        //定义框架
                        var iframe = frames[binding["reading-iframe"]].document.body;

                        //定义属性
                        iframe.innerHTML = "";

                    }

                    //分离框架
                    if (binding["sending-iframe"]) {

                        //定义框架
                        var iframe = frames[binding["sending-iframe"]].document.body;

                        //定义事件
                        that.detachEvent(iframe, {
                            "keypress": iframe.keypress,
                            "keyup": iframe.keyup
                        });

                        //定义属性
                        iframe.contentEditable = false;
                        iframe.keypress = null;
                        iframe.keyup = null;

                    }

                }
            };


            //定义工具函数：附加对话
            var attachTalking = function () {

                //定义对话
                var talking = arguments[0];

                try {

                    //附加对话
                    selectPath("//talking")[0].appendChild(selectPath("//talking//param[@name='usering-id' and @value='" + talking["usering-id"] + "']")[0].parentNode);

                } catch (error) {

                    //附加对话
                    selectPath("//talking")[0].appendChild(afreshNote(talking));

                }
            };


            //定义工具函数：分离对话
            var detachTalking = function () {

                //定义对话
                var talking = arguments[0];

                try {

                    //分离对话
                    selectPath("//talking")[0].removeChild(selectPath("//talking//param[@name='usering-id' and @value='" + talking + "']")[0].parentNode);

                } catch (error) {

                    //分离对话
                    selectPath("//talking")[0].removeChild(talking);

                }
            };


            //定义工具函数：覆写数据
            var afreshAccess = function () {

                //覆写数据
                access = that.createXMLDocument();

                //覆写节点
                access.appendChild(access.createElement("imdata"));
                access.documentElement.appendChild(access.createElement("usering"));
                access.documentElement.appendChild(access.createElement("talking"));
                access.documentElement.appendChild(access.createElement("message"));

            };


            //定义工具函数：覆写样式
            var afreshCSS = function () {
                if (arguments[1]) {

                    //定义参数
                    var css = arguments[0];
                    var style = arguments[1];

                    //覆写样式
                    if (css.insertRule) {
                        for (var i in style) {
                            css.insertRule(i + "{" + style[i] + "}", css.cssRules.length);
                        }
                    } else {
                        for (var i in style) {
                            css.addRule(i, style[i], css.rules.length);
                        }
                    }

                } else if (arguments[0].constructor == Object) {

                    //定义对话
                    var talking = arguments[0];

                    //覆写框架
                    if (talking["reading-iframe"]) {
                        afreshCSS(selectCSS(talking["reading-iframe"]), set["master_readcss"]);
                    }

                    //覆写框架
                    if (talking["sending-iframe"]) {
                        afreshCSS(selectCSS(talking["sending-iframe"]), set["master_sendcss"]);
                    }

                } else if (arguments[0].constructor == String) {

                    //覆写对话
                    afreshCSS(afreshNote(selectPath("//talking//param[@name='usering-id' and @value='" + arguments[0] + "']")[0].parentNode));

                } else {

                    //覆写对话
                    afreshCSS(afreshNote(arguments[0]));

                }
            };


            //定义工具函数：覆写字体
            var afreshFont = function () {

                //定义字体
                var font = arguments[0];

                //覆写字体
                if (font.constructor == Object) {

                    //覆写字体对象
                    afreshFont(that.afreshAccess(font, ":", ";"));

                } else {

                    //覆写配置样式
                    set["master_sendcss"]["body"] = decodeURIComponent(that.afreshAccess(that.afreshAccess(set["master_sendcss"]["body"] + font, "\\:", "\\;"), ":", ";"));

                    //覆写对话样式
                    for (var i = selectPath("//talking/note"), j = 0; i[j]; j++) {
                        afreshCSS(i[j]);
                    }

                }

            };


            //定义工具函数：覆写记录
            var afreshNote = function () {

                //定义记录
                var note = arguments[0];

                //覆写记录
                if (note.constructor == Object) {

                    //定义记录对象
                    var _note = that.createXMLDocument().createElement("note");

                    //覆写记录属性
                    for (var i in note) {
                        _note.appendChild(that.createXMLDocument().createElement("param"));
                        _note.lastChild.setAttribute("name", i);
                        _note.lastChild.setAttribute("value", note[i]);
                    }

                    //返回记录对象
                    return _note;

                } else {

                    //定义记录对象
                    var _note = {};

                    //覆写记录属性
                    for (var i = note.firstChild; i; i = i.nextSibling) {
                        if (i.nodeType == 1) {
                            _note[i.getAttribute("name")] = i.getAttribute("value");
                        }
                    }

                    //返回记录对象
                    return _note;

                }

            };


            //定义工具函数：选择样式
            var selectCSS = function () {

                //定义框架
                var iframe = frames[arguments[0]];

                //定义样式
                var css = iframe.document.styleSheets;

                //定义节点
                if (!css.length) {
                    iframe.document.getElementsByTagName("head")[0].appendChild(that.createElement("style", null, null, iframe));
                }

                //返回样式
                return css[0];

            };


            //定义工具函数：选择字体
            var selectFont = function () {

                //定义样式
                var css = that.afreshAccess(set["master_sendcss"]["body"], "\\:", "\\;");

                //定义字体
                var font = {
                    "color": css["color"] || "#000000",
                    "font-family": css["font-family"] || "Arial",
                    "font-size": css["font-size"] || "14px",
                    "font-weight": css["font-weight"] || "normal",
                    "font-style": css["font-style"] || "normal",
                    "text-decoration": css["text-decoration"] || "none"
                };

                //返回字体
                return font;

            };


            //定义工具函数：选择路径
            var selectPath = function () {

                //定义路径
                var path = arguments[0];

                //定义数据
                if (!access) {
                    afreshAccess();
                }

                //选择路径
                if (!access.evaluate) {

                    //定义路径集合
                    var _path = access.documentElement.selectNodes(path);

                    //返回路径集合
                    return _path;

                } else {

                    //定义路径集合
                    var _path = [];

                    //添加路径节点
                    for (var i = access.evaluate(path, access.documentElement, null, 5, null), j = i.iterateNext() ; j; j = i.iterateNext()) {
                        _path.push(j);
                    }

                    //返回路径集合
                    return _path;

                }

            };


            //执行函数
            setting(param);
            timeout();


            //返回行为
            return function () {

                //定义参数
                var param = arguments;

                //返回执行
                return {

                    "user": function () {
                        return {
                            "id": selectPath("//usering/param[@name='id']")[0].getAttribute("value"),
                            "name": selectPath("//usering/param[@name='name']")[0].getAttribute("value")
                        }
                    },

                    "talk": function () {
                        if (param[1].constructor == Object) {
                            afreshCSS(param[1]);
                            attachTalking(param[1]);
                            attachBinding(param[1]);
                            reading(param[1]);
                        } else {
                            detachBinding(param[1]);
                            detachTalking(param[1]);
                        }
                    },

                    "news": function () {
                        command("news", param[1], param[2], param[3]);
                    },

                    "send": function () {
                        if (reinner() && command("talk", param[1])) {
                            frames[param[1]["sending-iframe"]].document.body.innerHTML = "";
                        }
                    },

                    "enter": function () {
                        if (param[1] === undefined) {
                            return set["master_ctrlkey"];
                        } else {
                            set["master_ctrlkey"] = param[1];
                        }
                    },

                    "font": function () {
                        if (param[1] === undefined) {
                            return selectFont();
                        } else {
                            afreshFont(param[1]);
                        }
                    },

                    "face": function () {
                        if (param[1].constructor == Object) {
                            var window = frames[param[1]["sending-iframe"]];
                        } else {
                            var window = frames[param[1]];
                        }
                        command("exec", that.createElement("img", { src: param[2] }, null, window));
                    }

                }[param[0]]();

            };


        } catch (error) {
            throw new Error("'imcore' Error Plugin Unknown");
        }
    };


    /*
     * @description 注册插件
     */
    Is.bin["imcore"] = _imcore;


})();