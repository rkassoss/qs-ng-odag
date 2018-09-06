(function () {
    'use strict';

    define('tableButton', function(){
        function tableButton() {
            tableButtonController.$inject = ['qlikService'];
            function tableButtonController(qlikService){
                var vm = this;
                vm.exportToExcel = exportToExcel;
                
                vm.isCollapsed =vm.animateNow = true;
                var tableObject;
                vm.revealTable = revealTable;

                function exportToExcel() {
                    tableObject.model.exportData()
                        .then(function(reply){
                            console.log(reply);
                            var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");
                            var link = reply.qUrl;
                            window.open(baseUrl+link,'_blank');
                        });
                }



                function getQlikTable(qlikId) {
                    qlikService.getApp().visualization.get(qlikId).then(function(table){
                        console.log(table);
                        vm.title = table.model.layout.title;
                        table.show(vm.tableId);
                        tableObject = table;
                    });
                }

                function revealTable() {
                    vm.isCollapsed = !vm.isCollapsed;
                    console.log(vm.isCollapsed);
                    if (!vm.isCollapsed) {
                        getQlikTable(vm.tableId);
                        setTimeout(function() {
                            vm.animateNow = false;
                        }, 300)
                    } else {
                        tableObject.close();
                        vm.animateNow = true;
                    }
                }


                vm.$onInit = function() {

                }

                vm.$onDestroy = function() {
                    tableObject.close();
                }
            }
    
            return {
                bindings: {
                    tableId: '@',
                    buttonText: '@'
                },
                controller: tableButtonController,
                controllerAs: 'tb',
                templateUrl: '/app/components/tableButton/tableButton.component.html'
            }
        }
        return tableButton();
    });


    

} ());