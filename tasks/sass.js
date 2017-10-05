module.exports = ($, gulp, config, task) => {
  const partial = require($.path.join(__dirname, '..', 'helpers', 'partial'))($, task, {
    ext: ['sass', 'scss']
  });


  /**
   * Configuration for replacing Webpack SASS node_modules import syntax
   */
  let normalizeImport = {
    pattern: /\@import ([\'\"])\~/g,
    replace: (replacement, capture)  => '@import ' + capture,
    options: {
      logs: { enabled: false }
    }
  };


  /**
   * Compile and determine whether the SASS source has indented syntax
   */
  let compile = (stream, file) => stream.pipe($.sass({
    includePaths: $.path.join(process.cwd(), 'node_modules'),
    indentedSyntax: /\.sass$/.test(file.relative)
  }));


  return {
    init: $.lazypipe()
      .pipe($.tap, partial.process),

    build: $.lazypipe()
      .pipe($.ignore, partial.check)
      .pipe($.stringReplace, normalizeImport.pattern, normalizeImport.replace, normalizeImport.options)
      .pipe($.flatmap, compile)
      .pipe($.autoprefixer),

    dist: $.lazypipe()
      .pipe($.cssmin)
  }
};
