'use strict';

describe('Filter: checkmarkFilter', function () {

  // load the filter's module
  beforeEach(module('ibudgetApp'));

  // initialize a new instance of the filter before each test
  var checkmarkFilter;
  beforeEach(inject(function ($filter) {
    checkmarkFilter = $filter('checkmarkFilter');
  }));

  it('should return the input prefixed with "checkmarkFilter filter:"', function () {
    var text = 'angularjs';
    expect(checkmarkFilter(text)).to.equal('checkmarkFilter filter: ' + text);
  });

});
