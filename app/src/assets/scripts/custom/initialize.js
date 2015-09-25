$( document ).ready(function() {
   //$('.menu').spasticNav();

    //$(".navigation").sticky({ topSpacing: 0 });

	$('.menu > li').on({
		mouseenter: function (){
			$(this).addClass('open');
			$('.sub-nav').addClass('open');
		},
		mouseleave:function (){
			$(this).removeClass('open');
			$('.sub-nav').removeClass('open');
		}
	});

	/*$('.menu > li').on('mouseover', function(){
		var numItems = 100 / $(this).find('.dropdown > ul > li').length ;
		
		$(this).find('.dropdown > ul > li').css('width', numItems + '%');
	});*/

	$(window).on( "scroll", function() {
	    if ($(window).scrollTop() >= 100) {
	        $('.header').addClass('slide-up');
	    }else{
	    	$('.header').removeClass('slide-up');
	    }
	});

	var height = ($(window).height() / 10) * 10;

	$('.banner').css('height', height);

	$(window).on( "resize", function() {
		var height = ($(window).height() / 10) * 10;
		$('.banner').css('height', height);
	});

	$('.arrow-down').on('mouseenter', function() {
		$(this).removeClass('as-circle-none').addClass('as-circle-full');
	}).on('mouseleave', function() {
		$(this).removeClass('as-circle-full').addClass('as-circle-none');
	});

	$('.scroll-button').on('click', function () {
		$('body').animate({scrollTop: 0}, 800, 'swing');
		return false;
	});

		var scroller = $('.scroll-button, .scroll-button svg');

		function scrolling() {
			if ($(this).scrollTop() > 100 && $(window).width() > 767) {
				scroller.fadeIn();
			} else {
				scroller.fadeOut();
			}
		}

		$(window).on('scroll', function () {
			scrolling();
		});

		scrolling();
});
