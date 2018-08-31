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
        'uibootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min',
    }
});

// bootstrap the app
require(["js/qlik"], function (qlik) {
    require(["angular",
            'ui.router',
            'uibootstrap', 
            "routes", 
            "pageOne", 
            'pageTwo',
            'topHeader',
            'senseObject', 
            'expandModal',
            'dataService', 
            'qlikService'
    ],
        function (angular, uiRoute, uibootstrap, routes, pageOne, pageTwo,topHeader, senseObject,expandModal, dataService, qlikService) {
            app = angular.module('mashup-app', [
                'ui.router',
                'ui.bootstrap'
            ]);
            
            app.config(routes);
            app.component('pageOne', pageOne);
            
            app.component('pageTwo', pageTwo);
            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);
            app.component('expandModal',expandModal);

            
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, 'Helpdesk Management.qvf', config);
            }])
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});