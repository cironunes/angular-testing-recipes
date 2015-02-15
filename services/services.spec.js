describe('SampleService', function() {
  'use strict';

  var sampleService, dummyService,
      $httpBackend, $rootScope;


  beforeEach(module('myApp'));

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _sampleService_, _dummyService_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;

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

  describe('#getData', function() {
    describe('success:', function() {
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

    describe('error:', function() {
      it('should return the error reason', function() {
        var data;

        $httpBackend.whenGET('/api/something').respond(401, 'Do not exist');
        sampleService.getData().then(angular.noop, function(response) {
          data = response.data;
        });
        $httpBackend.flush();

        expect(data).toBe('Do not exist');
      });
    });
  });

  describe('#getResults', function() {
    var onGetResults, onGetResultsRejection;

    beforeEach(function() {
      onGetResults = jasmine.createSpy('onGetResults');
      onGetResultsRejection = jasmine.createSpy('onGetResultsRejection');
    });

    describe('success:', function() {
      it('should return the item for the index in the `result` collection', function() {
        sampleService.getResults(4).then(onGetResults);
        $rootScope.$apply();
        expect(onGetResults).toHaveBeenCalledWith(5);
      });
    });

    describe('failure:', function() {
      it('should return the rejection reason for non existent items in the `result` collection', function() {
        sampleService.getResults(5).then(angular.noop, onGetResultsRejection);
        $rootScope.$apply();
        expect(onGetResultsRejection).toHaveBeenCalledWith('Do not exist');
      });
    });
  });
});
