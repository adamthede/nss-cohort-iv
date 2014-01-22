
/*

test("name of test", function() {
  deepEqual(actual, expected, "my test message");
});

*/

test("add", function() {
  deepEqual(add(2, 3), 5, "add 2 and 3");
  deepEqual(add(2, -5), -3, "add 2 and -5");
  deepEqual(add(2.5, -2.5), 0, "add 2.5 and -2.5");
  deepEqual(add(4, 5), 9, "add 4 and 5");
});

test("sum", function() {
  deepEqual(sum([11, 3, 8]), 22, "sum of 11, 3, and 8");
});

test("countEvens", function() {
  deepEqual(countEvens([3,8,6,4,7]), 3, "should be 3 even values");
});

test("makeEvenStringsUppercase", function(){
  var actual = ['hello', 'cohort', 'iv', 'welcome', 'to', 'tdd'];
  var expected = ['hello', 'COHORT', 'IV', 'welcome', 'TO', 'tdd'];
  deepEqual(makeEvenStringsUppercase(actual), expected, "should be 3 uppercase strings");
});

test("sumLengthOfStrings", function(){
  var string = "this is a very long string";
  deepEqual(sumLengthOfStrings(string), 21, "string should be 21 characters (spaces ignored)");
});

test("makeCatWithName", function(){
  deepEqual(makeCatWithName("fluffy").name, "fluffy", "cat's name should be fluffy");
});

