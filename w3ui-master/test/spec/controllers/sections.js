'use strict';

describe('Controller: SectionsCtrl', function () {

  // load the controller's module
  beforeEach(module('w3uiFrontendApp'));

  var SectionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SectionsCtrl = $controller('SectionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
