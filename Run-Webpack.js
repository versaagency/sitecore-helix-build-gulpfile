const gulp = require('gulp')
const webpack = require('webpack')
const config = require('../webpack.config.js')

gulp.task('Run-Webpack', callback => webpack(config).run(callback))
