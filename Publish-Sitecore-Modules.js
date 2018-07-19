const gulp = require('gulp')
const debug = require('gulp-debug')
const foreach = require('gulp-foreach')
const newer = require('gulp-newer')
const path = require('path')
const { config } = require('./config')

gulp.task('Publish-Sitecore-Modules', () => {
  const root = './src'
  const roots = [`${root}/**/sitecore`]

  const files = '/./**/*'
  const destination = path.join(config.websiteRoot, 'sitecore')

  return gulp.src(roots)
    .pipe(debug({ title: 'Publishing ' }))
    .pipe(foreach((stream, file) => {
      gulp.src(file.path + files, { base: file.path })
        .pipe(newer(destination))
        .pipe(debug({ title: 'Copying ' }))
        .pipe(gulp.dest(destination))
      return stream
    }))
})
