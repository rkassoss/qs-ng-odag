define( 'dataService',function () {
     
    
        dataRetrieval.$inject = ['$http'];
        function dataRetrieval($http) {
            var service = this;
            var data = 'test';
            service.getListData = getListData;
           service.setData = setData;
    
            function getListData() {
                return data;
            }
            function setData(val){
                data = val;
            }
           
        }

        return dataRetrieval;
})
 