# Controller
> Testing recipes for controllers

## Table of contents

- [Boilerplate](#boilerplate)
- [Exposed properties](#expose-properties)
- [Exposed methods](#expose-methods)
- [Watchers](#watchers)
- [$destroy](#$destroy)
- $emit
- $broadcast
- $on
- $apply

## Boilerplate

Before start we need to initialize the related controller and mock it's dependencies.

```js
describe('SampleController', function() {
    'use strict';

    var $rootScope,
        ctrl, scope;

    // load the related module before each spec runs
    beforeEach(module('moduleName'));

    // inject the $controller service to load the SampleController
    // and the $rootScope
    beforeEach(inject(function(_$rootScope_, _$controller_) {
        // save the injected $rootScope into a variable available across the whole file
        $rootScope = _$rootScope_;

        // create a brand new scope
        scope = $rootScope.$new();

        // load the SampleController mocking the $scope to the one created before
        ctrl = _$controller_('SampleController', {
            $scope: scope
        };
    }));

    ...
});
```

## Exposed properties

## Exposed methods

## Watchers

## $destroy

