(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('input, textarea').focusin(focusInput);
    $('input, textarea').blur(blurInput);
    $('#add-photo').click(addPhoto);
    $('#add-animal').click(addAnimal);
  }

  function addAnimal(){
    var species = $('#species').val();
    var color = $('#color').val();
    var age = $('#age').val() * 1;
    var gender = $('#gender').val();
    var name = $('#name').val();
    var description = $('#description').val();
    var photos = getAnimalPhotos();

    console.log(species, color, age, gender, name, description, photos);
    debugger;
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
    //var $img = $('<img>');
    //$img.addClass('th');
    //$img.addClass('pic');
    //$img.attr('src', img);
    //$('#photodisplay').prepend($img);
    
    //var $a = $('<a>');
    //$a.addClass('th radius');

    var $div = $('<div>');
    $div.addClass('pic');
    $div.addClass('th');
    $div.css('background-image', 'url('+img+')');
    $div.css('background-size', 'contain');
    $('#photodisplay').prepend($div);
    event.preventDefault();
  }

  function focusInput(){
    $(this).css('background-color', 'lavender');
  }

  function blurInput(){
    $(this).css('background-color', 'white');
  }
})();

