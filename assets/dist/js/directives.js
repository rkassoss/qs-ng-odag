(function () {
    'use strict';


        define( 'senseObject',function () {
            
            function senseObject() {
                senseObjectController.$inject = ['dataService','qlikService'];
                function senseObjectController(dataService,qlikService) {
                    var vm = this;
                    


                    function getQlikObject() {
                        qlikService.getApp()
                        .visualization.get(vm.qlikId).then(function(vis){
                            vis.show(vm.qlikId);
                            console.log(vis);
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