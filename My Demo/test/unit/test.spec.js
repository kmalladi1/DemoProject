'use strict';

var chai = require('chai');
var expectation = chai.expect;

describe('Array', function() {
  describe('#indexOf()', function() {

    // Dummy test
    it('should return -1 when the value is not present', function() {
      expectation(-1).to.equal([1, 2, 3].indexOf(4));
    });

  });

});
