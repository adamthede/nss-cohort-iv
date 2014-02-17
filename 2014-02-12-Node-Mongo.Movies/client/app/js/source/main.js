(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#addmovie').click(submitMovie);
    $('#moviestuff').on('click', '.deletebutton', deleteFromDb);
    $('#moviestuff').on('click', '.updatebutton', updateMovieDb);
    $('#updatemovie').click(updateMovieInDb);
    displayMovies();
  }

  function displayMovies(){
    $('#updatemovie').hide();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/movies';
    $.getJSON(url, function(data){
      var movies = data.movies;
      for(var i = 0; i < movies.length; i++){
        displayMovie(movies[i]);
      }
    });
  }

  function displayMovie(movie){
    var $liname = $('<li>');
    $liname.text('Name: '+movie.name);

    var $lirating = $('<li>');
    $lirating.text('Rating: '+movie.rating);

    var $lirunningtime = $('<li>');
    $lirunningtime.text('Running Time: '+movie.runningtime);

    var $lireleaseyear = $('<li>');
    $lireleaseyear.text('Release Year: '+movie.releaseyear);

    var $listudio = $('<li>');
    $listudio.text('Studio: '+movie.studio);

    var $liactors = $('<li>');
    $liactors.text('Actors: '+movie.actors.join(', '));
    
    var $lidirector = $('<li>');
    $lidirector.text('Director: '+movie.director);
    
    var $ul = $('<ul>');
    $ul.append($liname, $lirating, $lirunningtime, $lireleaseyear, $listudio, $liactors, $lidirector);

    var $tdmoviedata = $('<td>');
    var $tdposter = $('<td>');

    var $buttonmoviedelete = $('<input/>');
    var $tdbuttons = $('<td>');
    $tdbuttons.prepend($buttonmoviedelete);
    $buttonmoviedelete.attr({type: 'button', name: 'DELETE', value: 'DELETE'});
    $buttonmoviedelete.attr('data-id', movie._id);
    $buttonmoviedelete.addClass('deletebutton').addClass('tiny').addClass('button');

    var $buttonmovieupdate = $('<input/>');
    $tdbuttons.prepend($buttonmovieupdate);
    $buttonmovieupdate.attr({type: 'button', name: 'UPDATE', value: 'UPDATE'});
    $buttonmovieupdate.attr('data-id', movie._id);
    $buttonmovieupdate.addClass('updatebutton').addClass('tiny').addClass('button');
    
    var $trmoviedata = $('<tr>');
    $tdmoviedata.append($ul);
    $trmoviedata.attr('data-id', movie._id);

    $tdposter.css('background-image', 'url("'+movie.poster+'")');
    $tdposter.addClass('backgroundpics');
    
    $trmoviedata.append($tdposter, $tdmoviedata, $tdbuttons);
    $('#moviestuff > tbody').prepend($trmoviedata);
  }

  function submitMovie(){
    var data = $(this).closest('#movie').serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/movies';
    var type = 'POST';
    var success = newMovie;

    $.ajax({url:url, type: type, data:data, success:success});

    event.preventDefault();
  }

  function deleteFromDb(){
    var data = $(this).attr('data-id');
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/movies/'+data;
    var type = 'DELETE';
    var success = delMovie;

    $.ajax({url:url, type:type, success:success});
  }

  function delMovie(data){
    $('#updatemovie').hide();
    $('[data-id='+data._id+']').remove();
  }

  function updateMovieDb(){
    $('#addmovie').hide();
    var data = $(this).data('id');
    var url = window.location.origin.replace(/(\d){4}/g, '4000')+'/movies/'+data;
    var type = 'GET';
    var success = updateMovie;

    $.ajax({url:url, type:type, success:success});
  }

  function updateMovie(data){
    var movie = data.movie[0];
    $('#updatemovie').show();
    $('#updatemovie').attr('data-id', data.movie[0]._id);
    $('#name').val(movie.name);
    $('#rating').val(movie.rating);
    $('#runningtime').val(movie.runningtime);
    $('#releaseyear').val(movie.releaseyear);
    $('#studio').val(movie.studio);
    $('#actors').val(movie.actors.join(', '));
    $('#director').val(movie.director);
    $('#poster').val(movie.poster);
  }

  function updateMovieInDb(){
    var data = $(this).closest('#movie').serialize();
    var id = $(this).attr('data-id');
    var url = window.location.origin.replace(/(\d){4}/g, '4000')+'/movies/'+id;
    var type = 'PUT';
    var success = updateMovieDom;

    $.ajax({url:url, type:type, data:data, success:success});

    $('#addmovie').show();
    $('#updatemovie').hide();
    event.preventDefault();
  }

  function updateMovieDom(data){
    var movie = data.movie;
    var id = data.id;
    $('#name').val('');
    $('#rating').val('');
    $('#runningtime').val('');
    $('#releaseyear').val('');
    $('#studio').val('');
    $('#actors').val('');
    $('#director').val('');
    $('#poster').val('');
    $('tr[data-id='+id+']').find('td > ul > :nth-child(1)').text('Name: '+movie.name);
    $('tr[data-id='+id+']').find('td > ul > :nth-child(2)').text('Rating: '+movie.rating);
    $('tr[data-id='+id+']').find('td > ul > :nth-child(3)').text('Running Time: '+movie.runningtime);
    $('tr[data-id='+id+']').find('td > ul > :nth-child(4)').text('Release Year: '+movie.releaseyear);
    $('tr[data-id='+id+']').find('td > ul > :nth-child(5)').text('Studio: '+movie.studio);
    $('tr[data-id='+id+']').find('td > ul > :nth-child(6)').text('Actors: '+movie.actors.join(', '));
    $('tr[data-id='+id+']').find('td > ul > :nth-child(7)').text('Director: '+movie.director);
    $('tr[data-id='+id+']').children(':first').css('background-image', 'url("'+movie.poster+'")');
  }

  function newMovie(movie){
    $('#name').val('');
    $('#rating').val('');
    $('#runningtime').val('');
    $('#releaseyear').val('');
    $('#studio').val('');
    $('#actors').val('');
    $('#director').val('');
    $('#poster').val('');
    displayMovie(movie);
  }

})();

