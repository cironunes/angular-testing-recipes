(function() {
  function SampleDirectiveFromTemplateUrl() {
    var directive = {
      templateUrl: 'directives/directives.tpl.html',
      link: linkFn,
      scope: {
        fooIsolate: '=',
        bar: '@',
        baz: '&'
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
    .directive('sampleDirectiveFromTemplateUrl', SampleDirectiveFromTemplateUrl);
}());
