describe('sampleFilter', function () {
  'use strict';

  var trim;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($filter) {
    trim = $filter('trim');
  }));

  it('should remove the whitespaces at the start and at the end of a given text', function () {
    var text = '    angularjs  ';
    expect(trim(text)).toBe('angularjs');
  });

  it('should return an empty string if the value is equal `undefined` or `null`', function () {
    expect(trim(undefined)).toBe('');
    expect(trim(null)).toBe('');
  });
});
