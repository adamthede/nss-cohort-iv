/* jshint camelcase:false */
/* globals moment:true */

(function(){
  'use strict';

  $(document).ready(initialize);

  var priorities;
  //var query = {limit:4, page:1, order:1};

  var checkComplete;
  var page = 1;
  var limit = 4;

  function initialize(){
    $(document).foundation();
    $('#createtodo').click(addTodo);
    $('#todos').on('click', '.tag-link', sortTags);
    $('#sortdate').click(sortDate);
    $('#todos').on('click', '.isComplete', getTodoById);
    $('#sortcomplete').click(sortComplete);
    $('#nextpage').click(nextPage);
    $('#previouspage').click(previousPage);
    $('#limitview').click(limitView);
    getPriorities();
    getTodos();
  }

  function limitView(){
    limit = $('#inputlimit').val();
    $('#todos').empty();
    getTodos();
    event.preventDefault();
  }

  function getPriorities(){
    var url = generateUrl('/priorities');
    var type = 'GET';
    var success = function(data){
      priorities = data.priorities;
      $('#priority').empty();
      for(var i = 0; i < data.priorities.length; i++){
        var $option = $('<option></option>');
        $option.attr('value', data.priorities[i].priority_id).text(data.priorities[i].name);
        $('#priority').append($option);
      }
    };

    $.ajax({url:url, type:type, success:success});
  }

  function getTodos(){
    var url = generateUrl('/todos');
    var type = 'GET';
    var success = function(data){
      $('#todos').empty();
      for(var i = 0; i < data.todos.length; i++){
        addTodoDom(data.todos[i]);
      }
    };

    $.ajax({url:url, type:type, success:success});
  }

  function addTodoDom(todo){
    var $tr = $('<tr>');
    $tr.attr('data-todo-id', todo._id);

    var $tdcomplete = $('<td>');
    var $inputcomplete = $('<input>');
    $inputcomplete.attr('type', 'checkbox');
    $inputcomplete.attr('checked', todo.isComplete);
    $tdcomplete.append($inputcomplete);

    var $tdname = $('<td>');
    $tdname.text(todo.name);

    var $tdduedate = $('<td>');
    var date = new Date(todo.dueDate);
    date = moment(date).format('dddd, MMMM Do YYYY');
    $tdduedate.text(date);

    var $tdpriority = $('<td>');
    var priority = _.find(priorities, function(p){return p._id === todo.priority_id;});
    $tdpriority.append('<a data-priority-id="'+priority._id+'"class="filter priorityId" href="#">'+priority.name+'</a>');

    var $tdtags = $('<td>');
    todo.tags.forEach(function(tag){
      var $button = $('<button class="tag-link button tiny radius">'+tag+'</button>');
      var $span = $('<span>'+' '+'</span>');
      $tdtags.append($button, $span);
    });

    $tr.append($tdcomplete, $tdname, $tdduedate, $tdpriority, $tdtags);

    $('#todos').prepend($tr);
  }

  function addTodo(){
    var url = generateUrl('/todos');
    var type = 'POST';
    var data = $('#todoinput').serialize();
    var success = addTodoDom;

    $.ajax({url:url, type:type, data:data, success:success});

    $('#todo').val('');
    $('#tags').val('');
    $('#todo').focus();

    event.preventDefault();
  }

  function sortTags(){
    $('#todos').empty();
    var tag = $(this).text();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos?tag=' + tag;
    var type = 'GET';
    var success = function(data){
      for(var i = 0; i < data.todos.length; i++){
        addTodoDom(data.todos[i]);
      }
    };

    $.ajax({url:url, type:type, success:success});

    event.preventDefault();
  }

  function sortDate(){
    var order;
    $('#sortdate').toggleClass('sortorder');
    if($('#sortdate').hasClass('sortorder')){
      order = 1;
    }
    else{
      order = -1;
    }
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos?sort=dueDate&order=' + order + '&limit=' + limit;
    var type = 'GET';
    var success = function(data){
      $('#todos').empty();
      for(var i = 0; i < data.todos.length; i++){
        addTodoDom(data.todos[i]);
      }
    };

    $.ajax({url:url, type:type, success:success});

    event.preventDefault();
  }

  function markComplete(foundTodo){
    var todoId = foundTodo._id;
    foundTodo.isComplete = checkComplete;
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos/' + todoId;
    var type = 'PUT';
    var data = foundTodo;
    var success = refreshTodos;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function refreshTodos(){
    $('#todos').empty();
    getTodos();
  }

  function getTodoById(){
    var todoId = $(this).parent().parent().attr('data-todo-id');
    if($(this).is(':checked')){
      checkComplete = 'on';
    }
    else{
      checkComplete = false;
    }
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos/' + todoId;
    var type = 'GET';
    var success = markComplete;

    $.ajax({url:url, type:type, success:success});
  }

  function sortComplete(){
    var order;
    $('#sortcomplete').toggleClass('sortorder');
    if($('#sortdate').hasClass('sortorder')){
      order = 1;
    }
    else{
      order = -1;
    }
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos?sort=isComplete&order=' + order + '&limit=' + limit;
    var type = 'GET';
    var success = function(data){
      $('#todos').empty();
      for(var i = 0; i < data.todos.length; i++){
        addTodoDom(data.todos[i]);
      }
    };

    $.ajax({url:url, type:type, success:success});

    event.preventDefault();
  }

  function nextPage(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos?page=' + (page + 1) + '&limit=' + limit;
    var type = 'GET';
    var success = function(data){
      if(data.todos.length > 0){
        $('#todos').empty();
        page += 1;
        for(var i = 0; i < data.todos.length; i++){
          addTodoDom(data.todos[i]);
        }
      }
    };

    $.ajax({url:url, type:type, success:success});

    event.preventDefault();
  }

  function previousPage(){
    if(page > 1){
      $('#todos').empty();
      var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/todos?page=' + (page - 1) + '&limit=' + limit;
      var type = 'GET';
      var success = function(data){
        if(data.todos.length > 0){
          page -= 1;
          for(var i = 0; i < data.todos.length; i++){
            addTodoDom(data.todos[i]);
          }
        }
      };

      $.ajax({url:url, type:type, success:success});
    }

    event.preventDefault();
  }

  function generateUrl(path){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += path;
    return url;
  }

})();
