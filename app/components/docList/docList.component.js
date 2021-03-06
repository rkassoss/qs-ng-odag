(function () {
    'use strict';

    define('docList',function(){
        function docList() {
            docListController.$inject = ['qlikService'];
            function docListController(qlikService){
                var vm = this;
                var objectId;
                
                init();

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
                        objectId = reply.qInfo.qId;
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
    
                function init(){
                    getDocs();
                }


                vm.$onDestroy = function(){
                    console.log("Destroy object: "+objectId);
                    qlikService.getApp().destroySessionObject(objectId);
                }
            }
    
            return {
                bindings: {},
                controller: docListController,
                controllerAs: 'dl',
                templateUrl: '/app/components/docList/docList.component.html'
            }
        }

        return docList();
        
    });


    

} ());