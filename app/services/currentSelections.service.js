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