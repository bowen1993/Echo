import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import eslint from 'gulp-eslint';

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});