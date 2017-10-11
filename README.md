# The perfect gulp setup
This project aims to create a modular and configurable gulp setup. Get project automation up and running with minimum involvement.

```
npm install gulp-cli -g
npm install gulp gulp-load-plugins gulp-setup --save-dev
```

## Sample `gulpfile.js`
Setting up gulp using gulp-setup is simpler than ever.
```js
const packages = require('gulp-setup/package.json');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ config: packages });
const setup = require('gulp-setup')($, gulp);
```

## Default Tasks
By default, gulp-setup comes bundled with a variety of pre-made tasks.
```
gulp
gulp build
gulp clean
gulp watch
gulp lint
gulp html
gulp html-lint
gulp css
gulp css-lint
gulp sass
gulp sass-lint
gulp stylus
gulp stylus-lint
gulp javascript
gulp javascript-lint
gulp coffeescript
gulp coffeescript-lint
gulp typescript
gulp typescript-lint
gulp fonts
gulp images
gulp browser-sync
```

__gulp__

The `default` task will run a sequence of `build`, `browser-sync`, and `watch`, as you would usually do in gulp.

__gulp build__

By default, the build task will execute the `clean` task, after which it runs all the other tasks that provide a `pattern` parameter.

__gulp clean__

This task will remove the existing build and dist folders.

__gulp watch__

The `watch` task will watch for changes and rebuild any task that provides a `pattern` parameter. In addition to this, `gulp-setup` creates a `partials graph`, which will rebuild any file that depends on the one that got changed.

__gulp lint__

This task will run any task that ends with `-lint`.

__gulp html__

Copies `.html` files to the build folder, then minifies them and outputs them in dist.

__gulp css__

Autoprefixes `.css` files and outputs them to the build folder, then minifies them and outputs them in dist.

__gulp sass__

Compiles and autoprefixes `.sass` and `.scss` files and outputs them to the build folder, then minifies them and outputs them in dist.

<sub>This task makes use of the `partials graph`, meaning that any changes on a partial will trigger a rebuild on the parent files.</sub>

__gulp stylus__

Compiles and autoprefixes `.styl` files and outputs them to the build folder, then minifies them and outputs them in dist. Stylus instance also provides `rucksack-css` functionality.

<sub>This task makes use of the `partials graph`, meaning that any changes on a partial will trigger a rebuild on the parent files.</sub>

__gulp javascript__

Compiles ES6 `.js` files and outputs them to the build folder, then minifies them and outputs them in dist. The `javascript` task can use either `webpack` or `browserify` to process and bundle the files, specified using the `options.bundler` parameter (as seen in the configuration example below).

<sub>This task makes use of the `partials graph`, meaning that any changes on a partial will trigger a rebuild on the parent files.</sub>

__gulp coffeescript__

Compiles `.coffee` files and outputs them to the build folder, then minifies them and outputs them in dist. Just like in the `javascript` task, you can use either `webpack` or `browserify` to bundle the files.

<sub>This task makes use of the `partials graph`, meaning that any changes on a partial will trigger a rebuild on the parent files.</sub>

__gulp typescript__

Compiles `.ts` files and outputs them to the build folder, then minifies them and outputs them in dist. Just like in the `javascript` task, you can use either `webpack` or `browserify` to bundle the files.

<sub>This task makes use of the `partials graph`, meaning that any changes on a partial will trigger a rebuild on the parent files.</sub>

__gulp images__

Optimizes `.svg`, `.jpg`, `.png`, and `.gif` files and outputs them to the build and dist folders.

__gulp fonts__

Copies `.eot`, `.svg`, `.ttf`, `.woff`, and `.woff2` files to the build and dist folders.


## Configuration
Here's a sample configuration for gulp-setup that sets the options for the existing default `javascript` task, and creates a new gulp task called `javascript-ext` by extending the base `javascript` one. You can override any of the default task parameters when extending a task.

The `tasks` object key defines the name of the gulp task.

```js
const packages = require('gulp-setup/package.json');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ config: packages });
const setup = require('gulp-setup')($, gulp, {
  paths: {
    src: 'path/to/src',
    build: 'path/to/build',
    dist: 'path/to/dist'
  },
  cache: true,
  debug: true,
  tasks: {
    'javascript': {
      options: {
        bundler: 'webpack'
      }
    },
    'javascript-ext': {
      extends: 'javascript',
      paths: {
        src: 'path/to/custom-src'
      }
    }
  }
});
```

## Writing a task
The tasks present in gulp-setup are made out of two components: `process` and `base`. All other parameters, such as `pattern`, are made available in these components.

```js
const setup = require('gulp-setup')($, gulp, {
  tasks: {
    'mytask': {
      base: './bases/base',
      process: './tasks/mytask',
      pattern: '**/*.css',
      paths: {
        src: 'path/to/custom-src',
        build: 'path/to/custom-build',
        dist: 'path/to/custom-dist'
      }
    }
  }
});
```

### __Base__ tasks
The `base` task serves as a template for other tasks. It makes four pipeline hooks available: `init`, `build`, dist and `end` for integrating a process into it. If the `base` task is missing, then the `process` is considered as a standalone task and won't use a template.

```js
// bases/base.js

module.exports = ($, gulp, config, task) => () =>
  gulp.src($.path.join(config.task.src || config.paths.src, task.pattern))
    .pipe(task.process.init())     // Initialization hook
    .pipe($.debug())
    .pipe(task.process.build())    // Building hook
    .pipe(gulp.dest(config.task.build || config.paths.build))
    .pipe(task.process.dist())     // Distribution hook
    .pipe(gulp.dest(config.task.dist || config.paths.dist))
    .pipe(task.process.end());     // Ending hook
```

The gulp-setup package provides you with the following premade bases: `gulp-setup/bases/base`, `gulp-setup/bases/compile` and `gulp-setup/bases/lint`. You can use these bases for your custom process tasks.

### __Process__ tasks
The process task is the main processing that the task is concerned with. Process tasks normally use a __template__,  a `base` task that they integrate with by providing `init`, `build`, `dist` or `end` hooks. Alternatively, you can write the process as a __standalone__ gulp task.

__Template__
```js
// tasks/mytask.js

module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.autoprefixer),
  dist: $.lazypipe()
    .pipe($.cssmin)
});
```

__Standalone__
```js
// tasks/myclean.js

module.exports = ($, gulp, config, task) => {
  return () => gulp.src([config.paths.build, config.paths.dist])
    .pipe($.clean());
}
```


## Contributions, bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/alexgrozav/gulp-setup/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/alexgrozav/gulp-setup/issues/new).
