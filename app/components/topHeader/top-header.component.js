define( 'topHeader',function () {
    
    function topHeader() {
        topHeaderController.$inject = ['$window','$state','dataService','qlikService','currentSelectionsService','$transitions'];
        function topHeaderController($window, $state , dataService,qlikService, currentSelectionsService, $transitions) {
            var vm = this;

            vm.toggleSidebar = toggleSidebar;
            vm.toggleNav = toggleNav;
            vm.currentSelectionsService = currentSelectionsService;

            vm.sidebarIn = false;
            vm.navigation = true;


            vm.delBookmark = delBookmark;
            vm.applyBookmark = applyBookmark;
            vm.showBookmarks = showBookmarks;

            vm.submitBMForm = submitBMForm;
            vm.stateName = $state.current.name;

            vm.revealBookmarks = false;


            vm.selfService = selfService;

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
                $('#viewWrap,#CurrentSelections').toggleClass('move');
                qlikObject.resize();
            }

            function toggleSidebar() {
                vm.sidebarIn = !vm.sidebarIn;
            }

            function showBookmarks() {
                vm.revealBookmarks = !vm.revealBookmarks;
            }

            function applyBookmark(id,url) {
                // console.log(id,url);
                qlikService.getApp().bookmark.apply(id).then(function(reply){
                    if (url){
                        $state.go(url);
                    }
                });

            }

            function delBookmark(id) {
                qlikService.getApp().bookmark.remove(id).then(function(model){
                    qlikService.getApp().doSave();
                });
            }

            function submitBMForm() {
                qlikService.getApp().bookmark.create(vm.form.title, vm.stateName);
                qlikService.getApp().doSave();
            }

            function selfService() {
                $window.open((config.isSecure ? "https://" : "http://") + config.host + config.prefix + 'sense/app/' + appId ,'_blank');
            }
            
            init();
            function init() {
                qlikService.getApp().getObject('CurrentSelections','CurrentSelections');
                currentSelectionsService.getCurrentSelections();
                qlikService.getApp().getAppLayout(function(layout){
                    // console.log(layout);
                    vm.relaodTime = layout.qLastReloadTime;
                    vm.appTitle = layout.qTitle;
                });

                qlikService.getApp().getList( "BookmarkList", function ( reply ) {
                    vm.bookmarks = _.flatten(reply.qBookmarkList.qItems);
                    console.log(vm.bookmarks);
                });

                dataService.getNavLinkData().then(function(reply){
                    // console.log(reply.data);
                    vm.reports = reply.data;
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