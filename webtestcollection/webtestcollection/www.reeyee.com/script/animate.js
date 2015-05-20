$.fn.resetShow = function(d, o){
	$(this).data("started", false);
	if(d.left){
		$(this).css("left", d.left);
	}
	if(d.right){
		$(this).css("right", d.right);
	}
	if(d.top){
		$(this).css("top", d.top);
	}
	if(d.bottom){
		$(this).css("bottom", d.bottom);
	}
	if(o){
		$(this).css("opacity", 0);
	}
	return $(this);
}
$.fn.dShow = function(d, o, t, e){
  if(!$(this).data("started")){
	$(this).data("started", true);
	if(!e){
		e = "swing";
	}
	if(d.left){
		$(this).animate({"left": d.left}, {duration: t, easing:e, queue:false});
	}
	if(d.right){
		$(this).animate({"right": d.right}, {duration: t, easing:e, queue:false});
	}
	if(d.top){
		$(this).animate({"top": d.top}, {duration: t, easing:e, queue:false});
	}
	if(d.bottom){
		$(this).animate({"bottom": d.bottom}, {duration: t, easing:e, queue:false});
	}
	if(o){
		$(this).animate({"opacity": 1}, {duration: t , easing:e, queue:false});
	}
  }
	return $(this);
}

$.fn.lineReset = function(d){
	$(this).data("started", false);
	if(d == "x"){
		$(this).css("width", 0);
	}
	if(d == "y"){
		$(this).css("height", 0);
	}
	return $(this);
}
$.fn.lineShow = function(d, size, t){
  if(!$(this).data("started")){
	$(this).data("started", true);
	if(d == "x"){
		$(this).animate({width: size}, {duration: t, queue:false});
	}
	if(d == "y"){
		$(this).animate({height: size}, {duration: t, queue:false});
	}
  }
	return $(this);
}



//$(function(){
$(window).load(function(){
	/*scroll to top when refresh*/
	$("#loading").hide();
	
	(function(){
		var windowHeight = $(window).height();
		$(window).resize(function(){
			windowHeight = $(window).height();
		});
		
	
	
		/*section 1*/
		var _redDotLineLeft2 = $(".red-dot-line").css("left");
		
		$(".let-s-go").resetShow({top: "-121px"}, true);	
		$(".section-1-txt").resetShow({top: "570px"}, true);
		$(".section-1-link").resetShow({top: "570px"}, true);
		$("#section-1-reeyee").resetShow(false, true);
		var _section1eLeft = $(".section-1-e").offset().left;
		$(".section-1-e").resetShow({left: -(_section1eLeft+57)}, false);
		$(".red-dot-line").resetShow({left: -892}, false);
		$("#line-1").lineReset("y");
		
		$(".let-s-go").dShow({top: "122px"}, true, 1000);
		$(".section-1-txt").dShow({top:"282px"}, true, 1000);
		$(".section-1-link").dShow({top: "480px"}, true,2000);
		$(".red-dot-line").dShow({left:_redDotLineLeft2}, false, 1500);
		$("#section-1-reeyee").dShow(false, true, 2000);
		setTimeout(function(){
				$(".section-1-e").dShow({left:10}, false, 300)
			}, 1500);
		//setTimeout(function(){
				$("#line-1").lineShow("y", 370, 2000);
		//	}, 1000);
		
		/*section 2*/
		$(".about-us-title").resetShow(false, true);
		$(".section-2-txt").resetShow(false, true);
		$("#section-2-about").resetShow(false,true);
		$("#line-2").lineReset("x");
		$("#section-2-e").resetShow({left: "830px", top: "660px"}, true);
		var _aboutustitleTop = $(".about-us-title").offset().top;
		/*section 3*/
		var _newstitleTop = $(".news-title").offset().top;
		$(".news-title").resetShow({top:"-690px"}, true);
		$("#news-arclist").resetShow(false, true);
		$("#section-3-news").resetShow(false, true);
		$("#news-container").resetShow(false, true);
		var _newspagenavTop = $("#news-page-nav").offset().top;
		$("#news-page-nav").css("visibility", "hidden").resetShow({top:"0px"}, true);
		/*section 4*/
		var _casetitleTop = $(".case-title").offset().top;
		$(".case-title").resetShow({top:"-857px"}, true);
		var _casepagenavTop = $("#case-page-nav").offset().top;
		$("#case-page-nav").css("visibility", "hidden").resetShow({top:"0px"}, true);
		$("#line-4").lineReset("y");
		$("#case-container").resetShow(false,true);
		/*section 5*/
		$("#section-5-inner").resetShow(false, true);
		$("#line-5").lineReset("x");
		/*section 6*/
		var _section6storyTop = $(".section-6-story").offset().top;
		$(".section-6-story").resetShow({top:"0px"}, true);
		$("#line-6").lineReset("y");
		$("#line-7").lineReset("y");
		$("#section-6-e").resetShow({left:"490px", top:"885px"}, true);
		/*section 7*/
		var _section7teamTop = $(".section-7-team").offset().top;
		$(".section-7-team").resetShow({top:"-172px"},true);
		$("#team-container").resetShow(false, true);
		$("#team-page-nav").resetShow({top:"-255px"}, true);
		$("#line-8").lineReset("y");
		$("#section-7-e").resetShow({bottom:"67px", right:"194px"}, true);
		$("#line-9").lineReset("y");
		/*section 8*/
		var _section8zpTop = $(".section-8-zp").offset().top;
		$(".section-8-zp").resetShow({top:"-45px"}, false);
		$("#section-8-zpicon").resetShow(false, true);
		
		
		$(window).scroll(function(){
			/*section 2*/
			if($(window).scrollTop() > _aboutustitleTop - windowHeight/3*2 && $(window).scrollTop() < _aboutustitleTop){
				$(".news-title").resetShow({top:"-690px"}, true);
				$(".about-us-title").dShow({top:"228px"}, true, 1000, "easeOutBack");
			}
			if($(window).scrollTop() > $(".section-2-txt").offset().top - windowHeight/2){
				$(".section-2-txt").dShow(false, true, 1500);
			}
			if($(window).scrollTop() > $("#section-2-about").offset().top - windowHeight/2){
				$("#section-2-about").dShow(false, true, 1500);
			}
			if($(window).scrollTop() > $("#line-2").offset().top - 10){
				$("#line-2").lineShow("x", 1057, 2000);
				setTimeout(function(){
						$("#section-2-e").dShow({left:"860px", top:"740px"}, true, 800, "easeOutElastic");
					},2000);
			}
			
			/*section 3*/
			if($(window).scrollTop() > _aboutustitleTop + $(".about-us-title").height() && $(window).scrollTop() < _newstitleTop + $(".news-title").height()){
				$(".news-title").css("opacity", "1").dShow({top:"0px"}, false, 1000, "easeOutBack");
				$(".about-us-title").resetShow({top:"917px"}, true);
				$(".case-title").resetShow({top:"-857px"}, true);
			}
			if($(window).scrollTop() > $("#news-arclist").offset().top - windowHeight/2){
				$("#news-arclist").dShow(false, true, 1000);
			}
			if($(window).scrollTop() > $("#section-3-news").offset().top - windowHeight/2){
				$("#section-3-news").dShow(false, true, 1500);
			}
			if($(window).scrollTop() > $("#news-container").offset().top - windowHeight/2){
				$("#news-container").dShow(false, true, 1500);
			}
			if($(window).scrollTop() > _newspagenavTop - windowHeight + 82){
				$("#news-page-nav").css("visibility", "visible").dShow({top:"560px"}, true, 1000, "easeOutBack");
			}
			
			/*section 4*/
			if($(window).scrollTop() > _casetitleTop + $(".case-title").outerHeight() - windowHeight){
				$(".case-title").css("opacity", "1").dShow({top:"0px"}, false, 1000, "easeOutBack");
				$(".news-title").resetShow({top:"917px"}, true);
			}
			if($(window).scrollTop() > _casepagenavTop + $("#case-page-nav").height() - windowHeight){
				$("#case-page-nav").css({"opacity":"1", "visibility":"visible"}).dShow({top:"620px"}, false, 1000, "easeOutBack");
			}
			if($(window).scrollTop() > $("#case-container").offset().top - windowHeight/4){
				$("#case-container").dShow(false, true, 1500);
				$("#line-4").lineShow("y", 431, 3000);
			}
			
			/*section 5*/
			if($(window).scrollTop() > $("#section-5-inner").offset().top - windowHeight/2){
				$("#section-5-inner").dShow(false, true, 1500);
				setTimeout(function(){
						$("#line-5").lineShow("x", 525, 2000);
					}, 1500);
			}
			
			/*section 6*/
			if($(window).scrollTop() > _section6storyTop - windowHeight/4*3){
				$(".section-6-story").css("opacity", "1").dShow({top:"915px"}, false, 1000, "easeOutBack");
				$("#line-6").lineShow("y", 535, 3000);
			}
			
			/*section 7*/
			if($(window).scrollTop() > _section7teamTop - windowHeight/4*3){
				$(".section-7-team").dShow({top:"155px"}, true, 1000, "easeOutBack");
				$("#line-7").lineShow("y", 744, 3000);
				$("#section-6-e").dShow({left:"393px", top:"1278px"}, true, 2000);
			}
			if($(window).scrollTop() > $("#team-container").offset().top - windowHeight/2){
				$("#team-container").dShow(false, true, 1500);
				$("#team-page-nav").css("opacity", "1").dShow({top:"475px"}, false, 1000, "easeOutBack");
				$("#line-8").lineShow("y", 1042, 6000);
				setTimeout(function(){
						$("#section-7-e").dShow({bottom:"10px", right:"179px"}, true, 2000);
					}, 3600);
			}
			/*section 8*/
			if($(window).scrollTop() > _section8zpTop - windowHeight/2){
				$(".section-8-zp").dShow({top:"338px"}, false, 1000, "easeOutBack");
				setTimeout(function(){
						$("#section-8-zpicon").dShow(false, true, 1500);
						$("#line-9").lineShow("y", 153, 2000);
					}, 600);
			}
			
		});
	})();

	//$("#video-bg video source[name=mp4]").attr("src","images/crowd.mp4");
	//$("#video-bg video source[name=ogv]").attr("src","images/crowd.ogv");
	//$("#video-bg video").html("<source src='images/crowd.mp4' type='video/mp4'><source src='images/crowd.ogv' type='video/ogg'>");


});	
//})