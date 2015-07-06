(function() {
  'use strict';

  angular.module('myApp')
    .controller('SampleController', SampleController);

  function SampleController($scope, sampleService) {
    var vm = this;

    vm.bar = bar;
    vm.sendMessage = sendMessage;
    vm.broadcastEvent = broadcastEvent;
    vm.foo = 'bar';

    function bar() {
      vm.foo = 'baz';
    }

    function sendMessage() {
      $scope.$emit('sample:message', { foo: 'bar' });
    }

    function broadcastEvent() {
      $scope.$broadcast('sample:broadcast', { foo: 'bar' });
    }

    $scope.$watch('baz', function(newVal) {
      if (newVal) {
        vm.baz = newVal + 'bar';
      }
    });

    $scope.$on('$destroy', function() {
      sampleService.bar();
    });

    //scope.$on()
    //scope.$apply()
  }

  SampleController.$inject = ['$scope', 'sampleService'];
}());


