module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.sass);

  var partial = ( input ) => {
    if (input.basename[0] == '_') {
      var dir = input.dirname.split(plugins['path'].sep),
          basedir = dir[ dir.length - 1 ],
          parent = plugins['path'].resolve(paths.src, 'css', basedir, basedir + input.extname)

      delete plugins['cached'].caches['stylus'][parent]
    }

    return input
  }

  return () => {
    let indentedSyntax = true;

    return gulp.src(srcPath)
        .pipe(plugins['cached']('sass'))
        .pipe(plugins['rename'](partial))
        .pipe(plugins['ignore']((file) => {
          indentedSyntax = !!/\.sass$/.test(file.relative)
          return /\_.+\.s(a|c)ss$/.test(file.relative)
        }))
        .pipe(plugins['debug']())
        .pipe(plugins['sourcemaps'].init())
        .pipe(plugins['plumber']())
        .pipe(plugins['sass']({
          includePaths: plugins['path'].join(__dirname, '..', 'node_modules'),
          indentedSyntax: indentedSyntax
        }))
        .pipe(plugins['sourcemaps'].write(plugins['path'].join('..', paths.build)))
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['browser-sync'].stream())
        // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
        // .pipe(plugins['cssmin']())
        // .pipe(gulp.dest(paths.dist));
  }
}
