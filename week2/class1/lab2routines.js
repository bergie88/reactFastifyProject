const provinces = [ 
    { code: "NS", name: "Nova Scotia" }, 
    { code: "NL", name: "Newfoundland" }, 
    { code: "NB", name: "New Brunswick" }, 
    { code: "PE", name: "Prince Edward Island" }, 
    { code: "QC", name: "Quebec" }, 
    { code: "ON", name: "Ontario" }, 
    { code: "MB", name: "Manitoba" }, 
    { code: "SK", name: "Saskatchewan" }, 
    { code: "AB", name: "Alberta" }, 
    { code: "BC", name: "British Columbia" }, 
    { code: "NT", name: "North West Territories" }, 
    { code: "NU", name: "Nunavut" }, 
    { code: "YT", name: "Yukon Territory" }, 
  ]; 
   
  const FISCALYEAR = "2021-2022";

  const fullNameAndProvincePromise = (fname, lname, provinceCode) => { 
    return new Promise((resolve, reject) => { 
      if (!fname || !lname || !provinceCode) { 
        reject('We got an issue with one of the inputs'); 
      } else {    
        let province = "";
        for (let prov of provinces) {
          if(prov.code === provinceCode){
            province = prov.name;
            break;
          }
        }
        resolve(`${fname}, ${lname} lives in ${province}.`); 
      } 
    }); 
  };

  const transferPaymentsFromWebPromise = () => {
    let got = require("got"); 
    let srcAddr = 
      "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json"; 
    return new Promise((resolve, reject) => { 
      got(srcAddr, { responseType: "json" }) 
        .then((response) => { 
          let data = response.body 
          resolve(data); 
        }) 
        .catch((err) => { 
          console.log(`Error ==> ${err}`); 
          reject(err); 
        }); 
    }); 
  };

  const transferPaymentForProvincePromise = (gocData, provCode) =>{
    return new Promise ((resolve, reject) => {
      provCode = provCode.toLowerCase();
      if(provCode in gocData.gtf){

        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        });

        let amount = formatter.format(gocData.gtf[provCode][FISCALYEAR])

        resolve(`It received ${amount} in transfer payments.`)
      } else {
        reject("There was an error trying to get the provincial data")
      }
    });
  }
  const currencyFormatter = (numberToFormat) => 
    new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD", 
      minimumFractionDigits: 0, 
    }).format(numberToFormat); 
   
  module.exports = { 
    provinces, currencyFormatter, fullNameAndProvincePromise, transferPaymentsFromWebPromise, transferPaymentForProvincePromise,
  };