function containsChar(word, letter){
  if(word.indexOf(letter) > 0)
    return true;
  else
    return false;
}

function parseTags($tags){
  return $.map($tags, function(tag){
    return parseFloat(tag.textContent);
  });
}
