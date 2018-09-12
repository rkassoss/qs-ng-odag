define('currentSelectionsService', function () {

    currentSelectionsService.$inject = ['qlikService','$q'];
    function currentSelectionsService(qlikService,$q) {

        var service = this;

        service.getCurrentSelections = getCurrentSelections;

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
        

    }

    return currentSelectionsService;
});