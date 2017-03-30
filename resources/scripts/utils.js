var Utils = (function() {
	$(document).ready(function() {
		Utils.init();
	});

	return {
		$html: $('html'),
		$body: $('body'),
		$main: $('#main'),
		$mh: $('.mh'),
		$nav: $('#site-nav'),
		$lb: $('#lightbox'),
		gaLoaded: false,
		init: function() {
			Utils.removeBgVideo();
			//Utils.gaInit();
			if(Utils.isLegacyIE()) {
				$('input, textarea').placeholder();
			}
			Utils.mailchimp();
			Utils.campaign();
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
			var wrap = Utils.$lb.find('.wrap'),
				container = Utils.$lb.find('.content');

			if(state === "on") {
				container.empty();
				container.html(html);
				Utils.$lb.addClass('open');
				wrap.on('click.lbOpen', function() {
					if(Utils.$body.hasClass('nav-open')) {
						Utils.$mh.find('.menu-btn').trigger('click');
					}
				});
			} else {
				container.empty();
				Utils.$lb.removeClass('open');
				wrap.off('click.lbOpen');
			}
		},
		mailchimp: function(){
			var btn = $('.signup-form');
			var link = 'http://restorenyc.us13.list-manage.com/subscribe?u=3ab98ba41ef52e8a3ed2e0745&id=5360afa171&MERGE0=';
			if(btn.length) {
				btn.click(function(e){
					var email = $('.signup-form-input').val();
					window.location.href = link + email;
				})
			}
		},
		campaign: function(){
			var campaigns = $('.campaign-support');

			if(campaigns.length){
				campaigns.each(function(){
					var action = $(this).find('.donate-action'),
						href = action.attr('href'),
						input = $(this).find('.donate-amount'),
						newHref = null;

					input.on('keyup', function(e){
						e.preventDefault();

						newHref = href + '&amount=' + input.val();
						action.attr('href', newHref);
					});
				});
			}
		}
		// gaInit: function() {
		// 	if(typeof window.ga !== 'undefined'){
		// 		Utils.gaLoaded = true;
		// 		$('body')
		// 			.on('click', '[data-ga]', function(e){
		// 				var attr = $(e.currentTarget).attr('data-ga');

		// 				if(!attr) return;

		// 				var fields = attr.split('--');

		// 				if(fields[1] === 'click') {
		// 					ga('send', {
		// 						hitType: 'event',
		// 						eventCategory: fields[0],
		// 						eventAction: fields[1],
		// 						eventLabel: fields[2],
		// 						eventValue: fields[3]
		// 					});
		// 				}
		// 			})
		// 	}
		// }
	};
})(jQuery);