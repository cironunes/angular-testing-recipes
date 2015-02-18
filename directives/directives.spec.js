describe('sampleDirective', function() {
  'use strict';

  var elem, scope,
      $compile, $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();

    elem = angular.element('<div sample-directive></div>');
    elem = $compile(elem)(scope);
  }));

  it('should have a template', function() {
    expect(elem[0].innerText).toBe('Hello world!');
  });
});
