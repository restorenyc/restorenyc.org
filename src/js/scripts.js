var Utils = (function() {
	return {
		$body: $('body')
	};
})(jQuery);
(function($) {
	var nav = {
		init: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			Utils.$body
				.on('click', '.menu-btn', function() {
					console.log('nav');
				});
		}
	};

	$(document).ready(function() {
		nav.init();
	});

})(jQuery);