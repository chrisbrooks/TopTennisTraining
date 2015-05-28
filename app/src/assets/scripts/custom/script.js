

		/*$(document).ready(function() {
			$('.pane-container').fullpage({
				anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
				menu: '.header',
				navigation: true,
				navigationPosition: 'right',
				scrollingSpeed: 1000,
				scrollOverflow: true
			});

		});*/


		var fadeStart = 1,
		fadeUntil = 250,
		fading = $('.paneOne .content-container img');

		$(window).bind('scroll', function () {

			var offset = $(document).scrollTop(),
			opacity = 0;

			if (offset <= fadeStart) {
				opacity = 1;
			} else if (offset <= fadeUntil) {
				opacity = 1 - offset / fadeUntil;
			}

			fading.css('opacity', opacity)
		});