const gulp = require('gulp')
const watch = require('gulp-watch')
const rimraf = require('rimraf')
const fs = require('fs')
const _path = require('path')
const {
  config
} = require('./config')
const sitecoreBinaries = require('./data/Sitecore-Binaries')

gulp.task('Auto-Publish', () => {
  const paths = './src/{Project,Feature,Foundation}/*/code/{App_Config,Views,bin,sitecore}/**/*'

  return watch(paths, ({
    path,
    event
  }) => {
    const parts = path.split(_path.sep)
    const fileName = parts[parts.length - 1]
    const base = parts.filter((_, index) => index <= parts.indexOf('code')).join(_path.sep)
    const destPath = `${config.websiteRoot}${path.substr(base.length)}`

    if (sitecoreBinaries.indexOf(fileName) !== -1) {
      console.log(`Ignoring Sitecore file: ${fileName}`)
    } else {
      switch (event) {
        case 'change':
        case 'add':
          console.log(`Publishing ${fileName}`)
          // TODO: update this to use gulp.src(...).dest(...)
          fs.copyFileSync(path, destPath)
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
