/**
 * Created by pnaika on 9/2/16.
 */

var gulp = require('gulp');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var argv = require('yargs')
    .demand(['version','sha'])
    .argv;
var bump = require('gulp-bump');

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

gulp.task('push-develop', shell.task([
        'git push origin develop'
    ])
);

gulp.task('push-version', shell.task([
        'git push origin '+ argv.version
    ])
);

gulp.task('push-master', shell.task([
        'git push origin master'
    ])
);

gulp.task('checkout-develop', shell.task([
        'git checkout develop'
    ])
);


gulp.task('checkout-master', shell.task([
        'git checkout master'
    ])
);

gulp.task('flow-release-start', shell.task([
        'git flow release start '+ argv.version
    ])
);

gulp.task('commit-message', shell.task([
        'git commit -m "chore(version): v'+ argv.version +'"'
    ])
);

//gulp.task('update-changelog', shell.task([
//        'up changelog --cl.from '+ argv.sha
//    ])
//);

gulp.task('commit-message-changelog', shell.task([
        'git commit -m "docs(CHANGELOG):'+ argv.version +'"'
    ])
);

gulp.task('flow-release-finish', shell.task([
        'git flow release finish '+ argv.version
    ])
);

gulp.task('bump', function(){
    gulp.src('./package.json')
        .pipe(bump({version: argv.version}))
        .pipe(gulp.dest('./'));
});


gulp.task('tag', function() {
    argv.version === undefined || argv.sha === undefined?
        console.log('Please enter the version number !!  ', argv.version , argv.sha) :
        runSequence(
            'fetch',
            'checkout-master',
            'pull',
            'checkout-develop',
            'pull',
            'flow-release-start',
            'bump',
            'status',
            'add',
            'commit-message',
            //'update-changelog',
            //'add',
            //'commit-message-changelog',
            'flow-release-finish',
            'push-develop',
            'push-version',
            'push-master'
        );
});
