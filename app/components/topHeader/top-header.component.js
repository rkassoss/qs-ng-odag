define( 'topHeader',function () {
    
    function topHeader() {
        topHeaderController.$inject = ['dataService','qlikService'];
        function topHeaderController(dataService,qlikService) {
            var vm = this;

            vm.toggleSidebar = toggleSidebar;
            vm.toggleNav = toggleNav;

            vm.sidebarIn = false;
            vm.navigation = false;

            function toggleNav() {
                vm.navigation = !vm.navigation;
            }

            function toggleSidebar() {
                vm.sidebarIn = !vm.sidebarIn;
            }

            function dataLastFrom() {
                qlikService.getApp().getAppLayout(function(layout){
                    // console.log(layout);
                    vm.relaodTime = layout.qLastReloadTime;
                });
            }

            function getFilters() {
                qlikService.getApp().getObject('nativeFilters','ycppXj').then(function(reply){
                    console.log(reply);
                    reply.layout.showTitles = false;
                    reply.Validated.bind(function(){
                        reply.layout.showTitles = false;
                    });
                });
            }

            init();
            function init() {
                dataLastFrom();
                getFilters();
                qlikService.getApp().getObject('CurrentSelections','CurrentSelections');
            }
        }
        return {
            bindings: {},
            controller: topHeaderController,
            controllerAs: 'th',
            templateUrl: 'app/components/topHeader/topHeader.component.html'
        }
    }

    return topHeader();
});