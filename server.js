const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require(path.join(__dirname, 'config', 'webpack.config.js'));

const development = process.env.NODE_ENV !== 'production';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src'));

if (development) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    index: 'index.pug',
    publicPath: '/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(req, res) {
    res.render('index', { title: 'Main' });
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', function response(req, res) {
    res.render('index', { title: 'Main' });
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
