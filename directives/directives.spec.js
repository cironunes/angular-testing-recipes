describe('sampleDirective', function() {
  'use strict';

  var elem, scope, isolateScope,
      $compile, $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();

    elem = angular.element(
      '<div sample-directive foo-isolate="bar">' +
      ' <h1>foo</h1>' +
      '</div>'
    );

    $compile(elem)(scope);
    isolateScope = elem.isolateScope();
  }));

  it('should have a template', function() {
    expect(elem[0].innerText).toContain('Hello world!');
  });

  it('should expose a property to the $scope', function() {
    expect(isolateScope.foo).toBe('bar');
  });

  it('should expose a property to the isolateScope', function() {
    scope.bar = 'baz';
    scope.$digest();

    expect(isolateScope.fooIsolate).toBe('baz');
  });

  describe('#DOM events', function() {
    it('should log something when the user clicks in the element', function() {
      spyOn(console, 'log');
      elem.triggerHandler('click');

      expect(console.log).toHaveBeenCalledWith('something');
    });
  });

  describe('#transclusion', function() {
    it('should transclude the DOM', function() {
      expect(elem[0].innerHTML).toContain('<h1 class="ng-scope">foo</h1>');
    });
  });
});
