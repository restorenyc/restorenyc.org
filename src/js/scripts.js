var Utils = (function() {
	$(document).ready(function() {
		Utils.init();
	});

	return {
		$html: $('html'),
		$body: $('body'),
		$main: $('#main'),
		$mh: $('.mh'),
		$nav: $('#site-nav'),
		$lb: $('#lightbox'),
		gaLoaded: false,
		init: function() {
			Utils.removeBgVideo();
			//Utils.gaInit();
			if(Utils.isLegacyIE()) {
				$('input, textarea').placeholder();
			}
		},
		isLegacyIE: function() {
			return Utils.$html.hasClass('ie8') || Utils.$html.hasClass('ie9');
		},
		isMobile: function() {
			var ua = navigator.userAgent,
				pattern = /Android|iPhone|iPad|PlayBook|Mobile|IEMobile/i;
			return pattern.test(ua);
		},
		isHome: function() {
			return Utils.$body.hasClass('home');
		},
		removeBgVideo: function() {
			if(Utils.isMobile()) {
				$('.bg-video').remove();
			}
		},
		lightbox: function(state, html) {
			var wrap = Utils.$lb.find('.wrap'),
				container = Utils.$lb.find('.content');

			if(state === "on") {
				container.empty();
				container.html(html);
				Utils.$lb.addClass('open');
				wrap.on('click.lbOpen', function() {
					if(Utils.$body.hasClass('nav-open')) {
						Utils.$mh.find('.menu-btn').trigger('click');
					}
				});
			} else {
				container.empty();
				Utils.$lb.removeClass('open');
				wrap.off('click.lbOpen');
			}
		},
		// gaInit: function() {
		// 	if(typeof window.ga !== 'undefined'){
		// 		Utils.gaLoaded = true;
		// 		$('body')
		// 			.on('click', '[data-ga]', function(e){
		// 				var attr = $(e.currentTarget).attr('data-ga');

		// 				if(!attr) return;

		// 				var fields = attr.split('--');

		// 				if(fields[1] === 'click') {
		// 					ga('send', {
		// 						hitType: 'event',
		// 						eventCategory: fields[0],
		// 						eventAction: fields[1],
		// 						eventLabel: fields[2],
		// 						eventValue: fields[3]
		// 					});
		// 				}
		// 			})
		// 	}
		// }
	};
})(jQuery);
(function($) {
	var nav = {
		trackOpen: true,
		init: function() {
			this.bindEvents();
		},
		closeNav: function() {
			Utils.lightbox('off')
			this.closeSubmenu();
			Utils.$body.removeClass('nav-open');
		},
		closeSubmenu: function() {
			Utils.$nav.find('.item.open')
				.removeClass('open')
				//.find('.submenu').slideUp();
		},
		bindEvents: function() {
			var self = this;
			Utils.$body
				.on('click', '.menu-btn, .menu-close', function(e) {
					if(Utils.$body.hasClass('nav-open')) {
						self.closeNav();
					} else {
						Utils.lightbox('on');
						Utils.$body.addClass('nav-open');
						$(window).on('resize.nav', window, function(e) {
							if(this.outerWidth > 1024) {
								self.closeNav();
								$(window).off('resize.nav')
							}
						})
						// if(Utils.gaLoaded && nav.trackOpen) {
						// 	ga('send', {
						// 		hitType: 'event',
						// 		eventCategory: 'nav',
						// 		eventAction: 'click',
						// 		eventLabel: 'open'
						// 	});
						// 	nav.trackOpen = false;
						// }
					}
				})
				.on('click', '#site-nav .close', function(e) {
					Utils.$body.removeClass('nav-open');
				})
				.on('click', '#site-nav .has-sub', function(e) {
					var el = $(e.target).closest('.item');

					if(el.parent('.subitem').length < 1) {
						if(el.hasClass('open')){
							e.preventDefault();
							nav.closeSubmenu();
						} else {
							nav.closeSubmenu();
							el.addClass('open');
							//el.find('.submenu').slideDown();
						}
					}
				})
		}
	};

	$(document).ready(function() {
		nav.init();
	});

})(jQuery);
(function($) {
	var header = {
		el: null,
		init: function() {
			this.el = Utils.isHome() ? $('.banner-lead'): $('.single-header');
			this.loadHeaderImage();
			this.loadVideo();
		},
		loadHeaderImage: function() {
			var self = this;
			if(this.el.length > 0 && (Utils.isHome() || this.el.hasClass('bg-image'))) {
				var portrait = this.el.find('.portrait')
					url = portrait.attr('data-img-url'),
					position = $.trim(portrait.attr('data-img-pos')) === "" ? "50% 50%" : portrait.attr('data-img-pos'),
					img = new Image();
				img.addEventListener('load', function() {
					portrait
						.css({
							'background-image': 'url(' + url +')',
							'background-position': position
						})
						.addClass('loaded')
						.closest('section').addClass('ready');
				});
				img.src = url;
			}
		},
		loadVideo: function() {
			var el = $('.banner-lead'),
				video = el.find('video'),
				filetype,
				src;
			if(!Utils.isLegacyIE() && !Utils.isMobile() && el.length > 0 && video.length > 0) {
				src = video.attr('data-src');
				filetype = src.substr(src.lastIndexOf('.')+1);
				// var source = document.createElement('source');
				// source.setAttribute('src', src);
				// source.setAttribute('type', 'video/'+filetype);
				video.on('loadstart', function(){
					video.addClass('loaded');
				});
				video.attr('src', src);
			} else {
				el.addClass('no-video');
			}
		}
	};

	$(document).ready(function() {
		header.init();
	});

})(jQuery);
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