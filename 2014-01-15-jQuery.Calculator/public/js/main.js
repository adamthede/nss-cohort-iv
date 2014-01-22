$(document).ready(initialize); //when the document is ready, then run main.js code

function initialize(){
  $('#calc').click(calculate);
  $('#clear').click(clear);
}

function clear(){
  $('#num1').val('');
  $('#num1').focus();
  $('#num2').val('');
  $('#op').val('');
  $('#result').text('');
}

function calculate() {

//  debugger;

  var num1 = $('#num1').val();
  num1 = parseFloat(num1);

  var num2 = $('#num2').val();
  num2 = parseFloat(num2);

  var op = $('#op').val();

  var result = compute(num1, num2, op);

  $('#result').text(result);

  console.log(result);
}

function compute(x,y,operator) {
  var result;
  switch(operator){
    case "+":
      result = x + y;
      break;
    case "-":
      result = x - y;
      break;
    case "*":
      result = x * y;
      break;
    case "/":
      result = x / y;
      break;
  }
  return result;
}

