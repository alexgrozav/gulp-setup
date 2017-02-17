module.exports = (gulp: any, plugins: any, paths: any) => {
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
      plugins['path'].join(paths.src, paths.css), [ 'css', 'csslint' ]
    );

    // Watch JS
    gulp.watch(
      plugins['path'].join(paths.src, paths.typescript), [ 'ts', 'tslint' ]
    );
    gulp.watch(
      plugins['path'].join(paths.src, paths.javascript), [ 'js', 'jslint' ]
    );

    // Watch Bundles
    // gulp.watch(
    //   plugins['path'].join(paths.build, paths.entry), [ 'webpack' ]
    // );

    // Watch Images
    gulp.watch(
      plugins['path'].join(paths.src, paths.image), [ 'imagemin' ]
    );
  }
}
