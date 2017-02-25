module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.stylus),
      poststylus = require('poststylus');

  var partial = ( input ) => {
    if (input.basename[0] == '_') {
      var dir = input.dirname.split(plugins['path'].sep),
          basedir = dir[ dir.length - 1 ],
          parent = plugins['path'].resolve(paths.src, 'css', basedir, basedir + input.extname)

      delete plugins['cached'].caches['stylus'][parent]
    }

    return input
  }

  return () => {
    return gulp.src(srcPath)
        .pipe(plugins['cached']('stylus'))
        .pipe(plugins['rename'](partial))
        .pipe(plugins['ignore']((file) => {
          return /\_.+\.styl$/.test(file.relative)
        }))
        .pipe(plugins['debug']())
        .pipe(plugins['sourcemaps'].init())
        .pipe(plugins['plumber']())
        .pipe(plugins['stylus']({
          'resolve url': true,
          'url': 'embedurl',
          'use': [
            poststylus([
              'autoprefixer',
              'rucksack-css'
            ])
          ]
        }))
        .pipe(plugins['sourcemaps'].write(plugins['path'].join('..', paths.build)))
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['browser-sync'].stream())
        // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
        // .pipe(plugins['cssmin']())
        // .pipe(gulp.dest(paths.dist));
  }
}
