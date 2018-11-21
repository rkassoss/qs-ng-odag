(function () {
    'use strict';

    define('nakedKpi',function(){
        function nakedKpi() {
            nakedKpiController.$inject = ['qlikService'];
            function nakedKpiController(qlikService){
                var vm = this;
                var object;

                function getKpi() {
                    qlikService.getApp().visualization.get(vm.objectId).then(function(vis){
                        object = vis;
                        vm.value = vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qNum;
                        vm.label = vis.model.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
                        vm.numFormat = vis.model.layout.qHyperCube.qMeasureInfo[0].qNumFormat;
                        // todo: leverage formatting attr from qs
                        // console.log(vm.numFormat);
                    });
                }
                
                vm.$onInit = function() {
                    setTimeout(function(){
                        getKpi()
                    },300);
                }

                vm.$onDestroy = function() {
                    object.close();
                }
            }
    
            return {
                bindings: {
                    objectId: '@',
                    objectClass: '@'
                },
                controller: nakedKpiController,
                controllerAs: 'nk',
                templateUrl: '/app/components/nakedKpi/nakedKpi.component.html'
            }
        }

        return nakedKpi();
    });


    

} ());