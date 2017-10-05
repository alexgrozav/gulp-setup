module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.autoprefixer),
    
  dist: $.lazypipe()
    .pipe($.cssmin)
});
