# `rollup-webpack-loader`

> *Bout to wrap it up, Pakistan*
> &ndash; [Riff Raff][1]

## Install

```bash
npm install rollup-webpack-loader --save-dev
```

## Usage

[Documentation using loaders.][2]

In your `webpack.config.js`, add the `rollup-webpack-loader`:

```javascript
loaders: [
  {
    test: /\.js$/,
    loader: 'rollup-webpack-loader',
  },
],
```

## Options

Although you may use the loader query string, it is recommended to use the
`query` object in the loader or `rollupWebpackLoader` object to configure the
`rollup-webpack-loader` due to the need for passing functions in `rollup.plugins`.

*   `rollup`: Object containing options for `rollup` function
    ([documentation][3]).

*   `generate`: Object containing options for `generate` function
    ([documentation][4]).

### Examples

#### Normal Configuration

Probably the most typical usage of Rollup:

```javascript
import { resolve as resolvePath } from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: [
    resolvePath(__dirname, '../src/index.js')
  ],
  output: {
    path: resolvePath(__dirname, '../dist'),
    filename: 'index.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'rollup-webpack-loader',
        query: {
          rollup: {
            plugins: [
              nodeResolve({ jsnext: true, module: true }),
              commonjs(),
            ],
          },
        }
      },
    ],
  },
}
```

#### Babel Configuration

Although it is possible to use Webpack's [`babel-loader`][5] and then use
`rollup-webpack-loader` in an array of `loaders`, this is not recommended. The
JavaScript that gets generated will not be properly tree-shaken and more than
likely you will run into errors. To avoid that use Rollup's plugin
[`rollup-plugin-babel`][6] with [`babel-plugin-external-helpers`][7] as such:

```javascript
import { resolve as resolvePath } from 'path';
import { fileSync as tmpFileSync } from 'tmp';
import { buildExternalHelpers } from 'babel-core';
import { writeFileSync } from 'fs';
import babel from 'rollup-plugin-babel';

// Temporary `babelHelpers` dependency
const { name: tmpFileName } = tmpFileSync();
writeFileSync(
  tmpFileName,
  `
    ${buildExternalHelpers(null, 'var')}
    module.exports = babelHelpers;
  `,
);

export default {
  entry: [
    'regenerator-runtime/runtime',
    resolvePath(__dirname, '../src/index.js')
  ],
  output: {
    path: resolvePath(__dirname, '../dist'),
    filename: 'index.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'rollup-webpack-loader',
          'eslint-loader'
        ],
      },
    ],
  },

  eslint: {
    configFile: resolve(__dirname, '../.eslintrc'),
  },

  rollupWebpackLoader: {
    rollup: {
      external: id => {
        if (id.match(/\.js$/) === null) return true;
        return false;
      },

      paths: id => {
        if (id.match(/babelHelpers/g) !== null) return tmpFileName;
        return id;
      },

      plugins: [
        babel({
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
          ],
          plugins: ['external-helpers'],
          babelrc: false,
        })
      ],
    },
  },
}
```

## `webpack@>=2.0.0`

Not tested yet.

[1]: https://www.youtube.com/watch?v=H-emaeu2B0U
[2]: http://webpack.github.io/docs/using-loaders.html
[3]: https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-
[4]: https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-
[5]: https://github.com/babel/babel-loader
[6]: https://github.com/rollup/rollup-plugin-babel
[7]: https://babeljs.io/docs/plugins/external-helpers/
