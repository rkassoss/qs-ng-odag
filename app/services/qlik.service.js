define('qlikService', function () {

    function qlikService() {
        var service = this;
        var app;
        var qlik;
        
        service.setQlik = setQlik;
        service.getApp = getApp;
        service.openApp = openApp;

        function openApp(qlik, appId, config) {
            this.app = qlik.openApp(appId, config);
            console.log('in');
        }

        function setQlik(qlikJS) {
            this.qlik = qlikJS;
        }

        function getApp() {
            return this.app;
        }
    }

    return qlikService;
})