let getFilter = (task, step) => task.filter && task.filter[step] ? task.filter[step] : (() => true)


module.exports = ($, gulp, config, task) => () =>
  gulp.src(task.src || $.path.join(config.src, task.pattern))
    // Filter files that are going through the pipeline
    //
    .pipe($.ignore.exclude(task.options.exclude)))

    // Stream task initialization process
    //
    .pipe(task.process.init())

    // Cache files that have been already processed
    //
    .pipe($.if(config.cache, $.cached(task.name)))

    // Run build process and write sourcemaps
    //
    .pipe(task.process.build())

    // Run dist process
    //
    .pipe(task.process.dist())

    // Stream task ending process
    //
    .pipe(task.process.end());
