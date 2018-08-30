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
        'ui.bootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min'
    }
});

// bootstrap the app
require(["js/qlik"], function (qlik) {
    require(["angular", 'ui.router', "routes", "pageOne", 'pageTwo','topHeader','senseObject', 'dataService', 'qlikService'],
        function (angular, uiRoute, routes, pageOne, pageTwo,topHeader, senseObject, dataService, qlikService) {
            app = angular.module('mashup-app', [
                'ui.router'
            ]);
            
            app.config(routes);
            app.component('pageOne', pageOne);
            
            app.component('pageTwo', pageTwo);
            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);

            
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, 'Helpdesk Management.qvf', config);
            }])
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});