define( 'topHeader',function () {
    
    function topHeader() {
        topHeaderController.$inject = ['dataService','qlikService','currentSelectionsService','$transitions'];
        function topHeaderController(dataService,qlikService, currentSelectionsService, $transitions) {
            var vm = this;

            vm.toggleSidebar = toggleSidebar;
            vm.toggleNav = toggleNav;

            vm.currentSelectionsService = currentSelectionsService;

            vm.sidebarIn = false;
            vm.navigation = false;

            vm.pageTitle = 'Review Status';

            $transitions.onSuccess({}, function(transition) {
                vm.pageTitle = transition.to().title;
                console.log(
                    "Successful Transition from " + transition.from().title +
                    " to " + transition.to().title
                );
            });


            function toggleNav() {
                vm.navigation = !vm.navigation;
                // console.log(vm.navigation);
                $('#viewWrap').toggleClass('move');
                qlikObject.resize();
            }

            function toggleSidebar() {
                vm.sidebarIn = !vm.sidebarIn;
            }
            
            init();
            function init() {
                // qlikService.getApp().getObject('CurrentSelections','CurrentSelections');
                currentSelectionsService.getCurrentSelections();
                qlikService.getApp().getAppLayout(function(layout){
                    // console.log(layout);
                    vm.relaodTime = layout.qLastReloadTime;
                    vm.appTitle = layout.qTitle;
                });
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