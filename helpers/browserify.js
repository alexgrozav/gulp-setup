const browserify = require('browserify');


module.exports = (file, enc, next) => {
  browserify(file.path).bundle((err, res) => {
    file.contents = res;
    next(err, file);
  });
}
