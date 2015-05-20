$(function(){
	if(!Modernizr.svg){
		$("#section-5-title-inner img").attr("src","images/service-title.png").css("left", "0");
		$("#service-circle img").attr("src", "images/service-circle.png");
		$("#red-circle-1, #red-circle-2, #red-circle-3").attr("src", "images/circle-red.png");
		$("#red-circle-1").css({"left":"-300px", "top":"100px"});
		$("#red-circle-2").css({"left":"250px", "top":"0px"});
		$("#red-circle-3").css({"left":"800px", "top":"50px"});
		$("#red-circle-4, #white-circle-2").remove();
		$("#white-circle-1").attr("src", "images/circle-white.png").css({"left":"500px", "top":"340px"});
		$("#section-8-bg2").css("background", "#E60013");
	}
	if(!Modernizr.video){
		$("#video-bg video").remove();
		$("#video-bg").append("<img src=\"images/video-bg.jpg\" />");
		$("#video-bg-2").remove();
		$("#section-9").append("<div id=\"video-2\"></div>");
	}
	
});