define( 'pageOne',function () {
    
        function pageOne() {
            pageOneController.$inject = ['dataService','qlikService'];
            function pageOneController(dataService,qlikService) {
                var vm = this;
                init();

                
    
                function init() {
                }
            }
            return {
                bindings: {},
                controller: pageOneController,
                controllerAs: 'cf',
                templateUrl: 'app/components/page1/page1.component.html'
            }
        }

        return pageOne();
    });