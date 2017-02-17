module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.stylus),
      nib = require('nib');

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['cached']('stylus'))
        .pipe(plugins.ignore((file: any) => { /\_.+\.styl$/.test(file.relative) }))
        .pipe(plugins['debug']())
        .pipe(plugins['sourcemaps'].init())
        .pipe(plugins['plumber']())
        .pipe(plugins['stylus']({
          'resolve url': true,
          'url': 'embedurl',
          'use': nib(),
          'import': 'nib'
          // set: ['resolve url']
          // define: { url: plugins.stylus.stylus.resolver() }
        }))
        .pipe(plugins['autoprefixer']())
        .pipe(plugins['sourcemaps'].write(plugins['path'].join('..', paths.build)))
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
        .pipe(plugins['cssmin']())
        .pipe(gulp.dest(paths.dist));
  }
}
