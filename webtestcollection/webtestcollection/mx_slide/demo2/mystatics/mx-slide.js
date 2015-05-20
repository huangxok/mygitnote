/**********************************************************	
 *	mx_slide 1.0 - simple gallery with jquery
 *	QQ群：Web前端-JavaScript(192988681)
 *	作者：魔蝎
 *	时间：2014-12-12
 *	欢迎交流转载，但请尊重作者劳动成果，标明插件来源及作者
 *********************************************************/

(function( window ){
	var slide = function( id ){
		this.e = id[0];
		//默认参数
		this.mx_find = '.mx-content a';
		this.mx_mode = 'fade';
		this.mx_time = 5000;
		this.mx_speed = 500;
		this.mx_auto = true;
		
		this.mx_change = 'span';
		this.mx_event = 'mouseover';
		this.mx_num = true;
		this.mx_delay = 100;
		
		this.mx_key = 300;
	},
	elements = function(){
		var e = this,
			_$ = arguments[0],
			change = '.mx-change',
			cur = 'mx-cur',
			start = 0,
			id;
		jQuery(window).load(function(){
			id = jQuery( _$.e );
			e.leng = id.find( _$.mx_find ).length;
			e.mode = e.mode();	//模式选择器
			e.initial();	//初始化
			e.scroll = e.scroll();	//滑动值
			_$.mx_auto ? e.auto() : null;	//自动播放
			e.change();		//序列选择
			e.key('click');	//按钮事件
		});
		e.mode = function(){	//模式选择
			switch(_$.mx_mode){
				case 'fade':
					return e.fade;
					break;
				case 'left':
					return e.left;
					break;
				case 'top':
					return e.top;
					break;
			}
		},
		e.initial = function(){		//初始化
			if( id.find( change ).html() == '' ){
				for( var i=1; i<=e.leng; i++ )
				id.find( change ).append( '<'+ _$.mx_change +'>'+ (_$.mx_num?i:'') +''+'</'+ _$.mx_change +'>' );
			}
			if( _$.mx_mode == 'left' || _$.mx_mode == 'top' ){
				var content = id.find( _$.mx_find ).parent().clone();
				id.find( _$.mx_find ).parent().parent().append( content );
				id.find( _$.mx_find ).parent().last().addClass( 'mx-clone' );
				e.leng = id.find( _$.mx_find ).length;
				e.rol_cur( start );
			}
			_$.mx_mode == 'fade' ? e.mode( start ) : '';
		},
		e.scroll = function(){	//获取滑动值
			var _this = this, li = id.find( _$.mx_find ), first = li.first().offset();
			_this.left = new Array();
			_this.top = new Array();
			if( _$.mx_mode == 'left' ){
				li.each(function(i){ _this.left[i] = jQuery(this).offset().left - first.left });
				return _this.left;
			}
			if( _$.mx_mode == 'top' ){	
				li.each(function(i){ _this.top[i] = jQuery(this).offset().top - first.top });
				return _this.top;
			}
		},
		e.change = function(){		//序列模块
			id.find( change ).find( _$.mx_change ).bind( _$.mx_event,function(){
				while( jQuery(this).index() != start){
					jQuery(this).parent().find( _$.mx_change ).unbind();
					e.mode( start = jQuery(this).index() );
					setTimeout( e.change , _$.mx_delay );
					break;
				}
			});
		},
		e.key = function(event){	//按钮模块
			var back = id.find( '.mx-key-back' ),
			    next = id.find( '.mx-key-next' ), 
			    c = function(i){
					back.unbind();
					next.unbind();
					setTimeout( function(){ e.key(event) } , _$.mx_key );
					return i;
				};
			back.bind( event, function(){
				e.mode( c( start = start <= 0 ? e.leng-1 : start-1 ) );
			}); 
			next.bind( event, function(){
				e.mode( c( start = start >= e.leng-1 ? 0 : start+1 ) );
			});
		},
		e.auto = function(){	//自动轮播
			var state = false;	//运行状态记录(IE)
			id.hover(
				function(){
					if( state ){
						clearInterval( e.stop );
						state = false;
					}
				},
				function(){
					if( !state ){
						e.stop = setInterval(function(){
							e.mode( start = start < e.leng-1 ? start+1 : 0 );
						},_$.mx_time);
						state = true;
					}
				}
			).trigger('mouseleave');
		},
		e.rol_cur = function(i){
			id.find( change ).find( _$.mx_change ).eq(i).addClass( cur ).siblings().removeClass( cur );
			_$.fn ? _$.fn(i) : '';
			return id.find( _$.mx_find ).parent().parent().parent();
		},
		e.fade = function(i){	//渐变
			e.rol_cur(i);
			id.find( _$.mx_find ).eq(i).css('z-index','0').fadeIn(0).siblings().css('z-index','1').fadeOut( _$.mx_speed );	
		},
		e.left = function(i){	//横向滑动
			var els = e.rol_cur(i>e.leng/2-1?i-e.leng/2:i);
			if( i == e.leng-1 ){
				els.scrollLeft( els.scrollTop() + e.scroll[e.leng/2] );
				start = e.leng/2-1;
			}
			els.scroll(function(){
				var left = $(this).scrollLeft();
				if( left >= e.scroll[e.leng/2] && start != e.leng/2-1 ) {
					$(this).scrollLeft( left-e.scroll[e.leng/2] );
					start = start >= e.leng/2 ? start - e.leng/2 : start;
				}
			});
			els.stop().animate({ scrollLeft : e.scroll[start] }, _$.mx_speed );
		},
		e.top = function(i){	//纵向滑动
			var els = e.rol_cur(i>e.leng/2-1?i-e.leng/2:i);
			if( i == e.leng-1 ){
				els.scrollTop( els.scrollTop() + e.scroll[e.leng/2] );
				start = e.leng/2-1;
			}
			els.scroll(function(){
				var top = $(this).scrollTop();
				if( top >= e.scroll[e.leng/2] && start != e.leng/2-1 ) {	
					$(this).scrollTop( top-e.scroll[e.leng/2] );
					start = start >= e.leng/2 ? start - e.leng/2 : start;
				}
			});
			els.stop().animate({ scrollTop : e.scroll[start] }, _$.mx_speed );
		}
	};
	slide.prototype = {
		find : function(f){
			if( typeof(f) == 'string' ) this.mx_find = f;
			return this;
		},
		mode : function(m){
			switch(m){
				case 'fade':
					this.mx_mode = m;
					break;
				case 'left':
					this.mx_mode = m;
					break;
				case 'top':
					this.mx_mode = m;
					break;
			}
			return this;
		},
		time : function(t){
			if( typeof(t) == 'number' ) this.mx_time = t;
			return this;
		},
		speed : function(s){
			if( typeof(s) == 'number' ) this.mx_speed = s;
			return this;
		},
		auto : function(b){
			if( typeof(b) == 'boolean' ) this.mx_auto = b;
			return this;
		},
		change: function(c){
			if( typeof(c) == 'string' ) this.mx_change = c;
			return this;
		},
		event: function(v){
			if( typeof(v) == 'string' ) this.mx_event = v;
			return this;
		},
		num : function(b){
			if( typeof(b) == 'boolean' ) this.mx_num = b;
			return this;
		},
		delay : function(n){
			if( typeof(n) == 'number' ) this.mx_delay = n;
			return this;
		},
		key : function(n){
			if( typeof(n) == 'number' ) this.mx_key = n;
			return this;
		},
		start : function(fn){
			if( typeof fn == 'function' ) this.fn = fn;
			new elements( this );
		}
	};
	window.mx_slide = function(){
		return new slide( arguments );
	}
})( window );



