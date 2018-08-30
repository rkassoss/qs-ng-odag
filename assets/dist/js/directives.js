app.directive('qlikDropdown', ['$state','qlikService', function ($state) {
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
        link: function ($scope,qlikService, element, attrs) {

            
            if (!senseApp) senseApp = qlikService.getApp();
           
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