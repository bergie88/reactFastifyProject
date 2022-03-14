// some valuable routine that we'll export so others can use it 
const someRtnUsingOldSchoolCallback = (var1, callback) => { 
    // make sure callback is a function 
    if (callback && typeof callback === "function") { 
      // check to see if var1 is err 
      var1 === "err" 
        ? // fire the callback either way 
          callback("error happened in module", undefined) // simulate an error has occurred 
        : callback("", { val1: "was", val2: "successful" }); 
    } else { 
      console.log("Error ==> no callback passed to someRtn"); 
    } 
  }; 
   
  // another valuable routine exported using an alias 
  const internalNameRtn = (callback) => { 
    // make sure callback is a function 
    if (callback && typeof callback === "function") { 
      // we won't test for an error in this one 
      callback(undefined, { val1: "was", val2: "successful" }); 
    } else { 
      console.log("no callback passed to someRtn"); 
    } 
  };

  // another routine, this time with a promise 
 const someRtnWithAPromise = var1 => { 
    return new Promise((resolve, reject) => { 
      if (var1 === 'err') { 
        // Reject the Promise with an error 
        reject('some error'); 
      } else { 
        // Resolve (or fulfill) the Promise with data 
        let data = { val1: 'was', val2: 'successful' }; 
        resolve(data); 
      } 
    }); 
   };

   const anotherRtnWithAPromise = var1 => { 
    return new Promise((resolve, reject) => { 
      if (var1 === 'err') { 
        // Reject the Promise with an error 
        reject('yet another error'); 
      } else { 
        // Resolve (or fulfill) the Promise with data 
        let data = { val1: 'was', val2: 'more', val3: 'successful' }; 
        resolve(data); 
      } 
    }); 
  };

  // note we’re using.then/.catch syntax here 
const ontarioTransferPaymentPromise = () => { 
    let got = require("got"); 
    let srcAddr = 
      "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json"; 
    return new Promise((resolve, reject) => { 
      got(srcAddr, { responseType: "json" }) 
        .then((response) => { 
          let ont = response.body.gtf.on["2021-2022"]; 
          resolve(ont); 
        }) 
        .catch((err) => { 
          console.log(`Error ==> ${err}`); 
          reject(err); 
        }); 
    }); 
  };
   
  module.exports = { 
    someRtnUsingOldSchoolCallback, 
    anotherOldSchoolCallbackRtn: internalNameRtn, 
    someRtnWithAPromise,
    anotherRtnWithAPromise,
    ontarioTransferPaymentPromise,
  };