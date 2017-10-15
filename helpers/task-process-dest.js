module.exports = ($, gulp, config, task) => (step) => {
  let destination = task.paths[step] || config.paths[step] || ''
  let pipe = $.lazypipe();

  if(destination.constructor === Array) {
    destination.forEach((d) => {
      pipe = pipe.pipe(gulp.dest, d);
    });
  } else {
    pipe = pipe.pipe(gulp.dest, destination);
  }

  return $.if(!!(task.paths[step] || config.paths[step]) && task.paths[step] !== false, pipe());
}
