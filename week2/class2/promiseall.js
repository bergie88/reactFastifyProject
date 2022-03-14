const rtnLib = require("./nonblockingrtns"); 
 
promiseAllRtn = (nameArray) => { 
  // Promise.all quits on first catch 
  Promise.all( 
    nameArray.map((name) => { 
      return rtnLib.reverseNameWithAPromise(name); 
    }) 
  ) 
    .then((resultsArray) => { 
      console.log(`\nresults from promises\n`); 
      resultsArray.forEach((result) => console.log(result.reverseresults)); 
    }) 
    .catch((err) => console.log(err.reverseresults)); 
}; 
 
promiseAllRtn(["Bill", "Jane", "Bob"]); 
// promiseAllRtn(["Bill", "Jane", "err", "Bob"]);