module.exports = ($, gulp, config, task) => {
  const partial = require($.path.join(__dirname, '..', 'helpers', 'partial'))($, task, {
    ext: ['js']
  });


  /**
   * Babel options
   */
  let options = {
    build: {
      presets: [
        ['env', {
          'targets': {
            'browsers': 'ie >= 8'
          }
        }]
      ]
    },
    dist: {
      presets: ['babili']
    }
  };


  /**
   * Compile and bundle individual JS files
   */
  let compile = require($.path.join(__dirname, '..', 'helpers', task.options.bundler))($, task);


  return {
    // init: $.lazypipe()
    //   .pipe($.tap, partial.process),

    build: $.lazypipe()
      // .pipe($.ignore, partial.check)
      .pipe(compile)
      .pipe($.babel, options.build),

    dist: $.lazypipe()
      .pipe($.babel, options.dist)
  }
};
