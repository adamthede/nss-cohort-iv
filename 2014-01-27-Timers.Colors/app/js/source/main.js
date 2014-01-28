(function(){

  'use strict';

  $(document).ready(initialize);

  var timer;

  function initialize(){
    //setTimeout(alertMe, 5000);
    $('#start').click(start);
    $('#stop').click(stop);
    $('#reset').click(reset);
  }

  //function alertMe(){
  //  alert('hey');
  //}

  function start(){
    clearInterval(timer);
    timer = setInterval(makeColorBox, 100);
  }

  function makeColorBox(){
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', randomColor());
    $('body').css('background-color', randomColor());
    $('#container').prepend($div);
  }

  function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var alpha = Math.random();

    var rgba = 'rgba('+red+','+green+','+blue+','+alpha+')';
    return rgba;
  }

  function stop(){
    clearInterval(timer);
  }

  function reset(){
    clearInterval(timer);
    $('#container').empty();
    $('body').css('background-color', 'white');
  }

})();
