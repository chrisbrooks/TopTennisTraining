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

				$('.loading').hide();

				$(element).html(data.html).append(
					'<div class="video-content">
					<button class="play-button" id="play-button">Play</button>
					<div class="overlay" style="background: url(images/'+ videoData.background+')"></div>
					<div class="logo"></div>
					<div class="video-title">' + data.title +'</div></div>'
				);

				$('.video-content').hide().fadeIn('fast');

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

				$('.video-content').on("click", function() {
					var iframe = $(this).parent().parent().find('iframe');
					iframe.attr('src', iframe.attr('src')+'?autoplay=1');
					$(this).delay(300).fadeOut();
				});

			},error: function(){
				$(element).html('<div class="error-text"><p>sorry unable to load content</p></div>');
			}
		});
	}
}


$(document).ready(function () {
    $('.vimeo').each(function(i) {
        vimeo.init(this, i);
    });
});