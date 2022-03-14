const rtnLib = require("./nonblockingrtns"); 
 
let someParam = "no err"; 
// call module routine with no error and an 
// anonymous callback function with 2 params 
rtnLib.someRtnUsingOldSchoolCallback(someParam, (errorMessage, results) => { 
  errorMessage // will be empty 
    ? console.log(`Error ==> ${errorMessage}`) 
    : console.log(`The call ${results.val1} ${results.val2}`); 
}); 
 
// pass an err argument and see what happens 
someParam = "err"; 
// same call as above 
rtnLib.someRtnUsingOldSchoolCallback(someParam, (errorMessage, results) => { 
  errorMessage // will have a value 
    ? console.log(`Error ==> ${errorMessage}`) 
    : console.log(`The call ${results.val1} ${results.val2}`); 
}); 

// if don't pass a callback, an exception occurs  
// so we need to catch it or the program stops 
try { 
    rtnLib.someRtnUsingCallback(someParam); 
  } catch (error) { 
    error.message === "rtnLib.someRtnUsingCallback is not a function" 
      ? console.log("Error ==> no callback passed") 
      : console.log(`Error ==> ${error.message}`); 
  } 
   
  // now exercise the other library routine with just a callback 
  rtnLib.anotherOldSchoolCallbackRtn((errorMessage, results) => { 
    errorMessage 
      ? console.log(`Error ==> ${errorMessage}`) 
      : console.log(`The other call ${results.val1} ${results.val2}`); 
  });
