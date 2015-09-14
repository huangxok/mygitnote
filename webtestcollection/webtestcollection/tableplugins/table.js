stc.clazz('stc.component.Table', function(_cfg){
	this.cfg=stc.cfgDefault(_cfg, {
		head:[],
		data:null,
		select_model:0, 	//0:不支持行选择（缺省) 1 单选， 2 多选
		over_model:false,	//在行间移动是否变色, 缺省为false
		empty_text:'没查询到对应数据!',
		line_width:1,
		line_color:'#DADADA',
		hide_header:false,
		style:stc.component.Table.style
	});
	this.cfg.cb={};
	var own = this;

	this.model_select = [];
	this.root = document.createElement('div');
	this.cols_cfg = [];

	this.head = document.createElement('div');
	$(this.root).append(this.head);

	this.content = document.createElement('div');
	$(this.root).append(this.content);

	this.emptyData= document.createElement('div');
	$(this.emptyData).html(this.cfg.empty_text);
	$(this.emptyData).css(this.cfg.style.empty_data);
	$(this.emptyData).css({
		'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color,
		'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color,
		'border-left':this.cfg.line_width+'px solid '+this.cfg.line_color
	});

	this.loading = document.createElement('div');
	$(this.loading).css(this.cfg.style.loading);
	$(this.loading).css({'border-left':this.cfg.line_width+'px solid '+this.cfg.line_color,
			'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color,
			'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color});

	var bi = stc.string2Var('stc.THEMES.COMMON.IMGS.WAIT.SIZE32');
	if(bi != null)
		$(this.loading).css("background-image", "URL("+bi+")");

	$(this.loading).css({
		'border-left':this.cfg.line_width+'px solid '+this.cfg.line_color,
		'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color,
		'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color
	});

	this.createHead(this.cfg.head);
	if(null != this.cfg.data)
		this.insertData(this.cfg.data);
}, {
	setSelectCB:function(fun){
		if(typeof(fun)=="function") own.cfg.cb.selected=fun;
	},selectAll:function(){
		if(own.cfg.select_model != 2)
			return;
	},
	getSelected:function(){
		return own.model_select;
	},
	renderTo:function(target){
		$(target).append(own.root);
	},
	reflushHead:function(head){
		own.createHead(head);
	},
	setLoading:function(cmp) {
		own.setLoading(cmp);
	},
	reflushData:function(data,cmp){
		own.insertData(data,cmp);	
	}
},{
	insertLine:function(data, par, base, arr){
		var line = document.createElement('div');
		var rd_div = [];

		var g_col_inx = base;
		for(var i=0; i< data.length; i++){
			var ele = data[i];
			if(ele instanceof Array) {
				var tl = document.createElement('div');
				$(tl).addClass("stc_display_inline");
				$(tl).css({'vertical-align':'top'});
				var col_num = 0;
				for(var inx=0; inx< ele.length; inx++){
					col_num = this.insertLine(ele[inx], tl, g_col_inx, arr);
				}
				g_col_inx += col_num;
				
				$(line).append(tl);
				continue;
			}

			var cell = document.createElement('div');
			if(g_col_inx==0) {
				$(cell).css({'border-left':this.cfg.line_width+'px solid '+this.cfg.line_color}); 
			}

			if(ele instanceof Object && 'function' == typeof data[i].render) {
				var w = 0;
				if('number' == typeof data[i].col_num && data[i].col_num > 1) {
					var rc = this.cols_cfg.length - g_col_inx;
					for ( var jj = 0;  jj < data[i].col_num && jj < rc; jj++) {
						w += this.cols_cfg[g_col_inx].width +this.cfg.line_width;
						g_col_inx ++;
					}
					w-=this.cfg.line_width;
				} else {
					w = this.cols_cfg[g_col_inx].width;
					g_col_inx ++;
				}

				var rd = data[i].render(data[i].data, w);
				rd_div.push(rd);
				
				$(cell).append(rd);
				$(cell).css(this.cfg.style.cell);
				if(typeof(data[i].css) == "object") $(cell).css(data[i].css);
				$(cell).css({'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color, 
					'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color});
				$(cell).css('width', w+'px');
			} else if ('function' == typeof this.cols_cfg[g_col_inx].render){
				var rd = this.cols_cfg[g_col_inx].render(data[i], this.cols_cfg[g_col_inx].width);
				rd_div.push(rd);

				$(cell).append(rd);
				$(cell).css(this.cfg.style.cell);
				$(cell).css({'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color, 
					'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color});
				g_col_inx++;
			} else {
				$(cell).html(data[i]);
				$(cell).css(this.cfg.style.cell);
				$(cell).css({'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color, 
					'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color});
				$(cell).css('width', this.cols_cfg[g_col_inx].width+'px');
				g_col_inx++;
			}

			$(cell).css({'vertical-align':'top'});
			$(cell).addClass("stc_display_inline");
			$(line).append(cell);

		}
		$(par).append(line);

		if(base == 0) {
			this.setOverEvent(line, rd_div);
			this.setSelectEvent(line, rd_div);
		}

		arr.push({rd:rd_div, line:line});
		return g_col_inx - base;
	},
	setSelectEvent:function(line,rd){
		if(this.cfg.select_model != 1 && this.cfg.select_model != 2) return;

		var own = this;
		$(line).click(function(){
			var flag = false;
			var tmp = [];
			for(var i = 0; i < own.model_select.length; i++) {
				if (own.model_select[i] == line) {
					flag = true;
				}else 
					tmp.push(own.model_select[i]);
			}

			if(flag){
				own.model_select =  tmp;
				own.lineSetColor(line, rd, '#eaf5fc', true)
			} else {
				if(own.cfg.select_model == 1) {
					for(var j = 0; j < own.model_select.length; j++) {
						own.lineSetColor(own.model_select[j], rd, null, true)
					}
					own.model_select = [];
				}
				own.lineSetColor(line, rd, '#e0ffcc', true);
				own.model_select.push(line);
			}
			if(typeof(own.cfg.cb.selected) == "function")
				own.cfg.cb.selected(own.model_select);
		});
	},
	lineSetColor:function(ele, rd, color, flag){
		var own = this;
		
		if(null == color){
				$(ele).css('background-color', $(ele).attr('background-color'));
		} else {
			if(!Boolean(flag))
				$(ele).attr('background-color', $(ele).css('background-color'));
			$(ele).css('background-color', color);
		}

		for(var i = 0; i< rd.length; i++) {
			if(rd[i] == ele)
				return;
		}

		var fun = arguments.callee;
		$(ele).children().each(function(){
			fun.call(own, this, rd, color, flag);
		});
	},
	setOverEvent:function(line,rd){
		if(this.cfg.over_model == false) return;

		var own = this;
		$(line).hover(function(){
			for(var i = 0; i < own.model_select.length; i++) {
				if(own.model_select[i] == line) {
					return;
				}
			}

			$(line).children().each(function(){
				own.lineSetColor(this, rd, '#eaf5fc')
			});
		}, function(){
			for(var i = 0; i < own.model_select.length; i++) {
				if(own.model_select[i] == line) {
					return;
				}
			}

			$(line).children().each(function(){
				own.lineSetColor(this, rd, null);
			});
		});
	},
	insertData:function(data,cmp){
		$(this.content).empty();
		var w = 0;
		for(var i=0; i<this.cols_cfg.length;i++)
			w += this.cols_cfg[i].width;
		w += (this.cols_cfg.length - 1)*this.cfg.line_width;

		if(data.length == 0)  {
			$(this.emptyData).css('width', w+'px');
			$(this.content).append(this.emptyData);
			return;
		}
		$(this.root).css('width', w+(2*this.cfg.line_width)+'px');

		var own = this;
		$().ready(function(){
			var arr = [];
			for(var i=0; i< data.length; i++){
				own.insertLine(data[i], own.content, 0, arr);
			}
			
			own.calculateHeight(arr, 0, cmp);
		});
	},
	calculateHeight:function(arr, inx, cmp) {
		var own = this;
		if(inx >= arr.length) {
			if(typeof cmp == "function")
				cmp();
			return;
		}

		var lw = this.cfg.line_width;	
		$().ready(function(){
			var node = arr[inx];
			
			var mh = 0;
			for( var ix = 0; ix<node.rd.length; ix++ ){
				if( mh <= $(node.rd[ix]).height() )
					mh = $(node.rd[ix]).height();
			}
		
			$(node.line).children().each(function(){
				if(mh < $(this).height()) 
					mh = $(this).height();
			});
			
			$(node.line).children().each(function(){
						$(this).css({'height': mh+'px','line-height': mh+'px'});
						$(this).children().trigger('stc_resize');
			});	

			$().ready(function(){
				var p = $(node.line).parent();

				var h = 0;
				var last = null;
				p.children().each(function(){
					h+=$(this).height();
					last = this;
				});
				h -= lw;
				
				if(last == node.line && p[0] != own.content){
					p.css({'height': h+'px','line-height': h+'px'});
				}
						
				own.calculateHeight(arr, inx+1,cmp);	
			});		
		});
	},
	createHead:function(def){
		this.cfg.head = def;
		if(typeof this.head != 'undefined') {
			$(this.head).empty();
			this.createHeadContent(def);
		} else {
			this.createHeadContent(def);
		}
		this.setLoading();
	},
	createHeadContent:function(def) {
		for(var i=0; i< def.length; i++){
			var ele = def[i];	

			var width = 40;
			if(typeof ele.width != 'undefined')
				width=ele.width;
			this.cols_cfg[i] = {width:width, render:ele.render};

			if(this.cfg.hide_header)
				continue;

			var tmp = document.createElement('div');
			if(typeof ele.head_render == 'function') {
				$(tmp).append(ele.head_render(ele.data, width));
			} else
				$(tmp).html(ele.name);

			$(tmp).css('width', width+'px');
			if(i==0) { 
				$(tmp).css('border-left', this.cfg.line_width+'px solid '+this.cfg.line_color);
			}
			$(tmp).css(this.cfg.style.head);
			if(typeof(ele.css) == "object") $(tmp).css(ele.css);
			$(tmp).css({'border-top':this.cfg.line_width+'px solid '+this.cfg.line_color,
				'border-bottom':this.cfg.line_width+'px solid '+this.cfg.line_color,
				'border-right':this.cfg.line_width+'px solid '+this.cfg.line_color});
			$(tmp).css({'vertical-align':'top'});
			$(tmp).addClass("stc_display_inline");

			$(this.head).append(tmp);
		}
		if(this.cfg.hide_header)
			$(this.head).css('border-bottom', this.cfg.line_width+'px solid '+this.cfg.line_color);
	},
	setLoading:function(cmp){
		var w = 0;
		for(var i=0; i<this.cols_cfg.length;i++)
			w += this.cols_cfg[i].width;
		w += (this.cols_cfg.length -1)*this.cfg.line_width;

		$(this.loading).css('width', w+'px');
		$(this.content).empty();
		$(this.content).append(this.loading);
		
		$(document).ready(function(){
			if(typeof cmp == "function") cmp();
		});
	}
});

//移动商城规范样式
stc.component.Table.style = {
		head: {
			overflow:'hidden',
			height:'32px',
			'line-height':'32px',
			'background-color':'#fefbc6',
			color:'#333333',
			'font-size':'12px',
			'text-align':'center'
		},
		cell:{
			height:'32px',
			'line-height':'32px',
			'background-color':'white',
			'text-align':'center',
			overflow:'hidden'
		},
		empty_data : {
			'font-color':'gray',
			height:'40px',
			'line-height':'40px',
			'background-color':'white',
			'text-align':'center'
		},
		loading : {
			'background-position':'center',
			'background-repeat':'no-repeat',
			height:'200px',
			'background-color':'white'
		}
	};
