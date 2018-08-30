define( 'senseObject',function () {
    
    function pageOne() {
        senseObjectController.$inject = ['dataService','qlikService'];
        function senseObjectController(dataService,qlikService) {
            var vm = this;
            init();


            function getQlikObject() {
                qlikService.getApp()
                .visualization.get(vm.qlikId).then(function(vis){
                    vis.show(vm.qlikId);
                    console.log(vis);
                });
            }

            

            function init() {

                getQlikObject();
                
            }
        }
        return {
            bindings: {
                qlikId: '@'
            },
            controller: senseObjectController,
            controllerAs: 'cf',
            templateUrl: 'app/directives/senseObject/senseObject.directive.html'
        }
    }

    return pageOne();
});