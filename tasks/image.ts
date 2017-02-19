module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.image);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['cached']('image'))
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['bytediff'].start())
      .pipe(plugins['gm']((gmfile: any) => {
        return gmfile.strip()
                     .quality(75)
                     .interlace('Line')
      }))
      .pipe(plugins['bytediff'].stop())
      .pipe(gulp.dest(paths.build))
      // .pipe(gulp.dest(paths.dist));
  }
}
