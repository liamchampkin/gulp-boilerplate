var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var twig = require('gulp-twig');

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
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

gulp.task('watch', ['browserSync', 'sass', 'templates'], function(){
  gulp.watch('scss/**/*.scss', ['sass']); 
  gulp.watch('src/*.html', ['templates']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('site/*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload); 
  // Other watchers
})