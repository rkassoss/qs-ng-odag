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
                vm.isCollapsed =vm.animateNow = true;

                var tableObject;

                
                init();

                vm.revealTable = revealTable;



                function getQlikTable(qlikId) {
                    qlikService.getApp().visualization.get(qlikId).then(function(table){
                        table.show('qlikTable');
                        tableObject = table;
                    });
                }

                function revealTable() {
                    vm.isCollapsed = !vm.isCollapsed;
                    console.log(vm.isCollapsed);
                    if (!vm.isCollapsed) {
                        getQlikTable('rJFbvG');
                        setTimeout(function() {
                            vm.animateNow = false;
                        }, 300)
                    } else {
                        tableObject.close();
                        vm.animateNow = true;
                    }
                }
    
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