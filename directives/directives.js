(function() {
  'use strict';

  function SampleDirective() {
    var directive = {
      template: '<h1>Hello world!</h1>'
    };

    return directive;
  }

  angular.module('myApp')
    .directive('sampleDirective', SampleDirective);
}());
