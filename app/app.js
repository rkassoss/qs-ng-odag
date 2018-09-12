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


// trueview server (Nov 2017 Patch 3) does not respond to "Alow-Access-Control-Origin:*" and Whitelisting the mashup web server from the QMC under virtual proxy.
// to overide this we define the schema ourselves below and add the extension name to the array "extList" in line 96.
// Idealy should be resoplved from the qmc as noted and remove the below code lines 49-114.
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
            'dashboard',
            'pageTwo',
            'reloadTime',
            'topHeader',
            'senseObject', 
            'simpleObject',
            'docList',
            'tableButton',
            'filterDropdown',
            'dropdownSearch',
            'simpleTable',
            'expandModal',
            'dataService', 
            'qlikService',
            'currentSelectionsService'
    ],
        function (angular, uiRoute, uibootstrap, routes,dashboard,pageTwo, reloadTime,topHeader, senseObject, simpleObject,docList, tableButton, filterDropdown,dropdownSearch,simpleTable, expandModal, dataService, qlikService,currentSelectionsService) {

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
            app.component('pageTwo',pageTwo);

            app.component('reloadTime',reloadTime);

            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);
            app.component('simpleObject',simpleObject);
            app.component('docList',docList);
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