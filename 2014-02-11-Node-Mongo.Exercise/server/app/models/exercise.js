'use strict';

function Exercise(name, time, cal, date){
  this.name = name;
  this.time = parseInt(time);
  this.calories = parseInt(cal);
  this.date = date;
}

module.exports = Exercise;
