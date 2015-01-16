var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')();


// Clean up the `dist` directory
gulp.task('clean', function(callback) {
    del([
        'dist/*',
        '!dist/js',
        'dist/js/*',
        '!dist/js/jquery.min.js'
    ], { dot: true }, callback);
});

// Copy over the HTML files and update the dependencie names
gulp.task('copy:html', ['clean'], function() {
    return gulp.src('src/**/*.html')
        .pipe(plugins.replace(/\.(?=js|css)/g, '.min.'))
        .pipe(gulp.dest('dist'));
});

// Copy over the CSS files and minify them
gulp.task('copy:css', ['clean'], function() {
    return gulp.src('src/**/*.css')
        .pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
        .pipe(plugins.rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(plugins.replace('*/', '*/\n'))
        .pipe(plugins.insert.append('\n'))
        .pipe(gulp.dest('dist'));
});

// Copy over the JavaScript files and minify them
gulp.task('copy:js', ['clean'], function() {
    return gulp.src([
            'src/**/*.js',
            '!src/js/jquery.js'
        ])
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

// Copy over all other files
gulp.task('copy:files', ['copy:html', 'copy:css', 'copy:js'], function() {
    return gulp.src([
            'src/**',
            '!src/**/*.css',
            '!src/**/*.html',
            '!src/**/*.js'
        ], { dot: true })
        .pipe(plugins.conflict('dist', { skipAll: true }))
        .pipe(gulp.dest('dist'));
});

// Build task
gulp.task('build', ['copy:html', 'copy:css', 'copy:js', 'copy:files']);

// The default task (called when you run `gulp` from CLI)
gulp.task('default', ['build']);
