/* jshint unused:false */

var Client = (function(){

  'use strict';

  var animals;

  function Client(n, a){
    this.name = n;
    animals = [];
  }


  Client.prototype.adopt = function(animal){
    animals.push(animal);
  };
  
  Client.prototype.adoptedAnimal = function(){
    return animals.pop();
  };

  return Client;
})();
