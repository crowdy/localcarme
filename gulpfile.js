var gulp = require('gulp');

// this neeeds .git folder also to 'lerna ls'
gulp.task('jupyterlab', function() {
  return gulp.src(['./jupyterlab-org/**/*', './jupyterlab-org/.*/*'])
    .pipe(gulp.dest('jupyterlab'))
});

gulp.task('jupyterlab-extension', function() {
  return gulp.src(['./jupyterlab-extension/**/*'])
    .pipe(gulp.dest('jupyterlab'))
});