var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload');



// Scss > CSS > MinCSS
gulp.task('styles', function() {
  return sass('./src/scss', { style: 'expanded' })
    .pipe(gulp.dest('./dist/css'))
    .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'scss'
        }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())    
    .pipe(gulp.dest('./dist/css'));
});


//JavaScript Concat and Minify
gulp.task('build-js', function() {
  return gulp.src('./src/js')    
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./src/js'));
});




//Watch for changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./src/scss/**/*.scss', ['styles']);
    gulp.watch('./src/js/**/*.js', ['build-js']); 
});

//Default task
gulp.task('default', ['watch'], function() {

});