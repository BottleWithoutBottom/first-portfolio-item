const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require ('gulp-rename');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');

gulp.task('compress', function () {
  return gulp.src('app/pre-js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('public/js/'));
});


gulp.task ('SCSStoCSS', async function () {
  return gulp.src('app/scss/*.scss')
  .pipe(sass({
    errorLogToConsole:true,
    outputStyle: 'compressed'
  }))
  .on('error', console.error.bind(console))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/css/'));
});

gulp.task('watcher',  async function () {
  gulp.watch('app/scss/*.scss', gulp.series('SCSStoCSS'));
});

gulp.task('js-watcher', async function () {
  gulp.watch('app/pre-js/*.js', gulp.series('compress'));
});

gulp.task('serveration',  async function () {
  browserSync.init ({server: 'public'});
  browserSync.watch('public/**/*.*').on ('change', browserSync.reload);
});


gulp.task('GetStarted', gulp.parallel('watcher', 'js-watcher',  'serveration'));
