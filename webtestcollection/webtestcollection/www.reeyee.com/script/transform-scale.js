$.fn.zoomOut = function(delta, scrollEnd, zoomTo){
	var startSize = delta * scrollEnd + zoomTo;
	var currentSize = startSize - delta * $(window).scrollTop();
	if($(window).scrollTop() > scrollEnd){
		currentSize = zoomTo;
	}
	$(this).css({
		"transform": "scale(" + currentSize + ")",
		"-webkit-transform": "scale(" + currentSize + ")",
		"-ms-transform": "scale(" + currentSize + ")"
	});
}

$.fn.zoomIn = function(scrollStart, scrollEnd, zoomTo){
	var delta = zoomTo / (scrollEnd - scrollStart);
	var currentSize = 0;
	if($(window).scrollTop() > scrollStart){
		currentSize = delta * ($(window).scrollTop() - scrollStart);
	}
	if(currentSize > zoomTo){
		currentSize = zoomTo;
	}
	$(this).css({
		"transform": "scale(" + currentSize + ")",
		"-webkit-transform": "scale(" + currentSize + ")",
		"-ms-transform": "scale(" + currentSize + ")"
	});
}