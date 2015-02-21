(function() {
  'use strict';

  function SampleDirective() {
    var directive = {
      template: '<h1>Hello world!</h1>',
      link: linkFn,
      scope: {
        fooIsolate: '='
      }
    };

    return directive;

    function linkFn($scope, $element) {
      $element.on('click', function() {
        console.log('something');
      });

      $scope.foo = 'bar';
    }
  }

  angular.module('myApp')
    .directive('sampleDirective', SampleDirective);
}());
