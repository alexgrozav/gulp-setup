# The perfect gulp setup
This project aims to create a modular and configurable gulp setup. Get project automation up and running with minimum involvement.

```
npm install gulp-cli -g
npm install gulp gulp-load-plugins gulp-setup --save-dev
```

## Sample `gulpfile.js`
Setting up gulp using gulp-setup is simpler than ever.
```js
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const setup = require('gulp-setup')($, gulp);
```

### Default Tasks
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


## Configuration
Here's a sample configuration for gulp-setup that defines two custom tasks called `mytask` and `myclean` and overrides the options for the existing default `javascript` task.

The `tasks` object key defines the name of the gulp task.

```js
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const setup = require('gulp-setup')($, gulp, {
  src: 'path/to/src',
  build: 'path/to/build',
  dist: 'path/to/dist',
  cache: true,
  debug: true,
  tasks: {
    mytask: {
      process: './tasks/mytask',
      base: './bases/base',
      pattern: '**/*.css'
    },
    myclean: {
      process: './tasks/myclean'
    },
    javascript: {
      options: {
        bundler: 'webpack'
      }
    }
  }
});
```

## Writing a task
The tasks present in gulp-setup are made out of two components: `process` and `base`. All other parameters, such as `pattern`, are made available in these components.

### __Base__ tasks
The `base` task serves as a template for other tasks. It makes four pipeline hooks available: `init`, `build`, `dist` and `end` for integrating a process into it. If the `base` task is missing, then the `process` is considered as a standalone task and won't use a template.

```js
// bases/base.js

module.exports = ($, gulp, config, task) => () =>
  gulp.src($.path.join(config.src, task.pattern))
    .pipe(task.process.init())     // Initialization hook
    .pipe($.debug())
    .pipe(task.process.build())    // Building hook
    .pipe(gulp.dest(config.build))
    .pipe(task.process.dist())     // Distribution hook
    .pipe(gulp.dest(config.dist))
    .pipe(task.process.end());     // Ending hook
```

The gulp-setup package provides you with the following premade bases: `gulp-setup/bases/base`, `gulp-setup/bases/compile` and `gulp-setup/bases/lint`. You can use these bases for your custom process tasks.

### __Process__ tasks
The process task is the main processing that the task is concerned with. It can either be a standalone gulp task, or if combined with a `base` task, it will provide the base hooks for the `base` template.

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
  return () => gulp.src([config.build, config.dist])
    .pipe($.clean());
}
```


## Contributions, bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/alexgrozav/gulp-setup/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/alexgrozav/gulp-setup/issues/new).
