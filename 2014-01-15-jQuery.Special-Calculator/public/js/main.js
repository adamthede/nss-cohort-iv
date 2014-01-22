$(document).ready(initialize); //when the document is ready, then run main.js code

function initialize(){
  $('#sum').click(calculatesum);
  $('#product').click(calculateproduct);
  $('#clear').click(clear);
}

function clear(){
  $('#num1').val('');
  $('#num1').focus();
  $('#num2').val('');
  $('#num3').val('');
  $('#num4').val('');
  $('#num5').val('');
  $('#resultsum').text('');
  $('#resultproduct').text('');
}

function calculatesum() {

  var num1 = $('#num1').val();
  num1 = parseFloat(num1);

  var num2 = $('#num2').val();
  num2 = parseFloat(num2);

  var num3 = $('#num3').val();
  num3 = parseFloat(num1);

  var num4 = $('#num4').val();
  num4 = parseFloat(num1);

  var num5 = $('#num5').val();
  num5 = parseFloat(num1);

  var result = num1 + num2 + num3 + num4 + num5;

  $('#resultsum').text(result);

  console.log(result);
}

function calculateproduct() {

  var num1 = $('#num1').val();
  num1 = parseFloat(num1);

  var num2 = $('#num2').val();
  num2 = parseFloat(num2);

  var num3 = $('#num3').val();
  num3 = parseFloat(num1);

  var num4 = $('#num4').val();
  num4 = parseFloat(num1);

  var num5 = $('#num5').val();
  num5 = parseFloat(num1);

  var result = num1 * num2 * num3 * num4 * num5;

  $('#resultproduct').text(result);

  console.log(result);
}
