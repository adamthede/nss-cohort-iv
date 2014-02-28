(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#toggleuserform').click(toggleUserForm);
    $('#register').click(registerUser);
    $('#login').click(loginUser);
  }

  function toggleUserForm(){
    $('#user').toggleClass('hide');
  }

  function registerUser(){
    var data = $('#user').serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/users';
    var type = 'POST';
    var success = function(data){
      $('#email').val('');
      $('#email').focus();
      $('#password').val('');
      if(data.success === false){
        alert('Sorry, that email is already registered');
      }
      else{
        alert('Success!  Welcome to the Note Taker App.');
      }
    };

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function loginUser(){
    var data = $('#user').serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/users/login';
    var type = 'PUT';
    var success = function(data){
      $('#email').val('');
      $('#email').focus();
      $('#password').val('');
      if(data.success === false){
        alert('Sorry, no matching email and password found');
      }
      else{
        alert('Success!  Welcome to the Note Taker App.');
      }
    };

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

})();

