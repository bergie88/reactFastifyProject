const rtnLib = require('./nonblockingrtns'); 
let someParam = 'no err'; 
// use promise rtn 1 
rtnLib 
  .someRtnWithAPromise(someParam) 
  .then(results => { 
    console.log(`The 1st call ${results.val1} ${results.val2}`); 
    // use promise rtn 2 
    return rtnLib.anotherRtnWithAPromise(someParam); 
  }) // here's the 2nd link in the chain 
  .then(results => { 
    console.log(`The 2nd call ${results.val1} ${results.val2} ${results.val3}`); 
    someParam = 'err'; 
    return rtnLib.someRtnWithAPromise(someParam); // will fire catch 
  }) 
  .then(results => console.log('we never get here')) 
  .catch(err => { 
    console.log(`Error ==> ${err}`); 
    process.exit(1, err); 
  });