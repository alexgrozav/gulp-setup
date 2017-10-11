const fs = require('fs-extra');
const path = require('path');


const languages = {
  pug: {
    ext: ['pug', 'jade'],
    partial: /\_[^\\\/]+\.(pug|jade)$/,
    include: /(include)\s+[\'\"]?([^\'\"\s]+)[\'\"]?/g
  },
  sass: {
    ext: ['scss', 'sass'],
    partial: /\_[^\\\/]+\.(scss|sass)$/,
    include: /\@(import)\s+[\'\"]([^\'\"]+)[\'\"]/g
  },
  stylus: {
    ext: ['styl'],
    partial: /\_[^\\\/]+\.styl$/,
    include: /\@(import|require)\s+[\'\"]([^\'\"]+)[\'\"]/g
  }
};


module.exports = ($, task, options) => {
  let helper = {
    graph: {}
  };


  /**
   * Check whether the file is a partial or not
   *
   * @param file Input file received in pipeline
   */
  helper.check = (file) => (languages[options.language].partial).test(file.relative);


  /**
   * Add a new link to the files link graph
   */
  helper.link = (filepath, link) => {
    if(!fs.pathExistsSync(filepath)) return

    helper.graph[filepath] = helper.graph[filepath] || {};
    helper.graph[filepath].links = helper.graph[filepath].links || [];
    helper.graph[filepath].links.push(link);
  }


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
    let pattern = languages[options.language].include;
    let match;


    while(match = pattern.exec(contents)) {
      let matchRelative = match[2];
      let matchDirname = path.dirname(match[2]);
      let matchBasename = matchRelative.split('/').reverse()[0];

      // Link basename.ext, _basename.ext and basename/index.ext to the file
      // being currently processed
      //
      languages[options.language].ext.forEach((ext) => {
        if (/\.[^\.]+$/.test(matchRelative)) {
          helper.link(path.resolve(dirname, matchDirname, matchBasename), filepath);
        } else {
          helper.link(path.resolve(dirname, matchDirname, matchBasename, 'index.' + ext), filepath);
        }
        helper.link(path.resolve(dirname, matchDirname, matchBasename + '.' + ext), filepath);
        helper.link(path.resolve(dirname, matchDirname, '_' + matchBasename + '.' + ext), filepath);
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
