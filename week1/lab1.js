// Load the got module
const got = require('got')
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const dumpJson = async () => {
 const srcAddr =
 "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
 // Create a currency formatter.
 const formatter = new Intl.NumberFormat("en-US", {
 style: "currency",
 currency: "USD",
 minimumFractionDigits: 0,
 });
 try {
    const FISCALYEAR = '2021-2022';
    const response = await got(srcAddr, { responseType: "json" });
    // strip out the Ontario amount
    let bc = response.body.gtf.bc[FISCALYEAR];
    let ab = response.body.gtf.ab[FISCALYEAR];

    let differenceCalc = (ab, bc) => {
        if(ab > bc)
            return `Alberta recieved ${formatter.format(ab - bc)} more than B.C. for ${FISCALYEAR}`
        return `B.C. recieved ${formatter.format(bc - ab)} more than Alberta for ${FISCALYEAR}`
    }
    let differenceOutput = differenceCalc(ab, bc);

    // format to currency
    bc = formatter.format(bc);
    ab = formatter.format(ab);
    // dump to the console using template literal
    console.log(`B.C.'s transfer amount for ${FISCALYEAR} was ${bc}`);
    console.log(`Alberta's transfer amount for ${FISCALYEAR} was ${ab}`);
    console.log(differenceOutput);

 } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
 }
};
dumpJson();