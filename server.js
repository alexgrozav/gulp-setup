// Utilities
const _ = require('lodash');
const path = require('path');

// Application
const express = require('express');
const port = 3000;
const app = express();

// Environment
const development = process.env.NODE_ENV !== 'production';
const config = require(path.join(__dirname, 'config', 'env', (development ? 'development.js' : 'production.js')));

if(development) {
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'src'));
  app.use(express.static(path.join(__dirname, 'build')));
} else {
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'dist'));
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.get('/', function response(req, res) {
  res.render('index', _.assign({}, config, {
    title: 'Gulp Webpack Boilerplate'
  }));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
