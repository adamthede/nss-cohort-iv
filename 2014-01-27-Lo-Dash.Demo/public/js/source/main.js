(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#go').click(go);
  }

  function go(){
    var data = $('#data').val();
    data = data.split(';');
    var start = data[0];
    var stop = data[1];
    var increment = data[2];

    var array = _.range(start, stop, increment);
    var sample = _.sample(array);
    var shuffled = _.shuffle(array);
    var filter3and4 = _.filter(array, function(x){
      if((x%3 === 0) && (x%4 === 0)){
        return true;
      }
      else{
        return false;
      }
    });
    var evens = _.reject(array, function(x){
      return x%2 !== 0;
    });
    var mapSquareRoot = _.map(array, function(x){
      var z = Math.sqrt(x);
      z = z.toFixed(4);
      return z;
    });
    var areAllEven = _.all(array, function(x){
      return x%2 === 0;
    });

    console.log(array);
    console.log(sample);
    console.log(shuffled);
    console.log(filter3and4);
    console.log(evens);
    console.log(mapSquareRoot);
    console.log(areAllEven);
  }

})();
