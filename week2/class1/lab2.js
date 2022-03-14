const routines = require('./lab2routines');
const yargs = require('yargs')

const argv = yargs 
    .options({ 
        firstname: { 
            demandOption: true, 
            alias: 'fname', 
            describe: 'Resident\'s first name', 
            string: true 
        }, 
        lastname: { 
            demandOption: true, 
            alias: 'lname', 
            describe: 'Resident\'s last name', 
            string: true 
        },
        province: { 
            demandOption: true, 
            alias: 'prov', 
            describe: 'Resident\'s home province', 
            choices: routines.provinces.map((province) => province.code),
            string: true 
        }  
    }) 
    .help() 
    .alias('help','h') 
    .argv 

    console.log("\nLab 2\n");

    let fullNameAndProvinceMsg = "";
    routines
    .fullNameAndProvincePromise(argv.firstname, argv.lastname, argv.province)
    .then(results => {
        fullNameAndProvinceMsg = results;
        return routines.transferPaymentsFromWebPromise();
    })
    .then(results => {
        return routines.transferPaymentForProvincePromise(results, argv.province);
    })
    .then( results => {
        console.log(`${fullNameAndProvinceMsg} ${results}`);
    })
    .catch(err => {
        console.log(`Error ==> ${err}`); 
        process.exit(1, err); 
    });