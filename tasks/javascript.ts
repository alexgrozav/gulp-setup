module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.javascript);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['cached']('javascript'))
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['rollup']({
        plugins: [
          plugins['rollup.babel'](),
          plugins['rollup.nodeResolve']({
            jsnext: true,
            main: true
          }),
          plugins['rollup.commonjs']()
        ]
      }, {
        format: 'cjs',
      }))
      .pipe(gulp.dest(paths.build))
      .pipe(plugins['browser-sync'].stream())
      // .pipe(plugins['babel']({ presets: ['babili'] }))
      // .pipe(gulp.dest(paths.dist));
  }
}
