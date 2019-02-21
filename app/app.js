var qlikObject;

// var config = {
//      host: 'localhost',
//      prefix: '/',
//      port: 4848,
//      isSecure: false
// };
// var appId = 'Kinesis.qvf';

var config = { // Ran K - April 2018 QS
  host: 'qmi-qs-odag',
  prefix: '/',
  port: 443,
  isSecure: true
};
var appId = 'cd6fead1-9d81-435f-abfa-ef572f244d2f';


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

// server does not respond to "Alow-Access-Control-Origin:*" and Whitelisting the mashup web server from the QMC under virtual proxy.
// to overide this we define the schema ourselves below and add the extension name to the array "extList" in line 96.
// Idealy should be resolved from the qmc as noted and remove the below code lines 49-114.
require.undef("general.services/content-api/content-api");
define("general.services/content-api/content-api", ["qvangular", "core.utils/deferred", "translator", "xsrfplugin", "require"], function(a, b, c, d, e) {
        a.service("$contentApi", ["$http", function(f) {
            function g(a) {
                a.headers || (a.headers = {})
            }

            function h(a) {
                a.params || (a.params = {})
            }

            function i(a) {
                var b = d.getRandomString(16);
                return a.headers["X-Qlik-XrfKey"] = b, a.params.xrfkey = b, a
            }

            function j(a) {
                var b = e.toUrl(""),
                    c = b.indexOf("/resources");
                return c > -1 && (b = b.substring(0, c)), a.url = b + a.url, a
            }

            function k(a) {
                var b = c.language;
                return b && (a.headers["Accept-Language"] = "pseudo" !== b ? b : "qps-ploc"), a
            }

            function l(b) {
                return g(b), h(b), a.$rootScope.isPersonalMode || i(b), j(b), k(b), f(b)
            }

            function m() {
                var a = new b,
                    c = {
                        method: "GET",
                        url: "/qrs/extension/schema"
                    };
                return l(c).then(function(b) {
                    var c = b.data;
                    a.resolve(c)
                }).catch(function(b) {
                    var c = b.data;
                    a.reject(c)
                }), a.promise
            }

            function m1(){
                var a = new b;
                var extList = ["VizlibFilter"];

                var ext = {};
                extList.forEach(function(e){
                    ext[e] = {type: 'visualization'};
                });

                a.resolve(ext)
                return a.promise;
            }

            return {
                getExtensions: m1,                
                getExtensions1: m,
                request: l
            }
        }])
    });



// bootstrap the app
require(["js/qlik"], function (qlik) {
    require(["angular",
            'ui.router',
            'uibootstrap',
            "routes", 
            'home',
            'occupancy',
            'occMarketValue',
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
            home, occupancy, occMarketValue, 
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
            app.component('occMarketValue',occMarketValue);

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