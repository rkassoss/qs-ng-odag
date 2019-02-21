var qlikObject;

// var config = {
//      host: 'localhost',
//      prefix: '/',
//      port: 4848,
//      isSecure: false
// };
// var appId = 'Kinesis.qvf';

var config = { // Ran K - QS November 2018 Patch 1
  host: 'qmi-qs-odag',
  prefix: '/',
  port: 443,
  isSecure: true
};
var appId = 'cd6fead1-9d81-435f-abfa-ef572f244d2f';

// var config = { // Ran K - QS June 2018 Patch 1
//     host: 'qmi-qs-ticket',
//     prefix: '/o365/',
//     port: 443,
//     isSecure: true
//   };
// var appId = '056af7a2-921f-46ce-89d1-6482b2f6461b';


require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    paths: {
        'ui.router': '/bower_components/angular-ui-router/release/angular-ui-router',
        'uibootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        // 'uibootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min',
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
            'home',
            'occupancy',
            'topHeader',
            'senseObject', 
            'simpleObject',
            'nakedKpi',
            'kpiBox',
            'filterDropdown',
            'dropdownSearch',
            'simpleTable',
            'expandModal',
            'createBookmarkModal',
            'dataService', 
            'qlikService',
            'currentSelectionsService',
            'filterDropdownService'
    ],
        function (angular, uiRoute, uibootstrap, routes, 
            home, occupancy, 
            topHeader, senseObject, simpleObject,nakedKpi, kpiBox, filterDropdown,dropdownSearch,simpleTable, expandModal, createBookmarkModal, dataService, qlikService,currentSelectionsService, filterDropdownService ) {
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
            app.component('home',home);
            app.component('occupancy',occupancy);

            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);
            app.component('simpleObject',simpleObject);
            app.component('nakedKpi',nakedKpi);
            app.component('expandModal',expandModal);
            app.component('createBookmarkModal',createBookmarkModal);

            app.component('kpiBox',kpiBox);


            app.component('filterDropdown', filterDropdown);
            app.component('dropdownSearch',dropdownSearch);
            app.component('simpleTable',simpleTable);
            
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.service('currentSelectionsService',currentSelectionsService);
            app.service('filterDropdownService',filterDropdownService);

            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, appId, config);
                qlikObject = qlik;
            }]);

            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});