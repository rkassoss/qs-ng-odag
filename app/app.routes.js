define('routes',function(){
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
        $stateProvider
        .state('/', {
            url: '/',
            template: '<home></home>',
            title: 'Home'
        })
        .state('occupancy', {
          url: '/occupancy',
          template: '<occupancy></occupancy>',
          title: 'Occupancy'
        })
        ;
        $urlRouterProvider.otherwise('/');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;
});