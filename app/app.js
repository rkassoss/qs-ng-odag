var qlikObject;

// var config = {
//      host: 'localhost',
//      prefix: '/',
//      port: 4848,
//      isSecure: false
//  };
// var appId = 'Helpdesk Management.qvf';

var config = { // Ran K - June 2018 QS
   host: 'qmi-qs-ticket',
   prefix: '/',
   port: 443,
   isSecure: true
};
var appId = '9e7ee2b6-87d6-4a54-a61e-239cad9e5e19';


// var config = { // TrueView Server - November 2017 Patch 3
//     host: 'strueview-analytics.deloitte.com',
//     prefix: '/',
//     port: 443,
//     isSecure: true
//  };
//  var appId = '84fed9d2-a13d-4b9b-9d32-017b63e68330';



require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    paths: {
        'ui.router': '/bower_components/angular-ui-router/release/angular-ui-router',
        'uibootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min',
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    }
});

// bootstrap the app
require(["js/qlik"], function (qlik) {
    require(["angular",
            'ui.router',
            'uibootstrap',
            "routes", 
            'dashboard',
            'reloadTime',
            'topHeader',
            'senseObject', 
            'simpleObject',
            'tableButton',
            'filterDropdown',
            'dropdownSearch',
            'simpleTable',
            'expandModal',
            'dataService', 
            'qlikService',
            'currentSelectionsService'
    ],
        function (angular, uiRoute, uibootstrap, routes,dashboard, reloadTime,topHeader, senseObject, simpleObject, tableButton, filterDropdown,dropdownSearch,simpleTable, expandModal, dataService, qlikService,currentSelectionsService) {

            app = angular.module('mashup-app', [
                'ui.router',
                'ui.bootstrap'
            ]).config(['$compileProvider',
            function( $compileProvider ) {   
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:application\//);
              $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|cust-scheme):/);
              $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            }
            ]);
            
            app.config(routes);
            app.component('dashboard',dashboard);

            app.component('reloadTime',reloadTime);

            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);
            app.component('simpleObject',simpleObject);
            app.component('expandModal',expandModal);

            app.component('tableButton',tableButton);


            app.component('filterDropdown', filterDropdown);
            app.component('dropdownSearch',dropdownSearch);
            app.component('simpleTable',simpleTable);
            
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.service('currentSelectionsService',currentSelectionsService);



            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, appId, config);
                qlikObject = qlik;
            }]);
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});