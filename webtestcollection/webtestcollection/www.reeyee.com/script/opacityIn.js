$.fn.opacityIn = function(scrollStart, stepLength){
	var opacityNum = 0;
	$(this).css("opacity", opacityNum);
	if($(window).scrollTop() > scrollStart){
		opacityNum = Math.floor(($(window).scrollTop() - scrollStart) / stepLength) * 0.1;
		if(opacityNum > 1){
			opacityNum = 1;
		}
		$(this).css("opacity", opacityNum);
	}
}