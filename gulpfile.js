var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var swig = require('gulp-swig');

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
      baseDir: ''
    },
  })
})

gulp.task('templates', function(){
  gulp.src("includes/*.swig")
    .pipe(swig())
    .pipe(gulp.dest("site/"));
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload); 
  gulp.watch("includes/*.swig", function(event){
    gulp.run('templates');
  });
  // Other watchers
})