

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

			fading.css('opacity', opacity);
		});



		$(function(){

	'use strict';

	var methods = {},
		mapId = '#map-canvas',
		iconUrlMobile = '/images/flendr-map-icon.png',
		iconUrlDesktop = '/images/flendr-map-icon-desktop.png';

	methods.init = function () {

		var styles=[{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}];

		var myLatlng = new google.maps.LatLng(51.001975,-1.733979);

		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

		var isDraggable = $(document).width() > 767 ? true : false;

		var mapOptions = {
			zoom: 13,
			center: myLatlng,
			scrollwheel: false,
			draggable: isDraggable,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			},
			mapTypeId: 'Styled',
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');

		var flendrIcon;

		if (Modernizr.touch) {
			flendrIcon = {
				url: iconUrlMobile,
				scaledSize: new google.maps.Size(50, 50),
				origin: new google.maps.Point(0,0)
			};
		} else {
			flendrIcon = {
				url: iconUrlDesktop
			};
		}

		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h3 id="firstHeading" class="firstHeading">Flendr</h3>'+
			'<div id="bodyContent">'+
			'<p>26 Bedford Square</p>'+
			'<p>london</p>' +
			'<p>WC1B 3HP</p>' +
			'<p>0207 713 5132</p>' +
			'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Uluru (Ayers Rock)',
			icon: flendrIcon
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

	};

	if($(mapId).length){
		methods.init();
	}

});