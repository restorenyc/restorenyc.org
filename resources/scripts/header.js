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