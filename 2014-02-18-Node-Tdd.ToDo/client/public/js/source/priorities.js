(function(){

  'use strict';

  $(document).ready(initialize);

  var prioritiesArray = [];

  function initialize(){
    $(document).foundation();
    $('#createpriority').click(addPriority);
    $('#priorities').on('click', '.delete', deletePriority);
    $('#priorities').on('click', '.update', updatePriority);
    $('#priorities').on('click', '.cellediting', editData);
    getPriorities();
  }

  function getPriorities(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/priorities';
    var type = 'GET';
    var success = function(data){
      for(var i = 0; i < data.priorities.length; i++){
        addPriorityDom(data.priorities[i]);
      }
    };

    $.ajax({url:url, type:type, success:success});
  }

  function addPriorityDom(priority){
    prioritiesArray.push(priority);

    var $tr = $('<tr>');
    $tr.attr('data-priority-id', priority._id);

    var $tdname = $('<td>');
    $tdname.addClass('cellediting name');
    $tdname.text(priority.name);
    
    var $tdvalue = $('<td>');
    $tdvalue.addClass('cellediting value');
    $tdvalue.text(priority.value);

    var $tddeletebutton = $('<td>');
    var $deletebutton = $('<button>');
    $deletebutton.addClass('tiny alert delete');
    $deletebutton.text('X');
    $tddeletebutton.append($deletebutton);

    var $tdsavebutton = $('<td>');
    var $savebutton = $('<button>');
    $savebutton.addClass('tiny hide update');
    $savebutton.text('save');
    $tdsavebutton.append($savebutton);

    $tr.append($tdname, $tdvalue, $tddeletebutton, $tdsavebutton);

    $('#priorities').prepend($tr);

  }

  function addPriority(){
    var data = $('#priorityinput').serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/priorities';
    var type = 'POST';
    var success = addPriorityDom;

    $.ajax({url:url, data:data, type:type, success:success});

    $('#todo').val('');
    $('#prioritylevel').val('');
    $('#todo').focus();
    event.preventDefault();
  }

  function deletePriority(){
    var priorityId = $(this).parent().parent().attr('data-priority-id');
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/priorities/' + priorityId;
    var type = 'DELETE';
    var success = removePriorityDom;

    $.ajax({url:url, type:type, success:success});
    
    event.preventDefault();
  }

  function removePriorityDom(data){
    if(data.count !== 1){
      return;
    }
    else{
      var id = data.id;
      $('#priorities tr[data-priority-id='+id+']').remove();
      _.remove(prioritiesArray, function(priority){
        return priority._id === id;
      });
    }
  }

  function updatePriority(){
    var priorityId = $(this).parent().parent().attr('data-priority-id');
    var newName = $(this).parent().siblings('.name').text();
    var newValue = $(this).parent().siblings('.value').text();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/priorities/' + priorityId;
    var type = 'PUT';
    var data = {name:newName, value:newValue};
    var success = updatePriorityArray;

    $.ajax({url:url, data:data, type:type, success:success});
    $('#priorities tr[data-priority-id='+priorityId+']').find('.update').hide();
  }

  function updatePriorityArray(data){
    var id = data._id;
    _.remove(prioritiesArray, function(data){
      return data._id === id;
    });
    prioritiesArray.push(data);
    console.log(prioritiesArray);
  }

  function editData(){
    var id = $(this).parent().attr('data-priority-id');
    var originalValue = $(this).text();
    $(this).html('<input type="text" value="' + originalValue + '" />');
    $(this).children().first().focus();
    $(this).children().first().keypress(function(e){
      if(e.which === 13){
        $('#priorities tr[data-priority-id='+id+']').find('.update').show();
        var newContent = $(this).val();
        $(this).parent().text(newContent);
      }
    });
  }

})();
