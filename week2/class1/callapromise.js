const rtnLib = require('./nonblockingrtns'); 
 
let someParam = 'no err'; 
// use promise 
rtnLib 
  .someRtnWithAPromise(someParam) 
  .then(results => { 
    console.log(`The call ${results.val1} ${results.val2}`); 
  }) 
  .catch(err => { 
    console.log(`Error ==> ${err}`); 
  }); 
// call it again with an error 
someParam = 'err'; 
rtnLib 
  .someRtnWithAPromise(someParam) 
  .then(results => { 
    console.log(`The call ${results.val1} ${results.val2}`); 
  }) 
  .catch(err => { 
    console.log(`Error ==> ${err}`); 
  }); 