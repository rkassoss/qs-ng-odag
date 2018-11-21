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

    define('occMarketValue',function(){
        function occMarketValue() {
            occMarketValueController.$inject = ['qlikService','currentSelectionsService'];
            function occMarketValueController(qlikService, currentSelectionsService){
                var vm = this;
                init();
                vm.currentSelectionsService = currentSelectionsService;
              
                function init(){
                    currentSelectionsService.getCurrentSelections();
                }
            }
    
            return {
                bindings: {},
                controller: occMarketValueController,
                controllerAs: 'omv',
                templateUrl: '/app/views/occupancy/occMarketValue.component.html'
            }
        }
        return occMarketValue();
    });


    

} ());