var Utils = (function() {
	return {
		$html: $('html'),
		$body: $('body'),
		$main: $('#main'),
		$nav: $('#site-nav')
	};
})(jQuery);
(function($) {
	var nav = {
		init: function() {
			this.bindEvents();
		},
		closeSubmenu: function(cb) {
			//Utils.$nav.find('.item').removeClass('open');
			//Utils.$nav.find('.item').hide();
		},
		bindEvents: function() {
			var self = this;
			Utils.$body
				.on('click', '.menu-btn', function(e) {
					Utils.$body.addClass('nav-open');
				})
				.on('click', '#site-nav .close', function(e) {
					Utils.$body.removeClass('nav-open');
				})
				.on('click', '#site-nav .has-sub', function(e) {
					//e.stopPropagation();
					var el = $(e.target);
					//nav.closeSubmenu();
					//console.log($(e.target).hasClass('open'));
					//$(e.target).addClass('open')
					Utils.$nav.find('.item .open').slideUp();
					if(el.hasClass('open')){
						console.log('open-true')
						//el.removeClass('open');
						//el.hide();
					} else {
						//nav.closeSubmenu();
						console.log('open-false')
						//el.addClass('open');
						el.find('.submenu').addClass('open').slideDown();
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
			this.el = $('.single-header');
			this.loadHeaderImage();
		},
		loadHeaderImage: function() {
			var self = this;
			if(this.el.length > 0 && this.el.hasClass('bg-image')) {
				var portrait = this.el.find('.portrait')
					url = portrait.attr('data-img-url'),
					position = $.trim(portrait.attr('data-img-pos')) === "" ? "50% 50%" : portrait.attr('data-img-pos'),
					img = new Image();
				console.log(this.el);
				console.log(portrait);
				img.addEventListener('load', function() {
					portrait
						.css({
							'background-image': 'url(' + url +')',
							'background-position': position
						})
						.addClass('loaded');
				});
				img.src = url;

			}
		}
	};

	$(document).ready(function() {
		header.init();
	});

})(jQuery);