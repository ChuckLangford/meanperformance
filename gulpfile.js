(function() {
  'use strict';
  var gulp        = require('gulp');
  var useref      = require('gulp-useref'); //combine files
  var del         = require('del'); //clean up our build directory

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  gulp.task('default', function() {});

  gulp.task('build', ['clean'], function() {
    var assets = useref.assets();

    // In order to keep the directory structure similar to our dev enironment,
    // we concatenate the script files first
    gulp.src('./views/*.html')
    .pipe(assets)
    .pipe(gulp.dest('build/public'))
    .pipe(assets.restore());

    // The views are combined and piped here
    return gulp.src('./views/*.html')
      .pipe(useref())
      .pipe(gulp.dest('build/views'));
  });

  gulp.task('clean', function(cb) {
    del(['build'], function(err) {
      gulp.src(['package.json'])
        .pipe(gulp.dest('./build'));
      gulp.src(['app.js'])
        .pipe(gulp.dest('./build'));
      gulp.src(['./routes/**'])
        .pipe(gulp.dest('./build/routes'));
      gulp.src(['./bin/**'])
        .pipe(gulp.dest('./build/bin'));
      cb(err);
    });
  });
})();
