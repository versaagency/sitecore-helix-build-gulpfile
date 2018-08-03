const gulp = require('gulp')

gulp.task('default', gulp.parallel('Auto-Publish', 'Develop-Assets'))
