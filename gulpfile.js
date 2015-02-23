var del = require('del'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();


// Clean up the `dist` directory
gulp.task('clean', function(callback) {
    del('dist/*', callback);
});

// Copy over the JavaScript files and minify them
gulp.task('build', ['clean'], function() {
    return gulp.src('src/**/*.js')
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

// The default task (called when you run `gulp` from CLI)
gulp.task('default', ['build']);
