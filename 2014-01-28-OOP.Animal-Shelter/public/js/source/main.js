/* global Animal, animalFactory: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var animals = [];

  function initialize(){
    $('input, textarea').focusin(focusInput);
    $('input, textarea').blur(blurInput);
    $('#add-photo').click(addPhoto);
    $('#add-animal').click(addAnimal);

    animals = animalFactory();
    populateTableAnimals();
  }

  function populateTableAnimals(){
    for(var i = 0; i < animals.length; i++){
      var $a1 = $('<a>');
      var $a2 = $('<a>');
      var $a3 = $('<a>');
      var $a4 = $('<a>');

      var $tdname         = $('<td>').text(animals[i].name);
      var $tdage          = $('<td>').append($a1.attr({'href': '#', 'data-search': 'age', 'data-value': animals[i].age}).text(animals[i].age));
      var $tdgender       = $('<td>').append($a2.attr({'href': '#', 'data-search': 'gender', 'data-value': animals[i].gender}).text(animals[i].gender));
      var $tdphotos       = $('<td>').css('background-image', animals[i].photos[0]);
      var $tddescription  = $('<td>').text(animals[i].description);
      var $tdcolor        = $('<td>').append($a3.attr({'href': '#', 'data-search': 'color', 'data-value': animals[i].color}).text(animals[i].color));
      var $tdspecies      = $('<td>').append($a4.attr({'href': '#', 'data-search': 'species', 'data-value': animals[i].species}).text(animals[i].species));
      var $tr             = $('<tr>');

      $tdphotos.addClass('pic');
      $tdphotos.addClass('th');

      $tr.append($tdname, $tdage, $tdgender, $tdphotos, $tddescription, $tdcolor, $tdspecies);

      $('tbody').append($tr);
    }
  }

  function addAnimal(){
    var species     = $('#species').val();
    var color       = $('#color').val();
    var age         = $('#age').val() * 1;
    var gender      = $('#gender').val();
    var name        = $('#name').val();
    var description = $('#description').val();
    var photos      = getAnimalPhotos();

    var animal = new Animal(name, age, gender, photos, description, color, species);
    animals.push(animal);

    event.preventDefault();
  }

  function getAnimalPhotos(){
    var photoUrls = _.map($('.pic'), function(x){
      return $(x).css('background-image');
    });
    return photoUrls;
  }

  function addPhoto(){
    var img = $('#photo').val();
    var $div = $('<div>');
    
    $div.addClass('pic');
    $div.addClass('th');
    $div.css('background-image', 'url('+img+')');
    
    $('#photodisplay').prepend($div);
   
    event.preventDefault();
  }

  function focusInput(){
    $(this).css('background-color', 'lemonChiffon');
  }

  function blurInput(){
    $(this).css('background-color', 'white');
  }
})();

