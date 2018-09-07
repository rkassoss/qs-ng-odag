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
(function () {
    'use strict';

    define('dashboard',function(){
        function dashboard() {
            dashboardController.$inject = ['qlikService','currentSelectionsService'];
            function dashboardController(qlikService, currentSelectionsService){
                var vm = this;
                
                init();

                // vm.selState = qlikService.getApp().selectionState( );
                // var listener = function() {
                //     // vm.selState.OnData.unbind( listener );
                //     console.log(vm.selState);
                // };
                // vm.selState.OnData.bind( listener );



                function getIBMContacts() {
                    qlikService.getApp().createCube({
                        qDimensions : [{
                            qDef : {
                                qFieldDefs : ["IBM_User_Name"]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : ["user_Title"]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : ["IBM_Contact_Email"]
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
                            qHeight : 1,
                            qWidth : 3
                        }]
                    }, function(reply) {
                        vm.ibmContacts = [];
                        // console.log(reply);
                        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
                                vm.ibmContacts.push({
                                    'user' : value[0].qText,
                                    'title' : value[1].qText,
                                    'email' : value[2].qText
                                });
                        });
                    });
                }


                function getDelContacts() {
                    qlikService.getApp().createCube({
                        qDimensions : [{
                            qDef : {
                                qFieldDefs : ["Deloitte_User_Name"]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : ["_Deloitte_user_Title"]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : ["Deloitte_Email_Key"]
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
                            qHeight : 1,
                            qWidth : 3
                        }]
                    }, function(reply) {
                        vm.delContacts = [];
                        // console.log(reply);
                        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
                                vm.delContacts.push({
                                    'user' : value[0].qText,
                                    'title' : value[1].qText,
                                    'email' : value[2].qText
                                });
                        });
                    });
                }


    
                function init(){
                    getIBMContacts();
                    getDelContacts();
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