const { watch, series, parallel, src, dest } = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlReplace = require('gulp-html-replace');
const usemin = require('gulp-usemin');
const cssmin = require('gulp-cssmin');
const browserSync = require("browser-sync").create();
const jshint = require('gulp-jshint');
const jshintStylesh = require('jshint-stylish');

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

// Essa funcao faz o mesmo q buildJs() e buildHtml ()
function useMin () {
    return src('dist/**/*.html')
        .pipe(usemin({
            'js' : [uglify],
            'css' : [cssmin]
        }))
        .pipe(dest('dist'));
};

function servidor () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    watch('src/js/*.js', { events: 'all' }, function(path, stats)  {        
        src(path)
            .pipe(jshint())
            .pipe(jshint.reporter('jshintStylesh'));
    });    

    watch('src/**/*' ).on('change', browserSync.reload);
};

// Não é mais usada nesse código, mas deichei aqui para estudo
function buildJs () {
    const arq = ['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js'];
    return src(arq).pipe(concat('all.js'))
           .pipe(uglify())
           .pipe(dest('dist/js'));
};

// Não é mais usada nesse código, mas deichei aqui para estudo
function buildHtml () {
    return src('dist/**/*.html')
        .pipe(htmlReplace( {
            js: 'js/all.js'
        } ))
        .pipe(dest('dist'));    
};

exports.servidor = servidor;
exports.default = series(apaga, copia, parallel(buildImg, useMin));

