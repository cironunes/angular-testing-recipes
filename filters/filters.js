(function() {
  'use strict';

  angular.module('myApp')
    .filter('trim', function () {
      return function (input) {
        var str;
        if (input === undefined || input === null) {
          input = '';
        }
        str = input + '';
        return str.trim();
      };
    });
}());
