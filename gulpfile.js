var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('compilePublicScripts', function() {
	gulp.src('src/public/scripts/*.js')
		.pipe(concat('public.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dest'));
});

gulp.task('compilePublicStyles', function() {
	gulp.src('src/public/styles/*.less')
		.pipe(less())
		.pipe(concat('public.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dest'));
});

gulp.task('copyPublic', function() {
	gulp.src('src/public/templates/*')
		.pipe(concat('index.html'))
		.pipe(gulp.dest('dest'));
	gulp.src('src/public/imgs/*')
		.pipe(gulp.dest('dest'));
});

gulp.task('watchPublic', function() {
	gulp.watch('src/public/scripts/**/*.*', ['compilePublicScripts']);
	gulp.watch('src/public/styles/**/*.*', ['compilePublicStyles']);
	gulp.watch('src/public/templates/*.*', ['copyPublic']);
});

gulp.task('compileAdminScripts', function() {
	gulp.src('src/admin/scripts/*.js')
		.pipe(concat('admin.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dest'));
});

gulp.task('compileAdminStyles', function() {
	gulp.src('src/admin/styles/*.less')
		.pipe(less())
		.pipe(concat('admin.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dest'));
});

gulp.task('copyAdmin', function() {
	gulp.src('src/admin/templates/*')
		.pipe(concat('admin.html'))
		.pipe(gulp.dest('dest'));
});

gulp.task('watchAdmin', function() {
	gulp.watch('src/admin/scripts/**/*.*', ['compileAdminScripts']);
	gulp.watch('src/admin/styles/**/*.*', ['compileAdminStyles']);
	gulp.watch('src/admin/templates/*.*', ['copyAdmin']);
});
gulp.task('default', ['compilePublicScripts', 'compilePublicStyles', 'copyPublic', 'watchPublic']);
gulp.task('admin', ['compileAdminScripts', 'compileAdminStyles', 'copyAdmin', 'watchAdmin']);