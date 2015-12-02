'use strict';

describe('Service: JService', function () {

  // load the service's module
  beforeEach(module('ibudgetApp'));

  // instantiate service
  var JService;
  beforeEach(inject(function (_JService_) {
    JService = _JService_;
  }));

  it('should do something', function () {
    expect(!!JService).to.be.true;
  });

});
