const dbRtns = require("./dbroutines"); 
 
const callDb = async () => { 
  try { 
    let db = await dbRtns.getDBInstance(); 
    console.log(`established connection for ${db.databaseName} on Atlas`); 
    let results = await dbRtns.addOne(db, "testcollection", { 
      property1: "Frazer Bergman", 
    }); 
    results.acknowledged 
      ? console.log(`added document to testcollection`) 
      : console.log(`document not added to testcollection`); 
  } catch (err) { 
    console.log(err); 
  } finally { 
    process.exit(); // we don't need to disconnect, connection pooled 
  } 
}; 
 
callDb();