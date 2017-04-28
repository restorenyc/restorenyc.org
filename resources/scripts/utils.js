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
			var forms = $('.signup-form, .subscribe-module'),
				link = 'http://restorenyc.us13.list-manage.com/subscribe?u=3ab98ba41ef52e8a3ed2e0745&id=5360afa171&MERGE0=';

			if(forms.length) {
				forms.each(function(){
					var form = $(this),
						btn = form.find('.email-submit');

					btn.click(function(e){
						e.preventDefault();
						window.location.href = link + form.find('.email').val();
					})
				});
			}
		},
		campaign: function(){
			var campaigns = $('.campaign-support, .donate-module');

			function getPrefix(str) {
				return (str.indexOf('?') > -1) ? '&' : '?';
			}

			if(campaigns.length){
				campaigns.each(function(){
					var action = $(this).find('.donate-action'),
						href = action.attr('href'),
						input = $(this).find('.donate-amount'),
						monthly = $(this).find('.monthly'),
						monthlyInput = monthly.find('input'),
						giveByCheck = $(this).find('.check strong'),
						checkAddress = $(this).find('.check-address'),
						prefix = null,
						newHref = null;

					monthly.on('click', function(e){
						console.log('c')
						if(monthlyInput.val() === '0') {
							monthlyInput.val('1');
							monthly.find('.checkbox-off').removeClass('show');
							monthly.find('.checkbox-on').addClass('show');
						}
						else {
							monthlyInput.val('0');
							monthly.find('.checkbox-off').addClass('show');
							monthly.find('.checkbox-on').removeClass('show');
						}

						input.trigger('keyup');
					});


					input.on('keyup', function(e){
						e.preventDefault();

						newHref = href + getPrefix(href) + 'amount=' + input.val();

						if(monthly.length) {
							newHref = newHref + getPrefix(newHref) + 'recurring=' + monthlyInput.val();
						}

						action.attr('href', newHref);
					});

					giveByCheck.on('click', function(){
						checkAddress.toggleClass('show');
					});

					input.trigger('keyup');
				});
			}
		},
		cookie: function(name, value, ms) {
			// cookie('mine', 'data', 5*60*1000) -- write data to cookie named mine that lasts for five minutes
			// cookie('mine') -- read the cookie that was just set, function result will be 'data'
			// cookie('mine', '', -1) -- delete the cookie
			if(arguments.length < 2) {
				// read cookie
				var cookies = document.cookie.split(';')
				for(var i=0; i < cookies.length; i++) {
					var c = cookies[i].replace(/^\s+/, '')
					if(c.indexOf(name+'=') == 0) {
						return decodeURIComponent(c.substring(name.length+1).split('+').join(' '))
					}
				}
				return null
			}

			// write cookie
			var date = new Date()
			date.setTime(date.getTime()+ms)
			document.cookie = name+"=" + encodeURIComponent(value) + (ms ? ";expires="+date.toGMTString() : '') + ";path=/"
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