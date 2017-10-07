module.exports = ($, gulp, config, task) => {
  const poststylus = require('poststylus');
  const partial = require($.path.join(__dirname, '..', 'helpers', 'partial'))($, task, {
    language: 'pug'
  });


  /**
   * Stylus compilation options
   */
  let options = {
    pretty: true,
    locals: task.options.locals
  };


  return {
    init: $.lazypipe()
      .pipe($.tap, partial.process),

    build: $.lazypipe()
      .pipe($.ignore, partial.check)
      .pipe($.pug, options),

    dist: $.lazypipe()
      .pipe($.htmlmin)
  }
};
