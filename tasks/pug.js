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


// const merge = require('merge2');
// const fs = require('fs-extra');
// const glob = require('globby');
// const partialPattern = '(mixins|layouts|partials|helpers)\\\/';
//
// module.exports = (gulp, plugins, paths) => {
//   const srcPath = plugins['path'].join(paths.src, paths.views, paths.pug);
//   const assetsHelper = require(plugins['path'].join(__dirname, '..', 'helpers', 'assets.js'));
//   const pages = require(plugins['path'].join(__dirname, '..', 'config', 'pages.config.js'));
//
//   let layoutData = {
//     development: {
//       config: require(plugins['path'].join(__dirname, '..', 'config', 'env', 'development.js')),
//       assets: {}
//     },
//     production: {
//       config: require(plugins['path'].join(__dirname, '..', 'config', 'env', 'production.js')),
//       assets: {}
//     }
//   };
//
//
//   // Process assets using asset helper for both environments.
//   for (let env in layoutData) {
//     let assets = require(plugins['path'].join(__dirname, '..', 'config', 'env', 'assets.' + env + '.js'));
//
//     for (key in assets) {
//       if (assets.hasOwnProperty(key)) {
//         let normalizedAssets = assetsHelper(assets[key]);
//
//         layoutData[env].assets[key] = {
//           scripts: normalizedAssets.scripts,
//           stylesheets: normalizedAssets.stylesheets
//         }
//       }
//     }
//   }
//
//   // Set up environment file keys and regular expression matching for pug layout
//   // extensions.
//   for (let env in layoutData) {
//     if (layoutData.hasOwnProperty(env)) {
//       layoutData[env]['keys'] = Object.keys(layoutData[env]['assets']);
//       layoutData[env]['regex'] = new RegExp('extends .+(' + layoutData[env]['keys'].join('|') + ')\\.pug');
//     }
//   }
//
//   // Count the number of views we need to check in the partial function
//   var viewCount = glob.sync(plugins['path'].join(paths.src, paths.views, paths.pug)).length;
//
//   // Handle .pug mixin changes by recompiling all the other assets whenever the
//   // mixins are modified.
//   //
//   var runs = 0;
//   function partial (stream, file) {
//     let partialRegEx = new RegExp('^' + partialPattern);
//
//     if (runs > viewCount) {
//       if (partialRegEx.test(file.relative)) {
//         let caches = Object.keys(plugins['cached'].caches['pug']);
//
//         for(let i = 0; i < caches.length; i += 1) {
//           if (!partialRegEx.test(caches[i])) {
//             delete plugins['cached'].caches['pug'][caches[i]]
//           }
//         }
//       }
//     } else {
//       runs += 1;
//     }
//
//     return stream;
//   }
//
//   // Get data for current page by extracting the data from the pages dataset
//   //
//   function getPageData(env, filePath, pages, parents) {
//     for (let index in pages) {
//       let page = pages[index];
//
//       if (page.hasOwnProperty('view')) {
//         if (JSON.stringify(page.view) === JSON.stringify(filePath)) {
//           let parentRoute = parents
//             .map(function(page){
//               return page['route'];
//             })
//             .join('');
//
//           let current = JSON.parse(JSON.stringify(page));
//           current['view'].splice(0, 2);
//           current['route'] = parentRoute + current['route']
//
//           if (current.assets) {
//             if (env == 'production') {
//               current.assets = {
//                 scripts: [
//                   plugins['path'].join('bundles', current['view'].join('-') + '.bundle.js')
//                 ]
//               }
//             }
//             current.assets = assetsHelper(current.assets);
//           }
//
//           return current;
//         }
//       }
//
//       if (page.hasOwnProperty('pages')) {
//         let result = getPageData(env, filePath, page['pages'], parents.concat([ page ]));
//         if (result) return result;
//       }
//     }
//   }
//
//
//   // Process gulp stream for each file individually
//   //
//   function pugMake (env, stream, file) {
//     // Sets the currently active assetsBundle by checking whether the name of the
//     // current file starts with the name of a assetsBundle speicified in the
//     // envuration file.
//     //
//     let assetsBundle;
//     if (matches = file.contents.toString().match(layoutData[env]['regex'])) {
//       assetsBundle = layoutData[env]['assets'][matches[1]];
//     } else {
//       assetsBundle = { stylesheets: [], scripts: [] }
//     }
//
//     // If there are common assets, concatenate them to the existing
//     // assets assetsBundle
//     //
//     if (layoutData[env]['assets']['common']) {
//       assetsBundle = {
//         stylesheets: assetsBundle['stylesheets']
//           .concat(layoutData[env]['assets']['common']['stylesheets']),
//         scripts: assetsBundle['scripts']
//           .concat(layoutData[env]['assets']['common']['scripts'])
//       }
//     }
//
//     // The actual file path, split into an array of tokens
//     //
//     let filePath = ['src', 'views'].concat(
//       file.relative
//         .substr(0, file.relative.lastIndexOf('.'))
//         .split(/[\/\\]/)
//     );
//
//     // Get the data for the page being compiled
//     let current = getPageData(env, filePath, pages, []);
//
//     // If the page has no data, do not render it
//     if (!current) return stream;
//
//     // Clone the stream to use it once for production once for
//     // development environments and set the path and minification
//     // accordingly.
//     //
//     return stream
//       .pipe(plugins['plumber']())
//       .pipe(plugins['pug']({
//         pretty: (env == 'development' ? true : false),
//         locals: {
//           pages: pages,
//           page: current,
//           server: layoutData[env].config.server,
//           assets: assetsBundle
//         }
//       }))
//       .pipe(plugins['rename'](function (path) {
//         // Process view path to create a proper file name.
//         path.basename = path.dirname.replace(/[\/\\]/, '-').replace('views-', '') + '-' + path.basename;
//         path.dirname = '';
//         path.extname = '.html';
//       }))
//       .pipe(gulp.dest((env == 'development' ? paths.build : paths.dist)));
//   }
//
//
//   // Process PugJS files for both development and production environments
//   //
//   function pug (stream, file) {
//     let prodStream = stream.pipe(plugins['clone']());
//     let devStream = stream.pipe(plugins['clone']());
//
//     return merge([
//       pugMake('production', prodStream, file),
//       pugMake('development', devStream, file)
//     ]);
//   }
//
//   return () => {
//     return gulp.src(srcPath)
//       .pipe(plugins['cached']('pug'))
//       .pipe(plugins['flatmap'](partial))
//       .pipe(plugins['ignore'](new RegExp('\\\/' + partialPattern)))
//       .pipe(plugins['debug']())
//       .pipe(plugins['flatmap'](pug));
//   }
// }
