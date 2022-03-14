const got = require("got");
const fsp = require("fs").promises;

const fileStatsFromFSPromise = async (fname) => {
    let stats; 
    try { 
      stats = await fsp.stat(fname);
    } catch (error) { 
      error.code === "ENOENT" // doesn't exist 
        ? console.log("./countries.json does not exist") 
        : console.log(error.message); 
    } 
    return stats; 
}

const getJSONFromWWWPromise = (url) => {
    return new Promise( async (resolve, reject) =>{
        try {
            const response = await got(url, {responseType: "json"});
            resolve(response.body);
        } 
        catch (error) {
            reject (error);
        }
    })
}

const writeFileFromFSPromise = async (fname, ...data) => {
    let filehandle; 
    try { 
        filehandle = await fsp.open(fname, "w"); 
        let dataToWrite = ""; 
        data.forEach((element) => (dataToWrite += JSON.stringify(element)));
        await fsp.writeFile(fname, dataToWrite);
    } catch (err) { 
        console.log(err); 
    } finally { 
      if (filehandle !== undefined) { 
        await filehandle.close(); 
      } 
    } 
}

const readFileFromFSPromise = async (fname) => {
    let data;
    let dataJsonArray;
    try {
        data = await fsp.readFile(fname);
        dataJsonArray = JSON.parse(data);
    } 
    catch (error) 
    { 
        console.log(error); 
    } 
    finally 
    { 
      if (dataJsonArray !== undefined) 
        return dataJsonArray.length;
    } 
}

module.exports = { 
    fileStatsFromFSPromise,
    getJSONFromWWWPromise,
    writeFileFromFSPromise,
    readFileFromFSPromise,
};