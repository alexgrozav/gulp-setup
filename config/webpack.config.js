const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

var babelConfig = {
  presets: [
    [ 'es2015', { loose: true, modules: false } ]
  ]
};

module.exports = {
  entry: {
    polyfill: path.resolve(__dirname, '..', 'src', 'polyfill.ts'),
    main: path.resolve(__dirname, '..', 'src', 'main.ts')
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [

      // Pug
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-loader' }
        ]
      },

      // TypeScript Linter
      {
        test: /\.ts(x?)$/, enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: { configFile: path.resolve(__dirname, 'tslint.json') }
      },

      // TypeScript
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'uglify-loader' },
          { loader: 'babel-loader', options: babelConfig },
          { loader: 'ts-loader', options: { configFile: path.resolve(__dirname, 'tsconfig.json') }}
        ]
      },

      // JavaScript
      {
        test: /\.js(x?)$/,
        use: [
          { loader: 'uglify-loader' },
          { loader: 'babel-loader', options: babelConfig }
        ]
      },

      // Stylus
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' }
        ]
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.pug')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [ require('poststylus')([ 'autoprefixer', 'rucksack-css' ]) ]
        }
      }
    })
  ],

  resolve: {
    extensions: [ '.ts', '.js' ]
  }
};
