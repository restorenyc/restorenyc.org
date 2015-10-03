var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	jsmap = require('./resources/scripts/_scripts');

gulp.task('styles', function() {
	return gulp.src('resources/styles/_styles.less')
		.pipe(less())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('src/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function() {
	var src = jsmap();
	return gulp.src(src)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('src/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'));
});

gulp.task('clean', function(cb) {
	del(['src/css', 'src/js'], cb);
});

gulp.task('default', ['clean'], function() {
	gulp.start('styles');
	gulp.start('scripts');
});

gulp.task('watch', function() {
	gulp.watch('resources/styles/**/*.less', ['styles']);
	gulp.watch('resources/scripts/**/*.js', ['scripts']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in src/, reload on change
	gulp.watch(['src/**']).on('change', livereload.changed);
});

