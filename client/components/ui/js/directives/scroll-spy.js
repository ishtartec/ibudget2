'use strict';  angular.module('ibudgetApp').directive('scrollSpy', ['$window',function($window) {
  return {
    link: function(scope, element, attrs) {
      angular.element($window).bind('scroll', function() {
        scope.scroll = this.pageYOffset;
        if(!scope.$$phase) {
          scope.$apply();
        }
      });
    }
  };
}]);
