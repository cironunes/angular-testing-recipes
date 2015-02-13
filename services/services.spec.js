describe('SampleService', function() {
  'use strict';

  var sampleService, dummyService,
      $httpBackend;


  beforeEach(module('myApp'));

  beforeEach(inject(function(_$httpBackend_, _sampleService_, _dummyService_) {
    $httpBackend = _$httpBackend_;

    sampleService = _sampleService_;
    dummyService = _dummyService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

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

  it('should bring data from the server', function() {
    var data;

    $httpBackend.whenGET('/api/something').respond([1, 2, 3]);
    sampleService.getData().then(function(response) {
      data = response.data;
    });
    $httpBackend.flush();

    expect(data).toEqual([1, 2, 3]);
  });
});
