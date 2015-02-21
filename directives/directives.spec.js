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
    $compile(elem)(scope);
  }));

  it('should have a template', function() {
    expect(elem[0].innerText).toBe('Hello world!');
  });

  it('should expose a property to the $scope', function() {
    expect(scope.foo).toBe('lol');
  });

  describe('#DOM events', function() {
    it('should log something when the user clicks in the element', function() {
      spyOn(console, 'log');
      elem.triggerHandler('click');

      expect(console.log).toHaveBeenCalledWith('something');
    });
  });
});
