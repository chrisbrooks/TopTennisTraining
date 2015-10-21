var vimeo = {
	videos: [],
	currentVideo: null,
	init: function (element, i) {

		var videoData = {
			'title': $(element).html(),
			'id': 'video-' + i,
			'url': $(element).attr('data-href'),
			'background': $(element).attr('data-background')
		};

		$.ajax({
			type:'GET',
			url: 'http://www.vimeo.com/api/oembed.json?url=' + encodeURIComponent('http://vimeo.com/' + videoData.url),
			jsonp: 'callback',
			dataType: 'jsonp',
			beforeSend: function(){
				$('.loading').show();
			},
			success: function(data){

				vimeoVideo(data);

			},error: function(){
				$(element).html('<div class="error-text"><p>sorry unable to load content</p></div>');
			}
		});

		function vimeoVideo(data){
			$('.loading').hide();

			console.log(data);

			$(element).html(data.html).append(
				'<div class="video-content" style="background: url('+ data.thumbnail_url +')">
				<button class="play-button" id="play-button">Play</button>
				<div class="overlay" style="background: url(images/'+ videoData.background+')"></div>
				<div class="logo"></div>
				<div class="video-title">' + data.title +'</div></div>'
			);

			$(element).find('.video-content').hide().fadeIn('fast');

			$(element).find('iframe').load(function(){
				player = this;
				$(player).attr('id', videoData.id);
				$f(player)
				.addEvent('ready', function(player_id){
					vimeo.videos.push($f(player_id));
				})
				.addEvent('play', function(player_id){
					if (vimeo.currentVideo != null){
						vimeo.currentVideo.api('pause');
						vimeo.currentVideo = $f(player_id);
					}
				});

			});

			$(element).find('.video-content').on("click", function() {
				var iframe = $(this).parent().parent().find('iframe');
				iframe.attr('src', iframe.attr('src')+'?autoplay=1');
				$(this).fadeOut();
			});
		}
	}
}

var vimeoThumbnail = {
	videos: [],
	currentVideo: null,
	init: function (element, i) {

		var videoData = {
			'title': $(element).html(),
			'url': $(element).attr('data-href'),
			'thumbnail': $(element).attr('data-thumb')
		};

		$.ajax({
			type:'GET',
			url: 'http://www.vimeo.com/api/oembed.json?url=' + encodeURIComponent('http://vimeo.com/' + videoData.url),
			jsonp: 'callback',
			dataType: 'jsonp',
			beforeSend: function(){
				$('.loading').show();
			},
			success: function(data){

				thumbnail(data);

			},error: function(){
				$(element).html('<div class="error-text"><p>sorry unable to load content</p></div>');
			}
		});

		function thumbnail(data){

			if($(element).attr('data-thumb')){
				$(element).append(
					'<div class="video-content" style="background: url('+ data.thumbnail_url +')">
					<button class="play-button" id="play-button">Play</button>
					<div class="overlay" style="background: url(images/'+ videoData.thumbnail +')"></div>
					<div class="logo"></div>
					<div class="video-title">' + data.title +'</div></div>'
				);
			}else {
				$(element).append(
					'<div class="video-content" style="background: url('+ data.thumbnail_url +')">
					<button class="play-button" id="play-button">Play</button>
					<div class="overlay"></div>
					<div class="logo"></div>
					<div class="video-title">' + data.title +'</div></div>'
				);
			}
			
		}
	}
}


$(document).ready(function () {
    $('.vimeo.banner').each(function(i) {
        vimeo.init(this, i);
    });

    $('.vimeo.thumbnail').each(function(i) {
        vimeoThumbnail.init(this, i);
    });
});

