define( 'pageOne',function () {
    
        function pageOne() {
            pageOneController.$inject = ['qlikService'];
            function pageOneController(qlikService) {
                var vm = this;
                
                init();

    
                function init() {
                }
            }
            return {
                bindings: {},
                controller: pageOneController,
                controllerAs: 'po',
                templateUrl: 'app/views/page1/page1.component.html'
            }
        }

        return pageOne();
    });