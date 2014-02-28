(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#add').click(add);
    $('#product').click(product);
  }

  function add(){
    var x = $('#a').val();
    var y = $('#b').val();
    var url = '/calc/add?x=' + x + '&y=' + y;
    $.getJSON(url, function(data){
      $('#sum').append(data.sum);
    });
    $('#a').val('');
    $('#b').val('');
    event.preventDefault();
  }

  function product(){
    var x = $('#c').val();
    var url = '/calc/product?x=' + x;
    $.getJSON(url, function(data){
      $('#productans').append(data.product);
    });
    $('#c').val('');
    event.preventDefault();
  }

})();

