//Example to explain the different scopes in JavaScript:

//Global Scope
//A variable declared outside a function becomes a global variable.
var globalVar = "This is a global variable";

function globalFunction() {
    console.log(globalVar); //This is a global variable
}

globalFunction();

//Function Scope
//A variable declared inside a function is a local variable.
function functionScope() {
    var localVar = "This is a local variable";
    console.log(localVar); //This is a local variable
}

//console.log(localVar) //Trying to access localVar outside the function will result in an error

functionScope();

//Block Scope
//A variable declared inside a block is only accessible within that block.
if (true) {
    let blockVar = "This is a block variable";
    console.log(blockVar); //This is a block variable
}


//console.log(blockVar); // Trying to access blockVar outside the block will result in an error

//Hoisting
//Variables declared with var are hoisted to the top of their scope.
//This means that you can use a variable before it is declared.
console.log(hoistedVar); //undefined
var hoistedVar = "This is a hoisted variable";
console.log(hoistedVar); //Not undefined
