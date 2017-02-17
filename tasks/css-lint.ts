module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.css);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(plugins['csslint']())
        .pipe(plugins['csslint'].formatter());
  }
}
