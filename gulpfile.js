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
      paths: {
        dist: [
          path.join(__dirname, 'tests', 'dist', 'javascript-1'),
          path.join(__dirname, 'tests', 'dist', 'javascript-2'),
          path.join(__dirname, 'tests', 'dist', 'javascript-3')
        ]
      }
    },
    'javascript-extended': {
      extends: 'javascript',
      paths: {
        dist: path.join(__dirname, 'tests', 'dist', 'bundle')
      },
      filter: {
        dist: ['**/script.js']
      }
    }
  }
});
