const gulp = require('gulp')

gulp.task('Build-All', gulp.series(
  'NuGet-Restore',
  'Build-Solution',
  gulp.parallel(
    'Run-Webpack',
    'Publish'
  )))