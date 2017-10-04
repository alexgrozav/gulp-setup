module.exports = (gulp, plugins, config) => {
  //
  // Add additional entries to the plugins loader
  //
  plugins['path'] = require('path');
  plugins['run-sequence'] = require('run-sequence');
  plugins['browser-sync'] = require('browser-sync').create();


  //
  // Helpers
  //
  const loadTask = require(plugins['path'].join(__dirname, 'helpers', 'task-loader'));


  //
  // Gulp configuration for individual tasks
  //
  config = Object.assign({
    src: plugins['path'].join(__dirname, 'src'),
    build: plugins['path'].join(__dirname, 'build'),
    dist: plugins['path'].join(__dirname, 'dist'),
    cache: true,
    debug: true,
    tasks: {
      default: {
        task: ['clean', 'build']
      },
      clean: {
        task: plugins['path'].join(__dirname, 'tasks', 'clean')
      },
      build: {
        task: ['clean', 'build']
      },
      html: {
        task: plugins['path'].join(__dirname, 'tasks', 'html'),
        base: plugins['path'].join(__dirname, 'base', 'compile'),
        pattern: plugins['path'].join('**', '*.html')
      // },
      // pug: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'pug'),
      //   pattern: plugins['path'].join('**', '*.pug')
      // },
      // javascript: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'javascript'),
      //   pattern: plugins['path'].join('**', '*.js')
      // },
      // coffeescript: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'coffeescript'),
      //   pattern: plugins['path'].join('**', '*.coffee')
      // },
      // typescript: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'typescript'),
      //   pattern: plugins['path'].join('**', '*.ts')
      // },
      // css: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'css'),
      //   pattern: plugins['path'].join('**', '*.css')
      // },
      // stylus: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'stylus'),
      //   pattern: plugins['path'].join('**', '*.styl')
      // },
      // sass: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'sass'),
      //   pattern: plugins['path'].join('**', '*.{sass,scss}')
      // },
      // image: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'image'),
      //   pattern: plugins['path'].join('**', '*.{svg,jpg,png,gif}')
      // },
      // font: {
      //   task: plugins['path'].join(__dirname, 'tasks', 'font'),
      //   pattern: plugins['path'].join('**', '*.{eot,svg,ttf,woff,woff2}')
      }
    }
  }, config || {});



  // Create gulp tasks for each task in the configuration
  //
  Object.keys(config.tasks).forEach((name) => {
    config.tasks[name].name = name;

    console.log(name, loadTask(gulp, plugins, config, config.tasks[name]))

    gulp.task(name, loadTask(gulp, plugins, config, config.tasks[name]));
  });
};
