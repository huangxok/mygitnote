var Factory = {
    create: function () {
        return function () { this.init.apply(this, arguments); }
    }
}

var Ajax = Factory.create();

Ajax.prototype = {
    init: function (successCallback, failureCallback) {
        this.xhr = this.createXMLHttpRequest();
        var xhrTemp = this.xhr;
        var successFunc = null;
        var failFunc = null;

        if (successCallback != null && typeof successCallback == "function") {
            successFunc = successCallback;
        }

        if (failureCallback != null && typeof failureCallback == "function") {
            failFunc = failureCallback;
        }

        this.get.apply(this, arguments);
        this.post.apply(this, arguments);

        this.xhr.onreadystatechange = function () {
            if (xhrTemp.readyState == 4) {
                if (xhrTemp.status == 200) {
                    if (successFunc != null) {
                        successFunc(xhrTemp.responseText, xhrTemp.responseXML);
                    }
                }
                else {
                    if (failFunc != null) {
                        failFunc(xhrTemp.status);
                    }
                }
            }
        }
    },
    get: function (url, async) {
        this.xhr.open("GET", url, async);
        this.xhr.send();
    },
    createXMLHttpRequest: function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        else {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }

        throw new Error("Ajax is not supported by the browser!");
    },
    post: function (url, data, async) {
        this.xhr.open("POST", url, async);
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xhr.send(data);
    },
    random: function (length) {
        var array = new Array("0", "1", "2", "3", "5", "6", "7", "8", "9");
        var len = parseInt(length);
        var key = "";

        for (var i = 0; i < len; i++) {
            key += Math.floor(Math.random() * 10);
        }

        return key;
    }
}