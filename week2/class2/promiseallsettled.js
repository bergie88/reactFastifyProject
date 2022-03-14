const rtnLib = require("./nonblockingrtns"); 
 
promiseAllSettledRtn = (nameArray) => { 
  // Promise.allSettled won't fire the catch if a promise fails 
  //  results contain status and value if resolved or reason 
  //  if rejected 
  Promise.allSettled( 
    nameArray.map((name) => { 
      return rtnLib.reverseNameWithAPromise(name); 
    }) 
  ) 
    .then((statusArray) => { 
      console.log(`\nstatus from promises\n`); 
      statusArray.forEach((result) => console.log(result.status)); 
      console.log(`\nresults from promises\n`); 
      statusArray.forEach((result) => { 
        result.value // resolve 
          ? console.log(result.value.reverseresults) 
          : console.log(result.reason.reverseresults); 
      }); 
    }) 
    .catch((err) => console.log(err)); 
}; 
 
promiseAllSettledRtn(["Bill", "Jane", "err", "Bob"]);