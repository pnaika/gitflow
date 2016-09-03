/**
 * Created by pnaika on 9/2/16.
 */
var gulp = require('gulp');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

gulp.task('status', shell.task([
        'git status'
    ])
);

gulp.task('add', shell.task([
        'git add .'
    ])
);

gulp.task('fetch', shell.task([
        'git fetch'
    ])
);

gulp.task('pull', shell.task([
        'git pull'
    ])
);

gulp.task('tag', function() {
    runSequence(
        'fetch',
        'pull',
        'status',
        'add'
    );
});
