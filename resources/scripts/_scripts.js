// node module for gulp scripts compiler
// order scripts load order
module.exports = function() {
	var path = 'resources/scripts/';
	return [
		path + 'placeholder.js',
		path + 'utils.js',
		path + 'nav.js',
		path + 'header.js',
		path + 'hero.js',
		path + 'billboard.js',
		path + 'modules.js',
		path + 'video.js'
	];
};