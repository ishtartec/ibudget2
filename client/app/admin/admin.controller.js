'use strict';

angular.module('ibudgetApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User, toastr, $aside, socket) {

      // Use the User $resource to fetch all users
      //$scope.users = User.query();
      User.query(function (result) {
          $scope.users = result;
          socket.syncUpdates('user', $scope.users);
      });
      $scope.$on('$destroy', function () {
          socket.unsyncUpdates('user');
      });
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.delete = function(user) {
          User.remove({ id: user._id }, function() {
              $scope.users = User.query();
          });
          //$scope.users.splice(this.$index, 1);
      };

      $scope.deleteUser = function (user) {
          console.log('You confirmed "Yes."');
          User.remove({id: user._id}, function () {
              $scope.users = User.query();
              toastr.info('User deleted');
          });
      };

      // CRUD Definition
      // settings
      $scope.settings = {
          singular: 'User',
          plural: 'Users',
          cmd: 'Add'
      };


      // defining template
      var formTpl = $aside({
          scope: $scope,
          templateUrl: 'components/ui/tpl/apps/admin-form.html',
          show: false,
          placement: 'left',
          backdrop: false,
          animation: 'am-slide-left'
      });

      // methods
      $scope.checkAll = function () {
          angular.forEach($scope.users, function (item) {
              item.selected = !item.selected;
          });
      };

      $scope.editItem = function(item){
          if(item){
              item.editing = true;
              $scope.item = item;
              $scope.settings.cmd = 'Edit';
              showForm();
          }
      };

      $scope.viewItem = function(item){
          if(item){
              item.editing = false;
              $scope.item = item;
              $scope.settings.cmd = 'View';
              showForm();
          }
      };

      $scope.createItem = function(){
          var item = {
              date: new Date(),
              provider: 'local',
              lastmodified: new Date(),
              createdBy: $scope.getCurrentUser().email,
              editing: true
          };
          $scope.item = item;
          $scope.settings.cmd = 'New';
          showForm();
      };

      $scope.saveItem = function(){
          if($scope.settings.cmd == 'New'){
              //$scope.data.push($scope.item);
              User.save($scope.item, function(res) {
                  console.log('Saved');
                  toastr.info('Added new user');
                  $scope.users = User.query();
              });
          } else {
              $scope.item.lastmodified = new Date();
              User.updateUser({id: $scope.item._id}, $scope.item, function (res) {
                  console.log('Updated...');
                  toastr.info('User updated');
                  $scope.users = User.query();
              });
          }
          hideForm();
      };

      $scope.remove = function(item){
          if(confirm('Are you sure?')){
              if(item){
                  $scope.data.splice($scope.data.indexOf(item), 1);
              } else {
                  $scope.data = $scope.data.filter(
                      function(item) {
                          return !item.selected;
                      }
                  );
                  $scope.selectAll = false;
              }
          }
      };

      var showForm = function(){
          angular.element('.tooltip').remove();
          formTpl.show();
      };

      var hideForm = function(){
          formTpl.hide();
      };

      $scope.$on('$destroy', function() {
          hideForm();
      });
  });
