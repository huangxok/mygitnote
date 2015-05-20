
// dtGlobals is defined in "modernizr.js"

jQuery(document).ready(function($) {


// var smartMenu = true;
/* !Masonry layout: */
// filter
//if(!dtGlobals.isPhone){
	var $container = $('.iso-container');
	$('.filter:not(.without-isotope) .filter-categories a').on('click.presscorFilterCategories', function(e) {
		var selector = $(this).attr('data-filter');

		$container.isotope({ filter: selector });
		return false;
	});


	// filter by
	$('.filter:not(.without-isotope) .filter-extras .filter-by a').on('click', function(e) {
		var sorting = $(this).attr('data-by'),
			sort = $(this).parents('.filter-extras').find('.filter-sorting > a.act').first().attr('data-sort');

		$container.isotope({ sortBy : sorting, sortAscending : 'asc' == sort });
		return false;
	});

	// sorting
	$('.filter:not(.without-isotope) .filter-extras .filter-sorting a').on('click', function(e) {
		var sort = $(this).attr('data-sort'),
			sorting = $(this).parents('.filter-extras').find('.filter-by > a.act').first().attr('data-by');

		$container.isotope({ sortBy : sorting, sortAscending : 'asc' == sort });
		return false;
	});
//};

var	$isoCollection = $(".iso-container");
var	$gridCollection = $(".wf-container.grid-masonry");
// !- Columns width calculation
function calculateColumns(container) {

	var $isoContainer = container,
		containerWidth = $isoContainer.width(),
		minCol = Math.floor(containerWidth / 12);

	if (minCol*3 >= 200) {

		$("> .iso-item", $isoContainer).each(function() {
			var $this = $(this);
			if ($this.hasClass("wf-1-4")) {
				$this.css("width", minCol*3);
			} else if ($this.hasClass("wf-2-4") || $this.hasClass("wf-1-2")) {
				$this.css("width", minCol*6);
			} else if ($this.hasClass("wf-1-3")) {
				$this.css("width", minCol*4);
			} else if ($this.hasClass("wf-2-3")) {
				$this.css("width", minCol*8);
			}
		});

	} else if ( minCol*3 < 200 && minCol*3 > 150) {

		$("> .iso-item", $isoContainer).each(function() {
			var $this = $(this);
			if ($this.hasClass("wf-1-4")) {
				$this.css("width", minCol*6);
			} else if ($this.hasClass("wf-2-4") || $this.hasClass("wf-1-2")) {
				$this.css("width", minCol*12);
			} else if ($this.hasClass("wf-1-3")) {
				$this.css("width", minCol*6);
			} else if ($this.hasClass("wf-2-3")) {
				$this.css("width", minCol*12);
			}
		});

	}  else if ( minCol*3 <= 150) {
		$("> .iso-item", $isoContainer).each(function() {
			$(this).css("width", minCol*12);
		});
	}
};

if ($isoCollection.exists()) {

	var $isoPreloader = $('<div class="tp-loader loading-label" style="position: fixed;" />').appendTo("body").hide();
	$isoPreloader.fadeIn(50);

	$isoCollection.each(function() {
		var $isoContainer = $(this);
	
		calculateColumns($isoContainer);
		
		$(".preload-me", $isoContainer).loaded(null, function() {
	
			//alert("Everithing is loaded, bitchez!");
			$isoPreloader.stop().fadeOut(300);
	
			// !- Slider initialization
			$(".slider-masonry", $isoContainer).each(function(){
				var $_this = $(this),
					attrW = $_this.data('width'),
					attrH = $_this.data('height'); 
	
				$_this.royalSlider({
					autoScaleSlider: true,
					autoScaleSliderWidth: attrW,
					autoScaleSliderHeight: attrH,
					imageScaleMode: "fit",
					imageScalePadding: 0,
					slidesOrientation: "horizontal",
					disableResponsiveness: true
				});
			});
			var typeOfAnimation;
			if(dtGlobals.isTablet){
				typeOfAnimation = 'css'
			}else if (dtGlobals.isDesktop) {
				typeOfAnimation = 'best-available'
			}
			// !- Masonry initialization
				$isoContainer.isotope({
					itemSelector : '.iso-item',
					resizable: false,
					layoutMode : 'masonry',
					animationEngine: typeOfAnimation,
					masonry: { columnWidth: 1 },
					getSortData : {
						date : function( $elem ) {
							return $elem.attr('data-date');
						},
						name : function( $elem ) {
							return $elem.attr('data-name');
						}
					}
				});
	
			$(".iso-item", $isoContainer).css("visibility", "visible");
	
			// !- Window resize event
			$(window).on("debouncedresize", function () {
				calculateColumns($isoContainer);
	
				$(".royalSlider", $isoContainer).each(function() {
					$(this).data("royalSlider").updateSliderSize();
				});
				$isoContainer.isotope("reLayout");
			});
		}, true);
	});

}

/**/
function calculateGridColumns(container) {

	var $gridContainer = container,
		containerWidth = $gridContainer.width();
		if( $("#main").hasClass("sidebar-none") ){
			minCol = Math.floor(containerWidth / 248);
		}else{			
			minCol = Math.floor(containerWidth / 186);
		}

	if ( minCol == 5) {
		$("> .wf-cell", $gridContainer).each(function() {
			var $this = $(this);
			if ($this.hasClass("wf-1-4")) {
				$(this).css("width", minCol*5 + "%");
			}else if ($this.hasClass("wf-2-4") || $this.hasClass("wf-1-2")) {
				$this.css("width", minCol*10 + "%");
			} else if ($this.hasClass("wf-1-3")) {
				$this.css("width", minCol*6.6666 + "%");
			}
		});
	} else if ( minCol < 5 && minCol >= 4) {
		$("> .wf-cell", $gridContainer).each(function() {
			var $this = $(this);
			if ($this.hasClass("wf-1-4")) {
				$(this).css("width", minCol*6.25 + "%");
			}else if ($this.hasClass("wf-2-4") || $this.hasClass("wf-1-2")) {
				$this.css("width", minCol*12.5 + "%");
			} else if ($this.hasClass("wf-1-3")) {
				$this.css("width", minCol*8.333 + "%");
			}
		});
	}else if ( minCol < 4 && minCol >=3 ) {
		$("> .wf-cell", $gridContainer).each(function() {
			var $this = $(this);
			if ($this.hasClass("wf-1-4")) {
				$this.css("width", minCol*11.111 + "%");
			}else if ($this.hasClass("wf-2-4") || $this.hasClass("wf-1-2")) {
				$this.css("width", minCol*16.667 + "%");
			} else if ($this.hasClass("wf-1-3")) {
				$this.css("width", minCol*11.111 + "%");
			}
		});

	} 
	else if (minCol < 3 && minCol >=2) {
		$("> .wf-cell", $gridContainer).each(function() {
			var $this = $(this);
			$this.css("width", minCol*25 + "%");						
		});
	}
	else if (minCol < 2 && minCol >=1) {
		$("> .wf-cell", $gridContainer).each(function() {
			var $this = $(this);
			$this.css("width", minCol*50 + "%");
			
		});
	}
	 if (containerWidth < 360) {
		$("> .wf-cell", $gridContainer).each(function() {
			var $this = $(this);
			$this.css("width", "100%");			
		});
	}
};
$gridCollection.each(function() {
	var $gridContainer = $(this);
	calculateGridColumns($gridContainer);
	$(window).on("debouncedresize", function () {
		calculateGridColumns($gridCollection);
	});
});
/*// !- Filter
$(".filter-categories > a").on("click", function(e) {
	var $this = $(this);
	
	if ( typeof arguments.callee.dtPreventD == 'undefined' ) {
		arguments.callee.dtPreventD = !$this.parents(".filter").first().hasClass("without-isotope");
	}

	e.preventDefault();

	$this.trigger("mouseleave");
	
	if ($this.hasClass("act") && !$this.hasClass("show-all")) {
		e.stopImmediatePropagation();
		$this.removeClass("act");
		$this.siblings("a.show-all").trigger("click");//.addClass("act");
	} else {
		$this.siblings().removeClass("act");
		$this.addClass("act");

		if ( !arguments.callee.dtPreventD ) {
			window.location.href = $this.attr("href");
		}
	}
});
$(".filter-extras .filter-switch").each(function(){
	var $_this = $(this);
	if($_this.prev('.act')){
		$_this.addClass('left-act');
	}else if($_this.next('.act')){
		$_this.addClass('right-act');
	}else{
		$_this.removeClass('right-act');
		$_this.removeClass('left-act');
	}
});
$(".filter-extras a").on("click", function(e) {
	var $this = $(this);
	
	if ( typeof arguments.callee.dtPreventD == 'undefined' ) {
		arguments.callee.dtPreventD = !$this.parents(".filter").first().hasClass("without-isotope");
	}

	if ( arguments.callee.dtPreventD ) {
		e.preventDefault();
	}

	$this.siblings().removeClass("act");
	$this.addClass("act");

	$(".filter-extras .filter-switch").each(function(){
		var $_this = $(this);
		if($_this.prev($this).hasClass('act')){
			$_this.addClass('left-act');
			$_this.removeClass('right-act');
		}else if($_this.next($this).hasClass('act')){
			$_this.addClass('right-act');
			$_this.removeClass('left-act');
		}else{
			$_this.removeClass('right-act');
			$_this.removeClass('left-act');
		}
	});
});*/

/* Masonry layout: end */
	/* !Smart floating menu */


/*$(".logo-left #navigation .mini-search").insertAfter(".logo-left #navigation").css("visibility","visible");*/
/* Smart floating menu: end */

});