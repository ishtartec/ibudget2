'use strict';
(function () {

    function MainController($window, $scope, $rootScope, $interval, colorService, BService, JService, Auth, socket) {
        var self = this;
        this.awesomeThings = [];
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;

        $scope.budgets = [];
        $scope.jobs = [];

        $scope.weeklyStats = {total: 0, sales: 0};
        $scope.monthlyStats = {total: 0, sales: 0};
        $scope.lastWeeklyStats = {total: 0, sales: 0};
        $scope.lastMonthlyStats = {total: 0, sales: 0};

        $scope.yearStats = {
            total:0,
            sales:0,
            jan: {total: 0, sales: 0},
            feb: {total: 0, sales: 0},
            mar: {total: 0, sales: 0},
            apr: {total: 0, sales: 0},
            may: {total: 0, sales: 0},
            jun: {total: 0, sales: 0},
            jul: {total: 0, sales: 0},
            aug: {total: 0, sales: 0},
            sep: {total: 0, sales: 0},
            oct: {total: 0, sales: 0},
            nov: {total: 0, sales: 0},
            dec: {total: 0, sales: 0}
        };

        /*
         var startDate = new Date(2013, 1, 12)
         , endDate   = new Date(2013, 1, 15)
         , date  = new Date(2013, 2, 15)
         , range = moment().range(startDate, endDate);

         range.contains(date);
         */

        var weekRange = moment().range(moment().startOf('week'), moment().endOf('week'));
        var lastWeekRange = moment().range(moment().startOf('week').subtract('days', 7), moment().endOf('week').subtract('days', 7));
        var monthRange = moment().range(moment().startOf('month'), moment().endOf('month'));
        var lastMonthRange = moment().range(moment().startOf('month').subtract('months', 1), moment().endOf('month').subtract('month', 1));
        var yearRange = moment().range(moment().startOf('year'), moment().endOf('year'));
        var lastYearRange = moment().range(moment().startOf('year').subtract('years', 1), moment().endOf('year').subtract('year', 1));

        var januaryRange = moment().range(moment().startOf('year'), moment().startOf('year').endOf('month'));
        var februaryRange = moment().range(moment().startOf('year').add('month', 1), moment().startOf('year').endOf('month').add('month', 1));
        var marchRange = moment().range(moment().startOf('year').add('month', 2), moment().startOf('year').endOf('month').add('month', 2));
        var aprilRange = moment().range(moment().startOf('year').add('month', 3), moment().startOf('year').endOf('month').add('month', 3));
        var mayRange = moment().range(moment().startOf('year').add('month', 4), moment().startOf('year').endOf('month').add('month', 4));
        var juneRange = moment().range(moment().startOf('year').add('month', 5), moment().startOf('year').endOf('month').add('month', 5));
        var julyRange = moment().range(moment().startOf('year').add('month', 6), moment().startOf('year').endOf('month').add('month', 6));
        var augustRange = moment().range(moment().startOf('year').add('month', 7), moment().startOf('year').endOf('month').add('month', 7));
        var septemberRange = moment().range(moment().startOf('year').add('month', 8), moment().startOf('year').endOf('month').add('month', 8));
        var octoberRange = moment().range(moment().startOf('year').add('month', 9), moment().startOf('year').endOf('month').add('month', 9));
        var novemberRange = moment().range(moment().startOf('year').add('month', 10), moment().startOf('year').endOf('month').add('month', 10));
        var decemberRange = moment().range(moment().startOf('year').add('month', 11), moment().startOf('year').endOf('month').add('month', 11));

        if (self.isLoggedIn()) {
            BService.query(function (result) {
                $scope.budgets = result;
                socket.syncUpdates('budget', $scope.budgets);
                var num;

                for (var i = 0; i < result.length; i++) {
                    var start = new Date(result[i].date);
                    $scope.yearStats.total += result[i].total;
                    $scope.yearStats.sales++;
                    if (weekRange.contains(start)) {
                        $scope.weeklyStats.total += result[i].total;
                        $scope.weeklyStats.sales++;
                    }
                    if (lastWeekRange.contains(start)) {
                        $scope.lastWeeklyStats.total += result[i].total;
                        $scope.lastWeeklyStats.sales++;
                    }
                    if (monthRange.contains(start)) {
                        $scope.monthlyStats.total += result[i].total;
                        $scope.monthlyStats.sales++;
                    }
                    if (lastMonthRange.contains(start)) {
                        $scope.lastMonthlyStats.total += result[i].total;
                        $scope.lastMonthlyStats.sales++;
                    }
                    if (januaryRange.contains(start)) {
                        $scope.yearStats.jan.total += result[i].total;
                        $scope.yearStats.jan.sales++;
                    }
                    if (februaryRange.contains(start)) {
                        $scope.yearStats.feb.total += result[i].total;
                        $scope.yearStats.feb.sales++;
                    }
                    if (marchRange.contains(start)) {
                        $scope.yearStats.mar.total += result[i].total;
                        $scope.yearStats.mar.sales++;
                    }
                    if (aprilRange.contains(start)) {
                        $scope.yearStats.apr.total += result[i].total;
                        $scope.yearStats.apr.sales++;
                    }
                    if (mayRange.contains(start)) {
                        $scope.yearStats.may.total += result[i].total;
                        $scope.yearStats.may.sales++;
                    }
                    if (juneRange.contains(start)) {
                        $scope.yearStats.jun.total += result[i].total;
                        $scope.yearStats.jun.sales++;
                    }
                    if (julyRange.contains(start)) {
                        $scope.yearStats.jul.total += result[i].total;
                        $scope.yearStats.jul.sales++;
                    }
                    if (augustRange.contains(start)) {
                        $scope.yearStats.aug.total += result[i].total;
                        $scope.yearStats.aug.sales++;
                    }
                    if (septemberRange.contains(start)) {
                        $scope.yearStats.sep.total += result[i].total;
                        $scope.yearStats.sep.sales++;
                    }
                    if (octoberRange.contains(start)) {
                        $scope.yearStats.oct.total += result[i].total;
                        $scope.yearStats.oct.sales++;
                    }
                    if (novemberRange.contains(start)) {
                        $scope.yearStats.nov.total += result[i].total;
                        $scope.yearStats.nov.sales++;
                    }
                    if (decemberRange.contains(start)) {
                        $scope.yearStats.dec.total += result[i].total;
                        $scope.yearStats.dec.sales++;
                    }
                }
                $scope.totalSalesYear = [$scope.yearStats.jan.total,
                    $scope.yearStats.feb.total,
                    $scope.yearStats.mar.total,
                    $scope.yearStats.apr.total,
                    $scope.yearStats.may.total,
                    $scope.yearStats.jun.total,
                    $scope.yearStats.jul.total,
                    $scope.yearStats.aug.total,
                    $scope.yearStats.sep.total,
                    $scope.yearStats.oct.total,
                    $scope.yearStats.nov.total,
                    $scope.yearStats.dec.total];
                //$scope.totalSalesYear = [43,43,45,42,40,40,40,40,42,40,40,40,42,45,46,45,43,45,44,42];
                //$scope.myChartData = [{'data1':10,'data2':20},{'data1':50,'data2':60}];
                //$scope.myChartColumns = [{'id': 'data1', 'type': 'line'}, {'id': 'data2', 'type': 'bar'}];
                $scope.myChartDataTotal = [
                    {'sales':$scope.yearStats.jan.total.toFixed(2)}, {'sales':$scope.yearStats.feb.total.toFixed(2)}, {'sales':$scope.yearStats.mar.total.toFixed(2)},
                    {'sales':$scope.yearStats.apr.total.toFixed(2)}, {'sales':$scope.yearStats.may.total.toFixed(2)}, {'sales':$scope.yearStats.jun.total.toFixed(2)},
                    {'sales':$scope.yearStats.jul.total.toFixed(2)}, {'sales':$scope.yearStats.aug.total.toFixed(2)}, {'sales':$scope.yearStats.sep.total.toFixed(2)},
                    {'sales':+$scope.yearStats.oct.total.toFixed(2)}, {'sales':$scope.yearStats.nov.total.toFixed(2)}, {'sales':$scope.yearStats.dec.total.toFixed(2)}
                ];
                $scope.myChartColumnsTotal = [{'id': 'sales', 'type': 'line'}];
                $scope.myChartDataSales = [
                    {'sales':$scope.yearStats.jan.sales}, {'sales':$scope.yearStats.feb.sales}, {'sales':$scope.yearStats.mar.sales},
                    {'sales':$scope.yearStats.apr.sales}, {'sales':$scope.yearStats.may.sales}, {'sales':$scope.yearStats.jun.sales},
                    {'sales':$scope.yearStats.jul.sales}, {'sales':$scope.yearStats.aug.sales}, {'sales':$scope.yearStats.sep.sales},
                    {'sales':$scope.yearStats.oct.sales}, {'sales':$scope.yearStats.nov.sales}, {'sales':$scope.yearStats.dec.sales}
                ];
                $scope.myChartColumnsSales = [{'id': 'sales', 'type': 'line'}];
                console.log('totalSalesYear: ' + JSON.stringify($scope.myChartDataTotal));

            });
            $scope.jobs = JService.query(function (result) {
                socket.syncUpdates('job', $scope.jobs);
            });
        } else {
            console.log('User not logged in');
        }

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('budget');
            socket.unsyncUpdates('job');
        });

        $rootScope.pageTitle = 'Dashboard';


        $scope.ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 days': [moment().subtract('days', 7), moment()],
            'Last 30 days': [moment().subtract('days', 30), moment()],
            'This month': [moment().startOf('month'), moment().endOf('month')]
        };

        $scope.ranges2 = {
            'This Week': [moment().startOf('week'), moment().endOf('week')],
            //'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 days': [moment().subtract('days', 7), moment()],
            'Last 30 days': [moment().subtract('days', 30), moment()],
            'This month': [moment().startOf('month'), moment().endOf('month')],
            'Next 3 months': [moment(), moment().add('months', 3)]
        };

        $scope.tabledatesrange = {startDate: moment().subtract(5, 'day'), endDate: moment().add(60, 'day')};


        var pattern = [];
        pattern.push(colorService.theme());

        $scope.color_pattern = pattern.join();

        var random_load_value = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var values = [];
        for (var i = 0; i < 30; ++i) {
            values.push(random_load_value(40, 80));
        }

        var randomData = function (size, min, max) {
            var data = [];
            for (i = 0; i < size; ++i) {
                if (data.length) {
                    var factor = 3;
                    var minOrganic = data[data.length - 1] - factor;
                    var maxOrganic = data[data.length - 1] + factor;
                    data.push(
                        random_load_value(
                            minOrganic < min ? min : minOrganic,
                            maxOrganic > max ? max : maxOrganic
                        )
                    );
                } else {
                    data.push(random_load_value(min, max));
                }
            }
            return data;
        };

        $scope.randomDate = function () {
            var start = new Date(2012, 0, 1);
            var end = new Date();

            var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            var dateString = date.toLocaleString();
            return dateString;
        };

        $scope.chartData1 = randomData(20, 40, 60);
        console.log('chartData1: ' + JSON.stringify($scope.chartData1));
        $scope.chartData2 = randomData(20, 40, 60);
        $scope.chartData3 = randomData(20, 40, 60);
        $scope.chartData4 = randomData(100, 10, 30);

        // set initial server load
        $scope.serverLoad = values[values.length - 1] + '%';

        var server_load_options = {
            bindto: '#server-load-chart',
            legend: {show: false},
            padding: {
                top: 6,
                right: -1,
                bottom: -8,
                left: 0
            },
            data: {
                columns: [
                    ['Server load'].concat(values),
                ],
                type: 'area'
            },
            size: {
                height: 160
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0,
                        right: 0
                    }
                },
                y: {
                    show: false,
                    max: 100,
                    min: 0,
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                }
            },
            grid: {
                focus: {show: false}
            },
            point: {show: false},
            tooltip: {
                format: {
                    title: function (d) {
                        return undefined;
                    }, // Disable tooltip header
                    value: function (value, ratio, id) {
                        return value + '%';
                    }
                }
            },
            transition: {duration: 50},
            color: {pattern: pattern.reverse()}
        };

        var server_load_chart = c3.generate(server_load_options);
        var interval;

        var createInterval = function () {
            if (interval) return;

            return $interval(function () {
                var v = random_load_value(40, 80);
                $scope.serverLoad = v + '%';
                server_load_chart.flow({
                    columns: [['Server load', v]]
                });
            }, 2500);
        };

        var cleanInterval = function () {
            if (angular.isDefined(interval)) {
                $interval.cancel(interval);
                interval = false;
            }
        };

        interval = createInterval();
        var window = angular.element($window);
        var prevEvent;

        window.on('blur', function (event) {
            if (prevEvent !== 'blur')
                cleanInterval();
            prevEvent = 'blur';
        });

        window.on('focus', function (event) {
            if (prevEvent !== 'focus')
                interval = createInterval();
            prevEvent = 'focus';
        });

        $scope.$on('$destroy', function () {
            cleanInterval();
        });

        $scope.tabs = ['Log', 'Timeline', 'Messages'];
    }

    angular.module('ibudgetApp')
        .controller('MainController', MainController);

})();
