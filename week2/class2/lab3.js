const routines = require('./lab3routines');
const yargs = require('yargs');

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

    const userProvince = argv.province;

    consoleOutput = async () =>{
        try{
            let fullNameAndProvinceMsg = await routines.fullNameAndProvincePromise(argv.firstname, argv.lastname, argv.province);
            let gocData = await routines.transferPaymentsFromWebPromise();
            let transferPaymentForProvince = await routines.transferPaymentForProvincePromise(gocData, argv.province);

            console.log(`${fullNameAndProvinceMsg} It received ${transferPaymentForProvince.amount} in transfer payments.`);
            dumpProvinceData(routines.provinces, gocData);

        }catch(err){
            console.log(`Error ==> ${err}`); 
            process.exit(1, err); 
        }
    }

    let findProvinceNameByCode = (provinces, provCode) => {
        let province = "";
        for (let prov of provinces) {
          if(prov.code === provCode){
            province = prov.name;
            break;
          }
        }
        return province;
    }

    dumpProvinceData = async (provinces, gocData) => {
        try{
            let statusArray = await Promise.allSettled( 
                provinces.map((prov) => { 
                  return routines.transferPaymentForProvincePromise(gocData, prov.code); 
                }) 
            );
            console.log(`\nTransfer Payments by Province/Territory:\n`)
            statusArray.forEach((result) => { 
                if(result.value){
                    let provinceName = findProvinceNameByCode(provinces, result.value.provCode);
                    if(result.value.provCode == userProvince)
                        console.log(`\t\x1b[1m${provinceName} had a transfer payment of ${result.value.amount}`);
                    else
                        console.log(`\t\x1b[0m${provinceName} had a transfer payment of ${result.value.amount}`);
                }
                else
                {
                    console.log(`${result.reason}`);
                }
              }); 
        }
        catch(error)
        {
            console.log(error);
        }
    }

    console.log("\nLab 3\n");
    consoleOutput();