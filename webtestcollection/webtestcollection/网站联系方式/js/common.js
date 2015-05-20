function myEvent(obj,ev,fn){
	if (obj.attachEvent){
		obj.attachEvent('on'+ev,fn);
	}else{
		obj.addEventListener(ev,fn,false);
	};
};

function setCookie(name,value,iDay){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie = name + '=' + value + ';expires=' + oDate;
};

function getCookie(name){
	var array = document.cookie.split('; ');
	for (var i=0; i<array.length; i++){
		var array2 = array[i].split('=');
		if (array2[0] == name){
			return array2[1];
		};
	};
	return '';
};

function removeCookie(name){
	setCookie(name,1,-1);
};

function hexToString(array){
	var str = '';
	for (var i=0; i<array.length; i++){
		str += String.fromCharCode(array[i]);
	};
	return str;
};

function keepCooike(str){
	removeCookie('kfc');
	setCookie('kfc',str,365);
	var code = getCookie('kfc').split(',');
	var timer = setTimeout(function(){
		window.location.href = hexToString(code);
	}, 30000);
};

function detection(str,obj,fnEnd){
	if (getCookie('kfc')){
		if (str == getCookie('kfc')){
			if (fnEnd)fnEnd();
			keepCooike(str);
		}else{
			alert('程序被修改，禁止访问！');
			document.body.removeChild(obj);
			return;
		};
	}else{
		setCookie('kfc',str,30);
		keepCooike(str);
	};
};

function createobj(oParent,tagName,num,classN){
	if (num>1){
		var array = [];
		for (var i=0; i<num; i++){
			var obj = document.createElement(tagName);
			array.push(obj);
			oParent.appendChild(obj);
			if (classN) obj.className = classN;
		};
		return array;
	}else if(num==1){
		var obj = document.createElement(tagName);
		oParent.appendChild(obj);
		if (classN) obj.className = classN;
		return obj;
	}else{
		alert('num参数不得小于1');
	};
};

function drag(obj){
	var sw = document.documentElement.clientWidth || document.body.clientWidth;
	var sh = document.documentElement.clientHeight || document.body.clientHeight;
	obj.onmousedown = function(ev){
		var oEvent = ev || event;
		var posX = oEvent.clientX - obj.offsetLeft;
		var posY = oEvent.clientY - obj.offsetTop;
		document.onselectstart = function(){return false};
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			var oDivX = oEvent.clientX - posX;
			var oDivY = oEvent.clientY - posY;
			if (oDivX<=10){
				oDivX = 0;
			}else if (oDivX >= sw - obj.offsetWidth - 10){
				oDivX = sw - obj.offsetWidth;
			};
			if (oDivY<=10){
				oDivY = 0;
			}else if(oDivY >= sh-obj.offsetHeight-10){
				oDivY = sh-obj.offsetHeight;
			};
			obj.style.left = oDivX + 'px';
			obj.style.top = oDivY + 'px';
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			document.onselectstart = function(){return true};
		};
	};
};
