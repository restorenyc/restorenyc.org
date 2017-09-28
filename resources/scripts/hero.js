(function($) {
	var hero = {
		el: null,
		init: function() {
			this.el = $('#hero');
			if(this.el.length > 0) {
				this.loadHeaderImage();
				this.loadVideo();
				this.bindClickEvents();
				//this.bindEvents();
				//this.fixPosition();
			}
		},
		isMobileVP: function() {
			return this.getViewport().width < 1024;
		},
		loadHeaderImage: function() {
			var self = this;
			if(this.el.length > 0 && this.el.hasClass('hero-bg-image')) {
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
			var el = $('#hero'),
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
		},
		getViewport: function() {
			var vp = window,
				prefix = 'inner';

			if (!('innerWidth' in window)) {
				prefix = 'client';
				vp = document.documentElement || document.body;
			}
			return { width: vp[prefix + 'Width'], height: vp[prefix + 'Height'] };
		},
		fixPosition: function() {
			var vpW = this.getViewport().width;
			var vpH = this.getViewport().height;

			if(this.isMobileVP()) {
				$('#hero').css('margin-bottom', 0);
				Utils.$main.css('opacity', 1)
				Utils.$main.removeClass('locked');
			}
			else {
				Utils.$main.addClass('locked');
				$('#hero').css('margin-bottom', vpH)
			}
		},
		bindEvents: function() {
			$(window).on('scroll', function() {
				var vpH = this.getViewport().height;
				var mainH = Utils.$main.height();
				var top = window.scrollY;
				var ratio = top/vpH;
				var opacity = (ratio < 0.35) ? 0.35 : (ratio < 1) ? ratio : 1;

				if(this.isMobileVP()) return;

				if(top > (vpH - 5)) {
					Utils.$main.css('opacity', 1);
					$('#hero').css('margin-bottom', 0);
					Utils.$main.removeClass('locked');
				}
				else {
					Utils.$main.css('opacity', opacity)
					$('#hero').css('margin-bottom', vpH + mainH)
					Utils.$main.addClass('locked');
				}
			//	this.fixPosition();
			}.bind(this))

			$(window).on('resize', function() {
				this.fixPosition();
				$('html, body').scrollTop(0)
			}.bind(this));

		},
		bindClickEvents: function() {
			$('.nav-down').click(function(){
				var nav = Utils.$mh;
				var offset = nav.height();

				$('html, body').animate({ scrollTop: this.getViewport().height - offset}, 600);
				return false;
			}.bind(this));
		}
	};

	$(document).ready(function() {
		hero.init();
	});

})(jQuery);