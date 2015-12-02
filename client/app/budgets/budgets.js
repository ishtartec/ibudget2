'use strict';

angular.module('ibudgetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('budgets', {
        url: '/budgets',
        templateUrl: 'app/budgets/budgets.html',
        controller: 'BudgetsCtrl'
      });
  });
