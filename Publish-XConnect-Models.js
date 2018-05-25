const { execSync } = require('child_process')
const gulp = require('gulp')
const debug = require('gulp-debug')
const foreach = require('gulp-foreach')
const newer = require('gulp-newer')
const path = require('path')
const { config } = require('./config')

gulp.task('Build-XConnect-Models', () => {
  execSync(`cmd.exe src\\Utilities\\XConnect.ModelBuilder\\bin\\${config.buildConfiguration}\\XConnect.ModelBuilder.exe`)
})

gulp.task('Publish-XConnect-Models', ['Build-XConnect-Models'], () => {
  const root = `./src/Utilities/XConnect.ModelBuilder/bin/${config.buildConfiguration}/Models`

  const destination = [
    path.join(config.xconnectRoot, 'App_Data/Models'),
    path.join(config.xconnectRoot, 'jobs/continuous/IndexWorker/App_Data/Models')
  ]

  const stream = gulp
    .src(`${root}/*.json`)
    .pipe(debug({ title: 'Copying ' }))

  destination.forEach(ent => stream.pipe(gulp.dest(ent)))

  return stream
})
