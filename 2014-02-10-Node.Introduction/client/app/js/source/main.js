(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#one').click(one);
    $('#two').click(two);
    $('#sum').click(sum);
    $('#candrink').click(candrink);
    $('#product').click(findProduct);
    $('#namecalc').click(calcNames);
  }

  function one(){
    var url = window.location.origin.replace(/(\d){4}/g,'4000');
    url += '/name?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function two(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/favcolor?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function sum(){
    var a = $('#numberone').val();
    var b = $('#numbertwo').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/sum/'+a+'/'+b+'?callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
      $('#answer').text(data.sum);
    });
  }

  function candrink(){
    var name = $('#name').val();
    var age = $('#age').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/candrink/'+name+'/'+age+'?callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
      $('#answercandrink').text(data.answercandrink);
    });
  }

  function findProduct(){
    var numbers = $('#numbers').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/product?numbers='+numbers+'&callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function calcNames(){
    var names = $('#names').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/namecalc?names='+names+'&callback=?';
    $.getJSON(url, function(data){
      console.log(data);
      $('#namesanswer').text(data.namecalc);
    });
  }

})();

