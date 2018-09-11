const gulp = require('gulp')
const foreach = require('gulp-foreach')
const newer = require('gulp-newer')
const debug = require('gulp-debug')
const { config } = require('./config')
const sitecoreBinaries = require('./data/Sitecore-Binaries')

gulp.task('Publish-Helix', () => {
  const roots = './src/{Project,Feature,Foundation}/*/code/'
  const files = '/{App_Config,Views,bin,sitecore}/**/*'
  const destination = config.websiteRoot

  return gulp.src(roots).pipe(
    foreach((stream, file) => {
      const glob = [file.path + files].concat(sitecoreBinaries.map(ent => `!./**/*/${ent}`))
      gulp
        .src(glob, { base: file.path })
        .pipe(newer(destination))
        .pipe(debug({ title: 'Copying' }))
        .pipe(gulp.dest(destination))
      return stream
    })
  )
})

gulp.task('Publish', gulp.parallel(['Run-Webpack', 'Publish-Helix']))
