# Service
> Testing recipes for Services

## Table of contents

- [Boilerplate](#boilerplate)
- [Public properties](#public-properties)
- [public methods](#public-methods)
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

## Public properties

To test public properties, all you need to do is access them directly from the `sampleService`:

> Test:

```js
it('should expose a property', function() {
    expect(sampleService.foo).toBe('bar');
});
```

> Code:

```js
var service = {
  foo: 'bar'
};

return service;
```

## Public methods

To test public methods, all you need to do is call them directly from the `sampleService`:

> Test:

```js
it('should have a method', function() {
    expect(sampleService.foo()).toBe('bar');
});
```

> Code:

```js
var service = {
  foo: function() {
    return 'bar';
  }
};

return service;
```


## Methods from other services

First we need to inject the service to be tested into our tests:

```js
var sampleService, dummyService;

beforeEach(inject(function(_sampleService_, _dummyService_) {
  sampleService = _sampleService_;
  dummyService = _dummyService_;
}));
```

So we can make our expectation simple calling the `baz` method that calls the `dummyService.bar` method:

```js
it('should call the method `bar` of `sampleService`', function() {
  spyOn(dummyService, 'bar'); // spies the `bar` method of the `dummyService`. Search for Jasmine Spies for more info
  sampleService.baz();
  
  expect(dummyService.bar).toHaveBeenCalled();
});
```

In the code we inject the `dummyService` inside the `sampleService` and call `dummyService.bar` in the `baz` method:

```js
.factory('sampleService', function(dummyService) {
  var service = {
    baz: function() {
      dummyService.bar();
    }
  };
  
  return service;
});

```


## $http

...

## Promises

...


