module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.stylus);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(plugins['stylint']({
          config: plugins['path'].join(__dirname, '..', 'config', 'stylint.json')
        }))
        .pipe(plugins['stylint'].reporter());
  }
}
