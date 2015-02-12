describe('SampleService', function() {
  'use strict';

  var sampleService, dummyService;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_sampleService_, _dummyService_) {
    sampleService = _sampleService_;
    dummyService = _dummyService_;
  }));

  it('should expose a property', function() {
    expect(sampleService.foo).toBe('bar');
  });

  it('should expose a method', function() {
    sampleService.bar();
    expect(sampleService.foo).toBe('baz');
  });

  it('should call a method from the `dummyService`', function() {
    spyOn(dummyService, 'someMethod');

    sampleService.baz();
    expect(dummyService.someMethod).toHaveBeenCalled();
  });
});
