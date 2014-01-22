/* myscript.js File for JavaScript Tutorial */

/* this
 * is
 * very
 * cool
 */

console.log('Hello from JavaScript');
console.log('Adam Thede');
console.log("This is an example using double quotes");

// debugger

var a = 10;
var b = 20;
var c = a + b;
var d = c * b;
var e = d * (b - a);

var power = Math.pow(2, 8);

console.log('e is ' + e);

console.log('2 to the 8th power is ' + power);

// example
// you have a room that is 8ft by 12 ft
// write the code that will computer the area of
// the room and print that out to the console

var length = 8;
var width = 12;

var area = length * width;

console.log('The area of a room that is ' + length + ' feet long by ' + width + ' feet wide is ' + area);

// example
// you have a cyclinder with radius 5 inches, length of 9 inches.
// what is the volume in cubic inches?

var radius = 5;
var height = 9;
var circleArea = Math.pow(radius, 2) * Math.PI;

var volume = circleArea * height;

console.log('The volume of the cylinder is ' + volume + ' cubic inches');

// you are a floor painter
// you have an exceptionally large bucket of paint
// you can paint 29,572 square feet of surface without having to refill
// every house you encounter has 3 rooms
// here are the dimensions
// 3 x 5 feet
// 7 x 9 feet
// 6 x 7 feet
// how many houses can you paint?

var roomOne = 3 * 5;
var roomTwo = 7 * 9;
var roomThree = 6 * 2;
var houseArea = roomOne + roomTwo + roomThree;
var paint = 29572;

var homesToPaint = paint / houseArea;

homesToPaint = Math.floor(homesToPaint);

console.log(homesToPaint);

// you are a space person, with lasers
// you can travel at the speed of light
// you are in the andromeda galaxy, somewhere
// you want to destroy Justin Bieber
// if you leave tomorrow
// when you arrive to meet the bieb?
// i.e. how many days will it take you to get here?
// please hurry!

var distance = 2538000; // in light years
var speedLight = 671000000; // in miles per hour
var distanceMiles = distance * 5.87849981E12;
var timeHours = distanceMiles / speedLight;
var timeDays = Math.ceil(timeHours / 24);

console.log(timeDays);

// alternate solution

var years = 2538000;
var daysPerYear = 364.25;
var totalDays = years * daysPerYear;

console.log(totalDays);

var now = new Date();

console.log(now);

var firstName = prompt('Enter your first name');

console.log('Your first name is ' + firstName);

var lastName = prompt('Enter your last name');

console.log('Your name is ' + firstName + ' ' + lastName);
alert('Your name is ' + firstName + ' ' + lastName);

// debugger

var l = prompt('Please enter the length of your room in feet');
l = parseInt(l);
var w = prompt('Please enter the width of your room in feet');
w = parseInt(w);
var h = prompt('Please enter the height of the room in feet');
h = parseInt(h);

var roomVolume = l * w * h;
alert('The volume of your room is ' + roomVolume + ' cubic feet');

var age = prompt('How old you be?');
age = parseInt(age);

if (age < 18)
  console.log('You can\'t vote');
else
  console.log('You can vote');
