module.exports = {
  build: {
    presets: [
      ['env', {
        targets: {
          browsers: 'ie >= 8'
        }
      }]
    ]
  },
  dist: {
    presets: ['babili']
  }
}
