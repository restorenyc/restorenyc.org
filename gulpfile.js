var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	del = require('del');

gulp.task('styles', function() {
	return gulp.src('resources/styles/styles.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('src/css'));
});

gulp.task('clean', function(cb) {
	del(['src/css', 'src/js'], cb);
});

gulp.task('default', ['clean'], function() {
	gulp.start('styles');
});

gulp.task('watch', function() {
	gulp.watch('resources/styles/**/*.less', ['styles']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in src/, reload on change
	gulp.watch(['src/**']).on('change', livereload.changed);
});

