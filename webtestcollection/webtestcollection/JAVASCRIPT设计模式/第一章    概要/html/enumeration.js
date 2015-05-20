/*枚举类*/
function enumerationObject(namesToValues) {
    var enumeration = function () {
        throw "Can't Instantiate Enumeration"
    };
    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function () { return this.name },
        valueOf: function () { return this.value },
        toJSON: function () { return this.name }
    };
    enumeration.values = [];
    for (n in namesToValues) {
        var e = inherit(proto);
        e.name = n;
        e.value = namesToValues[n];
        enumeration[name] = e;
        enumeration.values.push(e);
    }
    enumeration.foreach = function (f, c) {
        for (var i = 0; i < this.values.length; i++) {
            f.call(c, this.values[i])
        }
    }
    return enumeration;
}
function inherit(o) {
    if (arguments.length > 1) {
        throw Error("the parameter's length is expected one")
    }
    if (Object.create) {  //支持ECMAScript5 则直接创建
        return Object.create(o);
    }
    else {
        var t = typeof o
        if (t !== "object" && t !== "function") {
            throw TypeError("the parameter is expected a  Object or a Function")
        }
        function F() { };
        F.prototype = o;
        return new F();
    }
}