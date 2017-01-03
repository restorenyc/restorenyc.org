var Video = (function($){

	$(function(){ Video.init(); });

	return {
		vimeo: {
			regex: 'vimeo.com/video/',
			baseUrl: 'https://player.vimeo.com/video/',
			queryVar:'?badge=0&title=0&byline=0&rel=0&autoplay=1',
			attr: {
				'frameborder': '0',
				'webkitallowfullscreen' : 'true',
				'mozallowfullscreen': 'true',
				'allowfullscreen': 'true'
			}
		},
		youtube: {
			regex: 'youtu.be/',
			baseUrl: 'https://www.youtube.com/embed/',
			queryVar:'?autoplay=1',
			attr: {
				'frameborder': '0',
				'allowfullscreen': 'true'
			}
		},
		init: function() {
			this.videoSections = Utils.$body.find('.sec-video');
			if(this.videoSections.length) {
				this.bindEvents();
			}
		},
		addVideo: function(src) {
			var id;
			if(src.indexOf(this.vimeo.regex) > -1) {
				id = src.split(this.vimeo.regex)[1];
				return this.createIframe('vimeo', id);
			} else if (src.indexOf(this.youtube.regex) > -1) {
				id = src.split(this.youtube.regex)[1];
				return this.createIframe('youtube', id);
			}
 		},
 		createIframe: function(type, id) {
			var html = $('<iframe></iframe>').clone(),
				meta = this[type],
				src = meta.baseUrl + id + meta.queryVar;

			html.attr('src', src);

			$.each(meta.attr, function(prop, val) {
				html.attr(prop, val);
			});

			return html;
		},
		bindEvents: function() {
			var self = this;

			this.videoSections.each(function(i, video) {
				var dataVideo = $(video).attr('data-video');
				if(dataVideo && dataVideo !== "") {

					// var iframe = self.addVideo(dataVideo);
					$(video)
						//.addClass('video')
						.on('click','.image-wrap', function() {
							//$(video).addClass('play');
							//$(video).find('.video-wrap').html(iframe);
							if(window.lity) {
								var lightbox = lity(dataVideo);
							}
						});
				}
			});
		}
	};

})(jQuery);