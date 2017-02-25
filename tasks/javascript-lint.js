module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.javascript),
      esLintConfig = require(plugins['path'].join(__dirname, '..', 'config', 'eslint.json'));

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['eslint'](esLintConfig))
      .pipe(plugins['eslint'].format());
  }
}
