// Webpack
//
// Provides compilation and linting for Pug, TypeScript, JS, Stylus, Sass, CSS
// files, image minification and several file optimizations
//

// Dependencies
//
const path = require('path');
const webpack = require('webpack');


// Webpack Configuration
//
module.exports = {
  // devtool: 'source-map',

  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },

      // Pug
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-html-loader',
            options: {
              data: {}
            }
          }
        ]
      },

      // TypeScript
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json')
            }
          }
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
      },

      // Sass
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader',
            options: {
              includePaths: path.join(process.cwd(), 'node_modules')
            }
          }
        ]
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },

      // JSON
      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' }
        ]
      },

      // Image
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
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
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [ require('poststylus')([ 'autoprefixer', 'rucksack-css' ]) ]
        }
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],

  resolve: {
    extensions: [ '.ts', '.js', '.styl', '.sass', '.scss', '.css' ]
  }
};
