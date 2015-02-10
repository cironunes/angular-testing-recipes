(function() {
  'use strict';

  angular.module('myApp')
    .factory('sampleService', SampleService);

  function SampleService() {
    var service = {
      foo: 'bar',
      bar: bar
    };

    return service;

    function bar() {
      service.foo = 'baz';
    }
  }

}());