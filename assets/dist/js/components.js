(function () {
    'use strict';

    define('docList',function(){
        function docList() {
            docListController.$inject = ['qlikService'];
            function docListController(qlikService){
                var vm = this;
                var objectId;
                
                init();

                console.log('in');

                function getDocs() {
                    qlikService.getApp().createCube({
                        qDimensions : [{
                            qDef : {
                                qFieldDefs : ["NAME"]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : ["URL"]
                            }
                        }],
                        qMeasures : [{
                            qDef : {
                                qDef : "1"
                            }
                        }],
                        qInitialDataFetch : [{
                            qTop : 0,
                            qLeft : 0,
                            qHeight : 100,
                            qWidth : 2
                        }]
                    }, function(reply) {
                        // console.log(reply);
                        vm.docs = [];
                        objectId = reply.qInfo.qId;
                        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
                            if(!value[0].qIsNull && !value[1].qIsNull){
                                vm.docs.push({
                                    'docname' : value[0].qText,
                                    'url' : value[1].qText
                                });
                            }
                        });
                        // console.log(vm.docs);
                    });
                }
    
                function init(){
                    getDocs();
                    console.log('init');
                }


                vm.$onDestroy = function(){
                    console.log("Destroy object: "+objectId);
                }
            }
    
            return {
                bindings: {},
                controller: docListController,
                controllerAs: 'dl',
                templateUrl: '/app/components/docList/docList.component.html'
            }
        }

        return docList();
        
    });


    

} ());
(function () {
    'use strict';

    define('filterDropdown',function() {
        
        function filterDropdown() {
                filterDropdownController.$inject = ["qlikService"];
                function filterDropdownController(qlikService){
                    var vm = this;
                    var objectId;

                    vm.fetchValues = fetchValues;
                    vm.applySelection = applySelection;


                    function applySelection(value) {
                        console.log(value);
                        qlikService.getApp().field(vm.fieldName).selectMatch(value);
                        vm.activeSelection = value;
                    }

                    function fetchValues() {
                        qlikService.getApp().createList({
                            "qDef": {
                                "qFieldDefs": ["["+ vm.fieldName +"]"],
                                "qSortCriterias": [{
                                    "qSortByLoadOrder"  : 0,
                                    "qSortByAscii" : 1
                                }]
                            },
                            "qAutoSortByState": {
                                qDisplayNumberOfRows: 1
                            },
                            "qInitialDataFetch": [{
                                qTop : 0,
                                qLeft : 0,
                                qHeight : 250,
                                qWidth : 1
                            }]
                        }, function(reply) {
                            console.log(reply);
                            objectId = reply.qInfo.qId;
                            vm.rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix);
                        });
                    }

                

                    vm.$onInit = function() {
                        fetchValues();
                    }


                    vm.$onDestroy = function() {
                        console.log('destroy list'+ objectId);
                        qlikService.getApp().destroySessionObject(objectId);
                    }


                    vm.$onChanges = function(changes) {
                        
                    }
                }
        
                return {
                    bindings: {
                        fieldName: '@'
                    },
                    controller: filterDropdownController,
                    controllerAs: 'fd',
                    templateUrl: '/app/components/filterDropdown/filterDropdown.component.html'
                }
        }

        return filterDropdown();
    });

} ());
(function () {
    'use strict';

    define('reloadTime',function(){
        function reloadTime() {
            reloadTimeController.$inject = ['qlikService'];
            function reloadTimeController(qlikService){
                var vm = this;
    
                function dataLastFrom() {
                    qlikService.getApp().getAppLayout(function(layout){
                        // console.log(layout);
                        vm.relaodTime = layout.qLastReloadTime;
                    });
                }
                
                init();
    
                function init(){
                    dataLastFrom();
                }
            }
    
            return {
                bindings: {},
                controller: reloadTimeController,
                controllerAs: 'rt',
                templateUrl: '/app/components/reloadTime/reloadTime.component.html'
            }
        }
        return reloadTime();
    });

} ());
(function () {
    'use strict';


        define( 'senseObject',function () {
            
            function senseObject() {
                senseObjectController.$inject = ['dataService','qlikService','$uibModal'];
                function senseObjectController(dataService,qlikService,$uibModal) {
                    var vm = this;
                    var theObject;

                    vm.exportToExcel = exportToExcel;
                    vm.expand = expand;

                   

                    function exportToExcel() {
                        vm.model.exportData()
                            .then(function(reply){
                                console.log(reply);
                                var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");
                                var link = reply.qUrl;
                                window.open(baseUrl+link,'_blank');
                            });
                    }

                    function expand() {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            component: 'expandModal',
                            size: 'lg',
                            resolve: {
                                qlikId: function () {
                                    return vm.qlikId;
                                }
                            }
                        });
                    }


                    function getQlikObject() {
                        qlikService.getApp()
                        .visualization.get(vm.qlikId).then(function(vis){
                            // console.log(vis);
                            if(!vm.qlikTitle){
                                vm.title = vis.model.layout.title;
                            } else {
                                vm.title = vm.qlikTitle;
                            }
                           
                            vis.model.layout.showTitles = false;
                            vis.show(vm.qlikId);
                            theObject = vis;
                            vm.model = vis.model;
                        });
                    }

                    
                    vm.$onInit = function() {
                        setTimeout(function() {
                            getQlikObject();
                        }, 300)
                    }


                    vm.$onDestroy = function() {
                        console.log('destroy');
                        theObject.close();
                    }


                    vm.$onChanges = function(changes) {
                        
                    }

                }
                return {
                    bindings: {
                        qlikId: '@',
                        qlikTitle: '@',
                        objectClass: '@',
                        externalUrl: '@',
                        linkLabel: '@'
                    },
                    controller: senseObjectController,
                    controllerAs: 'so',
                    templateUrl: '/app/components/senseObject/senseObject.directive.html'
                }
            }

            return senseObject();
        });
} ());
(function () {
    'use strict';

    define('simpleObject',function(){
        function simpleObject() {
            simpleObjectController.$inject = ['qlikService'];
            function simpleObjectController(qlikService){
                var vm = this;
                var object;

                function getKpi() {
                    qlikService.getApp().getObject(vm.objectId,vm.objectId).then(function(vis){
                        object = vis;
                    });
                }
                
                vm.$onInit = function() {
                    setTimeout(function(){
                        getKpi()
                    },300);
                }

                vm.$onDestroy = function() {
                    object.close();
                }
            }
    
            return {
                bindings: {
                    objectId: '@',
                    objectClass: '@'
                },
                controller: simpleObjectController,
                controllerAs: 'so',
                templateUrl: '/app/components/simpleObject/simpleObject.component.html'
            }
        }

        return simpleObject();
    });


    

} ());
(function () {
    'use strict';

    define('simpleTable', function(){
        function simpleTable() {
            simpleTableController.$inject = ['qlikService','currentSelectionsService'];
            function simpleTableController(qlikService, currentSelectionsService){
                var vm = this;
                vm.currentSelectionsService = currentSelectionsService;

                var sessionObjectId;
    
                function getContacts(field1,field2, field3) {
                    qlikService.getApp().createCube({
                        qDimensions : [{
                            qDef : {
                                qFieldDefs : [field1]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : [field2]
                            }
                        }, {
                            qDef : {
                                qFieldDefs : [field3]
                            }
                        }],
                        qMeasures : [{
                            qDef : {
                                qDef : "1"
                            }
                        }],
                        qInitialDataFetch : [{
                            qTop : 0,
                            qLeft : 0,
                            qHeight : 1,
                            qWidth : 3
                        }]
                    }, function(reply) {
                        console.log(reply);
                        sessionObjectId = reply.qInfo.qId;
                        vm.contacts = [];
                        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
                                vm.contacts.push({
                                    'user' : value[0].qText,
                                    'title' : value[1].qText,
                                    'email' : value[2].qText
                                });
                        });
                    });
                }
    
                init();
    
                function init(){
                    currentSelectionsService.getCurrentSelections();
    
                    getContacts(vm.userField,vm.titleField,vm.emailField);
                }

                vm.$onDestroy = function() {
                    console.log("Destroy obejct:"+sessionObjectId);
                }
            }
    
            return {
                bindings: {
                    userField : '@',
                    titleField : '@',
                    emailField : '@',
                    title : '@'
                },
                controller: simpleTableController,
                controllerAs: 'st',
                templateUrl : '/app/components/simpleTable/simpleTable.component.html'
            }
        }
        return simpleTable();
    });
} ());
(function () {
    'use strict';

    define('tableButton', function(){
        function tableButton() {
            tableButtonController.$inject = ['qlikService'];
            function tableButtonController(qlikService){
                var vm = this;
                vm.exportToExcel = exportToExcel;
                
                vm.isCollapsed =vm.animateNow = true;
                var tableObject;
                vm.revealTable = revealTable;

                function exportToExcel() {
                    tableObject.model.exportData()
                        .then(function(reply){
                            console.log(reply);
                            var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");
                            var link = reply.qUrl;
                            window.open(baseUrl+link,'_blank');
                        });
                }



                function getQlikTable(qlikId) {
                    qlikService.getApp().visualization.get(qlikId).then(function(table){
                        console.log(table);
                        vm.title = table.model.layout.title;
                        table.show(vm.tableId);
                        tableObject = table;
                    });
                }

                function revealTable() {
                    vm.isCollapsed = !vm.isCollapsed;
                    console.log(vm.isCollapsed);
                    if (!vm.isCollapsed) {
                        getQlikTable(vm.tableId);
                        setTimeout(function() {
                            vm.animateNow = false;
                        }, 300)
                    } else {
                        tableObject.close();
                        vm.animateNow = true;
                    }
                }


                vm.$onInit = function() {

                }

                vm.$onDestroy = function() {
                    tableObject.close();
                }
            }
    
            return {
                bindings: {
                    tableId: '@',
                    buttonText: '@'
                },
                controller: tableButtonController,
                controllerAs: 'tb',
                templateUrl: '/app/components/tableButton/tableButton.component.html'
            }
        }
        return tableButton();
    });


    

} ());
define( 'topHeader',function () {
    
    function topHeader() {
        topHeaderController.$inject = ['dataService','qlikService','currentSelectionsService','$transitions'];
        function topHeaderController(dataService,qlikService, currentSelectionsService, $transitions) {
            var vm = this;

            vm.toggleSidebar = toggleSidebar;
            vm.toggleNav = toggleNav;

            vm.currentSelectionsService = currentSelectionsService;

            vm.sidebarIn = false;
            vm.navigation = false;

            vm.pageTitle = 'Review Status';

            $transitions.onSuccess({}, function(transition) {
                vm.pageTitle = transition.to().title;
                console.log(
                    "Successful Transition from " + transition.from().title +
                    " to " + transition.to().title
                );
            });


            function toggleNav() {
                vm.navigation = !vm.navigation;
                console.log(vm.navigation);
                $('#viewWrap').toggleClass('move');
                qlikObject.resize();
            }

            function toggleSidebar() {
                vm.sidebarIn = !vm.sidebarIn;
            }
            
            init();
            function init() {
                qlikService.getApp().getObject('CurrentSelections','CurrentSelections');
                currentSelectionsService.getCurrentSelections();
            }
        }
        return {
            bindings: {},
            controller: topHeaderController,
            controllerAs: 'th',
            templateUrl: 'app/components/topHeader/topHeader.component.html'
        }
    }

    return topHeader();
});
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
                  vm.searchText = '';
                  

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
                    vm.searchText = '';
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

(function () {
    'use strict';

    define('expandModal', expandModal());
    function expandModal() {
        expandModalController.$inject = ['qlikService','$uibModal', '$log', '$document']
        function expandModalController(qlikService, $uibModal, $document){
            var vm = this;
            var object;

            vm.closeModal = closeModal;
            
            function closeModal() {
                vm.dismiss({$value: 'cancel'});  
            }
            init();

            function init(){
                qlikService.getApp().getObject(document.getElementById('modal_object'),vm.resolve.qlikId).then(function(vis){
                    console.log(vis);
                    object = vis;
                    vm.title = vis.layout.title;
                });
            }

            vm.$onDestroy = function() {
                vm = null;
                object.close();
            }
        }

        return {
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: expandModalController,
            controllerAs: 'em',
            templateUrl: 'app/components/senseObject/expandModal/expandModal.component.html'
        }
    }

} ());