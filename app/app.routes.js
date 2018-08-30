define('routes',function(){
    
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
       
        $stateProvider
        .state('page1', {
          url: '/page1',
          template: '<page-one></page-one>',
        })
        .state('page2', {
            url: '/page2',
            template: '<page-two></page-two>',
          })
        $urlRouterProvider.otherwise('/page1');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;

})