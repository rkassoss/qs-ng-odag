angular.module('senseApp').directive('getObject', ['$uibModal', '$compile', '$anchorScroll', function ($modal, $compile, $anchorScroll) {
    return {
        restrict: 'AE',
        // replace: true, 
        template: '<div class="tool-panel pull-right" ng-if="!toolDisabled"><span ng-if="clearText" class="clear-object-text"><a ng-click="clearObjField()"><i class="icon-clear"></i> {{clearText}}</a></span><a ng-click="exportToJPG()"><i class="fa fa-camera"></i></a><a ng-click="exportData()"><i class="icon-export"></i></a><a ng-click="expandObject()"><i class="fa fa-expand"></i></a></div><div style="{{style}}" class="objectPlaceholder {{class}}"></div>',
        scope: {
            toolDisabled: '@toolDisabled', 
            segmentDrpdown: '@segmentDrpdown',
            qlikId: '@qlikId',
            style: '@style',
            class: '@class',
            clearText: '@clearText',
            clearField: '@clearField'
        },
        link: function ($scope, element, attr) { 

            if (!senseApp) senseApp = qv.openApp(appId, config);

            // get the qlik object
            var qlikElement = element.find('.objectPlaceholder'); 
            senseApp.getObject(qlikElement, $scope.qlikId).then(function (model) {
                destroyableModelObjects.push(model);
            });

            $scope.closeExpandedObject = function () {
                //remove and close the expaned objects
                angular.element(document.querySelector('#expand-object-container')).remove();
                _.each(destroyableExpandObjects, function (model) {
                    model.close();
                });
                destroyableExpandObjects = []; 
            };

            $scope.clearObjField = function () {
                senseApp.field($scope.clearField).clear();
            };

            $scope.expandObject = function () {

                // in case we never closeExpandedObject
                _.each(destroyableExpandObjects, function (model) {
                    model.close();
                });
                destroyableExpandObjects = [];

                angular.element(document.querySelector('#expand-object-container')).remove();

                 //is it a table?
                 var qlikTable = element.find('.qv-object-table');
                 var width = "";
                 if (qlikTable.length > 0) {
                     width = "width: 1800px;";
                 }

                //build object container 
                angular.element(document.querySelector('.pageHeading')).parent().append($compile('<div id="expand-object-container" class="col-md-12" style="margin-bottom: 50px;overflow-x: scroll;"><div class="expand-panel"><i class="fa fa-compress pull-right" aria-hidden="true" ng-click="closeExpandedObject()" style="padding: 5px 25px 0px 0px;font-size: 30px;"></i></div><div id="expand-object" style="height: 500px;' + width + '"></div></div></div>')($scope));

                //call qlik
                senseApp.getObject("expand-object", $scope.qlikId).then(function (model) {
                    destroyableExpandObjects.push(model);
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'fast');
                });

                //if we open as modal popup
                /*
                $modal.open({
                    templateUrl: 'app/components/expand-object/expand-object.html',
                    controller: 'ExpandObjectController',
                    size: 'lg',
                    resolve: {
                        qlikObjectId: function () {
                            console.log($scope.qlikId)
                            return $scope.qlikId;
                        }
                    }
                });
                */
            }
            $scope.exportData = function () {
                var vizScope = element.find('.qv-object').scope();
                vizScope.model.exportData('OOXML')
                    .then(function (reply) {
                        var baseUrl = (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "");

                        if (config.prefix === "/saml/") {
                            baseUrl += "/saml";
                        }

                        //ipad does not work with with window.open
                        //have to open modal window with the link instead
                        //window.open(baseUrl + reply.qUrl);
                        var link = baseUrl + reply.qUrl;
                        $modal.open({
                            templateUrl: 'app/components/download/download.html',
                            controller: 'DownloadController',
                            resolve: {
                                refId: function () {
                                    return link;
                                },
                                title: function () {
                                    return 'title';
                                }
                            }
                        });
                    });
            };

            $scope.exportToJPG = function () {
                var targetElem = '';
                if (attr.targetElement == "" || angular.isUndefined(attr.targetElement)) {
                    targetElem = element.find('.qvt-visualization');
                    targetElem.find('.objectPlaceholder').css('background-color', '#fff');
                } else {
                    targetElem = $('#' + attr.targetElement);
                }
                //targetElem.css('display', 'block');
                var targetTitle = element.find('.qvt-visualization-title');

 

                var legend = angular.element($('get-object[qlik-id=' + $scope.qlikId + ']')).parent().find(".legend-bottom-container");
                if (legend) {
                    targetElem.append(legend);
                }
                
                var title = targetTitle[0].title;
                if (!title) {
                    title = "ExportImage";
                }
                html2canvas(targetElem, {
                    background: '#fff',
                    onrendered: function (canvas) {

                        var downloadLoc = canvas.toDataURL('image/png');
                        /*
                        var a = document.createElement('a');
                        a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
                        a.download = 'abbvie-chart-' + (new Date().toString().split(' ').splice(0, 4).join('-')) + '.jpg';
                        var link = a.href;
                        setTimeout(function () {
                            a.click()
                        }, 250);
                        */

                        $modal.open({  
                            templateUrl: 'app/components/download/download.html',
                            controller: 'DownloadController',
                            resolve: {
                                refId: function () {
                                    return downloadLoc;
                                },
                                title: function () {
                                    return title + ".png";
                                }
                            }
                        });

                    },

                });
            };

            $scope.exportToPDF = function () {
                html2canvas(qlikElement, {
                    onrendered: function (canvas) {
                        $("body").css('height', '');
                        var imgData = canvas.toDataURL(
                            'image/png');
                        var doc = new jsPDF("p", "px", "a4");
                        var trueWidht = currentCard.width();
                        var trueHeight = currentCard.height();
                        var width = doc.internal.pageSize.width;
                        var height = doc.internal.pageSize.height;
                        if (trueHeight * width / trueWidht > height) {
                            doc.addImage(imgData, 'PNG', 0, 0, trueWidht * height / trueHeight, height);
                        } else {
                            doc.addImage(imgData, 'PNG', 0, 0, width, trueHeight * width / trueWidht);
                        }
                        doc.save(currentCard.find('.card-title').text() + '.pdf');
                    }
                });
            }
        }
    }
}]);