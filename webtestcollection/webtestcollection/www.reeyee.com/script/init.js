$(function(){
	/*预加载图片*/
	var topNavDot = new Image();
	topNavDot.src = "../images/top-menu-dot_02.png";
	/*第一屏自适应高度*/
	$("#section-1").height($(window).height());
	
	/*顶部导航效果*/
	$("#header-menu>li>a").hover(function(){
			$(this).parent("li").addClass("hover");
		},function(){
			$(this).parent("li").removeClass("hover");
	});
	
	
	$("#news-prev-arr, #news-next-arr, #case-prev-arr, #case-next-arr, #team-prev-arr, #team-next-arr, .large-right, .contact-us-left").hover(function(){
			$(this).addClass("hover");
		}, function(){
			$(this).removeClass("hover");
	});
	
	
	
	/*section offset top*/
	var sectionTop1 = $("#section-1").offset().top;
	var sectionTop2 = $("#section-2").offset().top;
	var sectionTop3 = $("#section-3").offset().top;
	var sectionTop4 = $("#section-4").offset().top;
	var sectionTop5 = $("#section-5").offset().top;
	var sectionTop6 = $("#section-6").offset().top;
	var sectionTop7 = $("#section-7").offset().top;
	var sectionTop8 = $("#section-8").offset().top;
	var sectionTop9 = $("#section-9").offset().top;
	
	/*顶部跳转联系我们*/
	$("#top-nav-talk").click(function(e){
		e.preventDefault();
		$(window).scrollTop(sectionTop9);
		$("#start-now-img").click();
	});

	
	/*关于我们点击跳转*/
	$(".section-1-link a.digital").click(function(e){
		e.preventDefault();
		$(window).scrollTop(sectionTop2);
	});



	/*top-nav-icon鼠标hover效果*/
	$("#top-nav-icon li").hover(function(){
		$(this).find("span").show();
	},function(){
		$(this).find("span").hide();
	
	});


	
	
	
	
	
	/*右边栏原点状态*/
	$("#section-nav>li").hover(function(){
			$(this).children("span").css("display", "block");
		},function(){
			$(this).children("span").css("display", "none");
	});
	
	$(window).scroll(function(){
		var pageScrollTop = $(document).scrollTop();
		var $rightNavLi = $("#section-nav>li");
		if(pageScrollTop < sectionTop2 - 52){
			$rightNavLi.removeClass().eq(0).addClass("current");
		}else if(pageScrollTop >= sectionTop2 - 52 && pageScrollTop < sectionTop3 - 52){
			$rightNavLi.removeClass().eq(1).addClass("current");
		}else if(pageScrollTop >= sectionTop3 - 52 && pageScrollTop < sectionTop4 - 52){
			$rightNavLi.removeClass().eq(2).addClass("current-white");
		}else if(pageScrollTop >= sectionTop4 - 52 && pageScrollTop < sectionTop5 - 200){
			$rightNavLi.removeClass().eq(3).addClass("current");
		}else if(pageScrollTop >= sectionTop5 - 200 && pageScrollTop < sectionTop6 + 300){
			$rightNavLi.removeClass().eq(4).addClass("current");
		}else if(pageScrollTop >= sectionTop6 + 300 && pageScrollTop < sectionTop7 - 52){
			$rightNavLi.removeClass().eq(5).addClass("current-white");
		}else if(pageScrollTop >= sectionTop7 - 52 && pageScrollTop < sectionTop8 - 52){
			$rightNavLi.removeClass().eq(6).addClass("current");
		}else if(pageScrollTop >= sectionTop8 - 52 && pageScrollTop < sectionTop9 - 200){
			$rightNavLi.removeClass().eq(7).addClass("current-white");
		}else{
			$rightNavLi.removeClass().eq(8).addClass("current");
		}
		
		
		$("#section-5-title-inner img").zoomOut(0.003, 2950, 0.1);
		$("#section-6-mask").opacityIn(3750, 62);
		
		$("#red-circle-1").zoomIn(5000, 6270, 0.55);
		$("#red-circle-2").zoomIn(5000, 6270, 0.65);
		$("#red-circle-3").zoomIn(5000, 6270, 0.55);
		$("#red-circle-4").zoomIn(5000, 6270, 0.025);
		$("#white-circle-1").zoomIn(5000, 6270, 0.4);
		$("#white-circle-2").zoomIn(5000, 6270, 0.09);
		
	});
	
	/*右边原点点击*/
	$("#section-nav>li").click(function(){
		var sectionIndex = $(this).index();
		var scrollVal = 0;
		switch(sectionIndex){
			case 0:
				scrollVal = sectionTop1;
				break;
			case 1:
				scrollVal = sectionTop2 + 50;
				break;
			case 2:
				scrollVal = sectionTop3;
				break;
			case 3:
				scrollVal = sectionTop4;
				break;
			case 4:
				scrollVal = sectionTop5 - 200;
				break;
			case 5:
				scrollVal = sectionTop6 + 700;
				break;
			case 6:
				scrollVal = sectionTop7 + 50;
				break;
			case 7:
				scrollVal = sectionTop8 + 200;
				break;
			case 8:
				scrollVal = sectionTop9;
		}
		$(window).scrollTop(scrollVal);
	});
	
	/*time line*/
	(function(){
		var firstPosition = 65;
		var timeLineLength = 710;
		var startYear = $("#story-time-line>.year-dot:first>span").text();
		var lastYear = $("#story-time-line>.year-dot:last>span").text();
		var yearDiff = lastYear - startYear;
		var perYearLength = timeLineLength/yearDiff;
		$("#story-time-line>.year-dot").each(function() {
			var thisYear = parseInt($(this).children("span").text());
			var thisYearDiff = thisYear - startYear;
			var thisYearPosition = perYearLength * thisYearDiff + 65;
			$(this).css("left", thisYearPosition + "px");
		}).hover(function(){
				if(!$(this).hasClass("current")){
					$(this).children("span").show();
				}
			}, function(){
				if(!$(this).hasClass("current")){
					$(this).children("span").hide();
				}
			});
	})();
	
	
	/*新闻动态 下拉*/
	$("#current-arc").click(function(e){
		e.stopPropagation();
		$(this).next("ul").show();
	});
	$(document).click(function(){
		$("#current-arc").next("ul").hide();
	});

	newsItemNum = 0;
	thisMonth = '';
	/*新闻动态 选择类别*/
	$("#news-arclist ul li a").click(function(e){
		e.preventDefault();
		thisMonth = $(this).text();
		if(thisMonth == 'All' || thisMonth == ''){
			thisMonth = "";
			$(".news-item").show();
			newsItemNum = $(".news-item").length;
		}else{
			$(".news-item[month="+thisMonth+"]").show().siblings().hide();
			newsItemNum = $(".news-item[month="+thisMonth+"]").length;
			$(".news-item[month="+thisMonth+"]").eq(0).addClass("current").siblings().removeClass("current");
		}
		
	});

	
	/*新闻动态 滑动*/
	/*
	$("#news-next-arr").click(function(){
		//首先立即停止动画状态并归位，以便下面获得正确的定位
		$("#news-arclist").stop(true,true);
		//可视窗口宽度
		var visualWidth = $(window).width();
		//移动单体宽度
		var itemWidth = $("#news-arclist").width();
		alert(itemWidth);
		//显示单体的位置
		if(thisMonth == 'All' || thisMonth == ''){
			var itemLeft = parseInt($("#news-container .current").css("left"));
			var itemTotal = $("#news-container").length;
		}else{
			var itemLeft = parseInt($("#news-container .current[month="+thisMonth+"]").css("left"));
			var itemTotal = $("#news-container[month="+thisMonth+"]").length;
		}
		var currentIndex = $("#news-arclist .current").index();
		var comingIndex = currentIndex + 1;
		if(comingIndex > itemTotal - 1){
			comingIndex = itemTotal - 1;
		}else{
			//定位将显示的内容
			$("#news-arclist").eq(comingIndex).css({left:visualWidth, opacity:0});
			$("#news-arclist").eq(currentIndex).removeClass("current").stop(true, true).animate({left:-itemWidth, opacity:0});
			$("#news-arclist").eq(comingIndex).addClass("current").stop(true, true).animate({left:itemLeft, opacity:1});
		}

		var currentPage = $("#news-container .current").index()+1;
		$("#news-page-num .current-page").text(currentPage);
	});
	*/

	$("#news-next-arr").click(function(){
		$("#news-container").slideNext(newsItemNum);
		var currentPage = $("#news-container .current").index()+1;
		$("#news-page-num .current-page").text(currentPage);
	});


	$("#news-prev-arr").click(function(){
		$("#news-container").slidePrev(newsItemNum);
		var currentPage = $("#news-container .current").index()+1;
		$("#news-page-num .current-page").text(currentPage);
	});
	
	/*精彩案例 滑动*/
	$("#case-next-arr").click(function(){
		$("#case-container").slideNext(0);
		var currentPage = $("#case-container .current").index() + 1;
		$("#case-page-num .current-page").text(currentPage);
	});
	$("#case-prev-arr").click(function(){
		$("#case-container").slidePrev(0);
		var currentPage = $("#case-container .current").index() + 1;
		$("#case-page-num .current-page").text(currentPage);
	});
	
	/*团队介绍 滑动*/
	$("#team-next-arr").click(function(){
		$("#team-container").slideNext(0);
		var currentPage = $("#team-container .current").index() + 1;
		$("#team-page-num .current-page").text(currentPage);
	});
	$("#team-prev-arr").click(function(){
		$("#team-container").slidePrev(0);
		var currentPage = $("#team-container .current").index() + 1;
		$("#team-page-num .current-page").text(currentPage);
	});
	
	/*专业服务 滑动*/
	$("#service-nav li").click(function(e){
		e.preventDefault();
		var index = $(this).index();
		$("#service-container").slideTo(index);
		$(this).addClass("current").siblings().removeClass("current");
	});
	
	/*time line点击*/
	$("#story-time-line .year-dot").click(function(){
		var index = $(this).index();
		$("#story-container").slideTo(index);
		$(this).addClass("current").siblings().removeClass("current").children("span").hide();
	});
	
	/*员工招聘 滑动*/
	$("#zp-content-nav li").click(function(){
		var index = $(this).index();
		$("#zp-container").slideTo(index);
		$(this).addClass("current").siblings().removeClass("current");
	});
	

	/*员工招聘表单显示*/
	var w1 = document.body.clientWidth;
	var h1 = window.screen.height;
	if(w1 < 1000){
		w1 = 1000;		
	}
	var formLeft = parseInt(1000-556+((w1-1000)/2));
	$("#join-us-form").css({"left":formLeft+"px"}).hide();
	$(".join-us-link").click(function(){
		$("#join-us-form").show().animate({"left":"260px"},500);
		
	});
	/*员工招聘表单关闭*/
	$(".join-us-close").click(function(){
		$("#join-us-form").animate({"left":formLeft+"px"},500).fadeOut("500");
		//setTimeout(function(){
			
		//},300);
		//$("#join-us-form").hide();
	});
	/*员工招聘表单提交*/
	$(".join-us-submit a").click(function(e){
		e.preventDefault();
		//var title = $("#join-us-form input[name=title]").val();
		var name = $("#join-us-form input[name=name]").val();
		var tel = $("#join-us-form input[name=tel]").val();
		var content = $("#join-us-form textarea[name=content]").val();
		var contentLen = content.length;
		/*
		if(title == ""){
			alert("请填写应聘职位！");
			return false;
		}
		*/
		if(name == ""){
			alert("请留下您的姓名！");
			return false;
		}
		if(tel == ""){
			alert("请填写您的联系方式！");
			return false;
		}
		if(content == ""){
			alert("请填写内容！");
			return false;
		}
		if(contentLen == 0 || contentLen > 500){
			alert("内容不能超过500字！");
			return false;
		}
		var data = {title:title,name:name,tel:tel,content:content,cmd:'job'};
		$.ajax({
			type:'POST',
			data:data,
			dataType:'json',
			url:'ajax.php',
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				alert("发生错误，暂时无法提交！");
			},
			success:function(msg){
				if(msg.no == 1) {
					alert(msg.msg);
					$("#join-us-form").animate({"left":formLeft+"px"},500).fadeOut("500");
					$("#join-us-form input,#join-us-form textarea").val("");
				}else{
					alert("发生错误，暂时无法提交！");
					$("#join-us-form").animate({"left":formLeft+"px"},500).fadeOut("500");
					$("#join-us-form input,#join-us-form textarea").val("");
				}
			}
		})
	});
	$("video").attr("width",w1);
	$("video").attr("height",h1+270);




	
})