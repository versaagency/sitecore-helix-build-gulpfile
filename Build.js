const gulp = require('gulp')

gulp.task('Build', gulp.series('NuGet-Restore', 'Build-Solution', 'Publish'))
