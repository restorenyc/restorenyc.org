var Utils = (function() {
	$(document).ready(function() {
		Utils.init();
	});

	return {
		$html: $('html'),
		$body: $('body'),
		$main: $('#main'),
		$nav: $('#site-nav'),
		$lb: $('#lightbox'),
		init: function() {
			Utils.removeBgVideo();
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
			var container = Utils.$lb.find('.content');
			console.log(container);
			if(state === "on") {
				container.empty();
				container.html(html);
				Utils.$lb.addClass('open');
			} else {
				container.empty();
				Utils.$lb.removeClass('open');
			}
		}
	};
})(jQuery);
(function($) {
	var nav = {
		init: function() {
			this.bindEvents();
		},
		closeSubmenu: function() {
			Utils.$nav.find('.item.open')
				.removeClass('open')
				.find('.submenu').slideUp();
		},
		bindEvents: function() {
			var self = this;
			Utils.$body
				.on('click', '.menu-btn', function(e) {
					if(Utils.$body.hasClass('nav-open')) {
						Utils.lightbox('off');
						Utils.$body.removeClass('nav-open');
					} else {
						Utils.lightbox('on');
						Utils.$body.addClass('nav-open');
					}
				})
				.on('click', '#site-nav .close', function(e) {
					Utils.$body.removeClass('nav-open');
				})
				.on('click', '#site-nav .has-sub', function(e) {
					var el = $(e.target);

					if(el.parent('.subitem').length < 1) {
						if(el.hasClass('open')){
							e.preventDefault();
							nav.closeSubmenu();
						} else {
							nav.closeSubmenu();
							el.addClass('open');
							el.find('.submenu').slideDown();
						}
					}
				});
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