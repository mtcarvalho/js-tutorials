// unlike function declaration, function expressions are not hoisted.

const myGreeting = function() {
  alert('hello');
}

// this function could now be invoked using:

myGreeting();

// this effectively gives the function a name; but this would just be confusing, so don't do it!
// when creating functions, it is better to just stick to function declaration form