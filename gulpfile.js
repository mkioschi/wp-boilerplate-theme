'use strict'

import gulp, { parallel } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import uglify from 'gulp-uglify'
import imagemin, { svgo, gifsicle, mozjpeg, optipng } from 'gulp-imagemin'
import { create as createBrowserSync } from 'browser-sync'

// TODO: implementar cache
// TODO: implementar clear cache e excluir a pasta dist antes do build

const { src, dest } = gulp

function buildStyles() {
  const sass = gulpSass(dartSass)

  return src('./assets/src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./assets/dist/css/'))
}

function buildScripts() {
  return src('./assets/src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./assets/dist/js/'))
}

function buildImages() {
  return src('./assets/src/img/**/*')
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 75, progressive: true }),
      optipng({ optimizationLevel: 5 }),
      svgo({
        plugins: [
          { name: 'removeViewBox', active: true },
          { name: 'cleanupIDs', active: false }
        ]
      })
    ]))
    .pipe(dest('./assets/dist/img/'))
}

function watch() {
  gulp.watch('./assets/src/scss/**/*.scss', buildStyles)
  gulp.watch('./assets/src/js/**/*.js', buildScripts)
  gulp.watch('./assets/src/img/**/*', buildImages)

  const browserSync = createBrowserSync()
  browserSync.init({
    files: ['./**/*.php', './assets/dist/**/*'],
    proxy: 'http://localhost/',
    port: 3000,
    notify: false,
  })
}

gulp.task('build:styles', buildStyles)
gulp.task('build:scripts', buildScripts)
gulp.task('build:images', buildImages)
gulp.task('build', parallel(buildStyles, buildScripts, buildImages))
gulp.task('watch', watch)
