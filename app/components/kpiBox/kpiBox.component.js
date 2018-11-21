(function () {
    'use strict';

    define('kpiBox',function(){
        function kpiBox() {
            kpiBoxController.$inject = ['qlikService'];
            function kpiBoxController(qlikService){
                var vm = this;
                var mainObject;
                var objectsToDestroy = [];


                function getMainKpi() {
                    qlikService.getApp().visualization.get(vm.mainKpi).then(function(vis){
                        mainObject = vis;
                        vis.show(vm.mainKpi);
                    });
                }

                function getChangeKpis() {
                    vm.changeKpis = [];
                    angular.forEach(vm.changeKpiId, function(id, key){
                        qlikService.getApp().visualization.get(id).then(function(vis) {
                            objectsToDestroy.push(vis);
                            vis.show(id);
                        });
                    });
                }
                
                vm.$onInit = function() {
                    setTimeout(function() {
                        getMainKpi();
                        getChangeKpis();
                    }, 300);
                }

                vm.$onDestroy = function() {
                    mainObject.close();
                    angular.forEach(objectsToDestroy, function(obj,key){
                        obj.close();
                    });
                }
            }
    
            return {
                bindings: {
                    mainKpi: '@',
                    changeKpiId: '=',
                    styleAtt: '@'
                },
                controller: kpiBoxController,
                controllerAs: 'kb',
                templateUrl: '/app/components/kpiBox/kpiBox.component.html'
            }
        }

        return kpiBox();
    });


    

} ());