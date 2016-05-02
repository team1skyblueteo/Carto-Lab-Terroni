'use strict';

describe('Service: Noty', function () {

  // load the service's module
  beforeEach(module('w3uiFrontendApp'));

  // instantiate service
  var Noty;
  beforeEach(inject(function (_Noty_) {
    Noty = _Noty_;
  }));

  it('should do something', function () {
    expect(!!Noty).toBe(true);
  });

});
