module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.javascript);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['eslint']({
        parserOptions: {
          "ecmaVersion": 6,
          "sourceType": "module",
          "ecmaFeatures": {
              "jsx": true
          }
        },
        configFile: plugins['path'].join('config', 'eslint.json')
      }))
      .pipe(plugins['eslint'].format());
  }
}
