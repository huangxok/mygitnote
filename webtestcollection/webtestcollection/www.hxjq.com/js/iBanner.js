var t = n = 0, count;
jQuery(document).ready(function () {
  
    count = jQuery("#banner_list a").length;
    //jQuery("#banner_list a:not(:first-child)").hide();

    jQuery("#banner_info").html(jQuery("#banner_list a:first-child").find("img").attr('alt'));
	jQuery("#banner_info").click(function(){window.open(jQuery("#banner_list a:first-child").attr('href'), "_blank")});
	jQuery("#banner li").click(function() {
	   var i = jQuery(this).attr("val") - 1;//获取Li元素内的值，即1，2，3，4
	   n = i;
		if (i >= count) return;
		jQuery("#banner_info").html(jQuery("#banner_list a").eq(i).find("img").attr('alt'));
		jQuery("#banner_info").unbind().click(function(){window.open(jQuery("#banner_list a").eq(i).attr('href'), "_blank")})
		jQuery("#banner_list a").filter(":visible").fadeOut(50).parent().children().eq(i).fadeIn(800);
		document.getElementById("banner").style.background="";
		jQuery(this).toggleClass("on");
		jQuery(this).siblings().removeAttr("class");
	});
	t = setInterval("showAuto()", 8000);
	jQuery("#banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 8000);});
})

function showAuto(){
	n = n >=(count - 1) ? 0 : ++n;
	jQuery("#banner li").eq(n).trigger('click');
}
//点弹层
jQuery("#banner_point ul li").hover(function(){
	jQuery(this).addClass("cur");
},function(){
	jQuery(this).removeClass("cur");
});

//测量高度
//var h = jQuery("#banner_list a:first").height();
//jQuery("#banner").height(h);

//banner左下三按钮
jQuery(function(){
	jQuery(".bcl").hover(function(){
		jQuery(this).toggleClass("bHover");
	},function(){
		jQuery(this).removeClass("bHover");
	});
})
//三按钮内菜单展开收缩
jQuery(document).ready(
function() 
{
	jQuery(".stepTitle").click(function(){
	    
		jQuery(this).next("ul").slideToggle("fast")
		.siblings(".stepContent:visible").slideUp("fast");
		jQuery(this).toggleClass("active");
		jQuery(this).siblings(".active").removeClass("active");
		jQuery(this).parent().parent().find(".BtnC_rightContent img").attr("src",jQuery(this).find("a").attr("title"));
		
	
	});
});
jQuery(function(){
	jQuery(".stepContent li").click(function(){
		jQuery(".stepContent li").removeClass("active");
		jQuery(this).addClass("active");
	});
});


