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
<<<<<<< HEAD
=======
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
>>>>>>> 58fe6c1adb314daa4c991fbb3fd30552059d5cab
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