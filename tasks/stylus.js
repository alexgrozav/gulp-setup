module.exports = ($, gulp, config, task) => {
  const poststylus = require('poststylus');
  const partial = require($.path.join(__dirname, '..', 'helpers', 'partial'))($, task, {
    language: 'stylus'
  });


  /**
   * Configuration for replacing Webpack Stylus node_modules import syntax
   */
  let normalizeImport = {
    pattern: /\@import ([\'\"])\~/g,
    replace: (replacement, capture)  => '@import ' + capture,
    options: {
      logs: { enabled: false }
    }
  };


  /**
   * Stylus compilation options
   */
  let options = {
    'resolve url': true,
    'include css': true,
    'include': 'node_modules',
    'modulesDirectories': ['node_modules'],
    'url': 'embedurl',
    'use': [
      poststylus([
        'autoprefixer',
        'rucksack-css'
      ])
    ]
  };


  return {
    init: $.lazypipe()
      .pipe($.tap, partial.process),

    build: $.lazypipe()
      .pipe($.ignore, partial.check)
      .pipe($.ignore, /index\.styl$/)
      .pipe($.stringReplace, normalizeImport.pattern, normalizeImport.replace, normalizeImport.options)
      .pipe($.stylus, options),

    dist: $.lazypipe()
      .pipe($.cssmin)
  }
};
