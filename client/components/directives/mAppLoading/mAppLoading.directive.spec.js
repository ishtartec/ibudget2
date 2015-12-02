'use strict';

describe('Directive: mAppLoading', function () {

  // load the directive's module
  beforeEach(module('fisioforceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<m-app-loading></m-app-loading>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mAppLoading directive');
  }));
});
