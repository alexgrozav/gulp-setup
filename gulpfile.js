const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');


module.exports = (config) => {
  //
  // Gulp configuration for individual tasks
  //
  config = Object.assign({
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    dist: path.join(__dirname, 'dist'),
    tasks: {
      html: {
        task: path.join(__dirname, 'tasks', 'html'),
        base: path.join(__dirname, 'base', 'compile'),
        pattern: path.join('**', '*.html'),
        cache: true
      // },
      // pug: {
      //   task: path.join(__dirname, 'tasks', 'pug'),
      //   pattern: path.join('**', '*.pug')
      // },
      // javascript: {
      //   task: path.join(__dirname, 'tasks', 'javascript'),
      //   pattern: path.join('**', '*.js')
      // },
      // coffeescript: {
      //   task: path.join(__dirname, 'tasks', 'coffeescript'),
      //   pattern: path.join('**', '*.coffee')
      // },
      // typescript: {
      //   task: path.join(__dirname, 'tasks', 'typescript'),
      //   pattern: path.join('**', '*.ts')
      // },
      // css: {
      //   task: path.join(__dirname, 'tasks', 'css'),
      //   pattern: path.join('**', '*.css')
      // },
      // stylus: {
      //   task: path.join(__dirname, 'tasks', 'stylus'),
      //   pattern: path.join('**', '*.styl')
      // },
      // sass: {
      //   task: path.join(__dirname, 'tasks', 'sass'),
      //   pattern: path.join('**', '*.{sass,scss}')
      // },
      // image: {
      //   task: path.join(__dirname, 'tasks', 'image'),
      //   pattern: path.join('**', '*.{svg,jpg,png,gif}')
      // },
      // font: {
      //   task: path.join(__dirname, 'tasks', 'font'),
      //   pattern: path.join('**', '*.{eot,svg,ttf,woff,woff2}')
      }
    }
  }, config);


  Object.keys(config.tasks).forEach((name) => {
    if (config.tasks[name].base) {
      gulp.task(name, require(config.tasks[name].base)(gulp, plugins, config));
    } else {
      gulp.task(name, require(config.tasks[name].task)(gulp, plugins, config));
    }
  });
}
