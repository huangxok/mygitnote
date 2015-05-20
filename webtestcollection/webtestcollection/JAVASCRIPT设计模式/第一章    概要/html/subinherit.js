//继承函数 ------------ 原型链继承
; function inherit(o) {
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
//子类继承函数完善版 --- 类继承
; function subinherit(/*子类*/subclass,/*超类或父类*/superclass) {
    var F = function () { }
    F.prototype = superclass.prototype;
    subclass.prototype = new F();
    subclass.prototype.constructor = subclass;
    if (superclass.prototype.constructor == Object.prototype.constructor) {
        superclass.prototype.constructor = superclass;
    }
}


//子类继承函数精简版
; function subinheritsimple(subclass, superclass) {
    subclass.prototype = inherit(superclass);
    subclass.prototype.constructor = subclass;
}
