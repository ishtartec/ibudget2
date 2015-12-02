'use strict';

angular.module('ibudgetApp')
    .filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        };
    });
