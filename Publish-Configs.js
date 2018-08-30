const gulp = require('gulp')
const debug = require('gulp-debug')
const foreach = require('gulp-foreach')
const changed = require('gulp-changed')
const path = require('path')
const { config } = require('./config')

gulp.task('Publish-Configs', gulp.series(() => {
  const root = './src'
  const roots = [
    `${root}/**/App_Config`,
    `!${root}/**/obj/**/App_Config`,
    `!${root}/**/packages.config`,
    `'${root}/**/web.config`
  ]

  const files = ['/**/*.config']
  const destination = path.join(config.websiteRoot, 'App_Config')

  return gulp.src(roots, { base: root })
    .pipe(foreach((stream, file) => {
      console.log(`Publishing: ${file.path}`)
      const src = [file.path + files]

      if (config.buildConfiguration !== 'Release') {
        src.push(`!${file.path}/**/*.{Debug,Release,Staging,Local,Pre-Production,Habitat,Production}.config`)
      }

      gulp.src(src, { base: file.path })
        .pipe(changed(destination))
        .pipe(debug({ title: 'Copying ' }))
        .pipe(gulp.dest(destination))
      return stream
    }))
}))
