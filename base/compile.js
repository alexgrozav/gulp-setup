module.exports = ($, gulp, config, task) => () =>
  gulp.src($.path.join(config.src, task.pattern))
    // Stream task initialization process
    //
    .pipe(task.process.init())


    // Cache files that have been already processed
    //
    .pipe($.if(config.cache, $.cached(task.name)))

    // List files that are being processed
    //
    .pipe($.if(config.debug, $.debug()))

    // Use plumber to catch unhandled exceptions
    //
    .pipe($.plumber())

    // Run build process and write sourcemaps
    //
    .pipe($.sourcemaps.init())
    .pipe(task.process.build())
    .pipe($.sourcemaps.write())

    // Process files for local development use
    //
    .pipe($.if(!!config.build, $.lazypipe()
      .pipe(gulp.dest, config.build)
      .call(this)
    ))

    // Stream and synchronize files to the browser
    //
    .pipe($.browserSync.stream())

    // Run dist process
    //
    .pipe(task.process.dist())

    // Process files for distribution
    //
    .pipe($.if(!!config.dist, $.lazypipe()
      .pipe(gulp.dest, config.dist)
      .call(this)
    ))

    // Stream task ending process
    //
    .pipe($.if(!!task.process.end, $.lazypipe()
      .pipe(task.process.end)
      .call(this)
    ));
