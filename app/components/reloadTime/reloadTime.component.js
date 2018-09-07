(function () {
    'use strict';

    define('reloadTime',function(){
        function reloadTime() {
            reloadTimeController.$inject = ['qlikService'];
            function reloadTimeController(qlikService){
                var vm = this;
    
                function dataLastFrom() {
                    qlikService.getApp().getAppLayout(function(layout){
                        // console.log(layout);
                        vm.relaodTime = layout.qLastReloadTime;
                    });
                }
                
                init();
    
                function init(){
                    dataLastFrom();
                }
            }
    
            return {
                bindings: {},
                controller: reloadTimeController,
                controllerAs: 'rt',
                templateUrl: '/app/components/reloadTime/reloadTime.component.html'
            }
        }
        return reloadTime();
    });

} ());