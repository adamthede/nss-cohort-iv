(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getExercises();
    $('#create-exercise').click(createExercise);
    $('#querysearch').click(filterResults);
  }

  function getExercises(){
    $('#querydropdown').empty();
    var $firstOption = $('<option></option>');
    $firstOption.attr('value', 'Reset').text('Reset');
    $('#querydropdown').append($firstOption);
    $('#exercises > tbody').empty();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    console.log(url);
    $.getJSON(url, displayExercises);
    $.getJSON(url, displayDropdown);
  }

  function displayExercises(data){
    console.log(data);
    for(var i = 0; i < data.exercises.length; i++){
      var $tdname = $('<td>');
      var $tdtime = $('<td>');
      var $tdcal = $('<td>');
      var $tddate = $('<td>');
      var $tr = $('<tr>');

      $tdname.text(data.exercises[i].name);
      $tdtime.text(data.exercises[i].time);
      $tdcal.text(data.exercises[i].calories);
      $tddate.text(data.exercises[i].date);
      $tr.append($tdname, $tdtime, $tdcal, $tddate);

      $('#exercises > tbody').prepend($tr);
    }
  }
  
  function displayDropdown(data){
    var names = _.map(data.exercises, function(e){
      return e.name;
    });
    var options = _.uniq(names);
    console.log(options);
    for(var y = 0; y < options.length; y++){
      var $option = $('<option></option>');
      $option.attr('value',options[y]).text(options[y]);
      $('#querydropdown').append($option);
    }
  }

  function createExercise(){
    var name = $('#name').val();
    var time = $('#time').val();
    var cals = $('#calories').val();
    var date = $('#date').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    var options = {};
    options.url = url;
    options.type = 'POST';
    options.data = {name: name, time: time, calories: cals, date: date};
    options.success = exerciseCreated;
    $.ajax(options);
  }

  function exerciseCreated(){
    $('#exercises > tbody').empty();
    $('#querydropdown').empty();
    getExercises();
  }

  function filterResults(){
    var searchString = $('#querydropdown').val();
    if(searchString === 'Reset'){
      getExercises();
    }
    else{
      var url = window.location.origin.replace(/(\d){4}/g, '4000');
      url += '/exercises/'+searchString;
      $('#exercises > tbody').empty();
      $.getJSON(url, displayExercises);
    }
  }

})();

