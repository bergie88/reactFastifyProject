// loop through command line arguments in process.argv array
//remove "type":"module" to make work (from package.json)
for ([idx, val] of process.argv.entries()) { 
    console.log(`index is ${idx} : value is ${val}`); 
}
