require('es6-promise').polyfill();
var gulp          = require('gulp');

/* CSS Add-ons */
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var rename       = require('gulp-rename');

/* Error Handling Add-ons */
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var onError = function (err) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
};

/* JavaScript Add-ons */
var concat = require('gulp-concat');
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

/* Image Optimization Add-Ons */
// var imagemin = require('gulp-imagemin');

/* BrowserSync Stuff */
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sass', function() {
  return gulp.src('./css/**/*.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./'))              // Output LTR stylesheets (style.css)
});

gulp.task('js', function() {
  return gulp.src(['./js/**/app.js'])
  //  .pipe(jshint())
  //  .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
});

gulp.task('images', function() {
  return gulp.src('./images/src/*')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('./images/dist'));
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./css/**/*.scss', ['sass', reload]);
  gulp.watch('./js/**/*.js', ['js', reload]);
  gulp.watch('images/src/*', ['images', reload]);
  gulp.watch('./*.html', reload);
});

gulp.task('default', ['sass', 'js', 'images', 'watch']);
