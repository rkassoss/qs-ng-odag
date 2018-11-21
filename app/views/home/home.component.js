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