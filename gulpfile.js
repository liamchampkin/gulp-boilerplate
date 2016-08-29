var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var twig = require('gulp-twig');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('site/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(concat('js/scripts.js'))
  .pipe(gulp.dest('site'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'site'
    },
  })
})

// Compile Twig templates to HTML
gulp.task('templates', function() {
    return gulp.src('src/*.html') // run the Twig template parser on all .html files in the "src" directory
        .pipe(twig())
        .pipe(gulp.dest('site')); // output the rendered HTML files to the "site" directory
});

gulp.task('watch', ['browserSync', 'sass', 'templates', 'js'], function(){
  gulp.watch('scss/**/*.scss', ['sass']); 
  gulp.watch('src/**/*.html', ['templates']); 
  gulp.watch('js/**/*.js', ['js']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('site/*.html', browserSync.reload); 
  gulp.watch('site/js/**/*.js', browserSync.reload); 
  // Other watchers
})