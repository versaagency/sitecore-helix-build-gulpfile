const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('Build-All', callback => runSequence(
  'NuGet-Restore',
  'Build-Solution',
  [
    'Run-Webpack',
    'Publish-Configs',
    'Publish-Views',
    'Publish-Serialisation',
    'Publish-Binaries',
    'Publish-Scripts'
  ],

  callback
))
