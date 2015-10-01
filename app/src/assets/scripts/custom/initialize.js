$(function() {
	$(".lazy").lazyload({
	    effect : "fadeIn"
	});
});

$( document ).ready(function() {

    setTimeout(function() {
       $('.curtain').removeClass('waiting');
    }, 2000);

    
	$('.menu > li').on({
		mouseenter: function (){
			if($(this).find('.dropdown').length){
				$(this).addClass('open');
				$('.sub-nav').addClass('open');
			}
		},
		mouseleave:function (){
			$(this).removeClass('open');
			$('.sub-nav').removeClass('open');
		}
	});	


	$('.section-text').addClass('opacity').viewportChecker({
		classToAdd: 'visible animated fadeInUp',
		offset: 100
	});

	$(window).on( "scroll", function() {
	    if ($(window).scrollTop() >= 100) {
	        $('.header').addClass('slide-up');
	    }else{
	    	$('.header').removeClass('slide-up');
	    }
	});

	var pageHeight = $(window).height(),
		headerHeight = $('.header').outerHeight(),
		bannerHeight = pageHeight - bannerHeight;

	$('.banner').css('height', bannerHeight);

	$(window).on( "resize", function() {
		var pageHeight = $(window).height(),
		headerHeight = $('.header').outerHeight(),
		bannerHeight = pageHeight - bannerHeight;
		$('.banner').css('height', bannerHeight);
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
