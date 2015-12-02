'use strict';

angular.module('ibudgetApp')
  .directive('bsConfirm', ['$modal', '$q', function($modal, $q) {
        return{
            restrict: 'A',
            scope: {
                bsConfirm: '&',
                title: '@',
                content: '@'
            },
            link: function(scope, element, attrs) {

                element.bind('click', function() {
                    scope.showModal();
                });
            },
            controller: function($scope, $element){
                var deferred;

                $scope.showModal = function(){
                    confirm.show().then(function() {
                        $scope.bsConfirm();
                    });
                };

                $scope.answer = function(res) {
                    if(res) deferred.resolve();
                    else deferred.reject();

                    confirm.hide();
                };

                var confirm = $modal({templateUrl: 'components/directives/bsConfirm/bsConfirm.html', scope: $scope, show: false});
                var parentShow = confirm.show;

                confirm.show = function() {
                    deferred = $q.defer();
                    parentShow();
                    return deferred.promise;
                }
            }
        }
  }]);

