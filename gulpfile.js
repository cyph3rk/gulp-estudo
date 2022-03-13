const { series, parallel, src, dest } = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlReplace = require('gulp-html-replace');

function copia () {
    return src('src/**/*').pipe(dest('dist'));    
};

function apaga () {
    return src('dist').pipe(clean());
};

function buildImg () {
    return src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'));
};

function buildJs () {
    const arq = ['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js'];
    return src(arq).pipe(concat('all.js'))
           .pipe(uglify())
           .pipe(dest('dist/js'));
};

function buildHtml () {
    return src('dist/**/*.html')
        .pipe(htmlReplace( {
            js: 'js/all.js'
        } ))
        .pipe(dest('dist'));    
};

exports.default = series(apaga, copia, parallel(buildImg, buildJs), buildHtml);

