define('routes',function(){
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
        $stateProvider
        .state('home', {
            url: '/home',
            template: '<home></home>',
            title: 'Home'
        })
        .state('occupancy', {
          url: '/occupancy',
          template: '<occupancy></occupancy>',
          title: 'Occupancy'
        })
        .state('occMarketValue', {
            url: '/occMarketValue',
            template: '<occ-market-value></occ-market-value>',
            title: 'Market Value by State'
        });
        $urlRouterProvider.otherwise('/home');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;
});