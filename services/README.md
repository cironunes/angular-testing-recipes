# Service
> Testing recipes for Services

## Table of contents

- [Boilerplate](#boilerplate)
- [Public properties](#public-properties)
- [Public methods](#public-methods)
- [Methods from other services](#methods-from-other-services)
- [$http](#$http)
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

> NOTE: in this example we'll mock an HTTP GET call. The idea can be used to pretty much any other kind of HTTP request.

We'll need the `$httpBackend` service from `angular-mocks`.

```js
var $httpBackend;

beforeEach(inject(function(_$httpBackend_) {
  $httpBackend = _$httpBackend_;
}))
```

Now we'll use it to intercept the HTTP call and control how a fake server wil respond to it.

> Test:

```js
it('should bring data from the server', function() {
  var result;
  
  $httpBackend.whenGET('/api/something').respond([1, 2, 3]); // intercept GET /api/something and respond [1, 2, 3]
  sampleService.getData().then(function(response) {
    result = response.data;
  });
  $httpBackend.flush(); // flush the request to resolve the promise
  
  expect(result).toEqual([1, 2, 3]); // note that we use toEqual to match arrays as it's a non strict check
});
```

> Code:

```
function sampleService($http) {
  var service = {
    getData: getData
  };
  
  return service;
  
  function getData() {
    return $http.get('/api/something')
      .success(function(response) {
        return response;
      });
  }
}

```

We can also cover the error scenario:

> Test:

```js
it('should return the error reason', function() {
  var reason;
  
  $httpBackend.whenGET('/api/something').respond(401, 'Do not exist');
  sampleService.getData().then(angular.noop, function(response) {
    reason = response.data;
  });
  $httpBackend.flush();
  
  expect(reason).toBe('Do not exist');
});
```

> Code:

```
function sampleService($http, $q) {
  var service = {
    getData: getData
  };
  
  return service;
  
  function getData() {
    return $http.get('/api/something')
      .error(function(response) {
        $q.reject(response);
      });
  }
}
```


## Promises

...


