module.exports = ($, gulp, config, task) => {
  /**
   * Compile and determine whether the SASS source has indented syntax
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


  return {
    init: $.lazypipe()
      .pipe($.ignore, /bundle\.js$/),

    build: $.lazypipe()
      .pipe($.babel, options.build),

    dist: $.lazypipe()
      .pipe($.babel, options.dist)
  }
};
