const gulp= require("gulp")
const cssnano = require("gulp-cssnano");
var del = require("del")
//const imagemin = require("gulp-imagemin");
const rev = require("gulp-rev");
const sass =  require('gulp-sass')(require('sass'));

var uglify = require('gulp-uglify');
var cleanCSS = require("gulp-clean-css")

function scss_to_css(){
    console.log("scss to css...");
    return gulp.src("./Assets/scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))////converting sass to css
    .pipe(cssnano())//minifying
    .pipe(cleanCSS())
    .pipe(gulp.dest("./Assets/css"));
   
}

function css() {
    console.log('Minifying CSS...');
    return gulp.src('./assets/**/*.css')/* https://lifesaver.codes/answer/merge-true-not-working-for-rev-manifest() */
        .pipe(rev())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: 'true',
        }))
        .pipe(gulp.dest('./public/assets'));

};
function js (){
    console.log('Minifying JS...');
    return gulp.src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: 'true',
        }))
        .pipe(gulp.dest('./public/assets'));
}

function clean() {
     return del(['./public']);
  }


  var build = gulp.series(clean, gulp.parallel(scss_to_css, css, js));
// main builder

exports.clean = clean;
exports.scss_to_css = scss_to_css;
exports.css = css;
exports.js = js;
exports.build = build;