define( 'pageOne',function () {
    
        function pageOne() {
            pageOneController.$inject = ['dataService','qlikService'];
            function pageOneController(dataService,qlikService) {
                var vm = this;
                init();
    
                function init() {
                    qlikService.getApp()
                    .visualization.get('JARjh').then(function(vis){
                        vis.show("obj1");
                    });
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