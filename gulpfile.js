const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// gulp.task('copia', () => {
//     gulp.src('src/**/*')
//         .pipe(gulp.dest('dist'));
// })

gulp.task('build-img', function() {
    gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});