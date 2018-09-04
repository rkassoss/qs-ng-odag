define( 'dataService',function () {
     
    
        dataRetrieval.$inject = ['$http'];
        function dataRetrieval($http) {
            var service = this;
            var data = 'test';
            service.getListData = getListData;
           service.setData = setData;
    
            function getListData() {
                return data;
            }
            function setData(val){
                data = val;
            }
           
        }

        return dataRetrieval;
})
 
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