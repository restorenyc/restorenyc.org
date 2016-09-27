/* HTML5 Placeholder jQuery Plugin - v2.3.1
 * Copyright (c)2015 Mathias Bynens
 * 2015-12-16
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(a){function b(b){var c={},d=/^jQuery\d+$/;return a.each(b.attributes,function(a,b){b.specified&&!d.test(b.name)&&(c[b.name]=b.value)}),c}function c(b,c){var d=this,f=a(this);if(d.value===f.attr(h?"placeholder-x":"placeholder")&&f.hasClass(n.customClass))if(d.value="",f.removeClass(n.customClass),f.data("placeholder-password")){if(f=f.hide().nextAll('input[type="password"]:first').show().attr("id",f.removeAttr("id").data("placeholder-id")),b===!0)return f[0].value=c,c;f.focus()}else d==e()&&d.select()}function d(d){var e,f=this,g=a(this),i=f.id;if(!d||"blur"!==d.type||!g.hasClass(n.customClass))if(""===f.value){if("password"===f.type){if(!g.data("placeholder-textinput")){try{e=g.clone().prop({type:"text"})}catch(j){e=a("<input>").attr(a.extend(b(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-enabled":!0,"placeholder-password":g,"placeholder-id":i}).bind("focus.placeholder",c),g.data({"placeholder-textinput":e,"placeholder-id":i}).before(e)}f.value="",g=g.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",g.data("placeholder-id")).show()}else{var k=g.data("placeholder-password");k&&(k[0].value="",g.attr("id",g.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))}g.addClass(n.customClass),g[0].value=g.attr(h?"placeholder-x":"placeholder")}else g.removeClass(n.customClass)}function e(){try{return document.activeElement}catch(a){}}var f,g,h=!1,i="[object OperaMini]"===Object.prototype.toString.call(window.operamini),j="placeholder"in document.createElement("input")&&!i&&!h,k="placeholder"in document.createElement("textarea")&&!i&&!h,l=a.valHooks,m=a.propHooks,n={};j&&k?(g=a.fn.placeholder=function(){return this},g.input=!0,g.textarea=!0):(g=a.fn.placeholder=function(b){var e={customClass:"placeholder"};return n=a.extend({},e,b),this.filter((j?"textarea":":input")+"["+(h?"placeholder-x":"placeholder")+"]").not("."+n.customClass).not(":radio, :checkbox, [type=hidden]").bind({"focus.placeholder":c,"blur.placeholder":d}).data("placeholder-enabled",!0).trigger("blur.placeholder")},g.input=j,g.textarea=k,f={get:function(b){var c=a(b),d=c.data("placeholder-password");return d?d[0].value:c.data("placeholder-enabled")&&c.hasClass(n.customClass)?"":b.value},set:function(b,f){var g,h,i=a(b);return""!==f&&(g=i.data("placeholder-textinput"),h=i.data("placeholder-password"),g?(c.call(g[0],!0,f)||(b.value=f),g[0].value=f):h&&(c.call(b,!0,f)||(h[0].value=f),b.value=f)),i.data("placeholder-enabled")?(""===f?(b.value=f,b!=e()&&d.call(b)):(i.hasClass(n.customClass)&&c.call(b),b.value=f),i):(b.value=f,i)}},j||(l.input=f,m.value=f),k||(l.textarea=f,m.value=f),a(function(){a(document).delegate("form","submit.placeholder",function(){var b=a("."+n.customClass,this).each(function(){c.call(this,!0,"")});setTimeout(function(){b.each(d)},10)})}),a(window).bind("beforeunload.placeholder",function(){var b=!0;try{"javascript:void(0)"===document.activeElement.toString()&&(b=!1)}catch(c){}b&&a("."+n.customClass).each(function(){this.value=""})}))});
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
(function($) {
	var nav = {
		trackOpen: true,
		init: function() {
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
(function($) {
	var header = {
		el: null,
		init: function() {
			this.el = Utils.isHome() ? $('.banner-lead'): $('.single-header');
			this.loadHeaderImage();
			this.loadVideo();
		},
		loadHeaderImage: function() {
			var self = this;
			if(this.el.length > 0 && (Utils.isHome() || this.el.hasClass('bg-image'))) {
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
						.addClass('loaded')
						.closest('section').addClass('ready');
				});
				img.src = url;
			}
		},
		loadVideo: function() {
			var el = $('.banner-lead'),
				video = el.find('video'),
				filetype,
				src;
			if(!Utils.isLegacyIE() && !Utils.isMobile() && el.length > 0 && video.length > 0) {
				src = video.attr('data-src');
				filetype = src.substr(src.lastIndexOf('.')+1);
				// var source = document.createElement('source');
				// source.setAttribute('src', src);
				// source.setAttribute('type', 'video/'+filetype);
				video.on('loadstart', function(){
					video.addClass('loaded');
				});
				video.attr('src', src);
			} else {
				el.addClass('no-video');
			}
		}
	};

	$(document).ready(function() {
		header.init();
	});

})(jQuery);
var Billboard = (function($){

	$(function(){ Billboard.init(); });

	return {
		time:3,
		limit:12,
		timers:[],
		isWrapped:true,
		vimeo: {
			regex: 'vimeo.com/video/',
			baseUrl: 'https://player.vimeo.com/video/',
			queryVar:'?badge=0&title=0&byline=0&rel=0&autoplay=1',
			attr: {
				'frameborder': '0',
				'webkitallowfullscreen' : 'true',
				'mozallowfullscreen': 'true',
				'allowfullscreen': 'true'
			}
		},
		youtube: {
			regex: 'youtu.be/',
			baseUrl: 'https://www.youtube.com/embed/',
			queryVar:'?autoplay=1',
			attr: {
				'frameborder': '0',
				'allowfullscreen': 'true'
			}
		},
		init: function() {
			this.collection = Utils.$body.find('.billboard');
			if(this.collection.length) {
				this.bindEvents();
			}
		},
		addVideo: function(src) {
			var id;
			if(src.indexOf(this.vimeo.regex) > -1) {
				id = src.split(this.vimeo.regex)[1];
				return this.createIframe('vimeo', id);
			} else if (src.indexOf(this.youtube.regex) > -1) {
				id = src.split(this.youtube.regex)[1];
				return this.createIframe('youtube', id);
			}
 		},
 		createIframe: function(type, id) {
			var html = $('<iframe></iframe>').clone(),
				meta = this[type],
				src = meta.baseUrl + id + meta.queryVar;

			html.attr('src', src);

			$.each(meta.attr, function(prop, val) {
				html.attr(prop, val);
			});

			return html;
		},
		startTimer: function(index) {
			var self = this,
				count = 1;
			this.timers[index] = setInterval(function() {
				if(count < self.limit) {
					self.collection.eq(index).find('.slider-billboard').flickity( 'next', self.isWrapped);
					count++;
				} else {
					self.stopTimer(index);
				}
			}, this.time * 1000);
		},
		stopTimer: function(index) {
			clearInterval(this.timers[index]);
		},
		bindEvents: function() {
			var self = this;
			this.collection.each(function(i, slider) {

				var cells = $(slider).find('.gallery-cell');

				var bb = $(slider).find('.slider-billboard').flickity({
						pageDots:false,
						wrapAround:true
					}),
					bbData = bb.data('flickity'),
					bbNav = $(slider).find('nav'),
					bbNavItems = bbNav.find('li');

				function updateNav() {
					bbNavItems.filter('.is-selected')
						.removeClass('is-selected');
					bbNavItems.eq(bbData.selectedIndex)
						.addClass('is-selected');

					updateNavPos();
				}

				function updateNavPos() {
					var list = bbNav.find('ul'),
						selected = bbNavItems.filter('.is-selected'),
						width = selected.width(),
						offset = selected.position().left,// + (width * 0.5),
						screenWidthDev = window.screen.width * 0.5,
						position = list.scrollLeft(),
						scroll = position > offset ? offset + position : offset ;

					list.animate({
						scrollLeft: scroll
					}, 1000);
				}

				bb.on('cellSelect', function() {
					updateNav();
				});
				bb.on('click.timer', '.flickity-prev-next-button', function() {
					self.stopTimer(i);
					bb.off('click.timer');
				});
				bb.on('staticClick.timer, dragStart.timer', function() {
					self.stopTimer(i);
					bb.off('staticClick.timer, dragStart.timer')
				});
				bbNav.on('click', 'li', function() {
					var index = $(this).index();
					bb.flickity( 'select', index );
					self.stopTimer(i);
				});

				updateNav();

				if(cells.length > 1) {
					cells.each(function(i, cell) {
						var dataVideo = $(cell).attr('data-video');
						if(dataVideo && dataVideo !== "") {
							var iframe = self.addVideo(dataVideo);
							$(cell)
								.addClass('video')
								.on('click','.image-wrap', function() {
									$(cell).addClass('play');
									$(cell).find('.video-wrap').html(iframe);
								});
						}
					});
					self.startTimer(i);
				}
			});
		}
	};

})(jQuery);