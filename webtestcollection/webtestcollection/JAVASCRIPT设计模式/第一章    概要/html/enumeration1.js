/*枚举类*/
function enumerationObject(namesToValues) {
    var enumeration = function () {
        //throw "Can't Instantiate Enumeration"
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
function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}
Card.Suit = enumerationObject({ Clubs: 1, Diamonds: 2, heart: 3, spades: 4 });
var num = { Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14 }
Card.Rank = enumerationObject(num);
Card.prototype.toString = function () {
    return this.rank.toString() + "of" + this.suit.toString();
}
Card.prototype.comparetTo = function (that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
}
Card.orderByRank = function (a, b) {
    return a.comparetTo(b);
}
Card.orderBySuit = function (a, b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
}

function Deck() {
    var card = this.cards = [];
    Card.Suit.foreach(function (s) {
        Card.Rank.foreach(function (r) {
            cards.push(new Card(s, r));
        });
    });
}
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
Deck.prototype.deal = function (n) {
    if (this.cards.length < n) throw "out of cards";
    return this.cards.splice(this.cards.length - n, n);
}

//创建一副新的扑克牌，洗牌并发牌
var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);











