var del = require('del'),
    gulp = require('gulp'),
    eventStream = require('event-stream'),
    plugins = require('gulp-load-plugins')();


// Update the dependencies in the `src` folder
gulp.task('update-dependencies', function(callback) {
    gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest('src/js'))
        .on('end', callback);
});

// Clean up the `dist` directory
gulp.task('clean', ['update-dependencies'], function(callback) {
    del('dist/*', { dot: true }, callback);
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
    eventStream.concat(
        gulp.src('node_modules/jquery/dist/jquery.min.js')
            .pipe(plugins.replace('//# sourceMappingURL=jquery.min.map', ''))
            .pipe(gulp.dest('dist/js')),
        gulp.src([
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
            .pipe(gulp.dest('dist'))
    );
});

// Copy over all other files
gulp.task('copy:files', ['copy:html', 'copy:css', 'copy:js'], function() {
    return gulp.src([
            'src/**',
            '!src/**/*.css',
            '!src/**/*.js'
        ], { dot: true })
        .pipe(plugins.conflict('dist', { skipAll: true }))
        .pipe(gulp.dest('dist'));
});

// Build task
gulp.task('build', ['copy:html', 'copy:css', 'copy:js', 'copy:files']);

// The default task (called when you run `gulp` from CLI)
gulp.task('default', ['build']);
