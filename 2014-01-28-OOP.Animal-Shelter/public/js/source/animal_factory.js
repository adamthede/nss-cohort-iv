/* global Animal: false */

(function(){

  'use strict';

  window.animalFactory = function(){
    var animals = [];
    var animal;

    var photos = [];
    photos[0] = 'url(http://farm4.staticflickr.com/3329/3564849281_9e98f07f56_z.jpg)';
    photos[1] = 'url(http://farm4.staticflickr.com/3400/3564790831_91dfe408e3_z.jpg)';

    animal = new Animal('Carmine', 4, 'Male', photos, 'Best dog in the world', 'Black', 'Dog'); //name, age, gender, photos, description, color, species
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://farm4.staticflickr.com/3383/3564837479_ca0e9484cc.jpg)';
    photos[1] = 'url(http://farm4.staticflickr.com/3553/3565665290_d01739b937.jpg)';

    animal = new Animal('Vincent', 4, 'Male', photos, 'Best dog in the world', 'Black', 'Dog'); //name, age, gender, photos, description, color, species
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://imgc.allpostersimages.com/images/P-473-488-90/21/2143/G7BCD00Z/posters/jane-burton-domestic-cat-4-month-black-and-white-kitten.jpg)';
    photos[1] = 'url(http://imgc.allpostersimages.com/images/P-473-488-90/21/2144/TCBCD00Z/posters/jane-burton-black-dutch-rabbit-with-black-and-white-kitten.jpg)';

    animal = new Animal('Jazz', 11, 'Female', photos, 'Crazy ass cat', 'Black and white', 'Cat'); //name, age, gender, photos, description, color, species
    animals.push(animal);
    
    photos = [];
    photos[0] = 'url(http://msnbcmedia.msn.com/j/MSNBC/Components/Slideshows/z_Projects_in_progress/_AT/ss-120203-animal-portraits-salamander.photoblog900.jpg)';

    animal = new Animal('Cornelius', 1.5, 'Male', photos, 'Very elusive and sly.', 'Green', 'Salamander'); //name, age, gender, photos, description, color, species
    animals.push(animal);
    
    photos = [];
    photos[0] = 'url(http://blog.instantcheckmate.com/wp-content/uploads/2013/10/Pygmy-Goat.jpg)';
    photos[1] = 'url(http://d24pgnwzlizq37.cloudfront.net/images/stories/Pygmy_Goat_buckaroo_and_marilyn.jpg)';
    photos[2] = 'url(http://www.thegoatspot.net/images/1/5/8/9/1/pygmy.jpg)';

    animal = new Animal('Johndahue', 3, 'Male', photos, 'Amazing goat.', 'Brown', 'Pygmy Goat'); //name, age, gender, photos, description, color, species
    animals.push(animal);
    
    return animals;
  };

})();
