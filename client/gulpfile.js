const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');


function compilescss() {
  return src('src/assets/scss/main.scss', { allowEmpty: true })
    .pipe(sass().on('error', sass.logError)) 
    .pipe(prefix('last 2 versions'))
    .pipe(minify()) 
    .pipe(dest('src/assets/css'));  
}


function jsmin() {
  return src([
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'src/assets/js/*.js'
  ]) 
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(dest('src/assets/js')); 
}


function copyBootstrapFonts() {
  return src('node_modules/bootstrap-icons/font/fonts/*')
    .pipe(dest('src/assets/fonts'));  
}


function watchTask() {
  watch('src/assets/scss/*.scss', compilescss);
  watch('src/assets/js/*.js', jsmin);
}


exports.default = series(
  compilescss,
  jsmin,
  copyBootstrapFonts,
  watchTask
);
