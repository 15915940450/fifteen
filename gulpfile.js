var gulp=require('gulp');

gulp.task('default',function(){
  gulp.src([
    './test.txt'
    ]).pipe(gulp.dest('./gulpdest/'));
});