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
                    console.log(layout);
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

    define('expandModal', expandModal());
    function expandModal() {
        expandModalController.$inject = ['qlikService','$uibModal', '$log', '$document']
        function expandModalController(qlikService, $uibModal, $document){
            var vm = this;
            vm.closeModal = closeModal;
            
            function closeModal() {
                vm.dismiss({$value: 'cancel'});  
            }
            init();

            function init(){
                qlikService.getApp().getObject(document.getElementById('modal_object'),vm.resolve.qlikId);
            }
            vm.$onDestroy = function() {
                // destroy object please
                vm = null;
                // console.log("Destroying Object");
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