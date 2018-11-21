define( 'dataService',function () {
     
    
        dataRetrieval.$inject = ['$http'];
        function dataRetrieval($http) {
            var service = this;
           

            var url = '/assets/app-data/';
            var navLinks = url.concat('reports.json');

            service.getNavLinkData = getNavLinkData;
    
            function getNavLinkData() {
                var promise = $http.get(navLinks);
                return promise;
            }
           
        }

        return dataRetrieval;
})
 