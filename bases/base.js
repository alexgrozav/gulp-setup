module.exports = ($, gulp, config, task) => () =>
  const dest = require($.path.join(__dirname, '..', 'helpers', 'task-process-dest'))($, gulp, config, task);

  gulp.src($.path.join(task.paths.src || config.paths.src, task.pattern))
    // Stream task initialization process
    //
    .pipe(task.process.init())

    // List files that are being processed
    //
    .pipe($.if(config.debug, $.debug()))

    // Run build process and write sourcemaps
    //
    .pipe(task.process.build())

    // Process files for local development use
    //
    .pipe(dest('build'))

    // Run dist process
    //
    .pipe(task.process.dist())

    // Process files for distribution
    //
    .pipe(dest('dist'))

    // Stream task ending process
    //
    .pipe(task.process.end());
