const path = require('path');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const setup = require(path.join(__dirname, 'index'))($, gulp, {
  paths: {
    src: path.join(__dirname, 'tests', 'src'),
    build: path.join(__dirname, 'tests', 'build'),
    dist: path.join(__dirname, 'tests', 'dist')
  },
  tasks: {
    'javascript': {
      filter: {
        dist: ['**/script.js']
      }
    },
    'javascript-extended': {
      extends: 'javascript',
      paths: {
        src: path.join(__dirname, 'tests', 'custom-src'),
        build: false,
        dist: path.join(__dirname, 'tests', 'custom-dist'),
      }
    }
  }
});
