var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    plugins = require('gulp-load-plugins')();


// Clean up the `dist` directory
gulp.task('clean', function() {
    del('dist/*');
});

// Copy over the JavaScript files and minify them
gulp.task('copy:js', function() {
    return gulp.src('src/*.js')
        .pipe(plugins.jscs())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify({ preserveComments: 'some' }))
        .pipe(plugins.rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(plugins.insert.append('\n'))
        .pipe(gulp.dest('dist'));
});

// Build task
gulp.task('build', function() {
    runSequence('clean', 'copy:js');
});

// The default task (called when you run `gulp` from CLI)
gulp.task('default', ['build']);
