(function () {
    'use strict';

    define('simpleTable', function(){
        function simpleTable() {
            simpleTableController.$inject = ['qlikService','currentSelectionsService'];
            function simpleTableController(qlikService, currentSelectionsService){
                var vm = this;
                vm.currentSelectionsService = currentSelectionsService;

                var objectId;
    
                function getContacts(field1,field2, field3) {
                    qlikService.getApp().createCube({
                        qDimensions : [{
                            qDef : {
                                qFieldDefs : [field1]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : [field2]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : [field3]
                            }
                        }],
                        qMeasures : [{
                            qDef : {
                                qDef : "1"
                            }
                        }],
                        qInitialDataFetch : [{
                            qTop : 0,
                            qLeft : 0,
                            qHeight : 1,
                            qWidth : 3
                        }]
                    }, function(reply) {
                        // console.log(reply);
                        objectId = reply.qInfo.qId;
                        vm.contacts = [];
                        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
                            if(!value[2].qIsNull){
                                vm.contacts.push({
                                    'user' : value[0].qText,
                                    'title' : value[1].qText,
                                    'email' : value[2].qText
                                });
                            }
                        });
                    });
                }
    
                init();
    
                function init(){
                    currentSelectionsService.getCurrentSelections();
    
                    getContacts(vm.userField,vm.titleField,vm.emailField);
                }

                vm.$onDestroy = function() {
                    console.log("Destroy obejct:"+objectId);
                    qlikService.getApp().destroySessionObject(objectId);
                }
            }
    
            return {
                bindings: {
                    userField : '@',
                    titleField : '@',
                    emailField : '@',
                    title : '@'
                },
                controller: simpleTableController,
                controllerAs: 'st',
                templateUrl : '/app/components/simpleTable/simpleTable.component.html'
            }
        }
        return simpleTable();
    });
} ());