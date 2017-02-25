var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    config = require(path.join(__dirname, 'config', 'gulp.config')),
    paths = config['paths'];

plugins['run-sequence'] = require('run-sequence');
plugins['browser-sync'] = require('browser-sync').create();
plugins['rollup'] = plugins['betterRollup'];
plugins['rollup.babel'] = require('rollup-plugin-babel');
plugins['rollup.commonjs'] = require('rollup-plugin-commonjs');
plugins['rollup.nodeResolve'] = require('rollup-plugin-node-resolve');

plugins.path = path;

// HTML
gulp.task('pug',
  require(path.join(__dirname, 'tasks', 'pug'))(gulp, plugins, paths)
);
gulp.task('puglint',
  require(path.join(__dirname, 'tasks', 'pug-lint'))(gulp, plugins, paths)
);

// JavaScript
gulp.task('ts',
  require(path.join(__dirname, 'tasks', 'typescript'))(gulp, plugins, paths)
);
gulp.task('tslint',
  require(path.join(__dirname, 'tasks', 'typescript-lint'))(gulp, plugins, paths)
);
gulp.task('js',
  require(path.join(__dirname, 'tasks', 'javascript'))(gulp, plugins, paths)
);
gulp.task('jslint',
  require(path.join(__dirname, 'tasks', 'javascript-lint'))(gulp, plugins, paths)
);

// CSS
gulp.task('styl',
  require(path.join(__dirname, 'tasks', 'stylus'))(gulp, plugins, paths)
);
gulp.task('stylint',
  require(path.join(__dirname, 'tasks', 'stylus-lint'))(gulp, plugins, paths)
);
gulp.task('css',
  require(path.join(__dirname, 'tasks', 'css'))(gulp, plugins, paths)
);
gulp.task('csslint',
  require(path.join(__dirname, 'tasks', 'css-lint'))(gulp, plugins, paths)
);

// Image
gulp.task('imagemin',
  require(path.join(__dirname, 'tasks', 'image'))(gulp, plugins, paths)
);

// Lint All
gulp.task('lint',
  [ 'puglint', 'tslint', 'jslint', 'styllint', 'csslint' ]
);

// Build All
gulp.task('build', () => {
  return plugins['run-sequence'](
    'clean',
    ['pug', 'ts', 'js', 'styl', 'css', 'imagemin'],
    ['browserify', 'webpack']
  );
});

// Clean dist and build folders
gulp.task('clean',
  require(path.join(__dirname, 'tasks', 'clean'))(gulp, plugins, paths)
);

// Bundle
gulp.task('webpack',
  require(path.join(__dirname, 'tasks', 'webpack'))(gulp, plugins, paths)
);
gulp.task('rollup',
  require(path.join(__dirname, 'tasks', 'rollup'))(gulp, plugins, paths)
);
gulp.task('browserify',
  require(path.join(__dirname, 'tasks', 'browserify'))(gulp, plugins, paths)
);

// Livereload
gulp.task('nodemon',
  require(path.join(__dirname, 'tasks', 'nodemon'))(gulp, plugins, paths)
);
gulp.task('browser-sync', ['nodemon'],
  require(path.join(__dirname, 'tasks', 'browser-sync'))(gulp, plugins, paths)
);

// Watchfile
gulp.task('watch',
  require(path.join(__dirname, 'tasks', 'watch'))(gulp, plugins, paths)
);

// Default Task
gulp.task('default', [ 'browser-sync', 'watch' ])
