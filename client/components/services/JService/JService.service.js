'use strict';

angular.module('ibudgetApp')
    .factory('JService', ['$resource', function ($resource) {
        return $resource('api/jobs/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {method: 'GET'},
            'details': {method: 'GET', params: {id: 'date'}, isArray: true},
            'update': {method: 'PUT'}
        });
    }]);
