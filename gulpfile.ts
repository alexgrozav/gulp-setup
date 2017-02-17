var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('./config/gulp.config'),
    paths = config['paths'],
    path = require('path');
plugins.path = path;


// HTML
gulp.task('pug', require('./tasks/pug')(gulp, plugins, paths));
gulp.task('puglint', require('./tasks/pug-lint')(gulp, plugins, paths));

// JavaScript
gulp.task('ts', require('./tasks/typescript')(gulp, plugins, paths));
gulp.task('js', require('./tasks/javascript')(gulp, plugins, paths));
gulp.task('tslint', require('./tasks/typescript-lint')(gulp, plugins, paths));
gulp.task('jslint', require('./tasks/javascript-lint')(gulp, plugins, paths));

// CSS
gulp.task('styl', require('./tasks/stylus')(gulp, plugins, paths));
gulp.task('css', require('./tasks/css')(gulp, plugins, paths));
gulp.task('styllint', require('./tasks/stylus-lint')(gulp, plugins, paths));
gulp.task('csslint', require('./tasks/css-lint')(gulp, plugins, paths));

// Image
gulp.task('imagemin', require('./tasks/image')(gulp, plugins, paths));

// Lint All
gulp.task('lint', ['puglint', 'tslint', 'jslint', 'styllint', 'csslint']);

// Build All
gulp.task('build', ['pug', 'ts', 'js', 'styl', 'css']);

// Clean dist and build folders
gulp.task('clean', require('./tasks/clean')(gulp, plugins, paths));

// Bundle
gulp.task('webpack', require('./tasks/webpack')(gulp, plugins, paths));
gulp.task('browserify', require('./tasks/browserify')(gulp, plugins, paths));
gulp.task('rollup', require('./tasks/rollup')(gulp, plugins, paths));

// Watchfile
gulp.task('watch', require('./tasks/watch')(gulp, plugins, paths));

// Default Task
gulp.task('default', [ 'watch' ])
