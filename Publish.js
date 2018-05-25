const gulp = require('gulp')
const runSequence = require('run-sequence')
const { config } = require('./config')

gulp.task('Publish', callback => runSequence(
  [
    'Run-Webpack',
    'Publish-Configs',
    'Publish-Views',
    'Publish-Serialisation',
    'Publish-Sitecore-Modules',
    'Publish-Binaries'
  ]
    .concat(config.hasXConnectModels ? ['Publish-XConnect-Models'] : []),

  callback
))
