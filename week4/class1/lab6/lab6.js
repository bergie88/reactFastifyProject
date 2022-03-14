const yargs = require('yargs');
const { countriesURL, collection  } = require("./config"); 
const dbRtns = require('./dbroutines');

const argv = yargs 
    .options({ 
        code: {
            demandOption: true,
            describe: 'Two Letter alpha code for a country', 
            string: true 
        }, 
    }) 
    .help() 
    .alias('help','h') 
    .argv 
     
    const loadCountriesCollectionFindByAlpha2 = async () => { 
     
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

        let country = await dbRtns.findOne(db, collection, { code: argv.code });
        if(!country)
            console.log(`The code ${argv.code} is not a known country alpha-2 code`);
        else
            console.log( `The code ${country.code} belongs to the country of ${country.name}.`); 

        let allDbCountries = await dbRtns.findAll(db, collection, {}, {});
        console.log( 
          `there are ${allDbCountries.length} documents currently in the countries collection` 
        ); 
         
      } catch (err) { 
        console.log(err); 
      } finally { 
        process.exit(); 
      } 
    }; 
     
    loadCountriesCollectionFindByAlpha2();