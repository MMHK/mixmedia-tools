var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');


gulp.task('source', function() {
    return gulp.src(['./src/js/mm-tools.js'])
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('default', ['source'], function () {
    return gulp.src(['./src/js/mm-tools.js'])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat('mm-tools.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
})