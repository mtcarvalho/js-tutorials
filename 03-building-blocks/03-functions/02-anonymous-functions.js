// it has no name! you generally use an anonymous function along with an event handler

const myButton = document.querySelector('button');

myButton.onclick = function() {
  alert('hello');
}