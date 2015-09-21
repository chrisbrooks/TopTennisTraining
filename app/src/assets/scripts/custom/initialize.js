$( document ).ready(function() {
   //$('.menu').spasticNav();

    //$(".navigation").sticky({ topSpacing: 0 });

	$('.menu').on({
		mouseenter: function (){
			$(this).addClass('open-dropdown');
		},
		mouseleave:function (){
			$(this).removeClass('open-dropdown');
		}
	});

	$('.menu > li').on('mouseover', function(){
		var numItems = 100 / $(this).find('.dropdown > ul > li').length ;
		
		$(this).find('.dropdown > ul > li').css('width', numItems + '%');
	});

	$(window).scroll(function() {
	    if ($(window).scrollTop() >= 1) {
	        $('.navigation').addClass('background');
	    }else{
	    	$('.navigation').removeClass('background');
	    }
	});

	twitterFetcher.fetch({
		"id": '639691526692601856',
		"domId": 'twitter-feed',
		"maxTweets": 20,
		"enableLinks": true,
		"showImages": true
	});

	var height = ($(window).height() / 10) * 10;
//
//		console.log(windowHeight);
//
	$('.banner').css('height', height);

});
