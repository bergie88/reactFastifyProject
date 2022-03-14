const { countriesURL, collection  } = require("./config"); 
const dbRtns = require('./dbroutines');

  
    const loadCountriesCollection = async () => { 
     
      try {
        let countryJSON = await dbRtns.getJSONFromWWWPromise(countriesURL);

        db = await dbRtns.getDBInstance(); 
        let results = await dbRtns.deleteAll(db, collection); 
        console.log( 
          `deleted ${results.deletedCount} documents from users collection` 
        ); 

        let resultArray = await Promise.allSettled( 
          countryJSON.map((countryJSON) => { 
            let country = {
                name: countryJSON.name,
                code: countryJSON["alpha-2"]
            }
            return dbRtns.addOne(db, collection, country); 
          })       
        );
        return "successfully loaded the countries collection"; 
      } catch (err) { 
        console.log(err); 
      }
    };

    const findCountryByCode = async (alpha2Code) =>{
      db = await dbRtns.getDBInstance(); 
      let country = await dbRtns.findOne(db, collection, { code: alpha2Code });
      if(!country)
          return `The code ${alpha2Code} is not a known country alpha-2 code`;
      else
          return `The code ${country.code} belongs to the country of ${country.name}.` 
    }

    module.exports = { loadCountriesCollection, findCountryByCode }