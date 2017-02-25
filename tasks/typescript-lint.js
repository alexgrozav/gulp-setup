module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.typescript);

  return () => {
    return gulp.src(srcPath)
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(plugins['tslint']({
          configuration: plugins['path'].join("config", "tslint.json"),
          formatter: "verbose"
        }))
        .pipe(plugins['tslint'].report());
  }
}
