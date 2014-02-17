'use strict';

function Movie(movie){
  this.name = movie.name || '';
  this.rating = movie.rating || '';
  this.runningtime = parseInt(movie.runningtime) || 0;
  this.releaseyear = parseInt(movie.releaseyear) || 0;
  this.studio = movie.studio || '';
  this.actors = movie.actors ? movie.actors.split(', ') : [];
  this.director = movie.director || '';
  this.poster = movie.poster || '';
}

module.exports = Movie;
