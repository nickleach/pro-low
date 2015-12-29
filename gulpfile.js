var gulp        = require('gulp');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var bower       = require('main-bower-files');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var htmlhint    = require('gulp-htmlhint');
var server      = require('gulp-server-livereload');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');


var notifyError = function() {
  return plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  });
};

gulp.task('vendor', function() {
  return gulp.src([
    './app/js/vendor/jquery.js',
    './app/js/vendor/underscore.js',
    './app/js/vendor/angular.js',
    './app/js/vendor/angular-ui-router.js',
    './app/js/vendor/angular-animate.js',
    './app/js/vendor/angular-aria.js',
    './app/js/vendor/angular-material.js',
    './app/js/vendor/ngGallery.js',
    './app/js/vendor/materialize.js',
    './app/js/vendor/materialbox.js',
    './app/js/vendor/slider.js',
    './app/js/vendor/angular-cookies.js'
    ])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('./app/dist/'))
    .pipe(rename('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist'));
});


//================================================
//  BABEL + BROWSERIFY = BABELIFY
//================================================

gulp.task('babelify', function() {
  browserify({ entries: './app/js/main.js', debug: true })
  .transform(babelify)
  .bundle()
  .on("error", function (err) { console.log(err.message); })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./app/dist/'));
});


//================================================
//  WATCH
//================================================

// Start the server and also the watch task
gulp.task('watch', ['watchlist', 'webserver']);

gulp.task('watchlist', function() {
  gulp.watch('./app/sass/*.scss', ['sass']);
  gulp.watch('./bower.json',      ['bower']);
  gulp.watch('./app/index.html',  ['hint:html']);
  gulp.watch(['./app/js/**/*.js', '!./app/dist/app.js'],  ['hint:js', 'babelify']);
});

//================================================
// SERVER
//================================================

gulp.task('webserver', function() {
  return gulp.src('app')
    .pipe(server({
      livereload: true,
      // open: true // Uncomment if you want it to open the project for you
    }));
});


//================================================
//  HINT
//================================================
gulp.task('hint:js', function() {
  return gulp.src(['./app/js/*.js', './app/js/**/*.js', '!./app/js/vendor/*', '!./app/dist/app.js'])
    .pipe(notifyError())
    .pipe(jshint({"esnext" : true}))
    .pipe(jshint.reporter('fail'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('hint:html', function() {
  return gulp.src('app/index.html')
    .pipe(notifyError())
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter());
});


//================================================
//  COMPILING ASSETS
//================================================


// -- SASS STYLESHEETS -- //

gulp.task('sass', function() {
  return gulp.src('./app/sass/main.scss')
    .pipe(notifyError())
    .pipe(sass())
    .pipe(gulp.dest('./app/css'));
});


//================================================
//  BOWER ASSETS
//================================================

gulp.task('bower', ['bower:js',
                    'bower:css',
                    'bower:fonts']);

// -- JAVASCRIPT -- //

gulp.task('bower:js', function() {
  return gulp.src(bower({filter: '**/*.js'}))
    .pipe(notifyError())
    .pipe(gulp.dest('app/js/vendor'));
});


// -- STYLESHEETS -- //

gulp.task('bower:css', function() {
  return gulp.src(bower({filter: '**/*.css'}))
    .pipe(notifyError())
    .pipe(gulp.dest('app/css/vendor'));
});


// -- FONTS -- //

gulp.task('bower:fonts', function(){
  return gulp.src(bower({filter: /\.(eot|svg|ttf|woff|woff2|otf)$/g}))
    .pipe(notifyError())
    .pipe(gulp.dest('app/css/fonts/'));
});
