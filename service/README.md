# Service
> Testing recipes for Services

## Table of contents

- [Boilerplate](#boilerplate)
- [Exposed properties](#expose-properties)
- [Exposed methods](#expose-methods)
- [Methods from other services](#methods-from-other-services)
- [$http]($http)
- [Promises](#promises)

## Boilerplate

Before start we need to initialize the service and mock it's dependencies in our tests:

```js
describe('SampleService', function() {
  'use strict';

  var sampleService;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_sampleService_) {
    sampleService = _sampleService_;
  }));

  ...
});
```


