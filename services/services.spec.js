describe('SampleService', function() {
  'use strict';

  var sampleService;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_sampleService_) {
    sampleService = _sampleService_;
  }));

  it('should expose a property', function() {
    expect(sampleService.foo).toBe('bar');
  });

  it('should expose a method', function() {
    sampleService.bar();
    expect(sampleService.foo).toBe('baz');
  });
});