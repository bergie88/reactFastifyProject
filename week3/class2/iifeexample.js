// Load the got module 
const got = require("got"); 
 
(async () => {   // IIFE   // Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON. 
  const srcAddr = 
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json"; 
 
  // Create a currency formatter. 
  const formatter = new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency: "USD", 
    minimumFractionDigits: 0, 
  }); 
 
  try { 
    const response = await got(srcAddr, { responseType: "json" }); 
 
    //  strip out the Ontario amount 
    let ont = response.body.gtf.on["2021-2022"]; 
 
    // format to currency 
    ont = formatter.format(ont); 
 
    // dump to the console using template literal 
    console.log(`Ontario's transfer amount for 2021-2022 was ${ont}`); 
  } catch (error) { 
    console.log(error); 
    //=> 'Internal server error ...' 
  } 
})();  // IIFE