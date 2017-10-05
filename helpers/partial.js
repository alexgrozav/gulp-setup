const fs = require('fs-extra');
const path = require('path');


module.exports = ($, task, options) => {
  let helper = {
    graph: {}
  };


  /**
   * Check whether the file is a partial or not
   *
   * @param file Input file received in pipeline
   */
  helper.check = (file) => (new RegExp(/\_.+\./.source + '(' + options.ext.join('|') + ')' + '$')).test(file.relative);


  /**
   * Handle .styl partial changes by recompiling the parent asset whenever
   * the children are modified.
   *
   * @param file Input file received from gulp-tap
   */
  helper.add = (file) => {
    let filepath = file.path;
    let dirname = path.dirname(file.path);
    let contents = fs.readFileSync(filepath, 'utf8');
    let pattern = new RegExp(/@(import|require)\s+[\'\"]([\w\-\\\/]+)/.source + '(.(' + options.ext.join('|') + '))?' + /[\'\"]/.source, 'g');
    let match;


    while(match = pattern.exec(contents)) {
      let matchRelative = match[2];
      let matchDirname = path.dirname(match[2]);
      let matchBasename = matchRelative.split('/').reverse()[0];

      options.ext.forEach((ext) => {
        ['', '_'].forEach((prefix) => {
          let matchPath = path.resolve(dirname, matchDirname, prefix + matchBasename + '.' + ext);
          helper.graph[matchPath] = helper.graph[matchPath] || {};
          helper.graph[matchPath].links = helper.graph[matchPath].links || [];
          helper.graph[matchPath].links.push(filepath)
        });
      });
    }

    helper.graph[file.path] = helper.graph[file.path] || {};
    helper.graph[file.path].linked = true;

    return file;
  }


  /**
   * If the file has any linked files, remove those files from the cache so they
   * can get recompiled.
   */
  helper.uncache = (file) => {
    if (helper.graph[file.path].links) {
      helper.graph[file.path].links.forEach((link) => {
        delete $.cached.caches[task.name][link];
      });
    }

    return file;
  }


  /**
   * Add file to processing graph or, if it exists, remove the links from the
   * gulp file cache
   *
   * @param file Input file received from gulp-tap
   */
  helper.process = (file) => {
    if (helper.graph[file.path] && helper.graph[file.path].linked) {
      return helper.uncache(file);
    } else {
      return helper.add(file);
    }
  }


  return helper;
}
