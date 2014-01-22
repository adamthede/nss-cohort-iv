function add(x,y){
  return x + y;
}

function sum(numbers){
  var result = 0;
  for(var i = 0; i < numbers.length; i++){
    result += numbers[i];
  }
  return result;
}

function countEvens(numbers){
  var count = 0;
  for(var i = 0; i < numbers.length; i++)
    if(numbers[i] % 2 === 0)
      count++;
  return count;
}

function makeEvenStringsUppercase(strings){
  var newStrings = [];
  for(var i = 0; i < strings.length; i++)
    if(strings[i].length % 2 === 0)
      newStrings[i] = strings[i].toUpperCase();
    else
      newStrings[i] = strings[i];
  return newStrings;
}

function sumLengthOfStrings(string){
  var stringArray = string.split(' ').join('');
  return stringArray.length;
}

function makeCatWithName(name){
  var cat = {};
  cat.name = name;
  return cat;
}
