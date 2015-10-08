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