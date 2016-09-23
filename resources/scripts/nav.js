(function($) {
	var nav = {
		trackOpen: true,
		init: function() {
			this.bindEvents();
		},
		closeSubmenu: function() {
			Utils.$nav.find('.item.open')
				.removeClass('open')
				.find('.submenu').slideUp();
		},
		bindEvents: function() {
			var self = this;
			Utils.$body
				.on('click', '.menu-btn', function(e) {
					if(Utils.$body.hasClass('nav-open')) {
						Utils.lightbox('off');
						Utils.$body.removeClass('nav-open');
					} else {
						Utils.lightbox('on');
						Utils.$body.addClass('nav-open');
						// if(Utils.gaLoaded && nav.trackOpen) {
						// 	ga('send', {
						// 		hitType: 'event',
						// 		eventCategory: 'nav',
						// 		eventAction: 'click',
						// 		eventLabel: 'open'
						// 	});
						// 	nav.trackOpen = false;
						// }
					}
				})
				.on('click', '#site-nav .close', function(e) {
					Utils.lightbox('off');
					Utils.$body.removeClass('nav-open');
				})
				.on('click', '#site-nav .has-sub', function(e) {
					var el = $(e.target);

					if(el.parent('.subitem').length < 1) {
						if(el.hasClass('open')){
							e.preventDefault();
							nav.closeSubmenu();
						} else {
							nav.closeSubmenu();
							el.addClass('open');
							el.find('.submenu').slideDown();
						}
					}
				});
		}
	};

	$(document).ready(function() {
		nav.init();
	});

})(jQuery);