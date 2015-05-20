/*next*/
$.fn.slideNext = function(itemTotal){
	//首先立即停止动画状态并归位，以便下面获得正确的定位
	$(this).children().stop(true,true);
	//可视窗口宽度
	var visualWidth = $(window).width();
	//移动单体宽度
	var itemWidth = $(this).children().width();
	//显示单体的位置
	var itemLeft = parseInt($(this).children(".current").css("left"));
	if(itemTotal == 0){
		var itemTotal = $(this).children().size();
	}
	var currentIndex = $(this).children(".current").index();
	var comingIndex = currentIndex + 1;
	if(comingIndex > itemTotal - 1){
		comingIndex = itemTotal - 1;
	}else{
		//定位将显示的内容
		$(this).children().eq(comingIndex).css({left:visualWidth, opacity:0});
		$(this).children().eq(currentIndex).removeClass("current").stop(true, true).animate({left:-itemWidth, opacity:0});
		$(this).children().eq(comingIndex).addClass("current").stop(true, true).animate({left:itemLeft, opacity:1});
	}
}
$.fn.slidePrev = function(){
	//首先立即停止动画状态并归位，以便下面获得正确的定位
	$(this).children().stop(true,true);
	//可视窗口宽度
	var visualWidth = $(window).width();
	//移动单体宽度
	var itemWidth = $(this).children().width();
	//显示单体的位置
	var itemLeft = parseInt($(this).children(".current").css("left"));
	
	var itemTotal = $(this).children().size();
	var currentIndex = $(this).children(".current").index();
	var comingIndex = currentIndex - 1;
	if(comingIndex < 0){
		comingIndex = 0;
	}else{
		//定位将显示的内容
		$(this).children().eq(comingIndex).css({opacity:0});
		$(this).children().eq(currentIndex).removeClass("current").stop(true, true).animate({left:visualWidth, opacity:0});
		$(this).children().eq(comingIndex).addClass("current").stop(true, true).animate({left:itemLeft, opacity:1});
	}
}


$.fn.slideTo = function(itemIndex){
	//首先立即停止动画状态并归位，以便下面获得正确的定位
	$(this).children().stop(true,true);
	//可视窗口宽度
	var visualWidth = $(window).width();
	//移动单体宽度
	var itemWidth = $(this).children().outerWidth();
	//显示单体的位置
	var itemLeft = parseInt($(this).children(".current").css("left"));
	
	var currentIndex = $(this).children(".current").index();
	var comingIndex = itemIndex;
	
	
	//定位即将显示的内容
	if(comingIndex > currentIndex){
		$(this).children().eq(comingIndex).css({opacity:0});
		$(this).children().eq(comingIndex).css("left", visualWidth);
		$(this).children().eq(currentIndex).removeClass("current").stop(true, true).animate({left:-itemWidth, opacity:0});
		$(this).children().eq(comingIndex).addClass("current").stop(true, true).animate({left:itemLeft, opacity:1});
	}else if(comingIndex < currentIndex){
		$(this).children().eq(comingIndex).css({opacity:0});
		$(this).children().eq(comingIndex).css("left", -itemWidth);
		$(this).children().eq(currentIndex).removeClass("current").stop(true, true).animate({left:visualWidth, opacity:0});
		$(this).children().eq(comingIndex).addClass("current").stop(true, true).animate({left:itemLeft, opacity:1});
	}
}

