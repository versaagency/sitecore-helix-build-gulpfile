const gulp = require('gulp')
const debug = require('gulp-debug')
const foreach = require('gulp-foreach')
const newer = require('gulp-newer')
const path = require('path')
const { config } = require('./config')

gulp.task('Publish-Views', () => {
  const root = './src'
  const roots = [
    `${root}/**/Views`,
    `!${root}/**/obj/**/Views`]
  const files = '/**/*.cshtml'
  const destination = path.join(config.websiteRoot, 'Views')

  return gulp.src(roots, { base: root })
    .pipe(foreach((stream, file) => {
      console.log(`Publishing: ${file.path}`)

      gulp.src(file.path + files, { base: file.path })
        .pipe(newer(destination))
        .pipe(debug({ title: 'Copying ' }))
        .pipe(gulp.dest(destination))
      return stream
    }))
})
