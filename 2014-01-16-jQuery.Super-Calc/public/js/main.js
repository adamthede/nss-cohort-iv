$(document).ready(initialize); //when the document is ready, then run main.js code

function initialize(){
  $('.number').click(displayNumber);
  $('#posneg').click(togglePosneg);
  $('#push').click(pushToQueue);
  $('.operator').click(compute);
  $('#clear').click(clearAnsQueue);
}

function displayNumber(){
  var display = $('#answer').text();
  var currentClick = this.textContent;
  var output;

  if(currentClick === '.' && containsChar(display, '.')) return;

  if(display === '0' && currentClick !== '.')
    output = currentClick;
  else
    output = display + currentClick;

  $('#answer').text(output);
}

function togglePosneg(){
  var display = $('#answer').text();
  var toggle = parseFloat(display) * -1;
  $('#answer').text(toggle.toString());
}

function pushToQueue(){
  var display = $('#answer').text();
  $('#answer').text('0');
  var $li = $('<li>');
  $li.text(display);
  $('#queue').prepend($li);
}

function compute(){
  var operator = this.id; //$(this).attr('id') for jQuery
  var $lis = $('#queue li');
  var numbers = parseTags($lis);
  var result;

  switch(operator){
    case 'add':
      result = numbers[0] + numbers[1];
      break;
    case 'sub':
      result = numbers[1] - numbers[0];
      break;
    case 'mul':
      result = numbers[0] * numbers[1];
      break;
    case 'div':
      result = numbers[1] / numbers[0];
      break;
    case 'pow':
      result = Math.pow(numbers[1], numbers[0]);
      break;
    case 'sum':
      var ans = 0;
      for(var i = 0; i < $lis.length; i++)
        result = result + parseFloat($lis[i].textContent);
    }
    $('#answer').text(result);
    $('#queue').empty();
}

function clearAnsQueue(){
  $('#answer').text('0');
  $('#queue').empty();
}


/*
var disp = [];
var dispRange = 10;
var clickCount = 0;
while(clickCount < dispRange){
  disp.push($('answer').text(this.textContent));
  clickCount++;
}
return disp.join('');
*/
