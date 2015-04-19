var hello = function(variableName1, variableName2) {
  var name = document.getElementById('name').value;
  document.getElementById('message').innerHTML = name ?
    'Hello ' + name + '.' :
    'Hello.';
};
