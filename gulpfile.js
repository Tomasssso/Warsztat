// pobieramy paczki z katalogu gulp
const gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require("sass");

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb()
}

function css() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

function watch(cb) {
    gulp.watch("./scss/**/*.scss", gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);
    cb()
}

module.exports.default = gulp.series(css, server, watch);
module.exports.watch = watch;
module.exports.css = css;