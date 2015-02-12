(function() {
  'use strict';

  angular.module('myApp')
    .factory('sampleService', SampleService)
    .factory('dummyService', DummyService);

  function SampleService(dummyService) {
    var service = {
      foo: 'bar',
      bar: bar,
      baz: baz
    };

    return service;

    function bar() {
      service.foo = 'baz';
    }

    function baz() {
      return dummyService.someMethod();
    }
  }

  SampleService.$inject = ['dummyService'];




  function DummyService() {
    var service = {
      someMethod: someMethod
    };

    return service;

    function someMethod() {
      return 'bla';
    }
  }

}());
