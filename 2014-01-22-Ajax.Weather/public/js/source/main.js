/* jshint camelcase: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#get-weather').click(getWeather);
  }

  function getWeather(){
    var url = 'http://api.wunderground.com/api/c098c4de54fd58cb/conditions/q/TN/Nashville.json?callback=?';
    $.getJSON(url, receive);
  }

  function receive(data){
    var temp = data.current_observation.temperature_string;
    $('h2').text(temp);
  }

})();
