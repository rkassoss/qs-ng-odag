// var config = {
//     host: 'localhost',
//     prefix: '/',
//     port: 4848,
//     isSecure: false
// };
// var appId = 'Helpdesk Management.qvf';

var config = { //June 2018 QS
    host: 'qmi-qs-ticket',
    prefix: '/',
    port: 443,
    isSecure: true
};
var appId = 'a402221a-8ec7-4f9f-8748-6560bb115a0b';

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
            'pageThree',
            'topHeader',
            'senseObject', 
            'simpleObject',
            'tableButton',
            'filterDropdown',
            'dropdownSearch',
            'expandModal',
            'dataService', 
            'qlikService'
    ],
        function (angular, uiRoute, uibootstrap, routes, pageOne, pageTwo,pageThree,topHeader, senseObject, simpleObject, tableButton, filterDropdown,dropdownSearch, expandModal, dataService, qlikService) {
            app = angular.module('mashup-app', [
                'ui.router',
                'ui.bootstrap'
            ]);
            
            app.config(routes);
            app.component('pageOne', pageOne);
            app.component('pageTwo', pageTwo);
            app.component('pageThree', pageThree);

            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);
            app.component('simpleObject',simpleObject);
            app.component('expandModal',expandModal);

            app.component('tableButton',tableButton);


            app.component('filterDropdown', filterDropdown);
            app.component('dropdownSearch',dropdownSearch);

            
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);



            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, appId, config);
            }]);
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});