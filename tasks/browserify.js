module.exports = (gulp, plugins, paths) => {
  var browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      through = require('through2'),
      glob = require('glob'),
      merge = require('merge-stream')
      srcPath = plugins['path'].join(paths.build, paths.javascript);

  var babelify = require('babelify')

  return () => {
    var files = glob.sync(srcPath)

    return merge(files.map(function (entry) {
      return browserify({
          entries: entry,
          debug: true
        })
        .transform("babelify", {
          presets: [ "es2015" ]
        })
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(plugins['debug']())
        .pipe(plugins['sourcemaps'].init({ loadMaps: true }))
        .pipe(plugins['sourcemaps'].write(plugins['path'].join('.')))
        .pipe(gulp.dest(plugins['path'].join(__dirname, '..')))
        .pipe(plugins['browser-sync'].stream());
    }));
  }
}
// module.exports = (gulp, plugins, paths) => {
//   var browserify = require('browserify'),
//       watchify = require('watchify'),
//       source = require('vinyl-source-stream'),
//       buffer = require('vinyl-buffer'),
//       assign = require('lodash.assign');
//
//   var config = require(plugins['path'].join("..", "config", "browserify.config.js")),
//       options = assign({}, watchify.args, config);
//   var bundler = browserify(options);
//
//   bundler.on('update', bundle);
//   bundler.on('log', plugins['util'].log.bind(plugins['util']));
//
//   function bundle() {
//     return bundler
//       .plugin("tsify", { noImplicitAny: true, target: "commonjs" })
//       .on('error', plugins['util'].log.bind(plugins['util'], 'Browserify Error'))
//       .bundle()
//       .pipe(source('bundle.js'))
//       .pipe(buffer())
//       .pipe(plugins['debug']())
//       .pipe(plugins['plumber']())
//       .pipe(plugins['sourcemaps'].init({ loadMaps: true }))
//       .pipe(plugins['sourcemaps'].write(''))
//       .pipe(gulp.dest(paths.build))
//       // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
//       // .pipe(plugins['babel']({ presets: ['babili'] }))
//       // .pipe(gulp.dest(paths.dist));
//     }
//
//    return bundle;
// }
