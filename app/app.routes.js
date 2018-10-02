define('routes',function(){
    
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
       
        $stateProvider
        .state('dashboard', {
            url: '/',
            template: '<dashboard></dashboard>',
            title: 'Review Status'
        })
        .state('another-view', {
          url: '/another-view',
          template: '<h1>Another View</h1>',
          title: 'Another View'
        })
        $urlRouterProvider.otherwise('/');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;

})