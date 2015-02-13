(function() {
  'use strict';

  angular.module('myApp')
    .factory('sampleService', SampleService)
    .factory('dummyService', DummyService);

  function SampleService($http, dummyService) {
    var service = {
      foo: 'bar',
      bar: bar,
      baz: baz,
      getData: getData
    };

    return service;

    function bar() {
      service.foo = 'baz';
    }

    function baz() {
      return dummyService.someMethod();
    }

    function getData() {
      return $http.get('/api/something')
        .success(function(result) {
          return result;
        });
    }
  }

  SampleService.$inject = ['$http', 'dummyService'];




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
