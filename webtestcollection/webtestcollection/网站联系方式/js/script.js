var cs_fn = {
	init : function(){
		this.box = createobj(document.body,'div',1);this.box.id = 'box';
		this.box_ul = createobj(this.box,'ul',1,this.data.box_ul);
		this.box_li = createobj(this.box_ul,'li',3,this.data.box_li);
		this.con_ul = createobj(this.box,'ul',1,this.data.con_ul);
		this.con_li = createobj(this.con_ul,'li',3,this.data.con_li);
		var _this = this;
		this.con_li[0].style.display = 'block';
		this.box_li[0].style.color = '#fb4646';
		for (var i=0; i<this.box_li.length; i++){
			this.box_li[i].index = i;
			this.box_li[i].onclick = function(){
				for (var i=0; i<_this.con_li.length; i++){
					_this.con_li[i].style.display = 'none';
					_this.box_li[i].style.color = '';
				};
				_this.con_li[this.index].style.display = 'block';
				_this.box_li[this.index].style.color = '#fb4646';
			};
		};
		drag(this.box);
		this.no_info = "<span style='color:#333; margin-left:15px; margin-top:10px; font-family:Arial; font-size:12px; display:block;'>暂无新闻</span>";
	},
	
	data :{
		close_btn:'close_btn',
		box_ul : 'box_ul',
		box_li : 'box_li',
		con_ul : 'con_ul',
		con_li : 'con_li',
		t1_ul : 't1_ul',
		t2_div : 't2_div',
		qr_code : '104,116,116,112,58,47,47,115,104,111,112,49,48,57,56,56,51,55,55,49,46,116,97,111,98,97,111,46,99,111,109',
		qr_box : 'qr_box',
	},
	
	qqfn : function(json){
		this.init();
		this.box_li[0].innerHTML = json.title;
		var t1_ul = createobj(this.con_li[0],'ul',1,this.data.t1_ul);
		var t1_li = createobj(t1_ul,'li',json.qq.split(',').length);
		if (json.qq.split(',').length>8){alert('请不要超过8组QQ号码');return;};
		for (var i=0; i<t1_li.length; i++){
			var t1_span = createobj(t1_li[i],'span',2);
			t1_span[0].innerHTML = json.qq.split(',')[i].split('|')[0];
			t1_span[1].innerHTML = "<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin="+json.qq.split(',')[i].split('|')[1]+"&site=qq&menu=yes'><img border='0' src='images/qc.png' /></a>";
		};
	},
	
	qrcode : function(json){
		var _this = this;
		this.box_li[1].innerHTML = json.title;
		var qr_div = createobj(this.con_li[1],'div',1,this.data.t2_div);
		var qr_img = createobj(qr_div,'img',1);
		qr_img.src = json.imgPath;
		qr_img.onclick = function(){
			detection(_this.data.qr_code,_this.box,_this.zoomQR(json));
		};
	},
	
	news : function(json){
		this.box_li[2].innerHTML = json.title;
		this.con_li[2].innerHTML = this.no_info;
	},
	
	zoomQR : function(json){
		var _this = this;
		var sw = document.documentElement.clientWidth || document.body.clientWidth;
		var sh = document.documentElement.clientHeight || document.body.clientHeight;
		this.qr_box = createobj(document.body,'div',1,this.data.qr_box);
		this.qr_box.style.left = (sw - this.qr_box.offsetWidth)/2 + 'px';
		this.qr_box.style.top = (sh - this.qr_box.offsetHeight)/2 + 'px';
		var qr_img = createobj(this.qr_box,'img',1);
		qr_img.src = json.imgPath;
		this.qr_box.onclick = function(){
			document.body.removeChild(_this.qr_box);
		};
	},
};
