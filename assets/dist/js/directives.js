(function () {
    'use strict';


        define( 'senseObject',function () {
            
            function senseObject() {
                senseObjectController.$inject = ['dataService','qlikService'];
                function senseObjectController(dataService,qlikService) {
                    var vm = this;


                    vm.exportToExcel = exportToExcel;

                    function exportToExcel() {
                        console.log(vm.table.exportData());
                        vm.table.exportData().then(function(reply){
                            console.log(reply);
                            var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");
                            var link = reply.qUrl;
                            window.open(baseUrl+link,'_blank');
                        });
                    }
                    


                    function getQlikObject() {
                        qlikService.getApp()
                        .visualization.get(vm.qlikId).then(function(vis){
                            vis.show(vm.qlikId);
                            vm.table = vis.model;
                        });
                    }

                    
                    this.$onInit = function() {
                        setTimeout(function() {
                            getQlikObject();
                        }, 300)
                    }
                }
                return {
                    bindings: {
                        qlikId: '@'
                    },
                    controller: senseObjectController,
                    controllerAs: 'so',
                    templateUrl: '/app/directives/senseObject/senseObject.directive.html'
                }
            }

            return senseObject();
        });
} ());