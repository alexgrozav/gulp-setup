module.exports = ($, gulp, config, task) => () => {
  const filter = require($.path.join(__dirname, '..', 'helpers', 'task-process-filter'));
  const dest = require($.path.join(__dirname, '..', 'helpers', 'task-process-dest'))($, gulp, config, task);

  gulp.src($.path.join(task.paths.src || config.paths.src, task.pattern))
    // Filter files that are going through the build pipeline
    //
    .pipe($.filter(filter(task, 'init')))

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

    // Filter files that are going through the build pipeline
    //
    .pipe($.filter(filter(task, 'build')))

    // Run build process and write sourcemaps
    //
    .pipe($.sourcemaps.init())
    .pipe(task.process.build())
    .pipe($.sourcemaps.write())

    // Process files for local development use
    //
    .pipe(dest('build'))

    // Stream and synchronize files to the browser
    //
    .pipe($.browserSync.stream())

    // Filter files that are going through the build pipeline
    //
    .pipe($.filter(filter(task, 'dist')))

    // Run dist process
    //
    .pipe(task.process.dist())

    // Process files for distribution
    //
    .pipe(dest('dist'))

    // Filter files that are going through the end pipeline
    //
    .pipe($.filter(filter(task, 'end')))

    // Stream task ending process
    //
    .pipe(task.process.end());
}
