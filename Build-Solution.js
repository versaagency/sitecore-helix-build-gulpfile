const gulp = require('gulp')
const msbuild = require('gulp-msbuild')
const { config } = require('./config')

gulp.task('Build-Solution', () => {
  const solution = `./${config.solutionFile}`
  const targets = config.runCleanBuilds
    ? ['Clean', 'Build']
    : ['Build']

  return gulp.src(solution)
    .pipe(msbuild({
      targets,
      configuration: config.buildConfiguration,
      logCommand: false,
      verbosity: 'quiet',
      stdout: true,
      errorOnFail: true,
      maxcpucount: 0,
      toolsVersion: 'auto',
      nodeReuse: false
    }))
})
