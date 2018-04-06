const gulp = require('gulp')
const nugetRestore = require('gulp-nuget-restore')
const { config } = require('./config')

gulp.task('NuGet-Restore', () => {
  const solution = `./${config.solutionFile}`

  return gulp.src(solution).pipe(nugetRestore())
})
