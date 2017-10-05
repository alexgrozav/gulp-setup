const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');


require(path.join(__dirname, 'index'))(plugins, gulp, {
  src: path.join(__dirname, 'tests', 'src'),
  build: path.join(__dirname, 'tests', 'build'),
  dist: path.join(__dirname, 'tests', 'dist'),
});
