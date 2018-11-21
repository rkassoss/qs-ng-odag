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
                    service.assetName = false;

                    $.each(_selections, function(item,value){
                        // console.log(value);
                        if (value.qField === "Asset Name") {
                            // $.each(value.qSelected, function(sel){
                            //     console.log(sel);
                            // });
                            service.noOfAssetSel = value.qStateCounts.qSelected;
                            if (service.noOfAssetSel === 1) {
                                service.assetName = value.qSelected;
                            }
                        }
                    })
                    _numberOfSelections = _selections.length;
                    service.numberOfSelections = _numberOfSelections;
                    // console.log(_numberOfSelections);
                });
        }

        function clearSelection(qField) {
            // console.log(qField);
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
           

            var url = '/assets/app-data/';
            var navLinks = url.concat('reports.json');

            service.getNavLinkData = getNavLinkData;
    
            function getNavLinkData() {
                var promise = $http.get(navLinks);
                return promise;
            }
           
        }

        return dataRetrieval;
})
 
define('filterDropdownService',function(){
    function filterDropdownService() {
        var service = this;
  
        service.toggleDDFilters = toggleDDFilters;
        service.closeAllFilters = closeAllFilters;

        function toggleDDFilters(itemId) {
            // console.log('set itemId: '+itemId);
            // console.log('previuos: '+service.currentItem);
            if (itemId === service.currentItem) {
                service.currentItem = null;
            } else {
                service.currentItem = itemId;
            }
        }

        function closeAllFilters() {
            service.currentItem = null;
        }
    }
    return filterDropdownService;
});
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
            // console.log('in');
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