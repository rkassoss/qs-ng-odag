angular.module('senseApp').directive('qlikDropdown', ['$state', function ($state) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            qField: '@qField',
            qSelection: '@qSelection',
            qLabel: '@qLabel',
            qDefault: '@qDefault',
            style: '@style',
            class: '@class'
        },
        template: '<label class="inline-label">{{ qLabel }}</label><select style="{{style}}" class="form-control {{class}}"  ng-model="selected" ng-change="onChange(selected)" class="form-control {{class}}"><option ng-repeat="option in options">{{ option[0].qText }}</option></select>',
        link: function ($scope, element, attrs) {

            
            if (!senseApp) senseApp = qv.openApp(appId, config);
           
            senseApp.createList({
                "qDef": {
                    "qFieldDefs": [$scope.qField]
                },
                "qInitialDataFetch": [{
                    qTop: 0,
                    qLeft: 0,
                    qHeight: 500,
                    qWidth: 1
                }]
            }, function (reply) {

                
                var createList = [];
                if (reply.qListObject.qDataPages.length > 0 && reply.qListObject.qDataPages[0].qMatrix) {
                    createList = reply.qListObject.qDataPages[0].qMatrix
                }
                $scope.options = createList;

                angular.forEach(createList, function (newObj, i) {
                    angular.forEach($scope.options, function (oldObj) {
                        if (newObj[0]['qState'] == 'S') {
                            $scope.selected = newObj[0]['qText'];
                           
                        }
                        
                    });
                });

                destroyableObjectIds.push(reply.qInfo.qId);
                //senseApp.destroySessionObject(reply.qInfo.qId);
            });

            $scope.onChange = function (selection) {
                
                $scope.selected = selection;
                $scope.$emit('qlikSelect.selected', $scope.selected);
                if (selection) {
                    senseApp.field($scope.qField).selectMatch(selection);
                } else {
                    senseApp.field($scope.qField).selectMatch();
                }

            };
        }
    }
}]);



angular.module('senseApp').directive('dateSelect', ['$state', function ($state) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            qField: '@qField',
            qSelection: '@qSelection',
            qLabel: '@qLabel',
            qDefault: '@qDefault'
        },
        template: '<div class="qlik-select-wrap"><div class="qlik-select-label">{{ qLabel }}</div><div class="qlik-select"><select class="form-control"  ng-model="dateSelected" ng-change="selectDate()" class="form-control"><option ng-repeat="option in options">{{ option }}</option></select></div></div>',
        link: function ($scope, element, attrs) {

            $scope.options = ['4 x 4 Weeks', '13 x 13 Weeks', '26 x 26 Weeks', '6 x 6 Months', 'QTD', 'STD', 'YTD', 'LTD'];
            if ($scope.qDefault) {
                $scope.dateSelected = $scope.qDefault;
                senseApp.field($scope.qField).selectMatch($scope.dateSelected);
            }

            $scope.selectDate = function () {
                senseApp.field($scope.qField).selectMatch($scope.dateSelected);
            };
        }
    }
}]);