module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.javascript);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['cached']('javascript'))
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['babel']({ presets: ['babili'] }))
        .pipe(gulp.dest(paths.dist));
  }
}
