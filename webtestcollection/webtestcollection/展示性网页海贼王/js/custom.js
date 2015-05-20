$(document).ready(function(e) {
	
	
    $.stellar({
		horizontalScrolling: false,
		verticalOffset: 40
	});
						
						
	$('.nav a').click(function(){
		var link = $(this).attr('href');
		$.scrollTo( link, 800, {offset: {top:-50, left:0} } );
	});
	
	
	$('.contact form').validate();
	
	
	$(".nav").sticky({topSpacing:0});
						
						
});