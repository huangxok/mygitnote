﻿var autoComplete = null;

//AutoComplete constructor
function AutoComplete(params, input){
    this.params = params//Params string
    this.input = input;//Input
    this.messages = new Array();//Param array
    this.message = input.value;//Input Real-time value
    this.inputValue = "";//Original value
    this.size = 0;//Drop-down lines
    this.index = 0;//Current line
    this.likemsgs = new Array();//Drop-down box data
    this.div = this.$$$('auto');//Floating DIV
    this.divInnerHTML = this.div.innerHTML;//DIV content
    this.input.onblur = function(){
        autoComplete.lostFocus();
    }
}

//Auto Suggest
function AutoSuggest(params, input, e){
    var keycode = AutoComplete.prototype.isIE() ? window.event.keyCode : e.which;
    if ((keycode >= 37 && keycode <= 40) || keycode == 13) {
        if (autoComplete != null && (keycode == 38 || keycode == 40 || keycode == 13)) {
            autoComplete.setStyle(keycode);
        }
    }
    else {
        autoComplete = new AutoComplete(params, input);
        autoComplete.show();
    }
}

//Convert a params string into an array
AutoComplete.prototype.strToArray = function(){
    this.messages = this.params.split(",");
}

//show prompt div
AutoComplete.prototype.show = function(){
    if (this.message != '') {
        this.inputValue = this.input.value;
        this.strToArray();
        this.emptyDiv();
        this.getLikeMegs();
        this.setDivAttr();
        this.addMessageToDiv();
    }
    else {
        this.emptyDiv();
    }
}

//Style set of information
AutoComplete.prototype.setStyle = function(keycode){
    if (this.size > 0) {
        if (keycode == 38) {//Up
            this.setStyleUp();
        }
        else 
            if (keycode == 40) { //Down
                this.setStyleDown();
            }
            else 
                if (keycode == 13) {//Enter
                    this.textToInput(this.$$$(this.index).innerText);
                }
    }
}

//direction up
AutoComplete.prototype.setStyleUp = function(){
    if (this.index == 0) {
        this.index = this.size;
        this.$$$(this.index).style.backgroundColor = '#E2EAFF';
        this.input.value = this.$$$(this.index).innerText;
    }
    else 
        if (this.index == 1) {
            this.$$$(this.index).style.backgroundColor = '#FFFFFF';
            this.input.value = this.inputValue;
            this.index = 0;
            this.input.focus();
        }
        else {
            this.index--;
            this.setOtherStyle();
            this.$$$(this.index).style.backgroundColor = '#E2EAFF';
            this.input.value = this.$$$(this.index).innerText;
        }
}

//direction down
AutoComplete.prototype.setStyleDown = function(){
    if (this.index == this.size) {
        this.$$$(this.index).style.backgroundColor = '#FFFFFF';
        this.input.value = this.inputValue;
        this.index = 0;
        this.input.focus();
    }
    else {
        this.index++;
        this.setOtherStyle();
        this.$$$(this.index).style.backgroundColor = '#E2EAFF';
        this.input.value = this.$$$(this.index).innerText;
    }
}

//In addition to the selected color of the other LI
AutoComplete.prototype.setOtherStyle = function(){
    for (var i = 1; i <= this.size; i++) {
        if (this.index != i) {
            this.$$$(i).style.backgroundColor = '#FFFFFF';
        }
    }
}

//When the window size to change the time
window.onresize = function(){
    if (autoComplete != null) {
        autoComplete.setDivAttr();
    }
}

//When the window click the time --  //firefox
window.onclick = function(e){
    if (AutoComplete.prototype.$$$('auto').style.display != 'none') {
        var x = e.clientX, y = e.clientY;
        var left = autoComplete.calcOffsetLeft(autoComplete.input);
        var right = autoComplete.calcOffsetLeft(autoComplete.input) + autoComplete.input.offsetWidth;
        var top = autoComplete.calcOffsetTop(autoComplete.input);
        var bottom = autoComplete.input.offsetHeight + autoComplete.calcOffsetTop(autoComplete.input) + autoComplete.div.offsetHeight;
        if (x < left || x > right || y < top || y > bottom) {
            autoComplete.emptyDiv();// emptyDiv
        }
    }
}

//Move the mouse up event set
AutoComplete.prototype.mouseover = function(li){
    li.style.backgroundColor ='E2EAFF';
    this.index = li.id;
    this.setOtherStyle();
}

//Setting DIV property
AutoComplete.prototype.setDivAttr = function(){
    if (this.input != null) {
        this.div.style.width = this.input.offsetWidth + 'px';
        this.div.style.left = this.calcOffsetLeft(this.input) + 'px';
        this.div.style.top = (this.input.offsetHeight + this.calcOffsetTop(this.input)) +1 + 'px';
        this.div.style.display = 'block';
    }
}

//Get all the matching information
AutoComplete.prototype.getLikeMegs = function(){
    var j = 0;
    for (var i = 0; i < this.messages.length; i++) {
        if ((this.messages[i].length >= this.message.length) && ((this.messages[i].substring(0, this.message.length)) == this.message)) {
            this.likemsgs[j++] = this.messages[i];
        }
    }
}

//Add information to the suspension DIV
AutoComplete.prototype.addMessageToDiv = function(){
    var complete = this;
    for (var i = 0; i < this.likemsgs.length; i++) {
        var li = document.createElement('li');
        li.id = i + 1;
        li.style.fontSize = '12px';
        li.style.listStyleType = 'none';
        li.style.listStylePosition = 'outside';
	li.style.padding = '3px';
	li.style.width = '100%';
        li.onmouseover = function(){
            complete.mouseover(this);
        }
        li.onmouseout = function(){
            this.style.backgroundColor = '#FFFFFF';
        }
        li.onclick = function(){
            complete.textToInput(this.innerText);
        }
        li.appendChild(document.createTextNode(this.likemsgs[i]));
        this.div.appendChild(li);
        this.divInnerHTML = this.div.innerHTML;
        this.size++;
    }
    if (this.size == 0) {
        this.div.innerHTML = "<li style=\"list-style: none outside;font-size:12px;color:red;\">未找到相匹配的结果!</li>";
        this.divInnerHTML = this.div.innerHTML;
    }
}

//Put the value to the input
AutoComplete.prototype.textToInput = function(value){
    this.input.value = value;
    this.emptyDiv();
}

//Empty DIV
AutoComplete.prototype.emptyDiv = function(){
    this.divInnerHTML = '';
    this.div.innerHTML = this.divInnerHTML;
    this.div.style.display = 'none';
    this.size = 0;
    this.index = 0;
}

//Calculate the distance between the left from the suspension DIV
AutoComplete.prototype.calcOffsetLeft = function(field){
    return this.calcOffset(field, 'offsetLeft');
}

//Calculate the distance between the top from the suspension DIV
AutoComplete.prototype.calcOffsetTop = function(field){
    return this.calcOffset(field, 'offsetTop');
}

//Calculate method
AutoComplete.prototype.calcOffset = function(field, attr){
    var offset = 0;
    while (field) {
        offset += field[attr];
        field = field.offsetParent;
    }
    return offset;
}

//Input lost focus
AutoComplete.prototype.lostFocus = function(){
    var active = document.activeElement;
    if (AutoComplete.prototype.isIE() && active != null && active.id != 'auto') {
        this.emptyDiv()
    }
}

//Use $$$ replace getElementById
AutoComplete.prototype.$$$ = function(obj){
    return document.getElementById(obj);
}

//isIE
AutoComplete.prototype.isIE = function(){
    return window.navigator.userAgent.indexOf('MSIE') != -1;
}

//Firefox innerText define
if (!AutoComplete.prototype.isIE()) {
    HTMLElement.prototype.__defineGetter__("innerText", function(){
        var anyString = "";
        var childS = this.childNodes;
        for (var i = 0; i < childS.length; i++) {
            if (childS[i].nodeType == 1) 
                anyString += childS[i].innerText;
            else 
                if (childS[i].nodeType == 3) 
                    anyString += childS[i].nodeValue;
        }
        return anyString;
    });
    HTMLElement.prototype.__defineSetter__("innerText", function(sText){
        this.textContent = sText;
    });
}
