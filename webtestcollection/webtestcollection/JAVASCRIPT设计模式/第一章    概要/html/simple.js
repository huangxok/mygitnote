//例：8-3   P182
//定义一个拓展函数，用来将第二个以及后续的参数复制至第一个参数
//这里处理了IE bug：在多数IE版本中
//如果o的属性拥有一个不可枚举的同名属性，则for/in循环
var extend = (function () {   //将这个函数的返回值复制个extend
    //修复它之前，首先检查是否存在bug
    for (var p in { toString: null }) {
        //如果代码执行到这里，那么for/in循环会正确工作并返回
        //一个简单版本的extend()函数
        return function extend(o) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var prop in source) {
                    o[prop] = source[prop];
                }
            }
            return o;
        }

    };
    //如果代码执行到这里，说明for/in循环不会枚举测试对象的toString属性
    //因此返会另一个版本的extend()函数，这个函数显式测试
    //Object.prototype中的不可枚举属性	
    return function patched_extend(o) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            //复制所有的可枚举属性
            for (var prop in source) {
                o[prop] = source[prop];
            }
            //现在检查特殊属性
            for (var j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.haOwnProperty(prop)) {
                    o[prop] = source[pr -op];
                }
            }
        }
        return o;
    }
    //这个列表列出了需要检查的特殊属性
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnproperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"]

}());


function defineClass(constructor, methods, statics) {
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}
var SimpleRange = defineClass(
    function (f, t) {
        this.f = f;
        this.t = t;
    },
    {
        includes: function (x) { return this.f <= x && x <= this.t },
        toString: function () { return this.f + "..." + this.t }
    },
    {
        upto: function (t) { return new SimpleRange(0, t); }
    }
)