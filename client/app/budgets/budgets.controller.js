'use strict';

angular.module('ibudgetApp')
    .controller('BudgetsCtrl', function ($scope, socket, Auth, $aside, BService) {
        var self = this;
        this.awesomeThings = [];
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;

        $scope.budgets = [];


        if (self.isLoggedIn()) {
            BService.query(function (result) {
                $scope.budgets = result;
                socket.syncUpdates('budget', $scope.budgets);
            });
        } else {
            console.log('User not logged in');
        }

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('budget');
        });

        $scope.updateBudget = function () {
            $scope.item.instructorTotal = $scope.item.instructorFee * $scope.item.instructorHours;
            $scope.item.vendorTotal = $scope.item.vendorFee * $scope.item.vendorCount;
            $scope.item.manualsTotal = $scope.item.manualsFee * $scope.item.manualsCount;
            $scope.item.expensesTotal = $scope.item.expensesFee * $scope.item.expensesCount;
            $scope.item.travelTotal = $scope.item.travelCost * $scope.item.travelCount;
            $scope.item.pueTotal = $scope.item.pueCost * $scope.item.pueCount;
            $scope.item.otherTotal = $scope.item.otherCost * $scope.item.otherCount;
            $scope.item.ic = 0.2 * Number($scope.item.total).toFixed(2);
            $scope.item.dc = $scope.item.instructorTotal + $scope.item.vendorTotal + $scope.item.manualsTotal +
                $scope.item.expensesTotal + $scope.item.travelTotal + $scope.item.pueTotal + $scope.item.otherTotal;
            $scope.item.bi = ($scope.item.total - $scope.item.dc - $scope.item.ic) * 100 / $scope.item.total;
            //console.log('Updating totals: ' + JSON.stringify($scope.item));
        };

        $scope.calculateBudget = function () {
            //console.log('Calculando...');
            $scope.item.total = (-100 * $scope.item.dc) / (25 - 80);
            $scope.updateBudget();
        };

        $scope.updateApproved = function (approved) {
            approved ? $scope.item.approvedBy = $scope.getCurrentUser().email : $scope.item.approvedBy = '';
        };

        // CRUD Definition
        // settings
        $scope.settings = {
            singular: 'Budget',
            plural: 'Budgets',
            cmd: 'Add'
        };


        // defining template
        var formTpl = $aside({
            scope: $scope,
            templateUrl: 'components/ui/tpl/apps/crud-form.html',
            show: false,
            placement: 'left',
            backdrop: false,
            animation: 'am-slide-left'
        });

        // methods
        $scope.checkAll = function () {
            angular.forEach($scope.budgets, function (item) {
                item.selected = !item.selected;
            });
        };

        $scope.editItem = function (item) {
            if (item) {
                item.editing = true;
                $scope.item = item;
                $scope.settings.cmd = 'Edit';
                showForm();
            }
        };

        $scope.viewItem = function (item) {
            if (item) {
                item.editing = false;
                $scope.item = item;
                $scope.settings.cmd = 'View';
                showForm();
            }
        };

        $scope.createItem = function () {
            var item = {
                date: new Date(),
                lastmodified: new Date(),
                createdBy: $scope.getCurrentUser().email,
                createdAt: new Date(),
                editing: true
            };
            $scope.item = item;
            $scope.settings.cmd = 'New';
            showForm();
        };

        $scope.saveItem = function () {
            if ($scope.settings.cmd == 'New') {
                //$scope.data.push($scope.item);
                BService.save($scope.item, function (res) {
                    console.log('Saved');
                    toastr.info('New Budget Added');
                });
            } else {
                $scope.item.lastmodified = new Date();
                $scope.item.updatedBy = $scope.getCurrentUser().email;
                BService.update({id: $scope.item._id}, $scope.item, function (res) {
                    console.log('Updated...');
                    toastr.info('Budget Updated');
                });
            }
            hideForm();
        };

        $scope.remove = function (item) {
            if (confirm('Are you sure?')) {
                if (item) {
                    $scope.data.splice($scope.data.indexOf(item), 1);
                } else {
                    $scope.data = $scope.data.filter(
                        function (item) {
                            return !item.selected;
                        }
                    );
                    $scope.selectAll = false;
                }
            }
        };

        $scope.deleteBudget = function (patient) {
            console.log('You confirmed "Yes."');
            BService.delete({id: patient._id}, function () {
                console.log('Budget deleted...');
                toastr.info('Budget deleted');
            });
        };

        var showForm = function () {
            angular.element('.tooltip').remove();
            formTpl.show();
        };

        var hideForm = function () {
            formTpl.hide();
        };

        $scope.$on('$destroy', function () {
            hideForm();
        });
    });