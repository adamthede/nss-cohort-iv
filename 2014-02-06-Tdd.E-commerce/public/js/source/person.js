/* jshint unused: false */
/* global Cart: false */

var Person = (function(){

  'use strict';

  function Person(name, cash){
    this.name = name;
    this.cash = cash;
    this.cart = new Cart();
  }

  return Person;

})();

