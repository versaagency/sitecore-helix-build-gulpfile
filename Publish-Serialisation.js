const gulp = require('gulp')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')
const {
  config
} = require('./config')

const deleteSerialization = (folder) => {
  console.log(`Deleting Serialization Files from: ${config.serializationPath}/${folder}`)

  return new Promise((resolve, reject) =>
    rimraf(`${config.serializationPath}/${folder}/*`, (err, res) => (err ? reject(err) : resolve(res))))
}

const publishSerialization = (location) => {
  const directories = fs.readdirSync(location)
    .filter(file => fs.statSync(path.join(location, file)).isDirectory())
    .map(dirName => path.join(location, dirName, 'serialization/**/*'))

  console.log('Publishing serialization', location)

  return gulp.src(directories, {
      base: path.join(location, '..')
    })
    .pipe(gulp.dest(config.serializationPath))
}


gulp.task('Publish-Serialisation-Foundation', () =>
  deleteSerialization('Foundation')
  .then(() => publishSerialization('./src/Foundation')))

gulp.task('Publish-Serialisation-Feature', () =>
  deleteSerialization('Feature')
  .then(() => publishSerialization('./src/Feature')))

gulp.task('Publish-Serialisation-Project', () =>
  deleteSerialization('Project')
  .then(() => publishSerialization('./src/Project')))

gulp.task('Publish-Serialisation', gulp.series(
  'Publish-Serialisation-Foundation',
  'Publish-Serialisation-Feature',
  'Publish-Serialisation-Project'))