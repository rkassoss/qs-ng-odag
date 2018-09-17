define('filterDropdownService',function(){
    function filterDropdownService() {
        var service = this;
  
        service.toggleDDFilters = toggleDDFilters;
        service.closeAllFilters = closeAllFilters;

        function toggleDDFilters(itemId) {
            // console.log('set itemId: '+itemId);
            // console.log('previuos: '+service.currentItem);
            if (itemId === service.currentItem) {
                service.currentItem = null;
            } else {
                service.currentItem = itemId;
            }
        }

        function closeAllFilters() {
            service.currentItem = null;
        }
    }
    return filterDropdownService;
});