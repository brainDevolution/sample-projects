var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    notify = require ('gulp-notify');

var plumberErrorHandler = {
  eroorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error <%= error.message %>' //will see a notification if  not able to complete
  })
};


gulp.task('js', function(){// runs the task that we caled default
    gulp.src('./js/*.js') // these are the files that gulp work with
      .pipe(uglify()) // allows you to run more than one methods at the same time (minifies)
      .pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
      .pipe(gulp.dest('./build/js')) // brings everything in build js
});


gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});


gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['js/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
      });

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch(["build/css/*.css","build/js/*.js"]).on("change", browserSync.reload);

});
gulp.task('watch',function(){
  gulp.watch('js/**/*.js', ['js', "lint", ]);
  gulp.watch('sass/*.scss',['sass']);

});
gulp.task('default', ['browser-sync', 'watch'] );
