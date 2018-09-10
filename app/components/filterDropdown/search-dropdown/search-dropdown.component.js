(function () {
    'use strict';

    define('dropdownSearch',function(){
        function dropdownSearch() {
            dropdownSearchController.$inject = ['qlikService'];
              function dropdownSearchController(qlikService){
                  var vm = this;
                  vm.matches = [];
                  vm.searchFilterList = searchFilterList;
                  vm.showSearch = false;

                  vm.selectField = selectField;
                  vm.closeSearch = closeSearch;

                  if(!vm.searchPlaceholder) {
                    vm.searchPlaceholder = 'Search list...';
                  }

                  function selectField(match) {
                        qlikService.getApp().field(vm.qlikField).selectMatch(match);
                        vm.showSearch = false;
                  }

                  function closeSearch() {
                    vm.showSearch = false;
                  }
      
      
                  function searchFilterList() {
                    // console.log(vm.searchText);
                    // console.log(vm.qlikField);

                    vm.matches = [];
                    vm.showSearch = true;
      
                        // Use value of input field as search term in searchResults method
                        qlikService.getApp().searchResults([vm.searchText],
                                {qOffset: 0, qCount: 100},
                                {qSearchFields: [vm.qlikField], qContext: 'CurrentSelections'},
                                function(reply) {
                                    // console.log(reply);
                                      //assign searchGroupArray of results to variable named searchResults for readability
                                      var searchResults = reply.qResult.qSearchGroupArray;
                                      //loop through results and add to dom
                                      searchResults.forEach(function (result, i) {
                                              result.qItems.forEach(function (item) {
                                                      //loop through matches
                                                      item.qItemMatches.forEach(function (match) {
                                                            vm.matches.push(match.qText);
                                                      });
                                              });
                                      });
                                      console.log(vm.matches);
                              });
      
                  }
      
                  this.$onInit = function() {
                      console.log("Starting Dropdown Search");
                  }
              }
      
              return {
                  bindings: {
                    qlikField: '@',
                    searchPlaceholder: '@'
                  },
                  controller: dropdownSearchController,
                  controllerAs: '$ctrl',
                  templateUrl: '/app/components/filterDropdown/search-dropdown/search-dropdown.component.html'
              }
          }

          return dropdownSearch();
        
    })



} ());
