(function () {
    'use strict';

    define('dashboard',function(){
        function dashboard() {

            function dashboardController(){
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