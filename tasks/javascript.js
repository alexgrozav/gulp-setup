module.exports = ($, gulp, config, task) => {
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
  let compile = require($.path.join(__dirname, '..', 'helpers', 'browserify'));


  return {
    init: $.lazypipe()
      .pipe($.ignore, /bundle\.js$/),

    build: $.lazypipe()
      .pipe($.babel, options.build)
      .pipe($.through.obj, compile)
      .pipe($.buffer),

    dist: $.lazypipe()
      .pipe($.babel, options.dist)
  }
};
