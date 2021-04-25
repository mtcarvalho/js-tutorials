function myBigFunction() {
    let myValue;

    subFunction1();
    subFunction2();
    subFunction3();
}

function subFunction1() {
    console.log(myValue);
}

function subFunction2() {
    console.log(myValue);
}

function subFunction3() {
    console.log(myValue);
}

// the example above would throw an error ReferenceError: myValue is not defined, 
// because although the myValue variable is defined in the same scope as the function calls, 
// it is not defined inside the function definitions — the actual code that is run when the functions are called. 
// to make this work, you'd have to pass the value into the function (subFunctionX) as a parameter

function myBigFunction() {
    let myValue = 1;

    subFunction1(myValue);
    subFunction2(myValue);
    subFunction3(myValue);
}

function subFunction1(value) {
    console.log(value);
}

function subFunction2(value) {
    console.log(value);
}

function subFunction3(value) {
    console.log(value);
}
