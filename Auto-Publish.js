const gulp = require('gulp')
const watch = require('gulp-watch')
const rimraf = require('rimraf')
const path = require('path')
const { config } = require('./config')
const sitecoreBinaries = require('./data/Sitecore-Binaries')

const sourceRoot = './src'

// TODO: this needs to be better
const fileBase = (filePath, area) => {
  const parts = filePath.split('\\')
  const areaIndex = parts.indexOf(area)
  const base = parts.filter((_, index) => index < areaIndex + 1).join('\\')

  return base
}

const watchFolder = (paths, type) => {
  const destination = `${config.websiteRoot}/${type}`

  return watch(paths, (vinyl) => {
    const base = fileBase(vinyl.path, type)
    const destinationPath = path.join(destination, vinyl.path.substr(base.length))

    switch (vinyl.event) {
      case 'change':
      case 'add':
        console.log(`Publishing: ${vinyl.path}`)

        gulp.src(vinyl.path, { base }).pipe(gulp.dest(destination))
        break
      case 'unlink':

        console.log(`Removing: ${destinationPath}`)

        rimraf(destinationPath, () => { })

        break
      default:
        break
    }
  })
}

gulp.task('Auto-Publish-Views', () =>
  watchFolder(
    [`${sourceRoot}/{Foundation,Feature,Project}/*/code/Views/**/*.cshtml`],
    'Views'
  ))

gulp.task('Auto-Publish-Scripts', () =>
  watchFolder(
    [`${sourceRoot}/{Foundation,Feature,Project}/*/code/sitecore/shell/client/Applications/FormsBuilder/Layouts/Actions/{Foundation,Feature,Project}/**/*.js`],
    'sitecore'
  ))

gulp.task('Auto-Publish-Binaries', () =>
  watchFolder(
    [
      `${sourceRoot}/**/code/bin/*.{dll,pdb}`,
      `${sourceRoot}/Library/*/bin/*.{dll,pdb}`
    ]
      .concat(sitecoreBinaries.map(ent => `!${sourceRoot}/**/code/bin/${ent}`)),
    'bin'
  ))

gulp.task('Auto-Publish-Sitecore-Modules', () =>
  watchFolder([`${sourceRoot}/{Foundation,Feature,Project}/*/code/**/sitecore/**/*`], 'sitecore'))

gulp.task('Auto-Publish-Configs', () =>
  watchFolder(
    [`${sourceRoot}/{Foundation,Feature,Project}/*/code/App_Config/**/*.config`],
    'App_Config'
  ))

gulp.task('Auto-Publish', ['Auto-Publish-Views', 'Auto-Publish-Binaries', 'Auto-Publish-Configs', 'Auto-Publish-Scripts', 'Auto-Publish-Sitecore-Modules'])
