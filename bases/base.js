let getFilter = (task, step) => task.filter && task.filter[step] ? task.filter[step] : (() => true)


module.exports = ($, gulp, config, task) => () =>
  gulp.src(task.src || $.path.join(config.src, task.pattern))
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
    .pipe($.if(!!(task.build || config.build), $.lazypipe().pipe(gulp.dest, task.build || config.build)()))

    // Run dist process
    //
    .pipe(task.process.dist())

    // Process files for distribution
    //
    .pipe($.if(!!(task.dist || config.dist), $.lazypipe().pipe(gulp.dest, task.dist || config.dist)()))

    // Stream task ending process
    //
    .pipe(task.process.end());
