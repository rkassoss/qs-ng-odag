var app;


var config = {
    host: 'localhost',
    prefix: '/',
    port: 4848,
    isSecure: false
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    paths: {
        'ui.router': '/bower_components/angular-ui-router/release/angular-ui-router',
        'ui.bootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'ngAnimate' : '/bower_components/angular-animate/angular-animate.min',
        'ngSanitize' : '/bower_components/angular-sanitize/angular-sanitize.min',
        'ngAria': '/bower_components/angular-aria/angular-aria.min',
        'angular-jquery':'/bower_components/jquery/dist/jquery.min',
        'loading-bar': '/bower_components/angular-loading-bar/build/loading-bar.min'
    }
});

// bootstrap the app
require(["js/qlik"], function (qlik) {
    require(["angular", 'ui.router', "routes", "pageOne", 'pageTwo','senseObject', 'dataService', 'qlikService'],
        function (angular, uiRoute, routes, pageOne, pageTwo,senseObject, dataService, qlikService, getObject, qlikDropdown) {
            app = angular.module('mashup-app', [
                'ui.router',
                'ui.bootstrap',
                'ngAnimate',
                'ngSanitize',
                // 'ngAria',
                'angular-jquery',
                'loading-bar',]);
            
            app.config(routes);
            app.component('pageOne', pageOne);
            app.component('pageTwo', pageTwo);
            app.directive('senseObject',senseObject);
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, 'Helpdesk Management.qvf', config);
            }])
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});