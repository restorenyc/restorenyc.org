(function($) {
	var nav = {
		trackOpen: true,
		init: function() {
			this.loadAnnouncement();
			this.bindEvents();
		},
		closeNav: function() {
			Utils.lightbox('off')
			this.closeSubmenu();
			Utils.$body.removeClass('nav-open');
		},
		closeSubmenu: function() {
			Utils.$nav.find('.item.open')
				.removeClass('open')
				//.find('.submenu').slideUp();
		},
		loadAnnouncement: function(){
			var cookie = 'showAnnouncement',
				announcement = $('.announcement-bar');

			if(announcement.length > 0 ) {
				Utils.$body.on('click', '.announcement-bar .close', function(e){
					e.stopPropagation();

					announcement.removeClass('show');
					Utils.cookie(cookie, 'false', 3600 * 24 * 1000);
				});

				if(Utils.cookie(cookie) === 'false') {
					announcement.removeClass('show');
				}
				else {
					announcement.addClass('show');
				}
			}
		},
		bindEvents: function() {
			var self = this;
			Utils.$body
				.on('click', '.menu-btn, .menu-close', function(e) {
					if(Utils.$body.hasClass('nav-open')) {
						self.closeNav();
					} else {
						Utils.lightbox('on');
						Utils.$body.addClass('nav-open');
						$(window).on('resize.nav', window, function(e) {
							if(this.outerWidth > 1024) {
								self.closeNav();
								$(window).off('resize.nav')
							}
						})
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
					var el = $(e.target).closest('.item');

					if(el.parent('.subitem').length < 1) {
						if(el.hasClass('open')){
							nav.closeSubmenu();
						} else {
							nav.closeSubmenu();
							el.addClass('open');
							//el.find('.submenu').slideDown();
						}
					}
				})
		}
	};

	$(document).ready(function() {
		nav.init();
	});

})(jQuery);