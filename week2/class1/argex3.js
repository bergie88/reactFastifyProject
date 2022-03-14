const yargs = require('yargs') 
 
const argv = yargs 
    .options({ 
        p1: { 
            demandOption: true, 
            alias: 'province1', 
            describe: 'first province to compare transfer payments', 
            string: true 
        }, 
        p2: { 
            demandOption: true, 
            alias: 'province2', 
            describe: 'second province to compare transfer payments', 
            string: true 
        } 
    }) 
    .help() 
    .alias('help','h') 
    .argv 
 
console.log(`you entered ${argv.p1} for province 1 and ${argv.p2} for province 2`)