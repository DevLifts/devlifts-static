require('es6-promise').polyfill()
var gulp = require('gulp')

/* CSS Add-ons */
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var rename = require('gulp-rename')
var rimraf = require('rimraf')

/* Error Handling Add-ons */
var plumber = require('gulp-plumber')
var gutil = require('gulp-util')

var onError = function(err) {
  console.log('An error occurred:', gutil.colors.magenta(err.message))
  gutil.beep()
  this.emit('end')
}

/* JavaScript Add-ons */
var concat = require('gulp-concat')
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify')

/* Image Optimization Add-Ons */
// var imagemin = require('gulp-imagemin');

/* BrowserSync Stuff */
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

gulp.task('sass', function(done) {
  gulp
    .src('./css/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'))

  done()
})

gulp.task('js', function(done) {
  gulp
    .src(['./js/**/app.js'])
    //  .pipe(jshint())
    //  .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))

  done()
})

gulp.task('images', function(done) {
  gulp
    .src('./images/src/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest('./images/dist/'))

  done()
})

gulp.task('watch', function(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch('./css/**/*.scss', gulp.parallel(['sass', reload]))
  gulp.watch('./js/**/*.js', gulp.parallel(['js', reload]))
  gulp.watch('images/src/*', gulp.parallel(['images', reload]))
  gulp.watch('./*.html', reload)

  done()
})

gulp.task('compile', function(done) {
  rimraf('./build/**', err => {
    if (err) {
      throw err
    }

    gulp.src('./images/dist/**').pipe(gulp.dest('./build/images/dist'))
    gulp.src('./css/vendor/**').pipe(gulp.dest('./build/css/vendor'))

    gulp
      .src([
        './*',
        './**/*',
        './.well-known',
        '!./build',
        '!./build/**/*',
        '!./images/**/*',
        '!./css/**/*',
        '!./node_modules',
        '!./node_modules/**/*',
        '!.gitignore',
        '!gulpfile.js',
        '!yarn*',
        '!README*'
      ])
      .pipe(plumber({ errorHandler: onError }))
      .pipe(gulp.dest('./build'))

    done()
  })
})

gulp.task('build', gulp.parallel('sass', 'js', 'images', 'compile'))
gulp.task('default', gulp.parallel('sass', 'js', 'images', 'watch'))
