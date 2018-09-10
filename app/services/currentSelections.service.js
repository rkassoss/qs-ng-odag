define('currentSelectionsService', function () {

    currentSelectionsService.$inject = ['qlikService','$q'];
    function currentSelectionsService(qlikService,$q) {

        var service = this;

        service.getCurrentSelections = getCurrentSelections;
        service.getCurrentSelectionByField = getCurrentSelectionByField;
        service.clearSelection = clearSelection;
        service.selectField = selectField;

        function getCurrentSelections() {
            var _numberOfSelections, _selections;
                qlikService.getApp().getList("CurrentSelections",function(reply) {
                    // console.log(reply);
                    _selections = reply.qSelectionObject.qSelections;
                    service.selections = _selections;
                    _numberOfSelections = _selections.length;
                    service.numberOfSelections = _numberOfSelections;
                    // console.log(_numberOfSelections);
                });
        }
        function getCurrentSelectionByField(field){
            var _selection;
            if(service.selections.length > 0) {
                for (var index = 0; index < service.selections.length; index++) {
                    var element = service.selections[index];
                    _selection = element.qSelected;
                    return _selection;
                }
                return _selection;
            } else {
                return '';
            }
        }
        function clearSelection(qField) {
            service.industryClass = service.industryName.toLowerCase().replace(/ /g,"-");
            qlikService.getApp().field(qField).clear();
            service.currentSelection = "";
        }
        function selectField(item, field) {
                service.industryClass = service.industryName.toLowerCase().replace(/ /g,"-");
                qlikService.getApp().field(field).selectMatch(item.qText).then(function() {
                    
                });
        }
    }

    return currentSelectionsService;
});