module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.build, paths.javascript);
      // tsProject = plugins['typescript'].createProject("tsconfig.json");

  return () => {
    gulp.src(srcPath)
      .pipe(plugins['cached']('rollup'))
      .pipe(plugins['debug']())
      // .pipe(plugins['sourcemaps'].init())
      .pipe(plugins['plumber']())
      .pipe(plugins['rollup']({
        plugins: [
          plugins['rollup.nodeResolve']({
            jsnext: true,
            main: true
          }),
          plugins['rollup.babel'](),
          plugins['rollup.commonjs']()
        ]
      }, {
        format: 'umd',
      }))
      // .pipe(plugins['sourcemaps'].write(plugins['path'].join('..', paths.build)))
      .pipe(gulp.dest(paths.build))
      .pipe(plugins['browser-sync'].stream())
      // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
      // .pipe(plugins['babel']({ presets: ['babili'] }))
      // .pipe(gulp.dest(paths.dist));
  }
}
