define( 'dataService',function () {
     
    
        dataRetrieval.$inject = ['$http'];
        function dataRetrieval($http) {
            var service = this;
            let data = 'test' 
            service.getListData = getListData;
           service.setData = setData
    
            function getListData() {
                return data       
            }
            function setData(val){
                data = val
            }
           
        }

        return dataRetrieval;
})
 