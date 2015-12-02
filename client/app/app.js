'use strict';

angular.module('ibudgetApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'btford.socket-io',
        'ui.router',
        'validation.match',
        'ngTable',
        'formly',
        'formlyBootstrap',
        'jcs-autoValidate',
        'textAngular',
        'LocalStorageModule',
        'angular-loading-bar',
        'ui.select',
        'monospaced.elastic',     // resizable textarea
        'mgcrea.ngStrap',
        'textAngular',
        'fsm',                    // sticky header
        'smoothScroll',
        'gridshore.c3js.chart',
        'relativeDate',
        'ngBootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, toastr) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
        var state;
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    (state || (state = $injector.get('$state'))).go('login');
                    // remove any stale tokens
                    $cookies.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .constant('toastr', toastr)

    .run(function ($rootScope, $state, Auth) {
        // Redirect to login if route requires auth and the user is not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (next.authenticate) {
                Auth.isLoggedIn(function (loggedIn) {
                    if (!loggedIn) {
                        event.preventDefault();
                        $state.go('login');
                    }
                });
            }
        });
    });
