define( 'pageTwo',function () {

    function pageTwo() {
        pageTwoController.$inject = ['dataService', 'qlikService'];
        function pageTwoController(dataService,qlikService) {
            var vm = this;
            init();
            
            function init() {
                qlikService.getApp()
                .visualization.get('JARjh').then(function(vis){
                    vis.show("obj2");
                });
                console.log('ok');
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
define( 'pageOne',function () {
    
        function pageOne() {
            function pageOneController() {
                var vm = this;
                init();
                
    
                function init() {
                }
            }
            return {
                bindings: {},
                controller: pageOneController,
                controllerAs: 'cf',
                templateUrl: 'app/views/page1/page1.component.html'
            }
        }

        return pageOne();
    });
define('pageThree', function(){
    function pageThree() {

        function pageThreeController(){
            var vm = this;
            
            init();

            function init(){

            }
        }

        return {
            bindings: {},
            controller: pageThreeController,
            controllerAs: 'p3',
            templateUrl: '/app/views/page3/page3.component.html'
        }
    }
    return pageThree();
});