/*2.接口*/
/*
接口 提供用以说明一个对象应该具有哪些方法的手段。
接口之利：告诉一个程序员一个类实现了哪些方法，从而帮组其使用这个类。提供
          实现哪些方法，具体的功能由个人实现
接口之弊：降低预言的灵活性。
         
*/
//鸭式辨型
var Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with" + arguments.length + "arguments,but expected exactly 2.");
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== "string") {
            throw new Error("Interface constructor expects method names to be" + "pass in as a string");
        }
        this.methods.push(methods[i]);
    }
    return this;
}
Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with" + arguments.length + "arguments,but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interfaces = arguments[i];
        if (interfaces.constructor !== Interface) {
            throw new Error("Function Interface.ensureImpments expects arguments" + "two and above to be instances of Interface");
        }
        for (var j = 0, methodslen = interfaces.methods.length; j < methodslen; j++) {
            var method = interfaces.methods[j];
            if (!object[method] || typeof object[method] !== "function") {
                throw new Error("Function Interface.ensureImplements:object "
                    + "does not implement the "
                    + interfaces.name + "interface.method ("
                    + method + ") was not found");
            }
        }
    }
    console.log('lala');

}
//var Composite = new Interface("Composite", ["add", "remove", "getChild"]);
//var FormItem = new Interface("FormItem", ["save"]);
//var f = function () { };
//f.prototype = {
//    add: function () { },
//    remove: function () { },
//    //getChild: function () { },
//    save: function () { }
//}
//var CompositeForm = function (id, method, action) {//implements Composite,FormItem


//}
//function addForm(formInstance) {
//    Interface.ensureImplements(formInstance, Composite, FormItem);
//}