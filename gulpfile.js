const
  // modules
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  // minify css
  cssnano = require('cssnano'),
  // Control the order of js or css files
  deporder = require('gulp-deporder'),
  gulp = require('gulp'),
  htmlclean = require('gulp-htmlclean'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  // reduce media query duplication
  mqpacker = require('css-mqpacker'),
  newer = require('gulp-newer'),
  postcss = require('gulp-postcss'),
  pump = require('pump'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  webserver = require('gulp-webserver'),
// development mode when set to true
  devBuild = true;

folder = {
  src: 'src/',
  build: 'docs/'
}

// image processing
gulp.task('images', function() {
  var out = folder.build + ' images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 9 }))
    .pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', ['images'], function() {
  var
    out = folder.build,
    page = gulp.src(folder.src + 'index.html')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page
    .pipe(gulp.dest(out))
    .pipe(livereload());
});

// Reorder files based on comments on top of the files
// https://www.npmjs.com/package/gulp-deporder
gulp.task('reorderJS', function() {
  // var jsbuild = gulp.src(folder.src + 'js/**/*')
  gulp.src(folder.src + 'js/**/*.js')
    .pipe(deporder())
    .pipe(concat('main.js'))
    .pipe(livereload())
    .pipe(gulp.dest('docs/js/'))
});

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
      .pipe(deporder())
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist/'))
});

/**
 * Compile SASS with options to run postCSS as well
 *   - autoprefix with postcss
 *   - minify with cssnano
 *   - combine media queries with mqpacker
 */
gulp.task('compileSASS', function() {
  var pcssPlugins = [
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    //cssnano,
    mqpacker
  ];

  return gulp.src(folder.src + 'scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(pcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(folder.build + 'css/'))
    .pipe(livereload());
});

gulp.task('uglifyJS', function (cb) {
  pump([
        gulp.src('docs/js/main.js'),
        uglify(),
        gulp.dest('docs/js/')
    ],
    cb
  );
});

gulp.task('webserver', function() {
  gulp.src('docs')
    .pipe(webserver({
      livereload: true,
      open: true,
    }));
});

gulp.task('concatJS', function() {
  return gulp.src(['src/js/scripts.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('docs/js/'))
})

gulp.task('babel', () =>
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/js/'))
    .pipe(livereload())
);

gulp.task('watch', ['webserver'], function() {
  livereload.listen();
  gulp.watch('src/scss/**/*.scss', ['compileSASS']);
  gulp.watch('src/js/**/*.js', ['babel']);
  gulp.watch('src/index.html', ['html'])
});

gulp.task('default', ['compileSASS', 'babel', 'html', 'watch']);
