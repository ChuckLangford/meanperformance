(function() {
  'use strict';
  var gulp        = require('gulp');
  var usemin      = require('gulp-usemin'); //combine files
  var del         = require('del'); //clean up our build directory

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  gulp.task('default', function() {});

  gulp.task('build', ['clean'], function() {
    return gulp.src('./views/index.html')
      .pipe(usemin({
        assetsDir: 'public'
      })) //adds the 'concat' task automatically
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
