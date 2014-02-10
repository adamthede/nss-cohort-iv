/* jshint unused: false */

var Cart = (function(){

  'use strict';

  function Cart(){
    this.products = [];
  }

  Cart.prototype.add = function(item, quantity){
    for(var i = 1; i <= quantity; i++){
      this.products.push(item);
    }
  };

  Cart.prototype.remove = function(name, quantity){
    var placeholder = 0;
    while(quantity !== 0){
      for(var i = 0; i < this.products.length; i++){
        if(this.products[i].name === name){
          placeholder = this.products[i];
          this.products.splice(this.products.indexOf(placeholder), 1);
          quantity = quantity - 1;
        }
      }
    }
  };

  Object.defineProperty(Cart.prototype, 'total', {
    get: function(){
      var total = 0;
      for(var i = 0; i < this.products.length; i++){
        total = total + this.products[i].price;
      }
      return total;
    }
  });

  return Cart;

})();
