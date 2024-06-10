//Examples on Spread and Rest operators

// Spread operator
//The spread operator is used to expand an array into individual elements.
const arr = [1, 2, 3, 4, 5];
const arr2 = [...arr, 6, 7, 8, 9, 10];
console.log(arr2);

//Spread on object:
const user = {username: "Kend", password: "1234", email: "coolmail@.dk"};
const newUser = {...user, email: "nyemail@.dk"};
console.log(newUser);

// Rest operator
//The rest operator is used to collect the remaining elements of an array into a new array.
const [first, second, third, ...rest] = arr2;
console.log(first, second, third, rest);

//Rest on object:
const {username, password, ...restOfUser} = user;
console.log(username, password, restOfUser);
