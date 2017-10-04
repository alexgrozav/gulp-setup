module.exports = (gulp, plugins, config, task) => () => {
  return gulp.src(plugins['path'].join(config.src, task.pattern))
    // Cache files that have been already processed
    //
    .pipe(plugins['if'](config.cache, plugins['cached'](task.name)))

    // List files that are being processed
    //
    .pipe(plugins['if'](config.debug, plugins['debug']()))

    // Use plumber to catch unhandled exceptions
    //
    .pipe(plugins['plumber']())

    // Process files for local development use
    //
    .pipe(plugins['if'](config.build, () => plugins['lazypipe']()
      .pipe(gulp.dest(config.build))
      .pipe(plugins['browser-sync'].stream())
    ))

    // Process files for distribution
    //
    .pipe(plugins['if'](config.build, () => plugins['lazypipe']()
      .pipe(gulp.dest(config.dist))
    ))
}
