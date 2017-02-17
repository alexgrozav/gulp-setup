module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.stylus);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']()) 
        .pipe(plugins['stylint']())
        .pipe(plugins['stylint'].reporter());
  }
}
