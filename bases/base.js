let getFilter = (task, step) => task.filter && task.filter[step] ? task.filter[step] : (() => true)


module.exports = ($, gulp, config, task) => () =>
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
    .pipe($.if(!!(task.paths.build || config.paths.build) && task.paths.build !== false, $.lazypipe().pipe(gulp.dest, task.paths.build || config.paths.build || '')()))

    // Run dist process
    //
    .pipe(task.process.dist())

    // Process files for distribution
    //
    .pipe($.if(!!(task.paths.dist || config.paths.dist) && task.paths.dist !== false, $.lazypipe().pipe(gulp.dest, task.paths.dist || config.paths.dist || '')()))

    // Stream task ending process
    //
    .pipe(task.process.end());
