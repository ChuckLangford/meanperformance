var hello = function() {
  var name = document.getElementById('name').value;
  document.getElementById('message').innerHTML = name ?
    'Hello ' + name + '.' :
    'Hello.';
};
