/*eslint-disable*/
var button = document.createElement('button');
button.innerHTML = 'Visulaize All';
[
  'mb4',
  'input__reset',
  'bn',
  'shadow-1',
  'fw6',
  'white',
  'br3',
  'ml2',
  'pa2',
  'pl3',
  'pr3',
  'bg-light-blue',
].forEach(function(clas) {
  button.classList.add(clas);
});
button.addEventListener('click', function() {
  var inputList = document.getElementsByName('articleID');
  var form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/visualize_all');

  inputList.forEach(function(input) {
    form.appendChild(input);
  });
  document.getElementsByTagName('body')[0].appendChild(form);
  form.submit();
});

document.getElementById('search').appendChild(button);
