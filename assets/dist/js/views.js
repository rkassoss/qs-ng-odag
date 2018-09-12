(function () {
    'use strict';

    define('dashboard',function(){
        function dashboard() {
            dashboardController.$inject = ['qlikService'];
            function dashboardController(qlikService){
                var vm = this;
                
                

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
define( 'pageTwo',function () {

    function pageTwo() {
        pageTwoController.$inject = ['dataService', 'qlikService'];
        function pageTwoController(dataService,qlikService) {
            var vm = this;
            init();
            
            function init() {
            }
        }
        return {
            bindings: {},
            controller: pageTwoController,
            controllerAs: 'cf',
            templateUrl: 'app/views/page2/page2.component.html'
        }
    }

    return pageTwo();
});