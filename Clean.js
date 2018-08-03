const { config } = require('./config')
const gulp = require('gulp')
const rimraf = require('rimraf')
const path = require('path')
const glob = require('glob')

const deleteAll = (paths, callback) =>
  Promise.all(paths
    .map(ent =>
      new Promise((resolve, reject) =>
        rimraf(ent, err => (err ? reject(err) : resolve())))))
    .then(() => callback(null))
    .catch(err => callback(err))

gulp.task('Clean-Configs', (callback) => {
  const configFolder = path.join(config.websiteRoot, 'App_Config/Include')
  const folders = [
    path.join(configFolder, 'Project'),
    path.join(configFolder, 'Feature'),
    path.join(configFolder, 'Foundation')
  ]

  deleteAll(folders, callback)
})

gulp.task('Clean-Binaries', (callback) => {
  const folder = path.join(config.websiteRoot, 'bin')
  glob(path.join(folder, `Sitecore.{Feature,Foundation,${config.solutionName}}.*`), (err, files) => {
    if (err) { throw err }

    deleteAll(files, callback)
  })
})

gulp.task('Clean', gulp.parallel('Clean-Binaries', 'Clean-Configs'))
