module.exports = (gulp, plugins, paths) => {
  var webpack = require('webpack'),
      config = require(plugins['path'].resolve("config", "webpack.config.js"));

  return () => {
     return webpack(config, (err, stats) => {
         if(err) throw new plugins['util'].PluginError("webpack", err);
         plugins['util'].log("[webpack]", stats.toString({}));
     });
  }
}
