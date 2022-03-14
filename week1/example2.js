// Arrow Functions Example #2 - returning objects
// eS5
// var setValuesWithEs5 = function setValues(id, name, age) {
// return { id: id, name: name, age: age };
// };
// var student = setValuesWithEs5(2, "George", 23);
// console.log(
// "id: " + student.id + " name: " + student.name + " age: " + student.age
// );
//
// eS6+/es2015+
let setValuesWithEs6 = (id, name, age) => ({ id: id, name: name, age: age });
let student = setValuesWithEs6(3, "Jane", 24);
console.log(`id: ${student.id} name: ${student.name} age: ${student.age}`);