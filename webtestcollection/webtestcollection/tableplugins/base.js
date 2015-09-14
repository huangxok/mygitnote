if(typeof(stc) == 'undefined') {
stc = {};
stc.system={};
stc.__ns = function(path, flag) {
	var arr = path.split(".");
	var length = arr.length;
	if(flag==true) length--;
	if(length <= 0 ) return;

	var i=1;
	var ns = arr[0];
	do {
		eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
		ns += "."+arr[i++];
	}while(length>=i);
};

stc.clazz = function() {
	if(arguments.length < 3 || arguments.length > 4)
		return;
	stc.__ns(arguments[0],true);
	var inx = arguments[0].lastIndexOf('.');
	var cf = arguments[1];
	var ro= arguments[2];
	var clazz_name=arguments[0];
	if(inx >= 0) {
		var pack = eval(arguments[0].substring(0,inx));
		pack[arguments[0].substring(inx+1)] = function(){
			cf.apply(this,arguments);
			var own = this;
			var rs = {};
			for(var fn in ro) {
				if(typeof(ro[fn]) != "function") continue;
				eval("rs[fn]="+ro[fn].toString());
			}
			rs.getClass=function(){return clazz_name;};
			return rs;
		}
	} else {
		window[arguments[0]] = function(){
			cf.apply(this,arguments);
			var own = this;
			var rs = {};
			for(var fn in ro) {
				if(typeof(ro[fn]) != "function") continue;
				eval("rs[fn]="+ro[fn].toString());
			}
			rs.getClass=function(){return clazz_name;};
			return rs;
		}
	}
	if(typeof arguments[3] == 'object') 
		eval(arguments[0]+".prototype = arguments[3]");
};

stc.cfgDefault = function(src, def){
	if(typeof src == 'undefined')
		return def;
	if(def == null) return src;
	if (typeof def != 'object')
		return src;
       	if (def instanceof Array) {  
        	if (!(src instanceof Array)) 
			return def;
        } else {
		if(typeof src != 'object' || src instanceof Array)
			return def;
	}
	for (var i in def)
		src[i] = arguments.callee(src[i], def[i]);
	return src;
};

stc.packages = function(path){
	stc.__ns(path, false);
};

stc.addCss = function(path){
	document.write("<link type='text/css' rel='stylesheet' href='"+path+"' />");
};

stc.addScript = function(path){
	document.write("<script type='text/javascript' src='"+path+"' ></script>");
};

stc.loadScript = function(path){
	var x = document.createElement('script');
	x.src=path;
	x.type = 'text/javascript';
	var head = document.head || document.getElementsByTagName("head")[0];
	head.appendChild(x);
};

stc.loadCss = function(path){
	var x = document.createElement('link');
	x.href=path;
	x.rel = 'stylesheet';
	x.type="text/css";
	var head = document.head || document.getElementsByTagName("head")[0];
	head.appendChild(x);
};

stc.Href = function() {
	var args = [];

	var result = window.location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
	if(result != null){
     		for(var i = 0; i < result.length; i++){
			var ele = result[i];
			var inx = ele.indexOf("=");
			args[ele.substring(1, inx)] = ele.substring(inx+1);
     		}
	}
return {
	getParameter:function(key){
		var rt = args[key];
		if(rt == undefined)
			return null;
		return rt;
	}, 
	getAllParameter:function() {
		return args;
	}
}}
stc.href = new stc.Href();
stc.system.EventManager = function(){
	var own = this;
	var result = {
	trigger:function(type, data){
		if(window.top!=window.self)
			window.top.stc.events.trigger(type,data);
		else
			own.trigger(type,data);
	},
	bind:function(type, fn, ifm){
		if(window.top!=window.self)
			window.top.stc.events.bind(type,fn,window.self);
		else if(typeof(ifm)=="undefined")
			own.bind(type,fn,window.top);
		else
			own.bind(type,fn,ifm);
	},
	unbind:function(type,fn,ifm){
		if(window.top!=window.self)
			window.top.stc.events.unbind(type,fn,window.self);
		else if(typeof(ifm)=="undefined")
			own.unbind(type,fn,window.top);
		else
			own.unbind(type,fn,ifm);
	}};
	if(window.top!=window.self) return result;
	this.events = {};
	this.ifms=[];

	this.trigger=function(type,data){
		if(typeof(type) != "string")
			return;
		var x = own.events[type];
		if(typeof(x) != "object")
			return;
		x.cb.fire(data);
	}
	this.bind=function(type,fn,ifm){
		if(typeof(fn) != "function")
			return;
		if(typeof(type) != "string")
			return;
		if(typeof(ifm) != "object")
			return;

		var x = own.events[type];
		if(typeof(x) != "object") {
			own.events[type]={};
			x = own.events[type];
			x.cb = $.Callbacks();
		}
		if(!x.cb.has(fn)) {
			var target = null;
			for(var i=0;i<own.ifms.length;i++) {
				if(own.ifms[i].ifm==ifm){
					target = own.ifms[i];
					break;
				}
			}
			if(target == null) {
				target = {"ifm":ifm, events:[]};
				$(ifm).unload(function(){
					own.unbind(type,undefined,ifm);
				});
				own.ifms.push(target);
			}
			target.events.push(fn);
			x.cb.add(fn);
		}
	}
	this.unbind=function(type,fn,ifm) {
		if(typeof(type) != "string")
			return;
		if(typeof(ifm) != "object")
			return;
		var x = own.events[type];
		if(typeof(x) != "object")
			return;
		if(typeof(fn) == "undefined") {
			var target = null;
			for(var i=0;i<own.ifms.length;i++) {
				if(own.ifms[i].ifm==ifm){
					var ta = own.ifms[i].events;
					for(var i=0;i<ta.length;i++) 
						x.cb.remove(ta[i]);
					own.ifms.splice(i,1);
					break;
				}
			}
		} else x.cb.remove(fn);
		if(!x.cb.has()) delete own.events[type];
	}
	return result;
};
stc.events = new stc.system.EventManager();

stc.string2Var = function(name){
	try {
		var o = eval(name);
		if(typeof o == 'undefined')
			return null;
		return o;
	} catch (e) {
		return null;
	}
}

if(typeof JSON == 'undefined') {
JSON = function (){
	var m = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' },
	s = { 'boolean': function (x) { return String(x); },
		number: function (x) { return isFinite(x) ? String(x) : 'null'; },
		string: function (x) { if (/["\\\x00-\x1f]/.test(x)) {
			x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
					var c = m[b]; if (c) { return c; }
					c = b.charCodeAt();
					return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}); }
			return '"' + x + '"'; },
		object: function (x) {
			if (x) {
				var a = [], b, f, i, l, v;
				if (x instanceof Array) {
					a[0] = '['; 
					l = x.length;
					for (i = 0; i < l; i += 1) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == 'string') {
								if (b) { a[a.length] = ','; }
								a[a.length] = v;
								b = true;
							}
						}
					}
					a[a.length] = ']';
				} else if (typeof x == 'object') {
					a[0] = '{';
					for (i in x) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == 'string') {
								if (b) { a[a.length] = ','; }
								a.push(s.string(i), ':', v);
								b = true;
							}
						}
					}
					a[a.length] = '}';
				}else if (x instanceof Object) {
					a[0] = '{';
					for (i in x) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == 'string') {
								if (b) { a[a.length] = ','; }
								a.push(s.string(i), ':', v);
								b = true;
							}
						}
					}
					a[a.length] = '}';
				} else {
					return;
				}
				return a.join('');
			}
			return 'null';
		}
        };
	return {
		stringify: function (v) {
			var f = s[typeof v];
			if (f) { v = f(v); if (typeof v == 'string')  return v; }
			return null;
		},
		parse: function (text) {
			try {
				return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + text + ')');
			} catch (e) { return false; }
		}
	};
}();
}

}
