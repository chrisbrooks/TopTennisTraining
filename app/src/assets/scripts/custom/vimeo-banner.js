(function ($) {

    "use strict";

    $.fn.vimeoVideo = function( options ) {

        var vimeo = $.extend({
            videos: [],
            currentVideo: null
        }, options );
       
        return this.each(function(){

            var video = {
                'this' : $(this),
                'title': $(this).html(),
                'id': 'video-' + $(this).index(),
                'url': $(this).attr('data-href'),
                'background': $(this).attr('data-background')
            };

            $.ajax({
                type:'GET',
                url: 'http://www.vimeo.com/api/oembed.json?url=' + encodeURIComponent('http://vimeo.com/' + video.url),
                jsonp: 'callback',
                dataType: 'jsonp',
                beforeSend: function(){

                    $('.loading').show();
                },
                success: function(data){

                   
                    vimeoVideo(data);
                     

                },error: function(){
                    
                    video.this.html('<div class="error-text"><p>sorry unable to load content</p></div>');
                }
            });


            function vimeoVideo(data) {

                var output = '<div class="video-content"><button class="play-button" id="play-button">Play</button><div class="overlay" style="background: url(';

                if (video.this.attr('data-background')) {

                    output += 'images/' + video.background;

                } else {

                    output += data.thumbnail_url;
                }

            
                if(video.this.hasClass('thumbnail')){

                    video.this.append(
                        output += ')"></div><div class="video-title">' + data.title +'</div></div>'
                    );

                    videoThumbnailPlay(data);

                } else {
                    
                    video.this.html(data.html).append(
                        output += ')"></div><div class="video-title">' + data.title +'</div></div>'
                    );

                    videoBannerPlay(data);
                }

            }


            function videoBannerPlay() {

                video.this.find('.video-content').hide().fadeIn('fast');

                video.this.find('iframe').load(function(){
                    
                    $(this).attr('id', video.id);

                    var iframe = $('#' + $(this).attr('id'))[0],
                        player = $f(iframe);

                    player.addEvent('ready', function(player_id){
                        vimeo.videos.push($f(player_id));
                    })
                    .addEvent('play', function(player_id){
                        if (vimeo.currentVideo !== null){
                            vimeo.currentVideo.api('pause');
                            vimeo.currentVideo = $f(player_id);
                        }
                    });

                });

               
                $(video.this).find('.video-content').on("click", function() {

                    var iframe = $(this).parent().parent().find('iframe');
                    iframe.attr('src', iframe.attr('src')+'?autoplay=1');

                    $(this).fadeOut();

                });

            }

            function videoThumbnailPlay() {

                $(video.this).on('click', function() {

                    var video = $(this);

                    $("html, body").animate({ scrollTop: $('.vimeo.banner').offset().top -100 }, 300, function(){   
                        videoSwitch(video);
                    });
                });
            }

            function videoSwitch(video){

                var iframe = $('.vimeo.banner').find('iframe');

                $('.vimeo').find('iframe').attr('src', 'https://player.vimeo.com/video/' + video.attr('data-href') + '');
                
                iframe.attr('src', iframe.attr('src')+'?autoplay=1');

                setTimeout(function(){
                    $('.vimeo.banner').find('.video-content').hide();
                }, 300);
                
            }

        });
    };

}( jQuery ));
