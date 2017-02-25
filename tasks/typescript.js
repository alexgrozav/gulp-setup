module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.typescript),
      tsProject = plugins['typescript'].createProject("tsconfig.json");
  tsProject.config.compilerOptions.module = 'system';

  return () => {
    return gulp.src(srcPath)
        .pipe(plugins['cached']('typescript') )
        .pipe(plugins['debug']())
        .pipe(plugins['sourcemaps'].init())
        .pipe(plugins['plumber']())
        .pipe(tsProject())
        .pipe(plugins['print']())
        .pipe(plugins['sourcemaps'].write(plugins['path'].join('..', paths.build)))
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['browser-sync'].stream())
        // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
        // .pipe(plugins['babel']({ presets: ['babili'] }))
        // .pipe(gulp.dest(paths.dist));
  }
}
