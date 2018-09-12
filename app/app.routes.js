define('routes',function(){
    
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
       
        $stateProvider
        .state('review-status', {
            url: '/review-status',
            template: '<page-two></page-two>',
            title: 'Review Status'
        })
        .state('another-view', {
          url: '/another-view',
          template: '<dashboard></dashboard>',
          title: 'Another View'
        })
        $urlRouterProvider.otherwise('/review-status');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;

})