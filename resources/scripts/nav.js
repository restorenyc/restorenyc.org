(function($) {
	var nav = {
		init: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			Utils.$body
				.on('click', '.menu-btn', function(e) {
					Utils.$body.addClass('nav-open');
				})
				.on('click', '#site-nav .close', function(e){
					Utils.$body.removeClass('nav-open');
				})
		}
	};

	$(document).ready(function() {
		nav.init();
	});

})(jQuery);