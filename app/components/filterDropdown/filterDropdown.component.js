(function () {
    'use strict';

    define('filterDropdown',function() {
        
        function filterDropdown() {
                filterDropdownController.$inject = ["qlikService"];
                function filterDropdownController(qlikService){
                    var vm = this;
                    var objectId;

                    vm.fetchValues = fetchValues;
                    vm.applySelection = applySelection;


                    function applySelection(value) {
                        console.log(value);
                        qlikService.getApp().field(vm.fieldName).selectMatch(value);
                        vm.activeSelection = value;
                    }

                    function fetchValues() {
                        qlikService.getApp().createList({
                            "qDef": {
                                "qFieldDefs": ["["+ vm.fieldName +"]"],
                                "qSortCriterias": [{
                                    "qSortByLoadOrder"  : 0,
                                    "qSortByAscii" : 1
                                }]
                            },
                            "qAutoSortByState": {
                                qDisplayNumberOfRows: 1
                            },
                            "qInitialDataFetch": [{
                                qTop : 0,
                                qLeft : 0,
                                qHeight : 250,
                                qWidth : 1
                            }]
                        }, function(reply) {
                            console.log(reply);
                            objectId = reply.qInfo.qId;
                            vm.rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix);
                        });
                    }

                

                    vm.$onInit = function() {
                        fetchValues();
                    }


                    vm.$onDestroy = function() {
                        console.log('destroy list'+ objectId);
                        qlikService.getApp().destroySessionObject(objectId);
                    }


                    vm.$onChanges = function(changes) {
                        
                    }
                }
        
                return {
                    bindings: {
                        fieldName: '@'
                    },
                    controller: filterDropdownController,
                    controllerAs: 'fd',
                    templateUrl: '/app/components/filterDropdown/filterDropdown.component.html'
                }
        }

        return filterDropdown();
    });

} ());