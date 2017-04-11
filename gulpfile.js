var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	replace = require('gulp-replace'),
	jsmap = require('./resources/scripts/_scripts');

function getDate() {
	//timestamp
	return new Date().getTime();
}

gulp.task('styles', function() {
	gulp.src('resources/styles/_styles.less')
		.pipe(less())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('src/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('src/css'));
	return gulp.src('_views/layout.html', { base: './' })
		.pipe(replace(/(\/src\/css\/styles.min.css)(.*)"/, '$1?ver=' + getDate() + '"'))
		.pipe(gulp.dest('./'));
});

gulp.task('scripts', function() {
	var src = jsmap();
	gulp.src(src)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('src/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'));
	return gulp.src('_views/layout.html', { base: './' })
		.pipe(replace(/(\/src\/js\/scripts.min.js)(.*)"/, '$1?ver=' + getDate() + '"'))
		.pipe(gulp.dest('./'));
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

