(function() {
  'use strict';
  var gulp        = require('gulp');
  var useref      = require('gulp-useref'); //combine files
  var del         = require('del'); //clean up our build directory
  var rev         = require('gulp-rev'); //appends content hash; breaks cache
  var revReplace  = require('gulp-rev-replace'); //re-writes the html file with the rev'd filenames
  var uglify      = require('gulp-uglify');
  var filter      = require('gulp-filter');
  var ngAnnotate  = require('gulp-ng-annotate');

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

  /* The clean function preps the entire build process.
   * First it removes an existing build folder and then
   * copies required files into the newly created build folder.
   */
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

  /* This is where the actual build happens */
  gulp.task('builder', ['clean'], function(cb) {
    var assets = useref.assets();
    var jsFilter = filter('**/*.js');

    // The views are combined and piped here
    return gulp.src('./views/*.html')
      .pipe(assets) //returns a stream of concatenated asset files from build block
      .pipe(jsFilter)
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(jsFilter.restore())
      .pipe(rev()) //revision the stream of files
      .pipe(assets.restore()) //restore the html file to the stream
      .pipe(useref()) //update the html file with the concatenated file(s)
      .pipe(revReplace()) //update again with the revisioned file
      .pipe(gulp.dest('build/views'));
  });
})();
