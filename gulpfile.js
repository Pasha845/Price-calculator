const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixers = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist'])
}

const normalize = () => {
  return src('src/css/**/normalize.css')
    .pipe(dest('dist/css'))
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const styles = () => {
  return src('src/css/**/style.css')
    .pipe(sourcemaps.init())
    .pipe(concat('css/style.css'))
    .pipe(autoprefixers({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return src([
    'src/js/**/*.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify({
    toplevel: true
  }
  ).on('error', notify.onError))
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.css', styles)
watch('src/js/**/*.js', scripts)
watch('src/resources/normalize.css', normalize)
watch('src/resources/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, normalize, resources, htmlMinify, scripts, styles, watchFiles)
exports.build = series(clean, normalize, resources, watchFiles)