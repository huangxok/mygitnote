//获取类型
; var typeClassOf
(function (typeClassOf) {
    //获取class 类属性
    var get_classof = function (o) {
        if (arguments.length > 1)
            throw Error("the parameter's length is expected one")
        if (o === null) { return "Null" };
        if (o === undefined) { return "Undefined" }
        return Object.prototype.toString.call(o).slice(8, -1)
    }
    typeClassOf.get_classof = get_classof;
    //获取类型
    var get_typeof = function (o) {
        if (arguments.length > 1)
            throw Error("the parameter's length is expected on")
        return typeof o
    }
    typeClassOf.get_typeof = get_typeof;
}(typeClassOf || (typeClassOf = {})))

; var inheritClass
//继承
; (function (inheritClass) {
    /*原型继承*/ {
        //继承函数 ------------ 原型链继承
        var inherit = function (o) {
            if (arguments.length > 1) {
                throw Error("the parameter's length is expected one");
            }
            if (Object.create) {  //支持ECMAScript5 则直接创建
                return Object.create(o);
            }
            else {
                var t = typeof o;
                if (t !== "object" && t !== "function") {
                    throw TypeError("the parameter is expected a  Object or a Function");
                }
                function F() { };
                F.prototype = o;
                return new F();
            }

        }
        ; inheritClass.inherit = inherit;
    }
    /*类继承*/{
        //子类继承函数完善版 --- 类继承
        ; var subinherit = function (/*子类*/subclass,/*超类或父类*/superclass) {
            var F = function () { }
            F.prototype = superclass.prototype;
            subclass.prototype = new F();
            subclass.prototype.constructor = subclass;
            if (superclass.prototype.constructor == Object.prototype.constructor) {
                superclass.prototype.constructor = superclass;
            }
        }
        ; inheritClass.subinherit = subinherit;
        //子类继承函数完善版 --- 类继承(将类的自有属性进行克隆复制)
        ; var subinheritown = function (/*子类*/subclass,/*超类或父类*/superclass) {
            for (var p in superclass) {
                if (superclass.haOwnProperty(p)) {
                    subclass[p] = superclass[p];
                }
            }
            function F() { this.constructor = subclass };
            F.prototype = superclass.prototype;
            subclass.prototype = new F();
            if (superclass.prototype.constructor == Object.prototype.constructor) {
                superclass.prototype.constructor = superclass;
            }

        }
        inheritClass.subinheritown = subinheritown;

        //子类继承函数精简版
        ; var subinheritsimple = function (subclass, superclass) {
            subclass.prototype = inherit(superclass);
            subclass.prototype.constructor = subclass;
        }
        ; inheritClass.subinheritsimple = subinheritsimple;

    }

})(inheritclass || (inheritclass = {}));

//克隆对象
; var copyObject
; (function (copyObject) {


})(copyObject || (copyObject = {}))

//枚举
; var enumerationObject;
; (function (enumerationObject) {
    /*枚举类*/
    var enumeration = function (/*键值对的一个对象*/namesToValues) {
        //枚举函数 这个没什么用
        var enumeration = function () {
            throw "Can't Instantiate Enumeration"
        };
        //枚举原型方法
        var proto = enumeration.prototype = {
            constructor: enumeration,
            toString: function () { return this.name },
            valueOf: function () { return this.value },
            toJSON: function () { return this.name }
        };
        //枚举值
        enumeration.values = [];
        //循环传入的枚举对象
        for (n in namesToValues) {
            var e = inheritclass.inherit(proto);
            e.name = n;
            e.value = namesToValues[n];
            enumeration[name] = e;
            enumeration.values.push(e);
        }
        //枚举的静态循环遍历函数
        enumeration.foreach = function (f, c) {
            for (var i = 0; i < this.values.length; i++) {
                f.call(c, this.values[i])
            }
        }
        return enumeration;
    }
    ; enumerationObject.enumeration = enumeration;
    //使用方式如下
    //定义 牌 类
    //function Card(suit, rank) {
    //    this.suit = suit;
    //    this.rank = rank;
    //}
    //使用枚举定义花色和枚举
    //var suit ={ Clubs: 1, Diamonds: 2, heart: 3, spades: 4 }
    //Card.Suit = enumerationObject(suit);
    //var num = { Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14 }
    //Card.Rank = enumerationObject(num);
})(enumerationObject || (enumerationObject = {}))


/*2.接口*/
/*
接口 提供用以说明一个对象应该具有哪些方法的手段。
接口之利：告诉一个程序员一个类实现了哪些方法，从而帮组其使用这个类。提供
          实现哪些方法，具体的功能由个人实现
接口之弊：降低语言的灵活性。
         
*/
; var Interface
(function (Interface) {
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
                    throw new Error("Function Interface.ensureImplements:object"
                        + "does not implement the"
                        + interfaces.name + "interface.method"
                        + method + " was not found");
                }
            }
        }
    }
    Interface.interface = Interface;

})(Interface || (Interface = {}))

//动态为对象添加方法(原型及静态)
; var extendObject;
(function (extenObject) {
    /*copy*/ {
        /*
    1,确保拷贝后的对象，与原对象具有同样的prototype原型对象。
    
    2,确保拷贝后的对象，与原对象具有同样的属性。
    */
        //copy函数 用于克隆或复制对象
        ; var copy = function (/*原对象*/org) {
            //获取对象的prototype对象，并创建一个新对象(克隆对象)
            //var copy = Object.create(Object.getPrototypeOf(org));
            var copy = inheritclass.inherit(Object.getPrototypeOf(org));
            //克隆函数的核心(原型对象,原对象）将远对象的属性及方法添加到克隆后的对象上
            copyOwnPropertiesFrom(copy, org);
            //返回克隆对象
            return copy;
        }
        ; extenObject.copy = copy
        //使用方式如下
        //var newobject = copyObject.copy({a:1});//原型继承创建对象
        //var p={}
        //p.name = 'ytt';
        //Object.defineProperty(p,"age",{value:24,})
        //将source的对象属性添加到target这个目标对象(克隆对象)上
        ; var copyOwnPropertiesFrom = function (/*克隆对象(目标对象)*/target,/*原对象*/ source) {
            Object.getOwnPropertyNames(source)  //{name:'ytt',age:'24'}[name,age]
                .forEach(function (propKey) {
                    var desc = Object.getOwnPropertyDescriptor(source, propKey);
                    Object.defineProperty(target, propKey, desc);
                });
            return target;
        }
        ; extenObject.copyOwnPropertiesFrom = copyOwnPropertiesFrom;
        //使用方式如下
        //copyObject.copyOwnPropertiesFrom({},{a:1});
    }
    /*拓展方法*/ {
        //建议extend配合defineClass一起使用
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
                            o[prop] = source[prop];
                        }
                    }
                }
                return o;
            }
            //这个列表列出了需要检查的特殊属性
            var protoprops = ["toString", "valueOf", "constructor", "hasOwnproperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"]

        }());
        extendObject.extend = extend;

        var defineClass = function (/*对象或构造函数*/constructor,/*对象原型方法集合*/methods,/*对象静态方法集合*/ statics) {
            if (methods) extend(constructor.prototype, methods);
            if (statics) extend(constructor, statics);
            return constructor;
        }
        extendObject.definClass = defineClass;
    }
    //使用方式参考如下
    //var SimpleRange = defineClass(
    //function (f, t) {
    //    this.f = f;
    //    this.t = t;
    //},
    //{
    //    includes: function (x) { return this.f <= x && x <= this.t },
    //    toString: function () { return this.f + "..." + this.t },
    //    cc:function(){    }
    //},
    //{
    //    upto: function (t) { return new SimpleRange(0, t); }
    //}
})(extendObject || (extendObject = {}))

function P() {

}
P.prototype.abc = function () {

}
