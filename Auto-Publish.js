const gulp = require('gulp')
const watch = require('gulp-watch')
const rimraf = require('rimraf')
const path = require('path')
const {
  config
} = require('./config')
const sitecoreBinaries = require('./data/Sitecore-Binaries')

gulp.task('Auto-Publish', () => {
  const paths = './src/{Project,Feature,Foundation}/*/code/{App_Config,Views,bin,sitecore}/**/*'

  return watch(paths, (ev) => {
    // TODO: this is gross
    const fileName = path.basename(ev.path)
    const parts = ev.path.split(path.sep)
    const base = parts.filter((_, index) => index <= parts.indexOf('code')).join(path.sep)
    const destPath = `${config.websiteRoot}${ev.path.substr(base.length)}`

    if (sitecoreBinaries.indexOf(fileName) !== -1) {
      console.log(`Ignoring Sitecore file: ${fileName}`)
    } else {
      switch (ev.event) {
        case 'change':
        case 'add':
          console.log(`Publishing: ${fileName}`)

          gulp.src(ev.path)
            .pipe(gulp.dest(path.dirname(destPath)))
          break
        case 'unlink':
          console.log(`Removing: ${fileName}`)

          rimraf(destPath, () => {})
          break
        default:
          break
      }
    }
  })
})
