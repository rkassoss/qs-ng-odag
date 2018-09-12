define('routes',function(){
    
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
       
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            template: '<dashboard></dashboard>'
        })
        .state('page2', {
          url: '/page2',
          template: '<page-two></page-two>',
        })
        $urlRouterProvider.otherwise('/dashboard');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;

})