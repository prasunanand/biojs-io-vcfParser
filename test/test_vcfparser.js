/*
 * biojs-io-vcfparser
 * https://github.com/prasunanand/biojs-io-vcfparser
 *
 * Copyright (c) 2015 Prasun Anand
 * Licensed under the Apache 2 license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var vcfparser = require('../');

describe('biojs-io-vcfparser module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){

      assert.equal(vcfparser.hello('biojs'), ("hello biojs"));
      
      // alternative styles
      vcfparser.hello('biojs').should.equal("hello biojs");
    });
  });
});
