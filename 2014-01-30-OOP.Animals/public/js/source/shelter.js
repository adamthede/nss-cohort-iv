/* jshint unused:false */

var Shelter = (function(){

  'use strict';

  var hours;
  var animals = [];

  function Shelter(n, h){
    this.name = n;
    this.location = 'not defined';
    this.capacity = 0;
  }

  Shelter.prototype.setHours = function(h){
    var tempHours = _.map(h, function(time){
      return time.day+' '+time.open+'-'+time.close;
    });

    hours = tempHours.join(', ');
  };

  Shelter.prototype.getHours = function(){
    return hours;
  };

  Shelter.prototype.addAnimal = function(animal){
    animals.push(animal);
  };

  Shelter.prototype.placeAnimal = function(name){
    var tempAnimals =  _.remove(animals, function(e){
      return e.name === name;
    });

    return tempAnimals[0];
  };

  Shelter.prototype.animalCount = function(){
    return animals.length;
  };

  return Shelter;
})();
