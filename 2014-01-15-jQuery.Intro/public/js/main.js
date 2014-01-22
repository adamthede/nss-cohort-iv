$(document).ready(initialize); //when the document is ready, then run main.js code

function initialize(){
  // $ means jQuery
  // $('css or jquery selector')
    $('h1').css('color', 'red');
    $('h1').css('font-size', '35px');
    var currentH1Text = $('h1').text();
    console.log(currentH1Text);
    $('h1').text('Welcome to JavaScript');
    
    $('div').css('color', 'purple');
    $('#d2').css('font-size', '24px');
    $('#d3').css('background', 'yellow');

    $('.c1').css('font-family', 'monospace');
    $('.c1').text('Adam Thede');

    $('.c1').css({'color': 'green', 'background-color': 'red'}).text('Germania');

    var bgcolor = prompt('What background color do you want?');
    $('#d3').css('background-color', bgcolor);

    var textd3 = prompt('What do you want the text in div 3 to be?');
    $('#d3').text(textd3);

    var numPs = $('.cp').length;
    console.log(numPs);
}
