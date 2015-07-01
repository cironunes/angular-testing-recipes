describe('sampleDirectiveFromTemplateUrl', function() {
  'use strict';

  var element, scope, isolateScope,
    $compile, $rootScope;

  // load the application module
  beforeEach(module('myApp'));
  beforeEach(module('myAppPartials'));

  // inject the services to be used before each of the specs
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;

    scope = $rootScope.$new();
    element = angular.element(
      '<div sample-directive-from-template-url foo-isolate="bar" bar="{{ ::baz }}" baz="doSomething()">' +
      ' <h1>foo</h1>' +
      '</div>'
    );
    $compile(element)(scope);

    scope.$digest();

    // get the isolate scope of the directive
    isolateScope = element.isolateScope();
  }));

  it('should have a template', function() {
    expect(element[0].innerText).toContain('Hello world!');
  });

  it('should expose a property to the $scope', function() {
    expect(isolateScope.foo).toBe('bar');
  });

  it('should expose a property to the isolateScope as `=`', function() {
    scope.bar = 'baz';
    scope.$digest();

    expect(isolateScope.fooIsolate).toBe('baz');
  });

  it('should expose a property to the isolateScope as `@`', function() {
    scope.baz = 'foo';
    scope.$digest();

    expect(isolateScope.bar).toBe('foo');
  });

  it('should expose a property to the isolateScope as `&`', function() {
    spyOn(console, 'log');

    scope.doSomething = function() {
      console.log('lol');
    };

    isolateScope.baz();

    expect(console.log).toHaveBeenCalledWith('lol');
  });


  describe('#DOM events', function() {
    it('should log something when the user clicks in the element', function() {
      spyOn(console, 'log');
      element.triggerHandler('click');

      expect(console.log).toHaveBeenCalledWith('something');
    });
  });

  describe('#transclusion', function() {
    it('should transclude the DOM', function() {
      expect(element[0].innerHTML).toContain('<h1 class="ng-scope">foo</h1>');
    });
  });
});
