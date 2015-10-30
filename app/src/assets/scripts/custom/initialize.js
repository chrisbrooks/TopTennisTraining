var GLOBAL = GLOBAL || {};

GLOBAL.$dom = $(document);


GLOBAL.plugins = {

	lazyload: function () {
		GLOBAL.$dom.find('.lazy').lazyload({
			effect : "fadeIn"
		});
	},

	mobileNavigation: function () {

		var $menu = GLOBAL.$dom.find(".navigation").clone();

		$menu.attr( "id", "mobile-navigation" );

		$menu.mmenu({
			navbar: {
				title: 'Top Tennis Training'
			}
		}, {
		
		offCanvas: {
			pageNodetype: "main"
		}

		}).on('init', function(){

			GLOBAL.$dom.find('#mobile-navigation').find('.logo-container').remove();
			GLOBAL.$dom.find('#mobile-navigation').find('.container').removeClass('container');

		}).trigger( "init" );

	},

	viewPort: function () {
		GLOBAL.$dom.find('.section-text').addClass('opacity').viewportChecker({
			classToAdd: 'visible animated fadeInUp',
			offset: 100
		});
	},

	vimeo: function () {
		GLOBAL.$dom.find('.vimeo').vimeoVideo();
	}
};


GLOBAL.general = {

	menuAction: function (){

		GLOBAL.$dom.find('.menu > li').on({
			mouseenter: function (){
				if($(this).find('.dropdown').length){
					$(this).addClass('open');
				}
			},
			mouseleave:function (){
				$(this).removeClass('open');
			}
		});
	},

	headerHide: function (){

		function slideUP(){
			if ($(window).scrollTop() >= 100) {
				GLOBAL.$dom.find('.header').addClass('slide-up');
			}else{
				GLOBAL.$dom.find('.header').removeClass('slide-up');
			}
		}

		$(window).on( "scroll", function() {
			slideUP(); 
		});
	},

	arrowScrolling: function (){

		var scroller = GLOBAL.$dom.find('.arrow-up, .arrow-up svg');

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

	},

	arrowFunctions: function (){

		GLOBAL.$dom.find('.arrow-down').on('mouseenter', function() {

			$(this).removeClass('as-circle-none').addClass('as-circle-full');

		}).on('mouseleave', function() {

			$(this).removeClass('as-circle-full').addClass('as-circle-none');

		});

		GLOBAL.$dom.find('.arrow-down').on('click', function () {
			
			var headerHeight = GLOBAL.$dom.find('.header').outerHeight() - 35;

			$('body').animate({scrollTop: GLOBAL.$dom.find('.content').offset().top - headerHeight}, 800, 'swing');

			return false;
		});

		GLOBAL.$dom.find('.arrow-up').on('click', function () {

			$('body').animate({scrollTop: 0}, 800, 'swing');

			return false;
		});

	}

};


GLOBAL.ctrl = {
	exec: function( controller, action ) {
		var ns = GLOBAL.ctrl,
		action = ( action === undefined ) ? 'init' : action;

		if ( controller !== "" && ns[controller] && typeof ns[controller][action] == 'function' ) {
			ns[controller][action]();
		}
	},

	init: function() {
		var body = document.body,
		controller = body.getAttribute('data-controller'),
		action = body.getAttribute('data-action');

		GLOBAL.ctrl.exec('common');
		GLOBAL.ctrl.exec( controller );
		GLOBAL.ctrl.exec( controller, action );
	},

	common: {
		init: function() {
			'use strict';
			GLOBAL.portfolio.init();
			GLOBAL.plugins.lazyload();
			GLOBAL.plugins.mobileNavigation();
			GLOBAL.plugins.viewPort();
			GLOBAL.plugins.vimeo();
			GLOBAL.general.menuAction();
			GLOBAL.general.headerHide();
			GLOBAL.general.arrowScrolling();
			GLOBAL.general.arrowFunctions();

			
		}
	}
};


$( document ).ready( GLOBAL.ctrl.init );