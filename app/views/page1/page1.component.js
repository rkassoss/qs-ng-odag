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