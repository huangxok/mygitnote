/**
 * javascript自定义滚动条(滚动条高度可以动态改变)
 * @param opts
 * 调用方式
 * new tinyScroll({
        wrapBox : document.getElementById('wrap'),
        wrapList : document.getElementById('listbox'),
        scrollBox :document.getElementById('scrollbox'),
        scrollBar : document.getElementById('scrollbar')
    })
 */
function tinyScroll(opts) {
    this.wrapBox = opts.wrapBox;
    this.wrapList = opts.wrapList;
    this.scrollBox = opts.scrollBox;
    this.scrollBar = opts.scrollBar;
    this.scale = 0;
    this.height = 0;
    this.maxTop = 0;
    this.ListMaxTop = 0;
    this.top = 0;

    this.bindEvent();
}
tinyScroll.prototype = {
    constructor: tinyScroll,
    init: function () {
        this.scale = this.wrapBox.clientHeight / this.wrapList.scrollHeight;
        if (this.scale > 1) this.scale = 1;
        this.height = this.scale * this.scrollBox.scrollHeight;
        this.maxTop = this.scrollBox.scrollHeight - this.height;
        this.ListMaxTop = this.wrapBox.clientHeight - this.wrapList.scrollHeight;
        if (this.scale == 1) this.scrollBox.style.display = 'none';
        this.scrollBar.style.height = this.height + 'px';
    },
    bindEvent: function () {
        var that = this;
        var mouseScroll = function (ev) {
            ev = ev || event;
            var fx = ev.wheelDelta || ev.detail;
            var bDown = true;
            if (ev.detail) {
                bDown = fx > 0 ? true : false;
            } else {
                bDown = fx > 0 ? false : true;
            }
            if (bDown) {
                that.top += 10;
            } else {
                that.top -= 10;
            }
            that.fnScroll();
            if (ev.preventDefault) {
                ev.preventDefault();
            }
            return false;
        };
        this.init();
        this.scrollBar.onmousedown = function (ev) {
            ev = ev || event;
            var disY = ev.clientY - this.offsetTop;
            document.onmousemove = function (ev) {
                ev = ev || event;
                that.top = ev.clientY - disY;
                that.fnScroll();
            };
            document.onmouseup = function () {
                document.onmouseup = document.onmousemove = null;
            };
            return false;
        };
        this.wrapBox.onmousewheel = mouseScroll;
        if (this.wrapList.addEventListener) {
            this.wrapList.addEventListener('DOMMouseScroll', mouseScroll, false);
        }
    },
    fnScroll: function () {
        if (this.top < 0) this.top = 0;
        if (this.top > this.maxTop) this.top = this.maxTop;
        var scale = this.top / this.maxTop;
        var listTop = scale * this.ListMaxTop;
        this.scrollBar.style.top = this.top + 'px';
        this.wrapList.style.top = listTop + 'px';
    }
};