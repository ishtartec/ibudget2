'use strict';

angular.module('ibudgetApp')


// loading bar settings
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 300;
}])

// defaults for date picker
.config(['$datepickerProvider', function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    iconLeft: 'md md-chevron-left',
    iconRight: 'md md-chevron-right',
    autoclose: true
  });
}])

// defaults for date picker
.config(['$timepickerProvider', function($timepickerProvider) {
  angular.extend($timepickerProvider.defaults, {
    timeFormat: 'HH:mm',
    iconUp: 'md md-expand-less',
    iconDown: 'md md-expand-more',
    hourStep: 1,
    minuteStep: 1,
    arrowBehavior: 'picker',
    modelTimeFormat: 'HH:mm'
  });
}])

// disable nganimate with adding class
.config(['$animateProvider', function($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}]);


