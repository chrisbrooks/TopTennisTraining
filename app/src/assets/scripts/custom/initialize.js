$(document).ready(function () {
    var fadeStart = 1,
        fadeUntil = 250,
        fading = $('.hi-icon, header .container ul.social, .btn-navbar');
    $(window).bind('scroll', function () {
        var offset = $(document).scrollTop(),
            opacity = 0;
        if (offset <= fadeStart) {
            opacity = 1;
        } else if (offset <= fadeUntil) {
            opacity = 1 - offset / fadeUntil;
        }
        fading.css('opacity', opacity);
    });

    // scroll top button
    $(".scroll-button").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-button').fadeIn();
            } else {
                $('.scroll-button').fadeOut();
            }
        });
        $('.scroll-button').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    //main logo animate in
    $('.hi-icon, ul.social li').delay(500).animate({'opacity' : '1',  '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)'}, 500);

	//image preloader
   $(function(){
	$(".item-content-panel").preloader();
	});

    //nav drop down toggle
    $(".btn-navbar, .btn-navbar .dropdown li a").click(function () {
        $('.btn-navbar .dropdown').toggleClass('active');

    });

    //scroll functions for drop down
    $('.dropdown li .home').click(function () {
        $.scrollTo(0, 800, {
            easing: 'jswing'
        });
        return false;
    });

    $('.dropdown li .port, .close').click(function () {
        $.scrollTo('#portfolio', 800, {
            easing: 'jswing',
            offset: -25
        });
        return false;
    });

    $('.dropdown li .aboutme').click(function () {
        $.scrollTo('#aboutme', 800, {
            easing: 'jswing',
            offset: -25
        });
        return false;
    });

    //hover effect for portfolio list elements
    $(function () {
        $("section#portfolio .container ul li").css("opacity", "1.0");
        $("section#portfolio .container ul li").hover(function () {
                $(this).siblings().stop().animate({'opacity': '0.4', '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=40)' }, 500);
            },
            function () {
                $("section#portfolio .container ul li").stop().animate({
                    'opacity': '1', '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'
                }, "slow");
            });
    });

  //header slider
  $(function() {
    var bar = $('#headerSlideContainer');
    var top = bar.css('top');
    $(window).scroll(function() {
      if($(this).scrollTop() > 50) {
        bar.stop().animate({'top' : '0px'}, 200);
      } else {
        bar.stop().animate({'top' : top}, 200);
      }
    });
  });

	//$(function(){
    //$('header').css({'height':(($(window).height()))+'px'});

    //$(window).resize(function(){
    //$('header').css({'height':(($(window).height()))+'px'});
    //});
//});



}); //end ready

