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