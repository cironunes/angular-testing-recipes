(function() {
  'use strict';

  function SampleDirective() {
    var directive = {
      template: '<h1>Hello world!</h1>',
      link: linkFn
    };

    return directive;

    function linkFn($scope, $element) {
      $element.on('click', function() {
        console.log('something');
      });
    }
  }

  angular.module('myApp')
    .directive('sampleDirective', SampleDirective);
}());
