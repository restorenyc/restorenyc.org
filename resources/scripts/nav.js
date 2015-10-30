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
		fixPosition: function() {
			Utils.$body.css({
				'height': window.innerHeight + 'px',
				'overflow': 'hidden',
				'position': 'fixed'
			});
		},
		resetPosition: function() {
			Utils.$body.css({
				'height': 'auto',
				'overflow': 'auto',
				'position': 'static'
			});
		},
		bindEvents: function() {
			var self = this;
			Utils.$body
				.on('click', '.menu-btn', function(e) {
					if(Utils.$body.hasClass('nav-open')) {
						//nav.resetPosition();
						Utils.$body.removeClass('nav-open');
					} else {
						//nav.fixPosition();
						Utils.$body.addClass('nav-open');
					}
				})
				.on('click', '#site-nav .close', function(e) {
					Utils.$body.removeClass('nav-open');
				})
				.on('click', '#site-nav .has-sub', function(e) {
					var el = $(e.target);
					if(el.hasClass('open')){
						e.preventDefault();
						nav.closeSubmenu();
					} else {
						nav.closeSubmenu();
						el.addClass('open');
						el.find('.submenu').slideDown();
					}
				});
		}
	};

	$(document).ready(function() {
		nav.init();
	});

})(jQuery);