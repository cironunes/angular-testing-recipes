(function() {
  'use strict';

  function SampleController($scope) {
    var vm = this;

    vm.foo = 'bar';

    vm.bar = function() {
      vm.foo = 'baz';
    };

    vm.doSomething = function() {};

    $scope.$watch('baz', function(newVal) {
      if (newVal) {
        vm.baz = newVal + 'bar';
      }
    });

    $scope.$on('$destroy', function() {
      vm.doSomething();
    });

    //scope.$emit()
    //scope.$broadcast()
    //scope.$on()
    //scope.$apply()
  }

  angular.module('myApp', [])
    .controller('SampleController', SampleController);
}());