module.exports = ($, gulp, config) => {
  /*
   * Add additional entries to the $ loader
   */
  $.path = require('path');
  $.lazypipe = require('lazypipe');
  $.runSequence = require('run-sequence');
  $.browserSync = require('browser-sync').create();
  $.webpack = require('webpack-stream');
  $.through = require('through2');
  $.named = require('vinyl-named');


  /*
   * Helpers
   */
  const options = require('merge-options');
  const loadTask = require($.path.join(__dirname, 'helpers', 'task-loader'));


  /**
   * Gulp configuration for individual tasks
   */
  config = options({
    paths: {
      src: $.path.join(process.cwd(), 'src'),
      build: $.path.join(process.cwd(), 'build'),
      dist: $.path.join(process.cwd(), 'dist')
    },
    cache: true,
    debug: true,
    tasks: {
      'default': {
        process: () => $.runSequence('build', 'browser-sync', 'watch')
      },
      'build': {
        process: $.path.join(__dirname, 'tasks', 'build')
      },
      'lint': {
        process: $.path.join(__dirname, 'tasks', 'lint')
      },
      'clean': {
        process: $.path.join(__dirname, 'tasks', 'clean')
      },
      'watch': {
        process: $.path.join(__dirname, 'tasks', 'watch')
      },
      'html': {
        process: $.path.join(__dirname, 'tasks', 'html'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.html')
      },
      'html-lint': {
        process: $.path.join(__dirname, 'tasks', 'html-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.html'),
        options: {
          rules: $.path.join(__dirname, 'config', 'htmllint.json'),
          exclude: /vendors\//
        }
      },
      'pug': {
        process: $.path.join(__dirname, 'tasks', 'pug'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.pug'),
        options: {
          locals: {}
        }
      },
      'pug-lint': {
        process: $.path.join(__dirname, 'tasks', 'pug-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.pug'),
        options: {
          exclude: /vendors\//
        }
      },
      'css': {
        process: $.path.join(__dirname, 'tasks', 'css'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.css')
      },
      'css-lint': {
        process: $.path.join(__dirname, 'tasks', 'css-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.css'),
        options: {
          exclude: /vendors\//
        }
      },
      'stylus': {
        process: $.path.join(__dirname, 'tasks', 'stylus'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.styl')
      },
      'stylus-lint': {
        process: $.path.join(__dirname, 'tasks', 'stylus-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.styl'),
        options: {
          rules: $.path.join(__dirname, 'config', 'stylint.json'),
          exclude: /vendors\//
        }
      },
      'sass': {
        process: $.path.join(__dirname, 'tasks', 'sass'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.{sass,scss}')
      },
      'sass-lint': {
        process: $.path.join(__dirname, 'tasks', 'sass-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.{sass,scss}'),
        options: {
          rules: require($.path.join(__dirname, 'config', 'sasslint.json')),
          exclude: /vendors\//
        }
      },
      'javascript': {
        process: $.path.join(__dirname, 'tasks', 'javascript'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.js'),
        options: {
          bundler: 'webpack',
          browserify: require($.path.join(__dirname, 'config', 'browserify')),
          webpack: require($.path.join(__dirname, 'config', 'webpack'))
        }
      },
      'javascript-lint': {
        process: $.path.join(__dirname, 'tasks', 'javascript-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.js'),
        options: {
          rules: require($.path.join(__dirname, 'config', 'eslint.json')),
          exclude: /vendors\//
        }
      },
      'coffeescript': {
        process: $.path.join(__dirname, 'tasks', 'coffeescript'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.coffee')
      },
      'coffeescript-lint': {
        process: $.path.join(__dirname, 'tasks', 'coffeescript-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.coffee'),
        options: {
          rules: require($.path.join(__dirname, 'config', 'coffeelint.json')),
          exclude: /vendors\//
        }
      },
      'typescript': {
        process: $.path.join(__dirname, 'tasks', 'typescript'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.ts')
      },
      'typescript-lint': {
        process: $.path.join(__dirname, 'tasks', 'typescript-lint'),
        base: $.path.join(__dirname, 'bases', 'lint'),
        pattern: $.path.join('**', '*.ts'),
        options: {
          rules: $.path.join(__dirname, 'config', 'tslint.json'),
          exclude: /vendors\//
        }
      },
      'images': {
        process: $.path.join(__dirname, 'tasks', 'images'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.{svg,jpg,png,gif}')
      },
      'fonts': {
        process: $.path.join(__dirname, 'tasks', 'fonts'),
        base: $.path.join(__dirname, 'bases', 'compile'),
        pattern: $.path.join('**', '*.{eot,svg,ttf,woff,woff2}')
      },
      'browser-sync': {
        process: $.path.join(__dirname, 'tasks', 'browser-sync'),
        dependencies: [],
        options: {
          port: 3000,
          proxy: 'localhost:3030',
          injectChanges: true,
          reloadDebounce: 1500
        }
      }
    }
  }, config || {});


  // Create gulp tasks for each task in the configuration
  //
  Object.keys(config.tasks).forEach((name) => {
    if(!config.tasks[name]) return;

    config.tasks[name].name = name;
    config.tasks[name].dependencies = config.tasks[name].dependencies || [];
    config.tasks[name].paths = options(config.paths, config.tasks[name].paths);

    gulp.task(name, config.tasks[name].dependencies, loadTask($, gulp, config, config.tasks[name]));
  });


  return {
    gulp: gulp,
    plugins: $
  };
};
