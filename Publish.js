const gulp = require('gulp')

gulp.task('Publish', gulp.series(
  'Run-Webpack',
  'Publish-Configs',
  'Publish-Views',
  'Publish-Serialisation',
  'Publish-Sitecore-Modules',
  'Publish-Binaries'
))
