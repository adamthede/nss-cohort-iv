/* global Cart, Person, Product, deepEqual, test:false, ok:false */

'use strict';

test('Product#new', function(){
  var p1 = new Product('CD', 5);

  ok(p1 instanceof Product, 'p1 should be an instance of Product');
  deepEqual(p1.name, 'CD', 'p1 should have a product name of CD');
  deepEqual(p1.price, 5, 'p1 should have a price of 5');

});

test('Cart#new', function(){
  var c1 = new Cart();

  ok(c1 instanceof Cart, 'c1 should be an instance of Cart');
  deepEqual(c1.products.length, 0, 'shopping cart should have no products in it after creation');

});

test('Cart#add', function(){
  var p1 = new Product('CD', 5);
  var p2 = new Product('F12 Berlinetta', 250000);
  var c1 = new Cart();
  c1.add(p1, 25);
  c1.add(p2, 1);

  deepEqual(c1.products.length, 26, 'there should be a total of 26 items in the cart');
});

test('Cart#remove', function(){
  var p1 = new Product('CD', 5);
  var p2 = new Product('F12 Berlinetta', 250000);
  var r1 = new Person('Johan', 1000000);
  r1.cart.add(p1, 1);
  r1.cart.add(p2, 1);
  r1.cart.remove('F12 Berlinetta', 1);

  deepEqual(r1.cart.products.length, 1, 'there should be two items in the cart');
  deepEqual(r1.cart.total, 5, 'the total value in the cart should be 5 large');
});

test('Cart#total', function(){
  var p1 = new Product('CD', 5);
  var p2 = new Product('F12 Berlinetta', 250000);
  var c1 = new Cart();
  c1.add(p1, 25);
  c1.add(p2, 1);

  deepEqual(c1.total, 250125, 'total from shopping cart should be 250125');
  deepEqual(c1.products.length, 26, 'there should be 26 items in the shopping cart');
});

test('Person#new', function(){
  var r1 = new Person('Johannes', 10000);

  ok(r1 instanceof Person, 'r1 should be an instance of Person');
  deepEqual(r1.name, 'Johannes', 'r1 should have name Johannes');
  deepEqual(r1.cash, 10000, 'r1 should have an initial cash balance of $10k');
  deepEqual(r1.cart.products.length, 0, 'r1 should have an initial shopping cart with nothing in it');

});
