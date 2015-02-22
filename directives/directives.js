(function() {
  'use strict';

  function SampleDirective() {
    var directive = {
      template: '<div>' +
      ' <h1>Hello world!</h1>' +
      ' <div ng-transclude></div>' +
      '</div>',
      link: linkFn,
      scope: {
        fooIsolate: '='
      },
      transclude: true
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
