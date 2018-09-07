define('routes',function(){
    
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
       
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            template: '<dashboard></dashboard>'
        })
        // .state('page1', {
        //   url: '/page1',
        //   template: '<page-one></page-one>',
        // })
        // .state('page2', {
        //     url: '/page2',
        //     template: '<page-two></page-two>',
        //   })
        //   .state('page3', {
        //       url: '/page3',
        //       template:'<page-three></page-three>'
        //   })
        $urlRouterProvider.otherwise('/dashboard');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;

})