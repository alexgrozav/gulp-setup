module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.build, "**/*.js"),
      babel = require('rollup-plugin-babel'),
      tsProject = plugins['typescript'].createProject("tsconfig.json");

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['debug']())
        .pipe(plugins['sourcemaps'].init())
        .pipe(plugins['plumber']())
        .pipe(plugins['betterRollup']({
          plugins: [ babel() ]
        }, {
          // also rollups `sourceMap` option is replaced by gulp-sourcemaps plugin
          format: 'cjs',
        }))
        .pipe(plugins['sourcemaps'].write(plugins['path'].join('..', paths.build)))
        .pipe(plugins['rename']('bundle.js'))
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
        // .pipe(plugins['babel']({ presets: ['babili'] }))
        .pipe(gulp.dest(paths.dist));
  }
}
