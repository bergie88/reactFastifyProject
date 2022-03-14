const rtnLib = require("./nonblockingrtns"); 
 
// Create a currency formatter. 
const currencyFormatter = (numberToFormat) => 
  new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency: "USD", 
    minimumFractionDigits: 0, 
  }).format(numberToFormat); 
 
// call promise that utilizes the got package 
rtnLib 
  .ontarioTransferPaymentPromise() 
  .then((ontariosPayment) => { 
    console.log( 
      `Ontario's transfer payment is: ${currencyFormatter(ontariosPayment)}` 
    ); 
  }) 
  .catch((err) => { 
    console.log(`Error ==> ${err}`); 
  });