'use strict';

angular.module('ibudgetApp')
  .filter('checkmarkFilter', function ($sce) {
      return function (input) {
          return input ?  $sce.trustAsHtml('<i class="md md-check" style="color: green; font-size:20px;"></i>') :  $sce.trustAsHtml('<i class="md md-close" style="color:red; font-size:18px;"></i>');
      };
  });
