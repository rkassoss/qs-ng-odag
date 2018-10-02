(function () {
    'use strict';


        define( 'senseObject',function () {
            
            function senseObject() {
                senseObjectController.$inject = ['dataService','qlikService','$uibModal'];
                function senseObjectController(dataService,qlikService,$uibModal) {
                    var vm = this;
                    var theObject;

                    var qsVersion = "Sep18";

                    vm.exportToExcel = exportToExcel;
                    vm.expand = expand;
                    vm.exportPdf = exportPdf;
                    vm.exportImg = exportImg;


                    function exportToExcel() {
                        vm.model.exportData()
                            .then(function(reply){
                                console.log(reply);
                                var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");
                                var link = reply.qUrl;
                                window.open(baseUrl+link,'_blank');
                            });
                    }

                    function expand() {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            component: 'expandModal',
                            size: 'lg',
                            resolve: {
                                qlikId: function () {
                                    return vm.qlikId;
                                }
                            }
                        });
                    }

                    function exportImg() {
                        if (qsVersion == 'Sep18') {
                            vm.model.exportImg()
                            .then(function(reply){
                                console.log(reply);
                            });
                        } else {
                            alert('nope');
                        }
                    }

                    function exportPdf() {
                        if (qsVersion == 'Sep18') {
                            console.log(vm.model);
                            vm.model.exportPdf()
                                .then(function(result){
                                    console.log('PDF Link:', result);
                                });
                        } else {
                            alert('nope');
                        }
                    }

                    function getQlikObject() {
                        qlikService.getApp()
                        .visualization.get(vm.qlikId).then(function(vis){
                            // console.log(vis);
                            if(!vm.qlikTitle){
                                vm.title = vis.model.layout.title;
                            } else {
                                vm.title = vm.qlikTitle;
                            }
                           
                            vis.model.layout.showTitles = false;
                            vis.show(vm.qlikId);
                            theObject = vis;
                            vm.model = vis.model;
                        });
                    }

                    
                    vm.$onInit = function() {
                        setTimeout(function() {
                            getQlikObject();
                        }, 300)
                    }


                    vm.$onDestroy = function() {
                        console.log('destroy');
                        theObject.close();
                    }


                    vm.$onChanges = function(changes) {
                        
                    }

                }
                return {
                    bindings: {
                        qlikId: '@',
                        qlikTitle: '@',
                        objectClass: '@',
                        externalUrl: '@',
                        linkLabel: '@'
                    },
                    controller: senseObjectController,
                    controllerAs: 'so',
                    templateUrl: '/app/components/senseObject/senseObject.directive.html'
                }
            }

            return senseObject();
        });
} ());