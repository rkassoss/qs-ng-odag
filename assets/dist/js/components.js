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
define( 'topHeader',function () {
    
    function topHeader() {
        topHeaderController.$inject = ['dataService','qlikService'];
        function topHeaderController(dataService,qlikService) {
            var vm = this;

            vm.toggleSidebar = toggleSidebar;
            vm.toggleNav = toggleNav;

            vm.sidebarIn = false;
            vm.navigation = false;

            function toggleNav() {
                vm.navigation = !vm.navigation;
            }

            function toggleSidebar() {
                vm.sidebarIn = !vm.sidebarIn;
            }

            function dataLastFrom() {
                qlikService.getApp().getAppLayout(function(layout){
                    // console.log(layout);
                    vm.relaodTime = layout.qLastReloadTime;
                });
            }

            function getFilters() {
                qlikService.getApp().getObject('nativeFilters','ycppXj');
            }

            init();
            function init() {
                dataLastFrom();
                getFilters();
                qlikService.getApp().getObject('CurrentSelections','CurrentSelections');
            }
        }
        return {
            bindings: {},
            controller: topHeaderController,
            controllerAs: 'th',
            templateUrl: 'app/components/topHeader/topHeader.component.html'
        }
    }

    return topHeader();
});
(function () {
    'use strict';


        define( 'senseObject',function () {
            
            function senseObject() {
                senseObjectController.$inject = ['dataService','qlikService','$uibModal'];
                function senseObjectController(dataService,qlikService,$uibModal) {
                    var vm = this;
                    var theObject;

                    vm.exportToExcel = exportToExcel;
                    vm.expand = expand;

                    function exportToExcel() {
                        vm.model.exportData()
                            .then(function(reply){
                                console.log(reply);
                                var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");
                                var link = reply.qUrl;
                                window.open(baseUrl+link,'_blank');
                            });
                    }

                    function expand() {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            component: 'expandModal',
                            size: 'lg',
                            resolve: {
                                qlikId: function () {
                                    return vm.qlikId;
                                }
                            }
                        });
                    }


                    function getQlikObject() {
                        qlikService.getApp()
                        .visualization.get(vm.qlikId).then(function(vis){
                            console.log(vis);
                            vis.show(vm.qlikId);
                            theObject = vis;
                            vm.model = vis.model;
                        });
                    }

                    
                    vm.$onInit = function() {
                        setTimeout(function() {
                            getQlikObject();
                        }, 300)
                    }


                    vm.$onDestroy = function() {
                        console.log('destroy');
                        theObject.close();
                    }


                    vm.$onChanges = function(changes) {
                        
                    }

                }
                return {
                    bindings: {
                        qlikId: '@'
                    },
                    controller: senseObjectController,
                    controllerAs: 'so',
                    templateUrl: '/app/components/senseObject/senseObject.directive.html'
                }
            }

            return senseObject();
        });
} ());
(function () {
    'use strict';

    define('expandModal', expandModal());
    function expandModal() {
        expandModalController.$inject = ['qlikService','$uibModal', '$log', '$document']
        function expandModalController(qlikService, $uibModal, $document){
            var vm = this;
            var object;

            vm.closeModal = closeModal;
            
            function closeModal() {
                vm.dismiss({$value: 'cancel'});  
            }
            init();

            function init(){
                qlikService.getApp().getObject(document.getElementById('modal_object'),vm.resolve.qlikId).then(function(vis){
                    object = vis;
                });
            }

            vm.$onDestroy = function() {
                vm = null;
                vis.close();
            }
        }

        return {
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: expandModalController,
            controllerAs: 'em',
            templateUrl: 'app/components/senseObject/expandModal/expandModal.component.html'
        }
    }

} ());