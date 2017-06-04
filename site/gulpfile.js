const
  // Native
  fs = require('fs'),
  // External
  gulp = require('gulp'),
  ejs = require('gulp-ejs'),
  ghPages = require('gulp-gh-pages'),
  sass = require('gulp-sass'),
  marked = require('marked');

// Compile Styles
gulp.task('styles', function () {
  return gulp.src('./styles/index.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

// Build the content in HTML
gulp.task('build', () => {
  fs.readFile('../README.md', 'utf-8', (err, data) => {
    if (err) {
      throw new Error(`Error reading README.md: ${e.message}`);
    } else {
      // Remove the asciinema in the data!
      data = data.replace('[![asciicast](https://asciinema.org/a/123343.png)](https://asciinema.org/a/123343)', '');
      let content = marked(data);

      return gulp.src('index.ejs')
        .pipe(ejs({ content }, {}, { ext: '.html' }))
        .pipe(gulp.dest('./build'));
    }
  });
});

// Static files
gulp.task('static', () => {
  return gulp.src('./public/*')
    .pipe(gulp.dest('./build'));
});

// Publish!
gulp.task('publish', ['build', 'styles', 'static'], () => {
  return gulp.src('./build/*')
    .pipe(ghPages());
});

gulp.task('default', ['build', 'styles'], () => {
  gulp.watch('../README.md' , ['build']);
  gulp.watch('index.ejs' , ['build']);
  gulp.watch('partials/*.ejs' , ['build']);
  gulp.watch('styles/index.scss' , ['styles']);
});
