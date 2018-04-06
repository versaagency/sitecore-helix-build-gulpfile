const gulp = require('gulp')
const debug = require('gulp-debug')
const rename = require('gulp-rename')
const path = require('path')
const { config } = require('./config')
const sitecoreBinaries = require('./data/Sitecore-Binaries')

gulp.task('Publish-Binaries', ['Clean-Binaries'], () => {
  const root = './src'
  const binFiles = [
    `${root}/**/code/bin/*`,
    `${root}/**/code/bin/**/*`
  ]
    .concat(sitecoreBinaries.map(ent => `!${root}/**/code/bin/${ent}`))

  const destination = path.join(config.websiteRoot, 'bin')

  return gulp.src(binFiles, { base: root })
    .pipe(rename({ dirname: '' }))
    .pipe(debug({ title: 'Copying ' }))
    .pipe(gulp.dest(destination))
})
