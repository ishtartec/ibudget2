'use strict';

describe('Directive: bsConfirm', function () {

  // load the directive's module and view
  beforeEach(module('ibudgetApp'));
  beforeEach(module('components/directives/bsConfirm/bsConfirm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bs-confirm></bs-confirm>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the bsConfirm directive');
  }));
});
