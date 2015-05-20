/*1.1javascript的灵活性*/(function () {
    /*第一种    过程式编程*/ {
        function startAction() {//函数声明

        }
        function stopAction() {

        }
    }
    /*第二种    对象式编程*/{
        var Action = function () {//函数定义表达式

        };
        Action.prototype.start = function () {

        };
        Action.prototype.stop = function () {

        };
        var myAction = new Action();
        myAction.start();
        myAction.stop();
    }
    /*第三种     对象式编程封装*/{
        var Action = function () { };
        Action.prototype = {
            start: function () { },
            stop: function () { }
        };
    }
    ///*第四种      深入理解*/{  //拓展function的原型对象，所有的function函数都继承Function
    //    Function.prototype.method = function (name, fn) {
    //        this.prototype[name] = fn;
    //    };
    //    var Action = function () { };
    //    Action.method("start", function () { });
    //    Action.method("stop", function () { });
    //}
    /*第五种     函数的链式*/{
        Function.prototype.method = function (name, fn) {
            this.method[name] = fn;
            return this;     //添加完对象的方法后返回调用对象的本身
        }
        var Action = function () {
        };
        Action
            .method("start", function () { })
            .method("stop", function () { });

    }
})()
/*1.2若类型语言*/
{
    //javascript 为弱类型语言，定义变量不用声明其类型。这并不意味着变量没有类型。
    //这主要取决于包含的数据。javascript的5种原始数据类型
    //布尔  数值 字符串 null undefined
    //转换：字符串 toString()  
    //      数  值 parseFloat() parseInt()
    //      双重“非”，将字符串或数值转变为布尔值
    (function () {
        var b = false;

        var num = "a";

        var c = "7.1";

        console.log(b.toString());
        console.log(!num);
        console.log(!!num);
        console.log(parseFloat(c));
    })()
}
/*1.3函数式一等对象*/{
    //匿名函数的实例
    (function () {
        var foo = 10;
        var bar = 2;
        alert(foo * bar);
    }())
    //匿名函数参数
     (function (foo, bar) {
         alert(foo * bar);
     }(10, 2))
    //匿名函数返回值
    var baz = (function (foo, bar) {
        return foo * bar;
    }(10, 2))
}

/*1.4对象的易变性*/{
    function displayError(message) {
        displayError.num++;
        alert(message + "------" + displayError.num);

    }
    displayError.num = 0
    displayError("aaaaaa")
    displayError("bbbbbb")
    displayError("ccccc")
}

{
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    }
    Person.prototype.getAge = function () {
        return this.age;
    }
    Person.prototype.getGreeting = function () {
        return 'hi' + this.name;
    }
    var alice = new Person("alice", 23);
    var gim = new Person("gim", 33);
    alice.displaygreent = function () {
        alert(this.getGreeting);
    }
    alice.displaygreent();
}

/*1.5 继承*/
/*1.6 javascript中的设计模式*/
/*
1.可维护性 
     降低模块之间的耦合度，实用与大型团队合作开发
2.沟通。
     工厂模式，简单说明
3.性能

不使用设计模式 
1.复杂性。获得可维护性往往要付出代价，那就是代码可能会变得更加复杂、更难被程序设计新手理解
2.性能。尽管某些模式能提升性能，但多数模式对代码的性能都有所拖累。
取决去项目的需求



*/
