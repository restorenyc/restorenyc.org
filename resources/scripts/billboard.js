var Billboard = (function($){

	$(function(){ Billboard.init(); });

	return {
		time:3,
		limit:12,
		timers:[],
		isWrapped:true,
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
			this.collection = Utils.$body.find('.billboard');
			if(this.collection.length) {
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
		startTimer: function(index) {
			var self = this,
				count = 1;
			this.timers[index] = setInterval(function() {
				if(count < self.limit) {
					self.collection.eq(index).find('.slider-billboard').flickity( 'next', self.isWrapped);
					count++;
				} else {
					self.stopTimer(index);
				}
			}, this.time * 1000);
		},
		stopTimer: function(index) {
			clearInterval(this.timers[index]);
		},
		bindEvents: function() {
			var self = this;
			this.collection.each(function(i, slider) {

				var cells = $(slider).find('.gallery-cell');

				var bb = $(slider).find('.slider-billboard').flickity({
						pageDots:false,
						wrapAround:true
					}),
					bbData = bb.data('flickity'),
					bbNav = $(slider).find('nav'),
					bbNavItems = bbNav.find('li');

				function updateNav() {
					bbNavItems.filter('.is-selected')
						.removeClass('is-selected');
					bbNavItems.eq(bbData.selectedIndex)
						.addClass('is-selected');

					updateNavPos();
				}

				function updateNavPos() {
					var list = bbNav.find('ul'),
						selected = bbNavItems.filter('.is-selected'),
						width = selected.width(),
						offset = selected.position().left,// + (width * 0.5),
						screenWidthDev = window.screen.width * 0.5,
						position = list.scrollLeft(),
						scroll = position > offset ? offset + position : offset ;

					list.animate({
						scrollLeft: scroll
					}, 1000);
				}

				bb.on('cellSelect', function() {
					updateNav();
				});
				bb.on('click.timer', '.flickity-prev-next-button', function() {
					self.stopTimer(i);
					bb.off('click.timer');
				});
				bb.on('staticClick.timer, dragStart.timer', function() {
					self.stopTimer(i);
					bb.off('staticClick.timer, dragStart.timer')
				});
				bbNav.on('click', 'li', function() {
					var index = $(this).index();
					bb.flickity( 'select', index );
					self.stopTimer(i);
				});

				updateNav();

				if(cells.length > 1) {
					cells.each(function(i, cell) {
						var dataVideo = $(cell).attr('data-video');
						if(dataVideo && dataVideo !== "") {
							var iframe = self.addVideo(dataVideo);
							$(cell)
								.addClass('video')
								.on('click','.image-wrap', function() {
									$(cell).addClass('play');
									$(cell).find('.video-wrap').html(iframe);
								});
						}
					});
					self.startTimer(i);
				}
			});
		}
	};

})(jQuery);