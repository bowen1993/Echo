import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('es6', () => gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')));

gulp.task('default', () => {
  gulp.watch('src/**/*.js', ['es6']);
});

gulp.task('start', () => {
  nodemon({
    script: 'dist/app.js.map',
    ext: 'js html',
    env: { NODE_ENV: 'development' },
  });
});