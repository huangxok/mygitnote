//继承函数 可以传入为null
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
////继承函数 不能传入为null
//function inherit(o) {
//    if (arguments.length > 1) {
//        throw TypeError("the parameter's length is expected 1")
//    }
//    if (o === null) {  //支持ECMAScript5 则直接创建
//        throw TypeError("the parameter is expected a  Object or a Function")
//    }
//    if (Object.create) {
//        return Object.create(o);
//    }
//    var t = typeof o
//    if (t !== "object" && t !== "function") {
//        throw TypeError("the parameter is expected a Object or a Function")
//    }
//    function F() { };
//    F.prototype = o;
//    return new F();
//}
