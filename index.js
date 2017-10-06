module.exports = ($, gulp, config) => {
  /*
   * Add additional entries to the $ loader
   */
  $.path = require('path');
  $.lazypipe = require('lazypipe');
  $.runSequence = require('run-sequence');
  $.browserSync = require('browser-sync').create();


  /*
   * Helpers
   */
  const loadTask = require($.path.join(__dirname, 'helpers', 'task-loader'));


  /**
   * Gulp configuration for individual tasks
   */
  config = Object.assign({
    src: $.path.join(__dirname, 'src'),
    build: $.path.join(__dirname, 'build'),
    dist: $.path.join(__dirname, 'dist'),
    cache: true,
    debug: true,
    tasks: {
      default: {
        process: () => $.runSequence('build')
      },
      build: {
        process: () => {
          let tasks = [];
          Object.keys(config.tasks).forEach((name) => {
            if (config.tasks[name].pattern) tasks.push(name);
          });

          return $.runSequence('clean', tasks);
        }
      },
      clean: {
        process: $.path.join(__dirname, 'tasks', 'clean')
      },
      html: {
        process: $.path.join(__dirname, 'tasks', 'html'),
        base: $.path.join(__dirname, 'base', 'compile'),
        pattern: $.path.join('**', '*.html')
      // },
      // pug: {
      //   process: $.path.join(__dirname, 'tasks', 'pug'),
      //   pattern: $.path.join('**', '*.pug')
      },
      javascript: {
        process: $.path.join(__dirname, 'tasks', 'javascript'),
        base: $.path.join(__dirname, 'base', 'compile'),
        pattern: $.path.join('**', '*.js')
      // },
      // coffeescript: {
      //   process: $.path.join(__dirname, 'tasks', 'coffeescript'),
      //   pattern: $.path.join('**', '*.coffee')
      // },
      // typescript: {
      //   process: $.path.join(__dirname, 'tasks', 'typescript'),
      //   pattern: $.path.join('**', '*.ts')
      },
      css: {
        process: $.path.join(__dirname, 'tasks', 'css'),
        base: $.path.join(__dirname, 'base', 'compile'),
        pattern: $.path.join('**', '*.css')
      },
      stylus: {
        process: $.path.join(__dirname, 'tasks', 'stylus'),
        base: $.path.join(__dirname, 'base', 'compile'),
        pattern: $.path.join('**', '*.styl')
      },
      sass: {
        process: $.path.join(__dirname, 'tasks', 'sass'),
        base: $.path.join(__dirname, 'base', 'compile'),
        pattern: $.path.join('**', '*.{sass,scss}')
      // },
      // image: {
      //   process: $.path.join(__dirname, 'tasks', 'image'),
      //   pattern: $.path.join('**', '*.{svg,jpg,png,gif}')
      // },
      // font: {
      //   process: $.path.join(__dirname, 'tasks', 'font'),
      //   pattern: $.path.join('**', '*.{eot,svg,ttf,woff,woff2}')
      }
    }
  }, config || {});


  // Create gulp tasks for each task in the configuration
  //
  // let sequences = [];
  Object.keys(config.tasks).forEach((name) => {
    config.tasks[name].name = name;
    gulp.task(name, loadTask($, gulp, config, config.tasks[name]));
  });
};
