(function($) {
	var modules = {
		init: function() {
			this.collapsed();
		},
		collapsed: function() {
			var sections = Utils.$body.find('.collapsed');
			if(sections.length > 0) {
				sections.find('.mask .btn').click(function(e){
					$(e.target).closest('.collapsed').addClass('show');
				});
			}
		}
	};

	$(document).ready(function() {
		modules.init();
	});

})(jQuery);