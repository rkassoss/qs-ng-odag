
let config = {
    host: 'localhost',
    prefix: '/',
    port: 4848,
    isSecure: false
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    paths: {
        "angularRoute": "/bower_components/angular-ui-router/release/angular-ui-router"
    }
});

// bootstrap the app
require(["js/qlik"], function (qlik) {
    require(["angular", 'angularRoute', "routes", "pageOne", 'pageTwo', 'dataService', 'qlikService'],
        function (angular, uiRoute, routes, pageOne, pageTwo, dataService, qlikService) {
            let app = angular.module('mashup-app', ['ui.router']);
            app.config(routes);
            app.component('pageOne', pageOne);
            app.component('pageTwo', pageTwo);
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, 'Helpdesk Management.qvf', config);
            }])
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});