// it is always hoisted, so you can call function above function definition and it will work fine.

function myFunction() {
  alert('hello');
}

myFunction();
// calls the function once