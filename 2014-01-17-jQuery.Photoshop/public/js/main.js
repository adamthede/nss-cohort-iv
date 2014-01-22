$(document).ready(initialize); //when the document is ready, then run main.js code

function initialize(){
  $('#add-color').click(addColor);
  $('#add-pixels').click(clickAddPixels);
  $('#colors').on('click','.color',clickSelectColor);
  $('#pixels').on('mouseover','.pixel',hoverColorPixel);
}

function clickSelectColor(){
  if($(this).hasClass('selected'))
    $(this).removeClass('selected');
  else{
    $('.color').removeClass('selected')
    $(this).addClass('selected');
  }
}

function hoverColorPixel(){
  var color = $('.selected').css('background-color');
  $(this).css('background-color', color);
}

function clickAddPixels() {
  var num = $('#number-text').val();
  num = parseInt(num);

  for(var i = 0; i < num; i++){
    var $pixel = $('<div>');
    $pixel.addClass('pixel');
    $('#pixels').prepend($pixel);
  }
}

function addColor(){
  var colorVal = $('#color-text').val();
  $('#color-text').val(''); // UX enhancement
  $('#color-text').focus(); // UX enhancement

  $paintBrush = $('<div>');
  $paintBrush.addClass('color');
  $paintBrush.css('background-color', colorVal);
  $('#colors').prepend($paintBrush);
}

