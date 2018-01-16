const
  // modules
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  cache = require('gulp-cache'),
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
  rename = require('gulp-rename'),
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

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// image processing
gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 6}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', function() {
  var
    out = folder.build,
    page = gulp.src(folder.src + '*.html')
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
  ];
  return gulp.src([
    folder.src + 'scss/main.scss',
    folder.src + 'scss/no-aos.scss'
    ])
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

//'src/js/vendors/gsap/*.js'
gulp.task('babel', () =>
  gulp.src(['src/js/main.js', 'src/js/lazyload.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/js/'))
    .pipe(livereload())
);

/**
 * Compile animation related scripts
 */
gulp.task('compileAnimationScripts', function() {
  gulp.src([
    'src/js/vendors/gsap/TimelineMax.min.js',
    'src/js/vendors/gsap/TweenMax.min.js',
    'src/js/vendors/gsap/ScrollToPlugin.min.js',
    'src/js/vendors/aos.js',
    ])
    .pipe(concat('aosgsap.min.js'))
    .pipe(gulp.dest('docs/js/'))
});

gulp.task('watch', ['webserver'], function() {
  livereload.listen();
  gulp.watch('src/scss/**/*.scss', ['compileSASS']);
  gulp.watch('src/js/**/*.js', ['babel']);
  gulp.watch('src/*.html', ['html'])
});

gulp.task('default', ['compileSASS', 'babel', 'html', 'watch']);
