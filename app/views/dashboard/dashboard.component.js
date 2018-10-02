(function () {
    'use strict';

    define('dashboard',function(){
        function dashboard() {
            dashboardController.$inject = ['qlikService'];
            function dashboardController(qlikService){
                var vm = this;
                

                vm.string = 'test';



                vm.submit = function() {
                    vm.string = vm.string.split(",");
                    qlikService.getApp().field('Unit_Name').selectValues(vm.string);
                };
                

                init();

                function init(){
                }
            }
    
            return {
                bindings: {},
                controller: dashboardController,
                controllerAs: 'dash',
                templateUrl: '/app/views/dashboard/dashboard.component.html'
            }
        }
        return dashboard();
    });


    

} ());