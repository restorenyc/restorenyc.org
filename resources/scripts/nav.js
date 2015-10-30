(function($) {
	var nav = {
		init: function() {
			this.bindEvents();
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
					var el = $(e.target);
					if(el.hasClass('open')){
						e.preventDefault();
					} else {
						Utils.$nav.find('.item.open')
							.removeClass('open')
							.find('.submenu').slideUp();
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