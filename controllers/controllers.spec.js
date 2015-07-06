describe('SampleController', function() {
  var $rootScope,
    ctrl, scope, sampleService;

  beforeEach(module('myApp'));

  beforeEach(inject(function( _$rootScope_, _$controller_, _sampleService_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    sampleService = _sampleService_;

    ctrl = _$controller_('SampleController', {
      $scope: scope
    });
  }));

  it('should expose a property', function() {
    expect(ctrl.foo).toBe('bar');
  });

  it('should expose a method', function() {
    ctrl.bar();
    expect(ctrl.foo).toBe('baz');
  });

  it('should have a watcher', function() {
    scope.$digest(); // run once before change a value just to make the coverage 100%
    scope.baz = 'foo';
    scope.$digest();
    expect(ctrl.baz).toBe('foobar');
  });

  it('should do something on $destroy', function() {
    spyOn(sampleService, 'bar');
    scope.$destroy();
    expect(sampleService.bar).toHaveBeenCalled();
  });

  it('should emit an event', function() {
    spyOn(scope, '$emit');

    ctrl.sendMessage();
    expect(scope.$emit).toHaveBeenCalledWith('sample:message', {
      foo: 'bar'
    });
  });

  it('should broadcast an event', function() {
    spyOn(scope, '$broadcast');

    ctrl.broadcastEvent();
    expect(scope.$broadcast).toHaveBeenCalledWith('sample:broadcast', {
      foo: 'bar'
    });
  });
});
