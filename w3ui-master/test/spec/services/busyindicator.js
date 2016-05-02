'use strict';

describe('Service: busyIndicator', function () {

  // load the service's module
  beforeEach(module('w3uiFrontendApp'));

  // instantiate service
  var busyIndicator;
  beforeEach(inject(function (_busyIndicator_) {
    busyIndicator = _busyIndicator_;
  }));

  it('should do something', function () {
    expect(!!busyIndicator).toBe(true);
  });

});
