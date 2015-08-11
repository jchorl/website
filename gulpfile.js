var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('compileScripts', function() {
	gulp.src('src/scripts/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dest'));
});

gulp.task('compileStyles', function() {
	gulp.src('src/styles/*.less')
		.pipe(less())
		.pipe(concat('style.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dest'));
});

gulp.task('copy', function() {
	gulp.src('src/templates/*')
		.pipe(gulp.dest('dest'));
	gulp.src('src/imgs/*')
		.pipe(gulp.dest('dest'));
});

gulp.task('default', ['compileScripts', 'compileStyles', 'copy', 'watch']);
gulp.task('watch', function() {
	gulp.watch('src/scripts/**/*.*', ['compileScripts']);
	gulp.watch('src/styles/**/*.*', ['compileStyles']);
	gulp.watch('src/templates/*.*', ['copy']);
});