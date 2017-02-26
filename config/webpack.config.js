const webpack = require('webpack');
const path = require('path');

const development = process.env.NODE_ENV !== 'production';
const config = require(path.join(__dirname, 'env', 'production.js')) ;

const HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill');


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

  devtool: 'source-map',

  module: {
    rules: [

      // Pug
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-html-loader', options: {
            data: config
          }}
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
          { loader: 'rollup-webpack-loader', options: {
            plugins: [
              require('rollup-plugin-commonjs')(),
              require('rollup-plugin-node-resolve')({ jsnext: true, main: true })
            ]
          }},
          { loader: 'ts-loader', options: { configFile: path.resolve(__dirname, 'tsconfig.json') }}
        ]
      },

      // JavaScript Linter
      {
        test: /\.js(x?)$/, enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: require(path.resolve(__dirname, 'eslint.json'))
      },

      // JavaScript
      {
        test: /\.js(x?)$/,
        use: [
          { loader: 'uglify-loader' },
          { loader: 'babel-loader', options: babelConfig }
        ]
      },

      // Stylus Linter
      {
        test: /\.styl$/, enforce: 'pre',
        exclude: /node_modules/,
        loader: 'stylint-loader'
      },

      // Stylus
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' }
        ]
      },

      // Sass Linter
      {
        test: /\.s(a|c)ss$/, enforce: 'pre',
        exclude: /node_modules/,
        loader: 'sass-loader'
      },

      // Sass
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader',
            options: {
              includePaths: path.join(__dirname, '..', 'node_modules')
            }
          }
        ]
      },

      // CSS Linter
      {
        test: /\.css$/, enforce: 'pre',
        exclude: /node_modules/,
        loader: 'csslint-loader'
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },

      // Image
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[publicPath][name].[ext]'
            }
          },
          { loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,

              gifsicle: { interlaced: false },
              optipng: { optimizationLevel: 7 },
              pngquant: { quality: '65-75', speed: 4 }
            }
          }
        ]
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.pug'),
      inject: false
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [ require('poststylus')([ 'autoprefixer', 'rucksack-css' ]) ]
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),

    development ? new webpack.HotModuleReplacementPlugin() : null
  ],

  resolve: {
    extensions: [ '.ts', '.js', '.styl', '.css' ]
  }
};
