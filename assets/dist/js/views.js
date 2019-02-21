(function () {
    'use strict';

    define('home',function(){
        function home() {
            homeController.$inject = ['qlikService'];
            function homeController(qlikService){
                var vm = this;
                init();
                function init(){
                    qlikService.getApp().getAppLayout(function(layout){
                        console.log(layout);
                        vm.relaodTime = layout.qLastReloadTime;
                        vm.appTitle = layout.qTitle;
                        vm.description = layout.description;
                    });
                }
            }
    
            return {
                bindings: {},
                controller: homeController,
                controllerAs: 'home',
                templateUrl: '/app/views/home/home.component.html'
            }
        }
        return home();
    });


    

} ());
(function () {
    'use strict';

    define('occupancy',function(){
        function occupancy() {
            occupancyController.$inject = ['qlikService','currentSelectionsService'];
            function occupancyController(qlikService, currentSelectionsService){
                var vm = this;
                init();
                vm.currentSelectionsService = currentSelectionsService;
              
                function init(){
                    currentSelectionsService.getCurrentSelections();
                }
            }
    
            return {
                bindings: {},
                controller: occupancyController,
                controllerAs: 'occ',
                templateUrl: '/app/views/occupancy/occupancy.component.html'
            }
        }
        return occupancy();
    });
} ());