define('currentSelectionsService', function () {

    currentSelectionsService.$inject = ['qlikService','$q'];
    function currentSelectionsService(qlikService,$q) {

        var service = this;

        service.getCurrentSelections = getCurrentSelections;
        service.clearSelection = clearSelection;
        service.clearAll = clearAll;

        function getCurrentSelections() {
            var _numberOfSelections, _selections;
                qlikService.getApp().getList("CurrentSelections",function(reply) {
                    // console.log(reply);
                    _selections = reply.qSelectionObject.qSelections;
                    service.selections = _selections;

                    $.each(_selections, function(item,value){
                        console.log(value);
                        if (value.qField === 'Unit_Name') {
                            // $.each(value.qSelected, function(sel){
                            //     console.log(sel);
                            // });
                            service.noOfSel = value.qStateCounts.qSelected;
                            service.clientName = value.qSelected;
                        }
                    })
                    _numberOfSelections = _selections.length;
                    service.numberOfSelections = _numberOfSelections;
                    // console.log(_numberOfSelections);


                });
        }

        function clearSelection(qField) {
            console.log(qField);
            qlikService.getApp().field(qField).clear();
            service.currentSelection = "";
        }
        
        function clearAll(state) {
            qlikService.getApp().clearAll(state);
        }


    }

    return currentSelectionsService;
});
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