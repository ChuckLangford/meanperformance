(function() {
  'use strict';
  var gulp        = require('gulp');
  var useref      = require('gulp-useref'); //combine files
  var del         = require('del'); //clean up our build directory

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  gulp.task('default', ['build']);

  gulp.task('build', ['builder', 'post'], function() {
    //we can use this function for any cleanup
    del(['build/views/javascripts']);
  });

  gulp.task('post', ['builder'], function(cb) {
    return gulp.src('build/views/javascripts/*.js')
      .pipe(gulp.dest('build/public/javascripts'));
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

  gulp.task('builder', ['clean'], function() {
    var assets = useref.assets();

    // The views are combined and piped here
    return gulp.src('./views/*.html')
      .pipe(assets) //returns a stream of concatenated asset files (the build block)
      .pipe(assets.restore()) //restores the html file to the stream
      .pipe(useref()) //alters the source file
      .pipe(gulp.dest('build/views')); //publish our altered files
  });
})();
