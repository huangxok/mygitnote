$(function(){
	/*reset position*/
	(function(){
		//$(".red-dot-line")初始位置
		var redDotLineInitLeft = parseInt($(".red-dot-line").css("left"));
		//$("#news-container .current")初始位置
		var newsItemInitLeft = parseInt($("#news-container .current").css("left"));
		//$("#case-container .current")初始位置
		var caseItemInitLeft = parseInt($("#case-container .current").css("left"));
		//$("#service-container")初始位置
		var serviceContainerInitLeft = parseInt($("#service-container").css("left"));
		//$("#service-circle")初始位置
		var serviceCircleInitLeft = parseInt($("#service-circle").css("left"));
		//$("#line-5")初始位置
		var line5InitLeft = parseInt($("#line-5").css("left"));
		//$("#story-container .current")初始位置
		var storyItemInitLeft = parseInt($("#story-container .current").css("left"));
		//$("#line-7")初始位置
		var line7InitLeft = parseInt($("#line-7").css("left"));
		//$("#section-6-e")初始位置
		var section6eInitLeft = parseInt($("#section-6-e").css("left"));
		//$("#story-logos")初始位置
		var storyLogosInitLeft = parseInt($("#story-logos").css("left"));
		//$("#team-container .current")初始位置
		var teamItemInitLeft = parseInt($("#team-container .current").css("left"));
		//$("#red-circle-4")初始位置
		var redCircle4InitLeft = parseInt($("#red-circle-4").css("left"));
		//$("#white-circle-1")初始位置
		var whiteCircle1InitLeft = parseInt($("#white-circle-1").css("left"));
		//$("#white-circle-2")初始位置
		var whiteCircle2InitLeft = parseInt($("#white-circle-2").css("left"));
		//$("#news-page-nav")初始位置
		var newspagenavLeft = parseInt($("#news-page-nav").css("left"));
		//$("#case-page-nav")初始位置
		var casepagenavLeft = parseInt($("#case-page-nav").css("left"));
		
		resetPosition();
		window.onresize = function(){resetPosition();}
		
		
		function resetPosition(){
			var windowWidth = $(window).width();
			var resetOffset = 0;
			if(windowWidth < 1423 && windowWidth > 1002){
				resetOffset = (1423 - windowWidth)/2;
			}else if(windowWidth <= 1002){
				resetOffset = (1423-1002)/2;
			}
			
			//loading...
			var _loadingLeft = (windowWidth - 10)/2;
			var _loadingTop = ($(window).height() - 10)/2;
			$("#loading img").css({"left": _loadingLeft, "top": _loadingTop});
			
			//$(".red-dot-line")
			$(".red-dot-line").css("left", redDotLineInitLeft - resetOffset + "px");
			//$("#news-container .current")
			$("#news-container .current").css("left", newsItemInitLeft - resetOffset + "px");
			//$("#case-container .current")
			$("#case-container .current").css("left", caseItemInitLeft - resetOffset + "px");
			//$("#service-container")
			$("#service-container").css("left", serviceContainerInitLeft - resetOffset + "px");
			//$("#service-circle")
			$("#service-circle").css("left", serviceCircleInitLeft - resetOffset + "px");
			//$("#line-5")
			$("#line-5").css("left", line5InitLeft - resetOffset + "px");
			//$("#story-container .current")
			$("#story-container .current").css("left", storyItemInitLeft - resetOffset + "px");
			//$("#line-7")
			$("#line-7").css("left", line7InitLeft - resetOffset + "px");
			//$("#section-6-e")
			$("#section-6-e").css("left", section6eInitLeft - resetOffset + "px");
			//$("#story-logos")
			$("#story-logos").css("left", storyLogosInitLeft - resetOffset + "px");
			//$("#team-container .current")
			$("#team-container .current").css("left", teamItemInitLeft - resetOffset + "px");
			//$("#red-circle-4")
			$("#red-circle-4").css("left", redCircle4InitLeft - resetOffset + "px");
			//$("#white-circle-1")
			$("#white-circle-1").css("left", whiteCircle1InitLeft - resetOffset + "px");
			//$("#white-circle-2")
			$("#white-circle-2").css("left", whiteCircle2InitLeft - resetOffset + "px");
			//$("#news-page-nav")
			$("#news-page-nav").css("left", newspagenavLeft - resetOffset + "px");
			//$("#case-page-nav")
			$("#case-page-nav").css("left", casepagenavLeft - resetOffset + "px");
			
			//start now
			var mWidth = Math.ceil((windowWidth - 630)/2);
			if(mWidth > 0){
				$("#start-now-body-left").css("width", mWidth);
				$("#start-now-body-right").css("width", mWidth);
				$("#start-now-body img").css("left", mWidth);
			}
			
			$("#contact-us-container").css("left", windowWidth);
			$("#start-now-container").css("left",0);
			$("#start-now-img, .large-right").unbind("click").click(function(){
				$("#start-now-container").animate({"left": -windowWidth});
				$("#contact-us-container").animate({"left": 0});
			});
			$(".contact-us-left").unbind("click").click(function(){
				$("#start-now-container").animate({"left": 0});
				$("#contact-us-container").animate({"left": windowWidth});
			});
			
			$("body").unbind("mousewheel").mousewheel(function(event, delta){
				if($(window).scrollTop() == $("body").height() - $(window).height()){
					if(delta < 0){
						//$("#start-now-img, .large-right").click();
						$("#start-now-container").animate({"left": -windowWidth});
						$("#contact-us-container").animate({"left": 0});
					}
					//if(delta > 0){
					//	$(".contact-us-left").click();
					//}
				}
			});
			
			
		}
	})();
	
})