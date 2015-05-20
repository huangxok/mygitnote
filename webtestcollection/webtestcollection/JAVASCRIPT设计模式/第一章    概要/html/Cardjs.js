//例：9-8 使用枚举类型来表示一副扑克牌
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


//定义 牌 类
function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}
//使用枚举定义花色和枚举
Card.Suit = enumerationObject({ Clubs: 1, Diamonds: 2, heart: 3, spades: 4 });
var num = { Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14 }
Card.Rank = enumerationObject(num);

//定义描述牌面的文本
Card.prototype.toString = function () {
    return this.rank.toString() + "of" + this.suit.toString();
};
//比较扑克牌中两张牌的大小
Card.prototype.comparetTo = function (that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
}
//以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function (a, b) {
    return a.comparetTo(b);
}
//以桥牌的玩法对扑克牌进行排序的函数
Card.orderBySuit = function (a, b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
}

//定义一副标准的扑克牌类
function Deck() {
    var cards = this.cards = [];
    Card.Suit.foreach(function (s) {
        Card.Rank.foreach(function (r) {
            cards.push(new Card(s, r));
        });
    });
}
//洗牌方法：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function () {
    var deck = this.cards, len = deck.length;
    for (var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp

    }
    return this;

}
//返回牌的数组
Deck.prototype.deal = function (n) {
    if (this.cards.length < n) throw "out of cards";
    return this.cards.splice(this.cards.length - n, n);
}




var deck = (new Deck()).shuffle();
var hank = deck.deal(13).sort(Card.orderBySuit);