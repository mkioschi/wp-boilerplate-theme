'use strict'

import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import uglify from 'gulp-uglify'
import imagemin from 'gulp-imagemin'
import { create as createBrowserSync } from 'browser-sync'

const { src, dest } = gulp

function buildStyles() {
  const sass = gulpSass(dartSass)

  return src('./assets/src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // TODO: verificar se precisa desse "on error"
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

function compressImages() {
  // TODO: caso o arquivo fonte já esteja em webp, só copiar para a pasta dist

  return src('./assets/src/img/**/*.svg')
    .pipe(imagemin())
    .pipe(dest('./assets/dist/img/'))
}

function watch() {
  gulp.watch('./assets/src/scss/**/*.scss', buildStyles)
  gulp.watch('./assets/src/js/**/*.js', buildScripts)
  gulp.watch('./assets/src/img/**/*', compressImages)

  const browserSync = createBrowserSync()
  browserSync.init({
    files: ['./**/*.php', './assets/dist/**/*'],
    proxy: 'http://localhost/',
    port: 3000,
    notify: false,
  })
}

gulp.task('styles:build', buildStyles)
gulp.task('scripts:build', buildScripts)
gulp.task('images:compress', compressImages)
gulp.task('watch', watch)
