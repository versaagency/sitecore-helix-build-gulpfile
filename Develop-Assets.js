const gulp = require('gulp')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack.config.js')

gulp.task('Develop-Assets', () => {
  // Start a webpack-dev-server
  const compiler = webpack(config)

  new WebpackDevServer(compiler, config.devServer).listen(8080, '0.0.0.0', () => {
    console.log('webpack-dev-server: http://0.0.0.0:8080/')
  })
})
