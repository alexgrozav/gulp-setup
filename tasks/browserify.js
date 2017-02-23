module.exports = (gulp, plugins, paths) => {
  var browserify = require('browserify'),
      watchify = require('watchify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      assign = require('lodash.assign');

  var config = require(plugins['path'].join("..", "config", "browserify.config.js")),
      options = assign({}, watchify.args, config);
  var bundler = browserify(options);

  bundler.on('update', bundle);
  bundler.on('log', plugins['util'].log.bind(plugins['util']));

  function bundle() {
    return bundler
      .plugin("tsify", { noImplicitAny: true, target: "commonjs" })
      .on('error', plugins['util'].log.bind(plugins['util'], 'Browserify Error'))
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['sourcemaps'].init({ loadMaps: true }))
      .pipe(plugins['sourcemaps'].write(''))
      .pipe(gulp.dest(paths.build))
      // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
      // .pipe(plugins['babel']({ presets: ['babili'] }))
      // .pipe(gulp.dest(paths.dist));
    }

   return bundle;
}
