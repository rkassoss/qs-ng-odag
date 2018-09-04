var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var cachebust = require('gulp-cache-bust');
var replace = require('gulp-replace');
var clean = require('gulp-rimraf');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();


// JS files
var jsDest = 'assets/dist/js';
var cssDest = 'assets/dist/css';
var fontsDest = 'assets/dist/fonts';
var componentsPath = 'app/components/**/*.js';
var servicesPath = 'app/services/**/*.js';
var viewsPath = 'app/views/**/*.js';
var cssPath = 'assets/css/*.css';


gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});


//scss
gulp.task('sass', function () {
    return gulp.src('assets/scss/**/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('assets/dist/css'))
                .pipe(bs.reload({stream: true}));
});



//combine and minify components
gulp.task('components-js', function () {
    return gulp.src(componentsPath)
        .pipe(concat('components.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('components.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

//combine and minify services
gulp.task('services-js', function () {
    return gulp.src(['!app/services/utility.service.js', servicesPath])
        .pipe(concat('services.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('services.min.js'))
        // .pipe(uglify().on('error', function(e){
        //     console.log(e);
        //  }))
        .pipe(gulp.dest(jsDest));
});

//combine and minify directives
gulp.task('views-js', function () {
    return gulp.src(['!app/directives/qlik.directive.js', viewsPath])
        .pipe(concat('views.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('views.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

//move fonts
gulp.task('move-fonts', function() {
    return gulp.src(['assets/fonts/**/*'])
        .pipe(gulp.dest(fontsDest));
});

//move already minified css
gulp.task('move-css', function() {
    return gulp.src(['assets/css/bootstrap.min.css', 'assets/css/font-awesome.min.css'])
        .pipe(gulp.dest(cssDest));
});

//minifiy fonts & move
gulp.task('minify-css', function() {
    return gulp.src(['!assets/css/bootstrap.min.css', '!assets/css/font-awesome.min.css', cssPath])
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(cssDest));
});

//cache-control - add querystring timestamp to everything in index.html
gulp.task('rev', function () {
    gulp.src('./index.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('.'));
});


//watch all changes in dev, generate dist and reload browsersync
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("assets/scss/**/*.scss", ['sass']);
    gulp.watch("**/*.html").on('change', bs.reload);
    gulp.watch("app/*.js").on('change', bs.reload);


    gulp.watch(componentsPath).on('change', function() { runSequence('components-js', 'rev', bs.reload); });
    gulp.watch(servicesPath).on('change', function() { runSequence('services-js', 'rev', bs.reload); });
    gulp.watch(viewsPath).on('change', function() { runSequence('views-js', 'rev', bs.reload); });gulp.watch(cssPath).on('change', function() { runSequence('minify-css', 'rev', bs.reload); });

});


//# gulp build-dev
gulp.task('build-dev', function (callback) {
    return runSequence('components-js', 'services-js', 'views-js', 'move-fonts', 'move-css', 'minify-css', 'rev', callback);
});