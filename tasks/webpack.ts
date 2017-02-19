module.exports = (gulp: any, plugins: any, paths: any) => {
  var webpack = require('webpack'),
      config = require(plugins['path'].resolve("config", "webpack.config.js"));

  return () => {
     return webpack(config, (err: any, stats: any) => {
         if(err) throw new plugins['util'].PluginError("webpack", err);
         plugins['util'].log("[webpack]", stats.toString({}));
     });
  }
}
