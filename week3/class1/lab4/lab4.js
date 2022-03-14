const yargs = require('yargs');
const { countries, isocountries } = require("./config"); 
const countryRtns = require('./isocountryroutines');

const argv = yargs 
    .options({ 
        refresh: {
            demandOption: false,
            describe: 'is a fresh copy from the web required?', 
            string: true 
        }, 
    }) 
    .help() 
    .alias('help','h') 
    .argv 

    let refreshFlag = argv.refresh === "" ? true: false;

    const countryJSONReadWriter = async () => {
        try{
            let fileStats = await countryRtns.fileStatsFromFSPromise(countries);
            let newFile = false;
            if(!fileStats || refreshFlag)
            {
                let isoCountryData = await countryRtns.getJSONFromWWWPromise(isocountries);
                await countryRtns.writeFileFromFSPromise(countries, isoCountryData);
                fileStats = await countryRtns.fileStatsFromFSPromise(countries)
                if(fileStats)
                    console.log(`A new ${countries} file was written`);
                newFile = true;
            }

            let results = await countryRtns.readFileFromFSPromise(countries);
            if(!newFile)
                console.log(`An existing ${countries} file was read from the file system.`);
            console.log(`${countries} was created on ${fileStats.ctime.toString()}`);
            console.log(`There are ${results} codes in ${countries}`);
        }
        catch (err)
        {
            console.log(err);
            console.log(`${countries} file not written to file system`); 
        }
    }

    countryJSONReadWriter();