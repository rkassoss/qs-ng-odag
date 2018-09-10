(function () {
    'use strict';

    define('dashboard',function(){
        function dashboard() {
            dashboardController.$inject = ['qlikService','currentSelectionsService'];
            function dashboardController(qlikService, currentSelectionsService){
                var vm = this;
                vm.currentSelectionsService = currentSelectionsService;

    


                function getDocs() {
                    qlikService.getApp().createCube({
                        qDimensions : [{
                            qDef : {
                                qFieldDefs : ["NAME"]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : ["URL"]
                            }
                        }],
                        qMeasures : [{
                            qDef : {
                                qDef : "1"
                            }
                        }],
                        qInitialDataFetch : [{
                            qTop : 0,
                            qLeft : 0,
                            qHeight : 100,
                            qWidth : 2
                        }]
                    }, function(reply) {
                        // console.log(reply);
                        vm.docs = [];
                        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
                            if(!value[0].qIsNull && !value[1].qIsNull){
                                vm.docs.push({
                                    'docname' : value[0].qText,
                                    'url' : value[1].qText
                                });
                            }
                                
                        });
                        // console.log(vm.docs);
                    });
                }

                init();

                function init(){
                    getDocs();
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