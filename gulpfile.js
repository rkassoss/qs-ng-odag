var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var bs = require('browser-sync').create();


var jsDest = 'assets/dist/js';
var cssDest = 'assets/dist/css';


var componentsPath = 'app/components/**/*.js';
var servicesPath = 'app/services/**/*.js';
var directivesPath = 'app/directives/**/*.js';

var scssPath = 'assets/scss/**/*.scss';



gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

//combine scss files into css
gulp.task('sass', function () {
    return gulp.src(scssPath)
                .pipe(sass())
                .pipe(gulp.dest(cssDest))
                .pipe(bs.reload({stream: true}));
});


//combine and minify components
gulp.task('components-js', function () {
    return gulp.src(componentsPath)
        .pipe(concat('components.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('components.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(bs.reload({stream: true}));
});

//combine and minify services
gulp.task('services-js', function () {
    return gulp.src(['!app/services/utility.service.js', servicesPath])
        .pipe(concat('services.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('services.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(bs.reload({stream: true}));
});

//combine and minify directives
gulp.task('directives-js', function () {
    return gulp.src(['!app/directives/qlik.directive.js', directivesPath])
        .pipe(concat('directives.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('directives.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(bs.reload({stream: true}));
});

//combine all of the libraries js files
gulp.task('libraries-js', function () {
    return gulp.src(['bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-resource/angular-resource.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-touch/angular-touch.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-ui-sortable/sortable.min.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
    'assets/js/bootstrap.min.js'])
        .pipe(concat('libraries.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(bs.reload({stream: true}));
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


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch("app/**/*.js").on('change', bs.reload);
});