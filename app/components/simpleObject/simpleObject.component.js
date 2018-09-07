(function () {
    'use strict';

    define('simpleObject',function(){
        function simpleObject() {
            simpleObjectController.$inject = ['qlikService'];
            function simpleObjectController(qlikService){
                var vm = this;
                var object;

                function getKpi() {
                    qlikService.getApp().getObject(vm.objectId,vm.objectId).then(function(vis){
                        object = vis;
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
                controller: simpleObjectController,
                controllerAs: 'so',
                templateUrl: '/app/components/simpleObject/simpleObject.component.html'
            }
        }

        return simpleObject();
    });


    

} ());