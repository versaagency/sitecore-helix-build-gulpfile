const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('Publish', callback => runSequence(
  [
    'Run-Webpack',
    'Publish-Configs',
    'Publish-Views',
    'Publish-Serialisation',
    'Publish-Sitecore-Modules',
    'Publish-Binaries',
    'Publish-XConnectModels'
  ],

  callback
))
