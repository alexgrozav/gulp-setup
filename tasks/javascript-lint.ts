module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.javascript);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(plugins['eslint']({
          parserOptions: {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
          },
          rules: {
            'no-cond-assign': 0, // eslint:recommended
            'no-irregular-whitespace': 2, // eslint:recommended
            'no-unexpected-multiline': 2, // eslint:recommended
            // 'valid-jsdoc': [2, {
            //   requireParamDescription: false,
            //   requireReturnDescription: false,
            //   requireReturn: false,
            //   prefer: {returns: 'return'},
            // }],
            'guard-for-in': 2,
            'no-caller': 2,
            'no-extend-native': 2,
            'no-extra-bind': 2,
            // 'no-invalid-this': 2,
            'no-multi-spaces': 2,
            'no-multi-str': 2,
            'no-new-wrappers': 2,
            'no-throw-literal': 2, // eslint:recommended
            'no-with': 2,
            'no-unused-vars': [2, {args: 'none'}], // eslint:recommended
            'array-bracket-spacing': [2, 'never'],
            'brace-style': 2,
            'camelcase': [2, {properties: 'never'}],
            // 'comma-dangle': [2, 'always-multiline'],
            'comma-spacing': 2,
            'comma-style': 2,
            'computed-property-spacing': 2,
            'eol-last': 2,
            'func-call-spacing': 2,
            'key-spacing': 2,
            'keyword-spacing': 0,
            'linebreak-style': 2,
            // 'max-len': [2, {
            //   code: 80,
            //   tabWidth: 2,
            //   ignoreUrls: true,
            //   ignorePattern: '^goog\.(module|require)',
            // }],
            'new-cap': 2,
            'no-array-constructor': 2,
            'no-mixed-spaces-and-tabs': 2, // eslint:recommended
            'no-multiple-empty-lines': [2, {max: 2}],
            'no-new-object': 2,
            // 'no-trailing-spaces': 2,
            'object-curly-spacing': 2,
            'one-var': [2, {
              var: 'never',
              let: 'never',
              const: 'never',
            }],
            'padded-blocks': [2, 'never'],
            'quote-props': [2, 'consistent'],
            'quotes': [2, 'single', {allowTemplateLiterals: true}],
            // 'require-jsdoc': [2, {
            //   require: {
            //     FunctionDeclaration: true,
            //     MethodDefinition: true,
            //     ClassDeclaration: true,
            //   },
            // }],
            'semi-spacing': 2,
            'semi': 2,
            'space-before-blocks': 2,
            // 'space-before-function-paren': [2, 'never'],
            'spaced-comment': [2, 'always'],
            'arrow-parens': [2, 'always'], // TODO(philipwalton): technically arrow
            'constructor-super': 2, // eslint:recommended
            'generator-star-spacing': [2, 'after'],
            'no-new-symbol': 2, // eslint:recommended
            'no-this-before-super': 2,  // eslint:recommended
            'no-var': 2,
            'prefer-rest-params': 2,
            'prefer-spread': 2,
            'rest-spread-spacing': 2,
            'yield-star-spacing': [2, 'after']
          }
        }))
        .pipe(plugins['eslint'].format());
  }
}
