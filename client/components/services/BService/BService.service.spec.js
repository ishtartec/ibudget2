'use strict';

describe('Service: BService', function () {

  // load the service's module
  beforeEach(module('ibudgetApp'));

  // instantiate service
  var BService;
  beforeEach(inject(function (_BService_) {
    BService = _BService_;
  }));

  it('should do something', function () {
    expect(!!BService).to.be.true;
  });

});
