'use strict';  angular.module('ibudgetApp').directive('todoWidget', ['todoService', function(todoService) {
  return {
    restrict: 'EA',
    templateUrl: 'components/ui/tpl/directives/todo-widget.html',
    replace: true,
    link: function($scope, $element) {
      $scope.todoService = new todoService($scope);
    }
  };
}]);
