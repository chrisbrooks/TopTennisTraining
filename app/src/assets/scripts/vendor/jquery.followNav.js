(function($) {

	$.fn.spasticNav = function(options) {

		options = $.extend({
			overlap : 20,
			speed : 500,
			reset : 1500,
			color : '#0b2b61'
		}, options);

		return this.each(function() {

		 	var nav = $(this),
		 		currentPageItem = $('.selected', nav),
		 		blob,
		 		reset;

		 	$('<li id="blob"><span></span></li>').css({
		 		width : currentPageItem.outerWidth(),
		 		left : currentPageItem.position().left
		 	}).appendTo(this);

		 	blob = $('#blob', nav);

			$(this).find('> li:not(#blob)', nav).hover(function() {
				// mouse over
				clearTimeout(reset);
				blob.animate(
					{
						left : $(this).position().left,
						width : $(this).width()
					},
					{
						duration : options.speed,
						easing : options.easing,
						queue : false
					}
				);
			}, function() {
				// mouse out
				reset = setTimeout(function() {
					blob.animate({
						width : currentPageItem.outerWidth(),
						left : currentPageItem.position().left
					}, options.speed)
				}, options.reset);

			});

		}); // end each

	};

})(jQuery);