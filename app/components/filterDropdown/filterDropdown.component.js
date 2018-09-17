(function () {
    'use strict';

    define('filterDropdown',function() {
        
        function filterDropdown() {
                filterDropdownController.$inject = ["qlikService","filterDropdownService"];
                function filterDropdownController(qlikService, filterDropdownService){
                    var vm = this;
                    var objectId;

                    if (!vm.fieldLabel) {
                        vm.fieldLabel = vm.fieldName;
                    }

                    vm.filterDropdownService = filterDropdownService;
                    vm.fetchValues = fetchValues;

                    // vm.addToSelection = addToSelection;
                    // vm.applySelection = applySelection;
                    // vm.cancelSelection = cancelSelection;
                    
                    vm.applySingleSelection = applySingleSelection;

                    vm.selectionArray = [];

                    // function addToSelection(value) { // future=> add multiple selection options
                    //     var indexOfVal = vm.selectionArray.indexOf(value);
                    //     if(indexOfVal !== -1) { // if value is already in - remove it
                    //         vm.selectionArray.splice(indexOfVal, 1);
                    //     } else {
                    //         vm.selectionArray.push(value); // if not - add
                    //     }
                    //     console.log(vm.selectionArray);
                    // }
                    // function applySelection(array) { // future=> add multiple selection options
                    //     // console.log(array);
                    //     qlikService.getApp().field(vm.fieldName).clear().then(function(r){
                    //         qlikService.getApp().field(vm.fieldName).selectValues(array,true,true);
                    //     });
                    // }
                    // function cancelSelection() { // future=> add multiple selection options
                    //     vm.selectionArray = [];
                    // }

                    function applySingleSelection(value) { // present=> single selection
                        // console.log(array);
                        qlikService.getApp().field(vm.fieldName).selectMatch(value);
                    }

                    function fetchValues() {
                        // console.log(vm.fieldName);
                        qlikService.getApp().createList({
                            "qDef": {
                                "qFieldDefs": [vm.fieldName],
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
                            console.log(reply.qListObject.qDataPages);
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
                        fieldName: '@',
                        fieldLabel: '@'
                    },
                    controller: filterDropdownController,
                    controllerAs: 'fd',
                    templateUrl: '/app/components/filterDropdown/filterDropdown.component.html'
                }
        }

        return filterDropdown();
    });

} ());