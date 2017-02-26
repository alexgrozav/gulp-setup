module.exports = (gulp, plugins, paths) => {
  return () => {
    // Watch HTML
    gulp.watch(
      plugins['path'].join(paths.src, paths.pug), [ 'pug', 'puglint' ]
    );

    // Watch CSS
    gulp.watch(
      plugins['path'].join(paths.src, paths.stylus), [ 'styl', 'styllint' ]
    );
    gulp.watch(
      plugins['path'].join(paths.src, paths.sass), [ 'sass', 'sasslint' ]
    );
    gulp.watch(
      plugins['path'].join(paths.src, paths.css), [ 'css', 'csslint' ]
    );

    // Watch JS
    gulp.watch(
      plugins['path'].join(paths.src, paths.typescript), () => {
        return plugins['run-sequence']([ 'ts', 'tslint' ], 'browserify')
      }
    );
    gulp.watch(
      plugins['path'].join(paths.src, paths.javascript), () => {
        return plugins['run-sequence']([ 'js', 'jslint' ], 'browserify')
      }
    );

    // Watch Images
    gulp.watch(
      plugins['path'].join(paths.src, paths.image), [ 'imagemin' ]
    );
  }
}
